// app/layout.tsx
'use client'
import { Box, Flex } from '@chakra-ui/react';
import Header from './components/commons/Header';
import Sidebar from './components/commons/Sidebar';
import FooterNavigation from './components/commons/FooterNavigation';
//import LoginModal from './components/modal/LoginModal';
import { useState } from 'react';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <html lang="en">
      <body>
        <Providers>
          <Box bg="background" color="text" minH="100vh">
            <Header onLoginClick={onOpen} />
            <Flex direction={{ base: 'column', md: 'row' }}>
              <Sidebar />
              <Box flex="1">
                {children}
              </Box>
            </Flex>
            <FooterNavigation />
            {/* <LoginModal isOpen={isOpen} onClose={onClose} /> */}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
