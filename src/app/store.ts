import {configureStore} from "@reduxjs/toolkit";
import counterReducer, {CounterState} from "../features/counter/counterSlice";
import postsReducer, {PostState} from "../features/posts/postsSlice";

export interface ApplicationState {
    counter: CounterState;
    posts: PostState;
}

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
    },
});
