import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import AddPostForm from "./features/posts/AddPostForm";
import EditPost from "./features/posts/EditPost";
import PostList from "./features/posts/PostList";
import SignalPostPage from "./features/posts/signalPostPage";
import UserList from "./features/users/UserList";
import UserPage from "./features/users/UserPage";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<PostList/>}/>
                {/*posts*/}
                <Route path="post">
                    <Route index element={<AddPostForm/>}/>
                    <Route path=":postId" element={<SignalPostPage/>}/>
                    <Route path="edit/:postId" element={<EditPost/>}/>
                </Route>
                {/*users*/}
                <Route path="user">
                    <Route index element={<UserList/>}/>
                    <Route path=":userId" element={<UserPage/>}/>
                </Route>
                {/*404*/}
                <Route path="*" element={<Navigate to={"/"} replace/>}/>
            </Route>
        </Routes>
    );

};
