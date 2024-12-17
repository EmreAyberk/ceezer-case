import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { PortfolioTableItemType } from '../../../types';
import { generatePortfolio } from './api';
import PortfolioTableItems from './item';
import PortfolioTableInput from './input';

export default function PortfolioTable() {
  const [generatedPortfolio, setGeneratedPortfolio] = useState<PortfolioTableItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [desiredVolume, setDesiredVolume] = useState<any>();

  const handleGenerate = () => {
    setLoading(true);
    generatePortfolio(desiredVolume)
      .then(response => {
        setGeneratedPortfolio(response.attributes.portfolios);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleGenerate();
  }, []);


  return (
    <Box p={8} boxShadow="lg" borderRadius="lg" bg="white" maxW="1000px" mx="auto" mt={8}>
      <Heading mb={6} textAlign="center" fontSize="2xl" color="teal.600">
        Generate Portfolio
      </Heading>
      <PortfolioTableInput desiredVolume={desiredVolume} setDesiredVolume={setDesiredVolume} handleGenerate={handleGenerate} loading={loading} />

      <PortfolioTableItems generatedPortfolio={generatedPortfolio} />
    </Box>
  );
}