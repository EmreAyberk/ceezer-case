import { Box, Heading } from '@chakra-ui/react';
import PortfolioGrid from '../src/components/portfolio/grid';
import PortfolioTable from '../src/components/PortfolioTable';

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