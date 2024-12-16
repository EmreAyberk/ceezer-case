import { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Text, Spinner, Center, Image } from '@chakra-ui/react';

export default function PortfolioGrid() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    try {
      const response = await fetch('http://localhost:8080/portfolio', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
        {portfolios.map((portfolio, index) => (
          <GridItem
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bg="white"
            _hover={{ transform: 'scale(1.05)', transition: '0.2s' }}
          >
            <Image
              src={portfolio.image || 'https://via.placeholder.com/300'}
              alt={portfolio.name}
              objectFit="cover"
              height="200px"
              width="100%"
            />
            <Box p={4}>
              <Heading size="md" mb={2}>
                {portfolio.name}
              </Heading>
              <Text><strong>Price per Ton:</strong> ${portfolio.pricePerTon}</Text>
              <Text><strong>Offered Volume:</strong> {portfolio.offeredVolumeInTons} tons</Text>
              <Text><strong>Supplier:</strong> {portfolio.supplierName}</Text>
              <Text><strong>Earliest Delivery:</strong> {portfolio.earliestDelivery}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}