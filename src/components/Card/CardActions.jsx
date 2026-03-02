import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";
import { RiShareForwardLine, RiShareForwardFill } from "react-icons/ri";
import { likePost, unlikePost } from "../../services/PostsServices";
import ShareModal from "../PostShare/PostShareModal";

// Floating particle burst on like
function LikeBurst({ trigger }) {
  const particles = ["❤️", "✨", "💙", "⭐", "🔥"];
  return (
    <AnimatePresence>
      {trigger && (
        <>
          {particles.map((p, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: [0, 1.4, 0.8],
                x: (Math.random() - 0.5) * 80,
                y: -(30 + Math.random() * 40),
              }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
              style={{
                position: "absolute",
                fontSize: 14,
                pointerEvents: "none",
                zIndex: 50,
                left: "50%",
                top: "50%",
              }}
            >
              {p}
            </motion.span>
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

export default function CardActions({ post, onOpen }) {
  const [liked, setLiked] = useState(
    post?.isLiked ?? post?.liked ?? post?.userLiked ?? false
  );
  const [likesCount, setLikesCount] = useState(post?.likesCount ?? 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [burst, setBurst] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [sharesCount, setSharesCount] = useState(post?.sharesCount ?? 0);
  const burstTimer = useRef(null);

  async function handleLike() {
    if (likeLoading) return;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount((prev) => (wasLiked ? prev - 1 : prev + 1));

    if (!wasLiked) {
      setBurst(true);
      clearTimeout(burstTimer.current);
      burstTimer.current = setTimeout(() => setBurst(false), 800);
    }

    try {
      setLikeLoading(true);
      wasLiked ? await unlikePost(post._id) : await likePost(post._id);
    } catch (err) {
      console.error("Like/unlike failed:", err);
      setLiked(wasLiked);
      setLikesCount((prev) => (wasLiked ? prev + 1 : prev - 1));
    } finally {
      setLikeLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

        .ca-root {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 8px;
          font-family: 'Outfit', sans-serif;
        }

        .ca-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          transition: background 0.18s, color 0.18s;
          flex: 1;
          justify-content: center;
          overflow: hidden;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .ca-btn:hover {
          background: rgba(148,163,184,0.08);
          color: #cbd5e1;
        }

        /* Like active */
        .ca-btn.like-active {
          color: #60a5fa;
          background: rgba(96,165,250,0.08);
        }
        .ca-btn.like-active:hover {
          background: rgba(96,165,250,0.14);
        }

        /* Comment active */
        .ca-btn.comment-active {
          color: #a78bfa;
          background: rgba(167,139,250,0.08);
        }
        .ca-btn.comment-active:hover {
          background: rgba(167,139,250,0.14);
        }

        /* Share active */
        .ca-btn.share-active {
          color: #34d399;
          background: rgba(52,211,153,0.08);
        }
        .ca-btn.share-active:hover {
          background: rgba(52,211,153,0.14);
        }

        .ca-icon {
          display: flex;
          align-items: center;
          font-size: 17px;
          flex-shrink: 0;
        }

        .ca-label {
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .ca-count {
          font-size: 11px;
          font-weight: 600;
          opacity: 0.75;
          min-width: 14px;
        }

        .ca-divider {
          width: 1px;
          height: 20px;
          background: rgba(148,163,184,0.12);
          flex-shrink: 0;
        }
      `}</style>

      <div className="ca-root">
        {/* Like */}
        <motion.button
          className={`ca-btn ${liked ? "like-active" : ""}`}
          onClick={handleLike}
          whileTap={{ scale: 0.93 }}
          disabled={likeLoading}
        >
          <LikeBurst trigger={burst} />
          <motion.span
            className="ca-icon"
            animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {liked ? <AiFillLike /> : <AiOutlineLike />}
          </motion.span>
          <span className="ca-label">Like</span>
          <AnimatePresence mode="wait">
            {likesCount > 0 && (
              <motion.span
                key={likesCount}
                className="ca-count"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
              >
                {likesCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="ca-divider" />

        {/* Comment */}
        <motion.button
          className="ca-btn"
          onClick={onOpen}
          whileTap={{ scale: 0.93 }}
        >
          <span className="ca-icon">
            <FaRegCommentDots />
          </span>
          <span className="ca-label">Comment</span>
          {(post?.commentsCount ?? 0) > 0 && (
            <span className="ca-count">{post.commentsCount}</span>
          )}
        </motion.button>

        <div className="ca-divider" />

        {/* Share */}
        <motion.button
          className={`ca-btn ${sharesCount > 0 ? "share-active" : ""}`}
          onClick={() => setShareOpen(true)}
          whileTap={{ scale: 0.93 }}
        >
          <motion.span
            className="ca-icon"
            animate={sharesCount > 0 ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {sharesCount > 0 ? <RiShareForwardFill /> : <RiShareForwardLine />}
          </motion.span>
          <span className="ca-label">Share</span>
          <AnimatePresence mode="wait">
            {sharesCount > 0 && (
              <motion.span
                key={sharesCount}
                className="ca-count"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
              >
                {sharesCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onOpenChange={setShareOpen}
        post={post}
        onShareSuccess={() => setSharesCount((p) => p + 1)}
      />
    </>
  );
}