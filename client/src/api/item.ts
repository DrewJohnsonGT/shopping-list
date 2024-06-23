import { API_URL } from '~/constants';
import { Item } from '~/schema';

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_URL}/items`);
  return response.json() as Promise<Item[]>;
};

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
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
  const response = await fetch(`${API_URL}/items/${String(item.id)}`, {
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
  return response.json() as Promise<Item>;
};
