import { API_URL } from '~/constants';
import { Item } from '~/schema';

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_URL}/items`);
  return response.json() as Promise<Item[]>;
};
