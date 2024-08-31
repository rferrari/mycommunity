'use client';

import { useEffect, useState } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { Comment } from "@hiveio/dhive";

import TweetComposer from "./TweetComposer";
import Tweet from "./TweetSingle";

interface TweetListProps {
  initialComments: Comment[];
}

const thread_author = process.env.NEXT_PUBLIC_THREAD_AUTHOR || 'skatedev';
const thread_permlink = process.env.NEXT_PUBLIC_THREAD_PERMLINK || 're-skatedev-sidr6t';

export default function TweetList({ initialComments }: TweetListProps) {
  // live load, infinite scrool
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [batch, setBatch] = useState(1);
  const [hasNewComments, setHasNewComments] = useState(false);
  const [firstPermlink, setFirstPermlink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // new conversation modal
  /*
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


  // Set firstPermlink when initial comments are available
  useEffect(() => {
    if (initialComments.length > 0) {
      setFirstPermlink(initialComments[0].permlink);
    }
  }, [initialComments]);

  // Load more comments when scroll down
  const loadMoreComments = async () => {
    //if(loading) return;
    setLoading(true);
    try {
      // bug here load same more than once async duplicating tweets
      //if(!loading) { again caused by the vh with differences, 0.66
      // vh must be ZERO at the EOF
        setBatch(batch + 1);

        const response = await fetch(`/api/comments?batch=${batch}`);
        const data = await response.json();
        const newComments: Comment[] = data.comments;

        setComments(prevComments => [...prevComments, ...newComments]);
        setLoading(false);
        //}
    } catch (error) {
      console.error("Failed to load more comments", error);
      setLoading(false);
    } finally {
    }
  };

  // Polling for new comments
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await fetch('/api/comments?batch=0');
      const data = await response.json();
      if (data.comments.length > 0 && data.comments[0].permlink !== firstPermlink) {
        setHasNewComments(true);
        //handleLoadNewComments();
      }
    }, 180000);
    //}, Number(process.env.NEXT_PUBLIC_FETCH_NEW_COMMENTS_INTERVAL) || 60000); // Poll new messages every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [firstPermlink]);

  // load new comments (live)
  const handleLoadNewComments = async () => {
    // see a bug here, if new comments more then pageSize
    // it will break showing only batch 0.
    // need to get fetch from last displayed
    // creating new func api/comments
    const response = await fetch('/api/comments?batch=0');
    const data = await response.json();
    
    setComments((prevComments) => [...data.comments, ...prevComments]);
    setFirstPermlink(data.comments[0].permlink);
    setHasNewComments(false);
  };

  // infinite scroll, handle load more comments end of page
  useEffect(() => {
    const handleScroll = () => {
      console.log(window.innerHeight + document.documentElement.scrollTop
                           - document.documentElement.offsetHeight);
      // bug detected. the scroll is with a 0.33 diff.
      // can be related to vh 
      //if (
//        window.innerHeight + document.documentElement.scrollTop ===
  //      document.documentElement.offsetHeight
      if(
        document.documentElement.offsetHeight - 
        (window.innerHeight + document.documentElement.scrollTop) <= 1000
      ) {
        loadMoreComments();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [batch]);

  return (
    <Box>
      {/* <TweetComposer pa={thread_author} pp={thread_permlink} /> */}

      <Text align="right">Sort comments by <b>latest</b></Text>
      <Text align="right">Sort comments by <b>oldest</b></Text>
      <Text align="right">Sort comments by <b>$$$$$$</b></Text>

      {hasNewComments && (
        <div onClick={handleLoadNewComments} style={{ cursor: 'pointer', color: 'blue' }}>
          <Text>New comments available! Click to check it out...</Text>
        </div>
      )}

      <VStack spacing={4} align="stretch">
        {comments.map(comment => (
          <Tweet key={comment.permlink} comment={comment} />
        ))}
      </VStack>

      {loading && 
      <Text>Loading more comments...</Text>}

      {/* {isOpen && 
      <TweetReplyModal isOpen={isOpen} onClose={onClose} comment={reply} onNewReply={handleNewComment} />} */}

    </Box>
  );

}
