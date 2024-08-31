// app/layout.tsx
'use client'
import { Providers } from './providers';
import { Box, Flex } from '@chakra-ui/react';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import FooterNavigation from './components/layout/FooterNavigation';

//import LoginModal from './components/modal/LoginModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <Box bg="background" color="text" minH="100vh">
            <Header />
            <Flex direction={{ base: 'column', md: 'row' }}>
              <Sidebar />
              <Box flex="1">
                {children}
              </Box>
            </Flex>
            <FooterNavigation />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
