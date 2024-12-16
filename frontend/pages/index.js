import { Box, Button, Heading, Text, VStack, Image, Container, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      <Box position="relative" height="60vh" overflow="hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source
            src="https://cdn.prod.website-files.com/651562a2e3b9eb8e04e3c6e7%2F651e6ec3e761a2b4e1883a86_Video_720_Frame_end-transcode.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <Box
          position="relative"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="white"
          textAlign="center"
          px={4}
          bg="rgba(0, 0, 0, 0.4)"
        >
          <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold">
            Empowering a Greener Future
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} maxW="600px" mt={4}>
            Buy and sell carbon credits seamlessly to reduce your carbon footprint and support sustainable initiatives.
          </Text>
          <Link href="/portfolio" passHref>
            <Button colorScheme="teal" size="lg" mt={6}>
              Explore Portfolios
            </Button>
          </Link>
        </Box>
      </Box>

      <Container maxW="container.lg" py={16}>
        <VStack spacing={6} textAlign="center">
          <Heading fontSize="3xl">About Our Marketplace</Heading>
          <Text fontSize="lg" maxW="800px">
            Our carbon marketplace connects organizations and individuals looking to offset their carbon emissions with
            verified carbon credit suppliers. Join us in building a sustainable future by trading carbon credits
            transparently and efficiently.
          </Text>
        </VStack>
      </Container>

      <Box bg="gray.50" py={16}>
        <Container maxW="container.lg">
          <Heading fontSize="3xl" mb={8} textAlign="center">
            Why Choose Our Marketplace?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <FeatureCard
              image="/images/business-people-handshake.jpg"
              title="Verified Suppliers"
              description="Partner with verified and trusted suppliers who provide high-quality carbon credits. Our marketplace ensures transparency, authenticity, and trust in every transaction, helping you confidently reduce your carbon footprint."
            />

            <FeatureCard
              image="/images/digital-transaction.jpg"
              title="Seamless Transactions"
              description="Experience smooth and efficient transactions through our user-friendly platform. We simplify the process of buying and selling carbon credits, ensuring a seamless and hassle-free experience for all participants."
            />

            <FeatureCard
              image="/images/sustainable-impact.jpg"
              title="Sustainable Impact"
              description="Contribute to global sustainability by supporting projects that make a real difference. From renewable energy to reforestation, every credit purchased helps create a healthier planet for future generations."
            />
          </SimpleGrid>
        </Container>
      </Box>

      <Box bg="teal.600" color="white" py={8} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} Carbon Marketplace. All rights reserved.</Text>
      </Box>
    </Box>
  );
}

function FeatureCard({ image, title, description }) {
  return (
    <VStack
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      spacing={4}
      textAlign="center"
      _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
    >
      <Image src={image} alt={title} borderRadius="md" boxSize="200px" objectFit="cover" />
      <Heading fontSize="xl">{title}</Heading>
      <Text>{description}</Text>
    </VStack>
  );
}