import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import PostAuthor from "./postAuthor";
import {selectPostById} from "./postsSlice";
import ReactionBtns from "./reactionButtons";
import TimeAgo from "./TimeAgo";

const SignalPostPage = () => {
    const {postId} = useParams();
    console.log(postId);
    const post = useSelector(state => selectPostById(state, Number(postId)));
    if (!post) {
        return <section>
            <h2>Post not found!</h2>
        </section>;
    }

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

export default SignalPostPage;
