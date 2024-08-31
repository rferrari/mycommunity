// app/layout.tsx
'use client'
import { Box, Flex } from '@chakra-ui/react';
<<<<<<< HEAD
import Header from './components/commons/Header';
import Sidebar from './components/commons/Sidebar';
import FooterNavigation from './components/commons/FooterNavigation';
//import LoginModal from './components/modal/LoginModal';
=======
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import FooterNavigation from './components/layout/FooterNavigation';
import LoginModal from './components/modal/LoginModal';
>>>>>>> main
import { useState } from 'react';
import { Providers } from './providers';

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
<<<<<<< HEAD
            {/* <LoginModal isOpen={isOpen} onClose={onClose} /> */}
=======
>>>>>>> main
          </Box>
        </Providers>
      </body>
    </html>
  );
}
