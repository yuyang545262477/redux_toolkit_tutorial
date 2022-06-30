import React from "react";
import {useSelector} from "react-redux";
import PostAuthor from "./postAuthor";
import {selectAllPosts} from "./postsSlice";
import ReactionBtns from "./reactionButtons";
import TimeAgo from "./TimeAgo";

const PostList = () => {
    const posts = useSelector(selectAllPosts);
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    const renderPosts = orderedPosts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionBtns post={post}/>
        </article>
    ));
    return (
        <section>
            <h2>Posts</h2>
            {renderPosts}
        </section>
    );
};

export default PostList;
