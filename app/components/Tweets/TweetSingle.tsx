'use client'
import { Box, Text, HStack, Button, Avatar, Link } from '@chakra-ui/react';
import { Comment } from '@hiveio/dhive';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import DOMPurify from 'dompurify';
//import { useComments } from '@/hooks/useComments';

import { FaHeart, FaMoneyBill, FaRegComment, FaRegHeart, FaShare } from "react-icons/fa";

const Tweet = ({ comment }: { comment: Comment }) => {

    const baseFontSize = 14;
    const scale = 0.3; // Adjust this to control the rate of decrease
    const minFontSize = 8; // Minimum font size

    // Sanitize the comment body to remove any invalid HTML tags or attributes
    const sanitizedBody = DOMPurify.sanitize(String(comment.body));
    //const sanitizedBody = comment.body;

    // temporary for debug
    const tweetLink = `https://peakd.com/@${comment.author}/${comment.permlink}`;

    const fontSize = Math.max(minFontSize, baseFontSize / Math.pow(comment.depth, scale));

    return (
        <Box bg="muted" p={4} mt={1} mb={1} borderRadius="md" 
        marginLeft={(comment.depth-1)*33}>
            <HStack mb={2}>
                <Avatar size="sm" name={comment.author} />
                <Link href={`/@${comment.author}`} 
                    fontWeight="bold" mb={2} fontSize={(fontSize)} >
                        {comment.author}
                </Link>
                <Text float={'right'} fontSize={(fontSize)}>{comment.created}</Text>
                <Link float={'right'} fontSize={(fontSize)}href={tweetLink} target='_blank'>🔗{comment.permlink}</Link>
            </HStack>

            <Text fontSize={(fontSize)}>{comment.title}</Text>
            {/* <Text fontSize={(fontSize)}> */}
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {sanitizedBody}
            </ReactMarkdown>
            {/* </Text> */}
            <HStack justify="space-between" mt={3}>
                {/* <Button leftIcon={<FaHeart />} variant="ghost">{comment.net_votes}</Button> */}
                <Button leftIcon={<FaRegHeart />} variant="ghost">{comment.net_votes}</Button>
                <Button leftIcon={<FaRegComment />} variant="ghost">{comment.children}</Button>
                <Button leftIcon={<FaMoneyBill />} variant="ghost">{'$$$$$'}
            </Button>
            </HStack>
        </Box>
    );
}

export default Tweet;
