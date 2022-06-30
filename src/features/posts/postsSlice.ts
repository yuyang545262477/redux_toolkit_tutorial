import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";

export interface PostItem {
    id: string;
    title: string;
    content: string;
}

const initialState: PostItem[] = [
    {
        id: "1",
        title: "Post 1",
        content: "Content 1",
    },
    {
        id: "2",
        title: "Post 2",
        content: "Content 2",
    },
];


export type PostState = PostItem[];


const postSlice = createSlice(
    {
        name: "posts",
        initialState,
        reducers: {
            // postAdded: (state, action) => {
            //     state.push(action.payload);
            // },
            postAdded: {
                reducer(state, action: PayloadAction<PostItem>) {
                    state.push(action.payload);
                },
                prepare(title: string, content: string) {
                    return {
                        payload: {
                            id: nanoid(),
                            title,
                            content,
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
