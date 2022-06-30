import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {sub} from "date-fns";

export interface Reactions {
    thumbsUp: number
    wow: number,
    heart: number,
    rocket: number,
    coffee: number,
}

export interface PostItem {
    id: string;
    title: string;
    body: string;
    date: string;
    userId?: string;
    reactions: Reactions;
}

const initialState: PostItem[] = [
    {
        id: "1",
        title: "Post 1",
        body: "Content 1",
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },

    },
    {
        id: "2",
        title: "Post 2",
        body: "Content 2",
        date: sub(new Date(), {minutes: 20}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },
];


export type PostState = PostItem[];


const postSlice = createSlice(
    {
        name: "posts",
        initialState,
        reducers: {
            postAdded: {
                reducer(state, action: PayloadAction<PostItem>) {
                    state.push(action.payload);
                },
                prepare(title: string, body: string, userId: string) {
                    return {
                        payload: {
                            id: nanoid(),
                            title,
                            body,
                            userId,
                            date: new Date().toISOString(),
                            reactions: {
                                thumbsUp: 0,
                                wow: 0,
                                heart: 0,
                                rocket: 0,
                                coffee: 0,
                            },
                        },
                    };
                },
            },
            reactionAdded(state, action) {
                const {postId, reaction} = action.payload;
                const post = state.find(post => post.id === postId);
                if (post) {
                    post.reactions[reaction]++;
                }
            },
        },
    },
);
//selectors
export const selectAllPosts = (state: any): PostState => state.posts;
//actions
export const {postAdded, reactionAdded} = postSlice.actions;
export default postSlice.reducer;
