import React from 'react';
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaRegShareSquare } from "react-icons/fa";

export default function CardActions({ post, onOpen }) {
  const [liked, setLiked] = React.useState(false);

  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="light"
          className={`w-full rounded-xl ${liked ? 'text-blue-600' : 'text-slate-600'}`}
          startContent={liked ? <AiFillLike /> : <AiOutlineLike />}
          onClick={() => setLiked(!liked)}
        >
          Like
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