import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  Avatar,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiShareForwardFill,
  RiTwitterXFill,
  RiWhatsappFill,
  RiFacebookBoxFill,
  RiTelegramFill,
  RiLinkM,
  RiCheckLine,
  RiCloseLine,
  RiEarthLine,
  RiSendPlaneFill,
} from "react-icons/ri";
import { sharePost } from "../../services/PostsServices";
import { toast } from 'react-toastify';

const SOCIALS = [
  // ... your SOCIALS array remains the same
];

export default function ShareModal({ isOpen, onOpenChange, post, onShareSuccess }) {
  const [tab, setTab] = useState("feed");
  const [note, setNote] = useState("");
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [error, setError] = useState(null);

  const postUrl = `${window.location.origin}/posts/${post?._id}`;
  const postText = post?.content || "";

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setShared(false);
        setNote("");
        setTab("feed");
        setCopied(false);
        setError(null);
      }, 300);
    }
  }, [isOpen]);

  async function handleShareToFeed() {
    if (sharing || shared || !post?._id) return;
    
    try {
      setSharing(true);
      setError(null);
      
      console.log("Attempting to share post:", post._id); // Debug log
      
      const result = await sharePost(post._id);
      console.log("Share result:", result); // Debug log
      
      setShared(true);
      onShareSuccess?.();
      
      // Show success message
      toast?.success("Post shared successfully!");
      
      setTimeout(() => onOpenChange(false), 2200);
    } catch (err) {
      console.error("Share failed:", err);
      
      // Handle specific error cases
      if (err.response?.status === 409) {
        setError("This post has already been shared");
        toast?.error("Post already shared");
      } else if (err.response?.status === 401) {
        setError("Please login to share posts");
        toast?.error("Authentication required");
      } else {
        setError("Failed to share post. Please try again.");
        toast?.error("Failed to share post");
      }
    } finally {
      setSharing(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast?.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = postUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      toast?.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  }

  // Don't render if no post
  if (!post) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="sm"
      backdrop="blur"
      hideCloseButton
      classNames={{
        base: "bg-transparent",
        wrapper: "backdrop-blur-xl",
        body: "p-0",
      }}
    >
      <ModalContent className="bg-[rgba(18,18,24,0.95)] backdrop-blur-[20px] border border-white/10 rounded-2xl shadow-2xl max-w-[440px] mx-auto overflow-hidden relative">
        {(onClose) => (
          <>
            {/* Top bar */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-lg">
                  <RiShareForwardFill />
                </div>
                <div>
                  <div className="text-base font-semibold text-white">Share Post</div>
                  <div className="text-xs text-slate-400">Spread the word</div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <RiCloseLine />
              </button>
            </div>

            {/* Post preview */}
            <div className="p-4 border-b border-white/10">
              <div className="flex gap-3">
                <Avatar
                  src={post?.user?.photo || post?.creator?.photo}
                  name={post?.user?.name || post?.creator?.name}
                  className="w-9 h-9 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white mb-1">
                    {post?.user?.name || post?.creator?.name || "User"}
                  </div>
                  <div className="text-sm text-slate-300 line-clamp-2">
                    {post?.content || "No content preview available."}
                  </div>
                </div>
              </div>
            </div>

            {/* Error message if any */}
            {error && (
              <div className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-white/5 mx-4 mt-4 rounded-lg">
              {[
                { id: "feed", label: "Feed" },
                { id: "external", label: "Platforms" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 relative py-2 px-3 text-sm font-medium rounded-md transition-all ${
                    tab === t.id 
                      ? "text-white bg-indigo-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab === t.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full" />
                  )}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="p-4">
              <AnimatePresence mode="wait">
                {/* Feed tab */}
                {tab === "feed" && (
                  <motion.div
                    key="feed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4"
                  >
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Say something about this post… (optional)"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                    />
                    
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <RiEarthLine />
                      <span>Visible to all your followers</span>
                    </div>

                    <motion.button
                      onClick={handleShareToFeed}
                      disabled={sharing || shared}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sharing ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sharing…</span>
                        </>
                      ) : (
                        <>
                          <RiSendPlaneFill className="text-sm" />
                          <span>Share to Feed</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {/* External tab */}
                {tab === "external" && (
                  <motion.div
                    key="external"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {SOCIALS.map((s) => (
                        <motion.a
                          key={s.id}
                          href={s.getUrl(postUrl, postText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.93 }}
                          onMouseEnter={() => setHoveredSocial(s.id)}
                          onMouseLeave={() => setHoveredSocial(null)}
                          className="flex items-center gap-3 p-3 rounded-xl border transition-all"
                          style={{
                            borderColor: hoveredSocial === s.id
                              ? `${s.bg}55`
                              : "rgba(255,255,255,0.06)",
                            background: hoveredSocial === s.id
                              ? `${s.bg}18`
                              : "rgba(255,255,255,0.03)",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                            style={{
                              background: s.bg,
                              boxShadow: hoveredSocial === s.id
                                ? `0 6px 20px ${s.glow}`
                                : "none",
                            }}
                          >
                            <s.Icon />
                          </div>
                          <span className="text-sm text-slate-300">{s.label}</span>
                        </motion.a>
                      ))}
                    </div>

                    {/* Copy link */}
                    <div className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
                      <RiLinkM className="text-slate-400 flex-shrink-0" />
                      <span className="flex-1 text-xs text-slate-300 truncate">
                        {postUrl}
                      </span>
                      <motion.button
                        onClick={handleCopy}
                        whileTap={{ scale: 0.93 }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          copied 
                            ? "bg-emerald-500/20 text-emerald-400" 
                            : "bg-white/10 text-slate-300 hover:bg-white/20"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-1"
                            >
                              <RiCheckLine /> Copied!
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              Copy link
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
              {shared && (
  <motion.div
    className="absolute inset-0 bg-[rgba(18,18,24,0.98)] backdrop-blur-sm flex flex-col items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Confetti particles */}
    {[...Array(12)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: ["#6366f1","#34d399","#f59e0b","#ec4899","#60a5fa"][i % 5],
          left: `${30 + Math.random() * 40}%`,
          top: `${20 + Math.random() * 30}%`,
        }}
        initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
        animate={{
          opacity: 0,
          scale: [0, 1.5, 0],
          x: (Math.random() - 0.5) * 120,
          y: -(40 + Math.random() * 80),
        }}
        transition={{ 
          duration: 1.2, 
          delay: i * 0.06,
          ease: "easeOut"
        }}
      />
    ))}

    <motion.div
      className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-3xl mb-4"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
    >
      <RiCheckLine />
    </motion.div>
    
    <motion.div
      className="text-xl font-semibold text-white mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Shared successfully!
    </motion.div>
    
    <motion.div
      className="text-sm text-slate-400 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45 }}
    >
      Your followers will see this post
    </motion.div>

    {/* Add link to shared feed */}
    <motion.a
      href="/shared-feed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/15 transition-colors"
    >
      View in Shared Feed →
    </motion.a>
  </motion.div>
)}
            </AnimatePresence>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}