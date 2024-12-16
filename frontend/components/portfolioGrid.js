import { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Text, Spinner, Center } from '@chakra-ui/react';

export default function PortfolioGrid() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    try {
      const response = await fetch('http://localhost:8080/portfolio/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desiredVolumeInTons: 79 }),
      });

      const data = await response.json();
      setPortfolios(data.attributes.portfolios);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6} textAlign="center">
        Portfolio Grid
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
        {portfolios.map((portfolio, index) => (
          <GridItem
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={6}
            boxShadow="lg"
            bg="white"
            _hover={{ transform: 'scale(1.05)', transition: '0.2s' }}
          >
            <Heading size="md" mb={4}>
              {portfolio.name}
            </Heading>
            <Text><strong>Price per Ton:</strong> ${portfolio.pricePerTon}</Text>
            <Text><strong>Offered Volume:</strong> {portfolio.offeredVolumeInTons} tons</Text>
            <Text><strong>Supplier:</strong> {portfolio.supplierName}</Text>
            <Text><strong>Earliest Delivery:</strong> {portfolio.earliestDelivery}</Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}