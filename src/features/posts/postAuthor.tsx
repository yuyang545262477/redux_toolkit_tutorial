import React from "react";
import {useSelector} from "react-redux";
import {selectAllUser} from "../users/user.slice";

interface PostAuthorProps {
    userId: string;
}


const PostAuthor = ({userId}: PostAuthorProps) => {
    const users = useSelector(selectAllUser);
    const author = users.find((user) => user.id === userId);
    return (
        <span>
            by{author ? author.name : "Unknown"}
        </span>
    );
};

export default PostAuthor;
