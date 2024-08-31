/*


'use client'
<<<<<<< HEAD
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
=======
import HiveClient from "@/lib/hive/hiveclient"
import { useCallback, useEffect, useState } from "react"
import { Comment, DisqussionQuery } from "@hiveio/dhive"
>>>>>>> main

<<<<<<< HEAD
let allLoadedComments: Comment[] = [];
let lastChildAuthor = '';
let lastChildPermLink = '';
<<<<<<< HEAD

function organizeComments(comments: Comment[]): Comment[] {
    comments.sort((a, b) => {
        if (a.depth !== b.depth) {
            return a.depth - b.depth;
=======
let lastStartParameter: any[] = [];
=======
interface ActiveVote {
    percent: number;
    reputation: number;
    rshares: number;
    time: string;
    voter: string;
    weight: number;
}
export interface ExtendedComment extends Comment {
    active_votes?: ActiveVote[]
    replies?: ExtendedComment[]
}
>>>>>>> upstream/main

const arraysAreEqual = (arr1: any[], arr2: any[]): boolean => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};

<<<<<<< HEAD
const loadComments = async (): Promise<Comment[]> => {
    const paramsArray = {
        start: [
            'xvlad',
            'nxvsjarvmp',
            lastChildAuthor,
            lastChildPermLink,
        ],
        limit: 500,
        order: "by_root",
    };
=======
async function fetchComments(
    author: string,
    permlink: string,
    recursive: boolean = false
): Promise<Comment[]> {
    try {

        const comments = (await HiveClient.database.call("get_content_replies", [
            author,
            permlink,
        ])) as Comment[];
>>>>>>> upstream/main

    if (!arraysAreEqual(lastStartParameter, paramsArray.start)) {
        lastStartParameter = [...paramsArray.start]; // Salva o novo estado de 'start'
        
        const commentsResponse = await HiveClient.call(
            "database_api", 
            "list_comments", 
            paramsArray
        ) as { comments: Comment[] };

        return commentsResponse.comments;
    }

    return []; // Retorna vazio se a solicitação já foi feita
};

const fetchAllComments = async (): Promise<void> => {
    let hasMoreComments = true;

    do {
        const comments = await loadComments(); // Espera a resposta antes de continuar

        if (comments.length > 0) {
            // Remove o último comentário carregado anteriormente, se houver
            if (allLoadedComments.length > 0) {
                allLoadedComments.pop();
            }
            allLoadedComments = allLoadedComments.concat(comments);

            const lastComment = comments[comments.length - 1];
            lastChildAuthor = lastComment.author;
            lastChildPermLink = lastComment.permlink;

            console.log("Carregando Comentarios... ", allLoadedComments.length);
        } else {
            hasMoreComments = false; // Para o loop se não houver mais comentários
>>>>>>> main
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