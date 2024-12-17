import { PortfolioDetailResponseType } from '../../../types';

export const fetchPortfolioById = async (id: string): Promise<PortfolioDetailResponseType> => {
  const response = await fetch(`http://localhost:8080/portfolio/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};