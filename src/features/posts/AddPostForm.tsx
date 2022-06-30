import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {postAdded} from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const oneTitleChange = (e) => setTitle(e.target.value);
    const oneContentChange = (e) => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded(
                title,
                content,
            ));
            setTitle("");
            setContent("");
        }
    };

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
                <label htmlFor={"postContent"}>Post Content:</label>
                <textarea id="postContent"
                          name={"postContent"}
                          value={content}
                          onChange={oneContentChange}/>
                <button type={"button"}
                        onClick={onSavePostClicked}>Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
