import { API_URL } from '~/constants';

export const fetchItems = async () => {
  const response = await fetch(`${API_URL}/items`);
  return response.json();
};
