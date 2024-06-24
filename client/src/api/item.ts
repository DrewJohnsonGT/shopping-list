import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '~/constants';
import { useSnackbar } from '~/hooks/useSnackbar';
import { Item } from '~/schema';

const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_URL}/items`);
  return response.json() as Promise<Item[]>;
};

const createItem = async (
  item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Item> => {
  const response = await fetch(`${API_URL}/items`, {
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  return response.json() as Promise<Item>;
};

const updateItem = async (
  item: Partial<Item> & Pick<Item, 'id'>,
): Promise<Item> => {
  const { id, ...itemUpdate } = item;
  const response = await fetch(`${API_URL}/items/${String(id)}`, {
    body: JSON.stringify(itemUpdate),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
  return response.json() as Promise<Item>;
};

const deleteItem = async (id: number): Promise<Item> => {
  const response = await fetch(`${API_URL}/items/${String(id)}`, {
    method: 'DELETE',
  });
  return response.json() as Promise<Item>;
};

const deleteItems = async (items: Item[]): Promise<void> => {
  const response = await fetch(`${API_URL}/items`, {
    body: JSON.stringify(items),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
  return response.json() as Promise<void>;
};

export const useItems = () => {
  const queryClient = useQueryClient();
  const setSnackbar = useSnackbar();
  const {
    data: items,
    error,
    isLoading,
  } = useQuery({
    queryFn: getItems,
    queryKey: ['items'],
  });

  const createItemMutation = useMutation({
    mutationFn: createItem,
    onError: (error) => {
      setSnackbar({
        message: `Failed to create item: ${error.message}`,
        severity: 'error',
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] });
      setSnackbar({
        message: 'Item created',
        severity: 'success',
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: updateItem,
    onError: (error) => {
      setSnackbar({
        message: `Failed to update item: ${error.message}`,
        severity: 'error',
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onError: (error) => {
      setSnackbar({
        message: `Failed to delete item: ${error.message}`,
        severity: 'error',
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] });
      setSnackbar({
        message: 'Item deleted',
        severity: 'success',
      });
    },
  });

  const deleteItemsMutation = useMutation({
    mutationFn: deleteItems,
    onError: (error) => {
      setSnackbar({
        message: `Failed to delete items: ${error.message}`,
        severity: 'error',
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] });
      setSnackbar({
        message: 'Items deleted',
        severity: 'success',
      });
    },
  });

  return {
    createItem: createItemMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
    deleteItems: deleteItemsMutation.mutate,
    error,
    isLoading,
    items,
    updateItem: updateItemMutation.mutate,
  };
};
