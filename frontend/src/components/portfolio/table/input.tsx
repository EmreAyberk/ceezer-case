import { Box, Button, Center, FormControl, FormLabel, Input } from '@chakra-ui/react';

interface PortfolioTableInputProps {
  desiredVolume: number;
  setDesiredVolume: (value: any) => void;
  handleGenerate: () => void;
  loading: boolean;
}

export default function PortfolioTableInput({ desiredVolume, setDesiredVolume, handleGenerate, loading }: PortfolioTableInputProps) {
  return (
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
  );
}