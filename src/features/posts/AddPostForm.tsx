// noinspection DuplicatedCode

import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store";
import {selectAllUser} from "../users/user.slice";
import {addNewPost, TStatus} from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectAllUser);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState<TStatus>("idle");

    // const canSave = Boolean(title && content && userId);
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    const oneTitleChange = (e) => setTitle(e.target.value);
    const oneContentChange = (e) => setContent(e.target.value);
    const onAuthorChange = (e) => setUserId(e.target.value);


    const onSavePostClicked = () => {
        if (!canSave) {
            return;
        }
        try {
            setAddRequestStatus("loading");
            dispatch(addNewPost({title, body: content, userId})).unwrap();//unwrap()把异常暴露出来
            setTitle("");
            setContent("");
            setUserId("");
            navigate("/");
        } catch (e) {
            console.error("Failed to save post", e);
        } finally {
            setAddRequestStatus("idle");
        }
    };
    
    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ));


    return (
        <section>
            <h2>Add Post</h2>
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

export default AddPostForm;
