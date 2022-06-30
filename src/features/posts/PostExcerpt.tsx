import React from "react";
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
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionBtns post={post}/>
        </article>
    );
};

export default PostExcerpt;

