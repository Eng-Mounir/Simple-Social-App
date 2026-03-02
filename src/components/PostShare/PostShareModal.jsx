import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  Avatar,
  Textarea,
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

const SOCIALS = [
  {
    id: "x",
    label: "X (Twitter)",
    Icon: RiTwitterXFill,
    bg: "#000000",
    glow: "rgba(0,0,0,0.6)",
    getUrl: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text.slice(0, 100))}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    Icon: RiWhatsappFill,
    bg: "#25D366",
    glow: "rgba(37,211,102,0.45)",
    getUrl: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(text.slice(0, 80) + " " + url)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    Icon: RiFacebookBoxFill,
    bg: "#1877F2",
    glow: "rgba(24,119,242,0.45)",
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    Icon: RiTelegramFill,
    bg: "#229ED9",
    glow: "rgba(34,158,217,0.45)",
    getUrl: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text.slice(0, 80))}`,
  },
];

export default function ShareModal({ isOpen, onOpenChange, post, onShareSuccess }) {
  const [tab, setTab] = useState("feed");
  const [note, setNote] = useState("");
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

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
      }, 300);
    }
  }, [isOpen]);

  async function handleShareToFeed() {
    if (sharing || shared) return;
    try {
      setSharing(true);
      await sharePost(post._id);
      setShared(true);
      onShareSuccess?.();
      setTimeout(() => onOpenChange(false), 2200);
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setSharing(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(postUrl);
    } catch {
      const el = document.createElement("input");
      el.value = postUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        backdrop="blur"
        hideCloseButton
        classNames={{
          base: "bg-transparent sm-overlay",
          wrapper: "backdrop-blur-xl",
        }}
      >
        <ModalContent className="sm-card">
          {(onClose) => (
            <>
              {/* Top bar */}
              <div className="sm-topbar">
                <div className="sm-topbar-left">
                  <div className="sm-icon-badge">
                    <RiShareForwardFill />
                  </div>
                  <div>
                    <div className="sm-title">Share Post</div>
                    <div className="sm-sub">Spread the word</div>
                  </div>
                </div>
                <button className="sm-close" onClick={onClose}>
                  <RiCloseLine />
                </button>
              </div>

              {/* Post preview */}
              <div className="sm-preview">
                <Avatar
                  src={post?.user?.photo || post?.creator?.photo}
                  name={post?.user?.name || post?.creator?.name}
                  className="w-9 h-9 flex-shrink-0"
                />
                <div className="sm-preview-text">
                  <div className="sm-preview-name">
                    {post?.user?.name || post?.creator?.name || "User"}
                  </div>
                  <div className="sm-preview-content">
                    {post?.content || "No content preview available."}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="sm-tabs">
                {[
                  { id: "feed", label: "Feed" },
                  { id: "external", label: "Platforms" },
                ].map((t) => (
                  <button
                    key={t.id}
                    className={`sm-tab ${tab === t.id ? "active" : ""}`}
                    onClick={() => setTab(t.id)}
                  >
                    {tab === t.id && <span className="sm-tab-dot" />}
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Body */}
              <div className="sm-body">
                <AnimatePresence mode="wait">

                  {/* ── Feed tab ── */}
                  {tab === "feed" && (
                    <motion.div
                      key="feed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                    >
                      <textarea
                        className="sm-textarea"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Say something about this post… (optional)"
                        rows={3}
                      />
                      <div className="sm-hint">
                        <RiEarthLine />
                        Visible to all your followers
                      </div>

                      <motion.button
                        className="sm-share-btn"
                        onClick={handleShareToFeed}
                        disabled={sharing}
                        whileTap={{ scale: 0.97 }}
                      >
                        {sharing ? (
                          <span className="sm-spinner" />
                        ) : (
                          <RiSendPlaneFill style={{ fontSize: 15 }} />
                        )}
                        {sharing ? "Sharing…" : "Share to Feed"}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ── External tab ── */}
                  {tab === "external" && (
                    <motion.div
                      key="external"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="sm-socials">
                        {SOCIALS.map((s) => (
                          <motion.a
                            key={s.id}
                            className="sm-social-btn"
                            href={s.getUrl(postUrl, postText)}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.93 }}
                            onMouseEnter={() => setHoveredSocial(s.id)}
                            onMouseLeave={() => setHoveredSocial(null)}
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
                              className="sm-social-icon"
                              style={{
                                background: s.bg,
                                boxShadow: hoveredSocial === s.id
                                  ? `0 6px 20px ${s.glow}`
                                  : "none",
                              }}
                            >
                              <s.Icon />
                            </div>
                            <span className="sm-social-label">{s.label}</span>
                          </motion.a>
                        ))}
                      </div>

                      {/* Copy link */}
                      <div className="sm-copy-row">
                        <RiLinkM className="sm-copy-icon" />
                        <span className="sm-copy-url">{postUrl}</span>
                        <motion.button
                          className={`sm-copy-btn ${copied ? "copied" : ""}`}
                          onClick={handleCopy}
                          whileTap={{ scale: 0.93 }}
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.span
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                style={{ display: "flex", alignItems: "center", gap: 4 }}
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

              {/* ── Success Overlay ── */}
              <AnimatePresence>
                {shared && (
                  <motion.div
                    className="sm-success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Confetti */}
                    {[...Array(12)].map((_, i) => (
                      <span
                        key={i}
                        className="sm-confetti"
                        style={{
                          background: ["#6366f1","#34d399","#f59e0b","#ec4899","#60a5fa"][i % 5],
                          left: `${30 + Math.random() * 40}%`,
                          top: `${20 + Math.random() * 30}%`,
                          "--tx": `${(Math.random() - 0.5) * 120}px`,
                          "--ty": `${-(40 + Math.random() * 80)}px`,
                          animationDelay: `${i * 0.06}s`,
                        }}
                      />
                    ))}

                    <motion.div
                      className="sm-success-ring"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    >
                      <RiCheckLine />
                    </motion.div>
                    <motion.div
                      className="sm-success-title"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Shared successfully!
                    </motion.div>
                    <motion.div
                      className="sm-success-sub"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                    >
                      Your followers will see this post
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}