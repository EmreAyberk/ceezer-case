import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { PortfolioTableItemType } from '../../../types';

interface PortfolioTableProps {
  generatedPortfolio: PortfolioTableItemType[];
}

export default function PortfolioTableItems({ generatedPortfolio }: PortfolioTableProps) {
  return (
    (generatedPortfolio && generatedPortfolio.length != 0) &&
    <TableContainer border="1px solid" borderColor="gray.200" borderRadius="lg" boxShadow="md" overflowX="auto">
      <Table variant="striped" colorScheme="teal">
        <Thead bg="teal.500">
          <Tr>
            <Th color="white">Name</Th>
            <Th color="white">Price per Ton</Th>
            <Th color="white">Offered Volume</Th>
            <Th color="white">Supplier</Th>
            <Th color="white">Earliest Delivery</Th>
          </Tr>
        </Thead>
        <Tbody>
          {generatedPortfolio.map((item, index) => (
            <Tr key={index} _hover={{ bg: 'gray.100' }}>
              <Td fontWeight="medium">{item.name}</Td>
              <Td>${item.pricePerTon}</Td>
              <Td>{item.offeredVolumeInTons} tons</Td>
              <Td>{item.supplierName}</Td>
              <Td>{item.earliestDelivery}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}