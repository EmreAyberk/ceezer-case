import { PortfolioTableItemResponseType } from '../../../types';

export const generatePortfolio = async (desiredVolume: number): Promise<PortfolioTableItemResponseType> => {
  const response = await fetch('http://localhost:8080/portfolio/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ desiredVolumeInTons: Number(desiredVolume) }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};