'use client'
import React from 'react';
import { Box, HStack, Button, Textarea } from '@chakra-ui/react';
import { useAioha } from '@aioha/react-ui'
import { useRef } from 'react';

export default function TweetComposer() {
    const { aioha, user, provider } = useAioha()
    const postBodyRef = useRef<HTMLTextAreaElement>(null);

    async function handleComment() {
        //  console.log(process.env.NEXT_PUBLIC_THREAD_AUTHOR)
        //  console.log(aioha.getCurrentUser())
        const permlink = new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();

        const commentBody = postBodyRef.current?.value

        if (commentBody) {
            const comment = await aioha.comment(
                String(process.env.NEXT_PUBLIC_THREAD_AUTHOR), 
                String(process.env.NEXT_PUBLIC_THREAD_PERMLINK),
                permlink, '', 
                commentBody, 
                { 
                    app: String(process.env.NEXT_PUBLIC_COMMUNITY_APP || "MyCommunity")
                    +'/'+String(process.env.NEXT_PUBLIC_COMMUNITY_VERSION || "0.0.1") 
                })
            console.log(comment)
        }
    }

    return (
        <Box bg="muted" p={4} borderRadius="md" mb={3}>
            <Textarea
                placeholder="What's happening?"
                bg="background"
                borderColor="border"
                mb={3}
                ref={postBodyRef}
                _placeholder={{ color: 'text' }}
            />
            <HStack justify="space-between">
                <HStack>
                    <Button variant="ghost">Image</Button>
                    <Button variant="ghost">GIF</Button>
                    <Button variant="ghost">Poll</Button>
                </HStack>
                <Button variant="solid" colorScheme="primary" onClick={handleComment}>
                    Tweet
                </Button>
            </HStack>
        </Box>
    );
}
