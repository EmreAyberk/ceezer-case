import { PortfolioGridItemResponseType } from '../../../types';

export const fetchPortfolio = async (): Promise<PortfolioGridItemResponseType> => {
  const response = await fetch('http://localhost:8080/portfolio', {
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
