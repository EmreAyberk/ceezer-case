import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Input,
  FormControl,
  FormLabel,
  TableContainer,
} from '@chakra-ui/react';

export default function PortfolioTable() {
  const [generatedData, setGeneratedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [desiredVolume, setDesiredVolume] = useState(79); // Default value

  async function handleGenerate() {
    setLoading(true);
    try {
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

      const data = await response.json();
      setGeneratedData(data.attributes.portfolios);
    } catch (error) {
      console.error('Error generating portfolio:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box p={8} boxShadow="lg" borderRadius="lg" bg="white" maxW="1000px" mx="auto" mt={8}>
      <Heading mb={6} textAlign="center" fontSize="2xl" color="teal.600">
        Generate Portfolio
      </Heading>

      <Center mb={6}>
        <Box width="100%" maxWidth="400px">
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Desired Volume in Tons</FormLabel>
            <Input
              type="number"
              value={desiredVolume}
              onChange={(e) => setDesiredVolume(e.target.value)}
              placeholder="Enter desired volume in tons"
              size="lg"
              focusBorderColor="teal.500"
            />
          </FormControl>
          <Button colorScheme="teal" size="lg" onClick={handleGenerate} isLoading={loading} width="100%">
            Generate Portfolio
          </Button>
        </Box>
      </Center>

      {generatedData && (
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
              {generatedData.map((item, index) => (
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
      )}
    </Box>
  );
}