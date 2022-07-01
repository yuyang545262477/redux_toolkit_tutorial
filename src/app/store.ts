import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import counterReducer, {CounterState} from "../features/counter/counterSlice";
import postsReducer, {PostState} from "../features/posts/postsSlice";
import userReducer, {UserState} from "../features/users/user.slice";

export interface ApplicationState {
    counter: CounterState;
    posts: PostState;
    users: UserState;
}

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: userReducer,
    },
});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
