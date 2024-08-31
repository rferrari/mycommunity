import { Box, Container, Flex } from '@chakra-ui/react';
import RightSidebar from './components/layout/RightSideBar';

import TweetPage from './components/Tweets/page';
//import TweetList from './components/homepage/TweetList';
//import TweetComposer from './components/homepage/TweetComposer';
//import Conversation from './components/homepage/Conversation';
//import TweetReplyModal from './components/homepage/TweetReplyModal';


export default function Home() {

/*  
  const thread_author = process.env.NEXT_PUBLIC_THREAD_AUTHOR || 'skatedev';
  const thread_permlink = process.env.NEXT_PUBLIC_THREAD_PERMLINK || 're-skatedev-sidr6t';

  const [conversation, setConversation] = useState<Comment | undefined>();
  const [reply, setReply] = useState<Comment>();
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState<Comment | null>(null); // Define the state

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleNewComment = (newComment: Partial<Comment> | CharacterData) => {
    setNewComment(newComment as Comment); // Type assertion
  };
*/

  return (
    <Box bg="background" color="text" minH="100vh">
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box flex="1" p={4}>
          <Container maxW="container.sm">
            <TweetPage/>
          </Container>
        </Box>
        <RightSidebar />
      </Flex>
      {/* {isOpen && 
      <TweetReplyModal isOpen={isOpen} onClose={onClose} comment={reply} onNewReply={handleNewComment} />} */}
    </Box>
  );
}
