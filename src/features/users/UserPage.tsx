import React from "react";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {selectAllPosts} from "../posts/postsSlice";
import {selectUserById} from "./user.slice";

const UserPage = () => {
    const {userId} = useParams();
    const user = useSelector(state => selectUserById(state, Number(userId)));

    const postForUser = useSelector(state => {
        const allPost = selectAllPosts(state);
        return allPost.filter(post => post.userId === userId);
    });

    const postTitles = postForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));


    return (
        <section>
            <h2>{user.name}</h2>
            <ul>{postTitles}</ul>
        </section>
    );

};

export default UserPage;
