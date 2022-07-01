// noinspection DuplicatedCode

import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../app/store";
import {selectAllUser} from "../users/user.slice";
import {addNewPost, selectPostById, TStatus, updatePost} from "./postsSlice";

const EditPost = () => {
    const {postId} = useParams();
    const navigate = useNavigate();
    const post = useSelector(state => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUser);

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.body);
    const [userId, setUserId] = useState(post.id);
    const [requestStatus, setRequestStatus] = useState<TStatus>("idle");

    const dispatch = useAppDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }


    const oneTitleChange = (e) => setTitle(e.target.value);
    const oneContentChange = (e) => setContent(e.target.value);
    const onAuthorChange = (e) => setUserId(e.target.value);
    const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle";


    const onSavePostClicked = () => {
        if (!canSave) {
            return;
        }
        try {
            setRequestStatus("loading");
            dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap();//unwrap()把异常暴露出来
            setTitle("");
            setContent("");
            setUserId("");
            navigate(`/post/${postId}`);
        } catch (e) {
            console.error("Failed to save post", e);
        } finally {
            setRequestStatus("idle");
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ));


    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor={"postTitle"}>Post Title:</label>
                <input type={"text"}
                       id="postTitle"
                       name={"postTitle"}
                       value={title}
                       onChange={oneTitleChange}/>
                <label htmlFor={"postAuthor"}>Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                    <option value="">Select Author</option>
                    {usersOptions}
                </select>
                <label htmlFor={"postContent"}>Post Content:</label>
                <textarea id="postContent"
                          name={"postContent"}
                          value={content}
                          onChange={oneContentChange}/>
                <button type={"button"}
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                >Save Post
                </button>
            </form>
        </section>
    );
};

export default EditPost;
