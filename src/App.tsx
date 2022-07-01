import React from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import AddPostForm from "./features/posts/AddPostForm";
import PostList from "./features/posts/PostList";
import SignalPostPage from "./features/posts/signalPostPage";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<PostList/>}/>
                <Route path="post">
                    <Route index element={<AddPostForm/>}/>
                    <Route path=":postId" element={<SignalPostPage/>}/>
                </Route>
            </Route>
        </Routes>
    );

};
