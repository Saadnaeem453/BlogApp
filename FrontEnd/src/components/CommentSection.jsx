import { useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Textarea, Button, Alert } from "flowbite-react";

export default function CommentSection({ postId }) {
    const [comment, setComment] = useState("");
    const [commentErr, setCommentErr] = useState("");
    const { currentUser } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            setCommentErr("Comment length cannot exceed 200 characters.");
            return;
        }
        try {
            const res = await fetch("/api/comment/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: comment, userId: currentUser._id, postId })
            });
            if (res.ok) {
                setComment("");
                setCommentErr("");
            } else {
                // Handle other HTTP status codes if needed
                setCommentErr("Failed to submit comment. Please try again later.");
            }
        } catch (error) {
            setCommentErr("An error occurred while submitting the comment.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex items-center text-sm text-gray-500 gp-1 my-5">
                    <pre>Signed in as:</pre>
                    <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
                    <Link className="text-xs text-cyan-600 hover:underline ps-1" to={"/dashboard?tab=profile"}>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    You must be signed in to reach comments:
                    <Link className="text-red-500 hover:underline" to="/sign-in">Sign in</Link>
                </div>
            )}
            {currentUser && (
                <>
                    <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                        <Textarea onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder="Add a comment..." rows="3" maxLength="200" />
                        <div className="flex justify-between mt-5 items-center">
                            <p className="text-gray-500 text-sm">{200 - comment.length} remaining characters</p>
                            <Button type="submit" outline gradientDuoTone="purpleToBlue">Comment</Button>
                        </div>
                    </form>
                    {commentErr && (
                        <Alert className="mt-5" color="failure">{commentErr}</Alert>
                    )}
                </>
            )}
        </div>
    );
}

CommentSection.propTypes = {
    postId: PropTypes.string.isRequired
};
