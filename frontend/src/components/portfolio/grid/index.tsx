import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Text, Spinner, Center, Image } from '@chakra-ui/react';
import { fetchPortfolio } from './api';
import { PortfolioGridItemType } from '../../../types';
import { PortfolioGridItem } from './item';

export default function PortfolioGrid() {
  const [portfolios, setPortfolios] = useState<PortfolioGridItemType[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    fetchPortfolio().then(response => {
      setPortfolios(response.attributes.portfolios);
    })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

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
        {portfolios.map((portfolio: PortfolioGridItemType) => {

          return (
            <PortfolioGridItem portfolio={portfolio} key={portfolio.id} />
          );
        })}
      </Grid>
    </Box>
  );
}