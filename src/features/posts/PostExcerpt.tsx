import {EntityId} from "@reduxjs/toolkit";
import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import PostAuthor from "./postAuthor";
import {selectPostById} from "./postsSlice";
import ReactionBtns from "./reactionButtons";
import TimeAgo from "./TimeAgo";

interface PostExcerptProps {
    postId: EntityId;
}

const PostExcerpt = ({postId}: PostExcerptProps) => {
    const post = useSelector(state => selectPostById(state, postId));
    return (
        <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}</p>
            <p>
                <Link to={`post/${post.id}`}>View Post </Link>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionBtns post={post}/>
        </article>
    );
};

export default PostExcerpt;

