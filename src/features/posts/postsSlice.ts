import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {sub} from "date-fns";

export interface PostItem {
    id: string;
    title: string;
    content: string;
    date: string;
    userId?: string;
}

const initialState: PostItem[] = [
    {
        id: "1",
        title: "Post 1",
        content: "Content 1",
        date: sub(new Date(), {minutes: 10}).toISOString(),

    },
    {
        id: "2",
        title: "Post 2",
        content: "Content 2",
        date: sub(new Date(), {minutes: 20}).toISOString(),
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
                prepare(title: string, content: string, userId: string) {
                    return {
                        payload: {
                            id: nanoid(),
                            title,
                            content,
                            userId,
                            date: new Date().toISOString(),
                        },
                    };
                },
            },
        },
    },
);
//selectors
export const selectAllPosts = (state: any): PostState => state.posts;
//actions
export const {postAdded} = postSlice.actions;
export default postSlice.reducer;
