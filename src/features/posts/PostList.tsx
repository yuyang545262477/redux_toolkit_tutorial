import React from "react";
import {useSelector} from "react-redux";
import PostExcerpt from "./PostExcerpt";
import {getPostError, getPostsStatus, selectAllPosts} from "./postsSlice";

const PostList = () => {

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostError);


    let content;
    if (postStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postStatus === "success") {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostExcerpt post={post} key={post.id}/>);
    } else if (postStatus === "error") {
        content = <p>Error: {error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default PostList;
