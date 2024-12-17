import NextLink from 'next/link';
import { Box, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import { PortfolioItemType } from '../../../types';

type PortfolioGridItemProps = {
  portfolio: PortfolioItemType
}
export const PortfolioGridItem = ({ portfolio }: PortfolioGridItemProps) => {

  return (
    <NextLink key={portfolio.id} href={`/portfolio/${portfolio.id}`} passHref>
      <GridItem
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
        _hover={{ transform: 'scale(1.05)', transition: '0.2s', cursor: 'pointer' }}
      >
        <Image
          src={portfolio.image}
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
        </Box>
      </GridItem>
    </NextLink>
  );

};