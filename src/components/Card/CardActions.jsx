import React from 'react';
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaRegShareSquare } from "react-icons/fa";
import { likePost, unlikePost } from "../../services/PostsServices";

export default function CardActions({ post, onOpen }) {
  // Initialize liked state from post data
  // Adjust the field name to match your API response (isLiked / liked / userLiked)
  const [liked, setLiked] = React.useState(
    post?.isLiked ?? post?.liked ?? post?.userLiked ?? false
  );
  const [likesCount, setLikesCount] = React.useState(post?.likesCount ?? 0);
  const [loading, setLoading] = React.useState(false);

  async function handleLike() {
    if (loading) return;
    const wasLiked = liked;

    // Optimistic update
    setLiked(!wasLiked);
    setLikesCount((prev) => (wasLiked ? prev - 1 : prev + 1));

    try {
      setLoading(true);
      if (wasLiked) {
        await unlikePost(post._id);
      } else {
        await likePost(post._id);
      }
    } catch (err) {
      // Revert on failure
      console.error("Like/unlike failed:", err);
      setLiked(wasLiked);
      setLikesCount((prev) => (wasLiked ? prev + 1 : prev - 1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="light"
          className={`w-full rounded-xl ${liked ? "text-blue-600" : "text-slate-600"}`}
          startContent={liked ? <AiFillLike /> : <AiOutlineLike />}
          onClick={handleLike}
          isLoading={loading}
          isDisabled={loading}
        >
          {liked ? `Liked${likesCount > 0 ? ` (${likesCount})` : ""}` : `Like${likesCount > 0 ? ` (${likesCount})` : ""}`}
        </Button>
      </motion.div>

      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="light"
          className="w-full rounded-xl text-slate-600"
          startContent={<FaRegCommentDots />}
          onClick={onOpen}
        >
          Comment
        </Button>
      </motion.div>

      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="light"
          className="w-full rounded-xl text-slate-600"
          startContent={<FaRegShareSquare />}
        >
          Share
        </Button>
      </motion.div>
    </div>
  );
}