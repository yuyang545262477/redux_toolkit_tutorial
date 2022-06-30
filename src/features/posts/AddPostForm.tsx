import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllUser} from "../users/user.slice";
import {postAdded} from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUser);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const canSave = Boolean(title && content && userId);

    const oneTitleChange = (e) => setTitle(e.target.value);
    const oneContentChange = (e) => setContent(e.target.value);
    const onAuthorChange = (e) => setUserId(e.target.value);


    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded(
                title,
                content,
                userId,
            ));
            setTitle("");
            setContent("");
            setUserId("");
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
