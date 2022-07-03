import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
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
    posts?: TPosts;
    status: TStatus;
    error: string | null;
    count: number;
}

const postAdapter = createEntityAdapter<PostItem>({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postAdapter.getInitialState({
    status: "idle",
    error: "",
    count: 0,
});


export type PostState = PostItem[];

/*effects*/
//获取posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios(POST_URL);
    return [...response.data];
});
//新增post
export const addNewPost = createAsyncThunk("posts/addNewPost", async (postItem: Partial<PostItem>) => {
    const response = await axios.post(POST_URL, postItem);
    return response.data;
});

//更新post
export const updatePost = createAsyncThunk("posts/updatePost", async (postItem: Partial<PostItem>) => {
    const response = await axios.put(`${POST_URL}/${postItem.id}`, postItem, {});
    return response.data;
});

//删除post
export const deletePost = createAsyncThunk("posts/deletePost", async (postItem: Partial<PostItem>) => {
    const response = await axios.delete(`${POST_URL}/${postItem.id}`);
    if (response.status === 200) return postItem;
    return `${response.status}: ${response.statusText}`;
});


const postSlice = createSlice(
    {
        name: "posts",
        initialState,
        reducers: {
            // postAdded: {
            //     reducer(state, action: PayloadAction<PostItem>) {
            //         state.posts.push(action.payload);
            //     },
            //     prepare(title: string, body: string, userId: string) {
            //         return {
            //             payload: {
            //                 id: nanoid(),
            //                 title,
            //                 body,
            //                 userId,
            //                 date: new Date().toISOString(),
            //                 reactions: {
            //                     thumbsUp: 0,
            //                     wow: 0,
            //                     heart: 0,
            //                     rocket: 0,
            //                     coffee: 0,
            //                 },
            //             },
            //         };
            //     },
            // },
            reactionAdded(state, action) {
                const {postId, reaction} = action.payload;
                const post = state.entities[postId];
                if (post) {
                    post.reactions[reaction]++;
                }
            },
            incrementCount(state) {
                state.count = state.count + 1;
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
                    // state.posts = state.posts.concat(loadedPosts);
                    postAdapter.addMany(state, loadedPosts);
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
                    postAdapter.addOne(state, action.payload);
                })
                .addCase(updatePost.fulfilled, (state, action) => {
                    if (!action.payload?.id) {
                        console.log("Update could not complete");
                        console.log(action.payload);
                        return;
                    }
                    // const {id} = action.payload;
                    action.payload.date = new Date().toISOString();
                    // const otherPosts = state.posts.filter(post => post.id !== id);
                    // state.posts = [...otherPosts, action.payload];
                    postAdapter.upsertOne(state, action.payload);
                })
                .addCase(deletePost.fulfilled, (state, action) => {
                    if (!(<PostItem>action.payload).id) {
                        console.log("Delete could not complete");
                        console.log(action.payload);
                        return;
                    }
                    const {id} = action.payload as PostItem;
                    // const otherPosts = state.posts.filter(post => post.id !== id);
                    // state.posts = [...otherPosts];
                    postAdapter.removeOne(state, id);
                });
        },
    },
);
//selectors
export const getPostsStatus = (state: any): TStatus => state.posts.status;
export const getPostError = (state: any): string => state.posts.error;
export const getPostsCount = (state: any): number => state.posts.count;

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectedPostIds,
} = postAdapter.getSelectors((state: any) => state.posts);

export const selectPostsByUserId = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId),
);
//actions
export const {reactionAdded, incrementCount} = postSlice.actions;
export default postSlice.reducer;
