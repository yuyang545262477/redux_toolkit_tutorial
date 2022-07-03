import React from "react";
import {useSelector} from "react-redux";
import PostExcerpt from "./PostExcerpt";
import {getPostError, getPostsStatus, selectedPostIds} from "./postsSlice";

const PostList = () => {

    const orderedPostIds = useSelector(selectedPostIds);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostError);


    let content;
    if (postStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postStatus === "success") {
        content = orderedPostIds.map(postId => <PostExcerpt postId={postId} key={postId}/>);
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
