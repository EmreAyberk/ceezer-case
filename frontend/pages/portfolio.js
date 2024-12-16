import { Box, Heading } from '@chakra-ui/react';
import PortfolioGrid from '../components/PortfolioGrid';
import PortfolioTable from '../components/PortfolioTable';

export default function Portfolios() {
  return (
    <Box p={8}>
      <Heading mb={6} textAlign="center">
        Portfolios Page
      </Heading>

      <PortfolioGrid />

      <PortfolioTable />
    </Box>
  );
}