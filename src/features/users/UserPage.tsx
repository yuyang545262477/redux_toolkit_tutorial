import React from "react";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {selectPostsByUserId} from "../posts/postsSlice";
import {selectUserById} from "./user.slice";

const UserPage = () => {
    const {userId} = useParams();
    const user = useSelector(state => selectUserById(state, Number(userId)));

    const postForUser = useSelector(state => selectPostsByUserId(state, Number(userId)));

    const postTitles = postForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));


    return (
        <section>
            <h2>{user?.name}</h2>
            <ul>{postTitles}</ul>
        </section>
    );

};

export default UserPage;
