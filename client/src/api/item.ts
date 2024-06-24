import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '~/constants';
import { Item } from '~/schema';

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_URL}/items`);
  return response.json() as Promise<Item[]>;
};

export const createItem = async (
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

export const updateItem = async (
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

export const deleteItem = async (id: number): Promise<Item> => {
  const response = await fetch(`${API_URL}/items/${String(id)}`, {
    method: 'DELETE',
  });
  return response.json() as Promise<Item>;
};

export const useItems = () => {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  return {
    createItem: createItemMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
    error,
    isLoading,
    items,
    updateItem: updateItemMutation.mutate,
  };
};
