/*


'use client'
import HiveClient from "@/lib/hive/hiveclient";
import { useCallback, useEffect, useState } from "react";
import { Comment } from "@hiveio/dhive";

// Initialize parameters for fetching comments
const paramsFetchTweetsByRoot = {
    start: ['', '', '', ''],
    limit: 500,
    order: "by_root",
};

var paramsFetchTweets = paramsFetchTweetsByRoot;

let allLoadedComments: Comment[] = [];
let lastChildAuthor = '';
let lastChildPermLink = '';

function organizeComments(comments: Comment[]): Comment[] {
    comments.sort((a, b) => {
        if (a.depth !== b.depth) {
            return a.depth - b.depth;
        }
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    const organizedComments: Comment[] = [];
    const commentMap = new Map<string, Comment[]>();

    comments.forEach(comment => {
        if (comment.depth === 1) {
            organizedComments.push(comment);
            commentMap.set(comment.permlink, []);
        } else if (comment.depth >= 2) {
            const parentPermlink = comment.parent_permlink;
            if (commentMap.has(parentPermlink)) {
                commentMap.get(parentPermlink)?.push(comment);
            }
        }
    });

    const finalComments: Comment[] = [];
    organizedComments.forEach(comment => {
        finalComments.push(comment);
        if (commentMap.has(comment.permlink)) {
            finalComments.push(...(commentMap.get(comment.permlink) || []));
        }
    });

    return finalComments;
}

const loadComments = async (paramsFetchTweets: any): Promise<Comment[]> => {
    const commentsResponse = await HiveClient.call(
        "database_api",
        "list_comments",
        paramsFetchTweets
    ) as { comments: Comment[] };

    return commentsResponse.comments;
};

async function fetchComments(page: number, pageSize: number): Promise<Comment[]> {
    let comments: Comment[] = [];
    allLoadedComments = [];

    let hasMoreComments = true;

    while (hasMoreComments) {
        paramsFetchTweetsByRoot.start[2] = lastChildAuthor;
        paramsFetchTweetsByRoot.start[3] = lastChildPermLink;

        comments = await loadComments(paramsFetchTweetsByRoot);

        if (comments.length > 0) {
            allLoadedComments = allLoadedComments.concat(comments);
            const lastComment = comments[comments.length - 1];
            lastChildAuthor = lastComment.author;
            lastChildPermLink = lastComment.permlink;
        } else {
            hasMoreComments = false;
        }
    }

    allLoadedComments = organizeComments(allLoadedComments);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return allLoadedComments.slice(startIndex, endIndex);
}

export function useComments(author: string, permlink: string) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const pageSize = 15;

    const fetchAndSetComments = async (page: number): Promise<Comment[]> => {
        try {
            const fetchedComments = await fetchComments(page, pageSize);
            return fetchedComments;
        } catch (err: any) {
            setError(err.message ? err.message : "Error loading comments");
            console.error(err);
            return [];
        }
    };

    const handleLoadMore = async (): Promise<Comment[]> => {
        if (allLoadedComments.length > 0) {
            paramsFetchTweets = paramsFetchTweetsByRoot;
            paramsFetchTweets.start[0] = 'skatedev';
            paramsFetchTweets.start[1] = 'test-post-for-new-community';
            console.log("Init" + paramsFetchTweets.start[1]);
            // Since the fetchComments handles pagination, no need to do anything here.
            return fetchAndSetComments(page);
        } else {
            return fetchAndSetComments(page);
        }
    };

    useEffect(() => {
        const loadComments = async () => {
            setIsLoading(true);
            const newComments = await handleLoadMore();
            setComments(prevComments => [...prevComments, ...newComments]);
            setIsLoading(false);
        };

        loadComments();
    }, [page]);

    return {
        comments,
        isLoading,
        error,
        handleLoadMore,
    };
}

*/