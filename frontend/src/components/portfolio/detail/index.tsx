import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Heading, Center, Spinner } from '@chakra-ui/react';
import { fetchPortfolioById } from './api';
import { PortfolioDetailContent } from './detail';
import { PortfolioItemType } from '../../../types';

export default function PortfolioDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [portfolio, setPortfolio] = useState<PortfolioItemType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPortfolioById(id as string)
        .then((data) => setPortfolio(data.attributes.portfolio))
        .catch((error) => console.error('Error fetching portfolio:', error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleGoBack = () => {
    router.push('/portfolio');
  };

  if (loading) {
    return <Center height="100vh">
      <Spinner size="xl" />
    </Center>;
  }

  if (!portfolio) {
    return (
      <Center height="100vh">
        <Heading>Portfolio not found</Heading>
      </Center>
    );
  }

  return <PortfolioDetailContent portfolio={portfolio} onGoBack={handleGoBack} />;
}