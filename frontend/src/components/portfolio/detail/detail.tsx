// PortfolioDetailContent.tsx
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react';
import { PortfolioItemType } from '../../../types';

interface PortfolioDetailContentProps {
  portfolio: PortfolioItemType;
  onGoBack: () => void;
}

export const PortfolioDetailContent = ({ portfolio, onGoBack }: PortfolioDetailContentProps) => {
  return (
    <Box p={12}>
      <Button colorScheme="teal" mb={4} onClick={onGoBack}>
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
};