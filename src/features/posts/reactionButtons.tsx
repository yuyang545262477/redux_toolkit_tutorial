import React from "react";
import {useDispatch} from "react-redux";
import {PostItem, reactionAdded} from "./postsSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "💖",
    rocket: "🚀",
    coffee: "☕",
};

interface ReactionBtnProps {
    post: PostItem;
}

const ReactionBtns = ({post}: ReactionBtnProps) => {
    const dispatch = useDispatch();
    const reactionBtns = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button key={name}
                    type={"button"}

                    onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}>
                {emoji} {post.reactions[name] || 0}
            </button>
        );
    });
    return (
        <div>{reactionBtns}</div>
    );
};

export default ReactionBtns;
