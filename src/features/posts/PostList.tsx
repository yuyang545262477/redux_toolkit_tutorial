import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PostAuthor from "./postAuthor";
import PostExcerpt from "./PostExcerpt";
import {fetchPosts, getPostError, getPostsStatus, selectAllPosts} from "./postsSlice";
import ReactionBtns from "./reactionButtons";
import TimeAgo from "./TimeAgo";

const PostList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostError);


    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [dispatch, postStatus]);

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
            <h2>Posts</h2>
            {content}
        </section>
    );
};

export default PostList;
