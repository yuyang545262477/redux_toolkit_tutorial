import React from "react";
import {Link} from "react-router-dom";
import PostAuthor from "./postAuthor";
import {PostItem} from "./postsSlice";
import ReactionBtns from "./reactionButtons";
import TimeAgo from "./TimeAgo";

interface PostExcerptProps {
    post: PostItem;
}

const PostExcerpt = ({post}: PostExcerptProps) => {
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

