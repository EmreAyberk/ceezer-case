import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, Spinner, Center, Image, Button } from '@chakra-ui/react';

export default function PortfolioDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPortfolioById();
    }
  }, [id]);

  async function fetchPortfolioById() {
    try {
      const response = await fetch(`http://localhost:8080/portfolio/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPortfolio(data.attributes.portfolio);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleGoBack = () => {
    router.push('/portfolio');
  };

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!portfolio) {
    return (
      <Center height="100vh">
        <Heading>Portfolio not found</Heading>
      </Center>
    );
  }

  return (
    <Box p={12}>
      <Button colorScheme="teal" mb={4} onClick={handleGoBack}>
        &larr; Go Back to Portfolios
      </Button>
      <Box p={8} maxW="800px" mx="auto" boxShadow="lg" borderRadius="lg" bg="white">
        <Image
          src={portfolio.image || 'https://via.placeholder.com/800x400'}
          alt={portfolio.name}
          objectFit="cover"
          width="100%"
          height="300px"
          mb={6}
          borderRadius="lg"
        />
        <Heading mb={4}>{portfolio.name}</Heading>
        <Text fontSize="lg" mb={2}><strong>Country:</strong> {portfolio.country}</Text>
        <Text fontSize="lg" mb={2}><strong>Price per Ton:</strong> ${portfolio.pricePerTon}</Text>
        <Text fontSize="lg" mb={2}><strong>Offered Volume:</strong> {portfolio.offeredVolumeInTons} tons</Text>
        <Text fontSize="lg" mb={2}><strong>Distribution Weight:</strong> {portfolio.distributionWeight}</Text>
        <Text fontSize="lg" mb={2}><strong>Supplier:</strong> {portfolio.supplierName}</Text>
        <Text fontSize="lg" mb={2}><strong>Earliest Delivery:</strong> {portfolio.earliestDelivery}</Text>
        <Text fontSize="lg" mt={4} whiteSpace="pre-line">
          <strong>Description:</strong> {portfolio.description}
        </Text>
      </Box>
    </Box>
  );
}