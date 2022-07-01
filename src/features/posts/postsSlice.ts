import {createAsyncThunk, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export interface Reactions {
    thumbsUp: number
    wow: number,
    heart: number,
    rocket: number,
    coffee: number,
}

const initialReactions: Reactions = {
    thumbsUp: 0,
    wow: 0,
    heart: 0,
    rocket: 0,
    coffee: 0,
};

export interface PostItem {
    id: string;
    title: string;
    body: string;
    date: string;
    userId?: string;
    reactions: Reactions;
}

export type TPosts = PostItem[];
export type TStatus = "idle" | "loading" | "error" | "success";

export interface PostsState {
    posts: TPosts;
    status: TStatus;
    error: string | null;
}


const initialState: PostsState = {
    posts: [],
    status: "idle",
    error: "",
};


export type PostState = PostItem[];

/*effects*/
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios(POST_URL);
    return [...response.data];
});
export const addNewPost = createAsyncThunk("posts/addNewPost", async (postItem: Partial<PostItem>) => {
    const response = await axios.post(POST_URL, postItem);
    return response.data;
});


const postSlice = createSlice(
    {
        name: "posts",
        initialState,
        reducers: {
            postAdded: {
                reducer(state, action: PayloadAction<PostItem>) {
                    state.posts.push(action.payload);
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
                const post = state.posts.find(post => post.id === postId);
                if (post) {
                    post.reactions[reaction]++;
                }
            },
        },
        extraReducers(builder) {
            builder
                .addCase(fetchPosts.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(fetchPosts.fulfilled, (state, action) => {
                    state.status = "success";
                    //    add Date and reactions
                    let min = 1;
                    const loadedPosts = action.payload.map((post) => {
                        post.date = sub(new Date(), {days: min++}).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };
                        return post;
                    });
                    //    Add any fetched posts to the state
                    state.posts = state.posts.concat(loadedPosts);
                })
                .addCase(fetchPosts.rejected, (state, action) => {
                    state.status = "error";
                    state.error = action.error.message;
                })
                .addCase(addNewPost.fulfilled, (state, action) => {
                    action.payload.userId = Number(action.payload.userId);
                    action.payload.date = new Date().toISOString();
                    action.payload.reactions = initialReactions;
                    console.log(action.payload);
                    state.posts.push(action.payload);
                });


        },
    },
);
//selectors
export const selectAllPosts = (state: any): TPosts => state.posts.posts;
export const getPostsStatus = (state: any): TStatus => state.posts.status;
export const getPostError = (state: any): string => state.posts.error;
export const selectPostById = (state, postId): PostItem | undefined => state.posts.posts.find(post => post.id === postId);


//actions
export const {postAdded, reactionAdded} = postSlice.actions;
export default postSlice.reducer;
