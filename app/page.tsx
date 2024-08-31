import { Box, Container, Flex } from '@chakra-ui/react';
import RightSidebar from './components/layout/RightSideBar';

import TweetPage from './components/Tweets/page';

export default function Home() {


  return (
    <Box bg="background" color="text">
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box flex="1" p={4}>
          <Container maxW="container.sm">
            <TweetPage/>
          </Container>
        </Box>
        <RightSidebar />
      </Flex>
    </Box>
  );
}
