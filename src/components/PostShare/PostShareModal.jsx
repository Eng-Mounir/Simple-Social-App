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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .sm-overlay {
          font-family: 'Outfit', sans-serif !important;
        }

        .sm-card {
          width: 100%;
          max-width: 420px;
          background: #0d0d12;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 40px 80px rgba(0,0,0,0.8),
            0 0 60px rgba(99,102,241,0.06);
          font-family: 'Outfit', sans-serif;
          position: relative;
        }

        /* ambient top glow */
        .sm-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(129,140,248,0.5) 30%,
            rgba(167,139,250,0.7) 50%,
            rgba(129,140,248,0.5) 70%,
            transparent 100%
          );
        }

        /* ── Top bar ── */
        .sm-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 22px 16px;
        }
        .sm-topbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sm-icon-badge {
          width: 36px; height: 36px;
          border-radius: 11px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          color: #fff;
          box-shadow: 0 4px 14px rgba(99,102,241,0.4);
          flex-shrink: 0;
        }
        .sm-title {
          font-size: 15px;
          font-weight: 600;
          color: #f1f5f9;
          letter-spacing: -0.01em;
        }
        .sm-sub {
          font-size: 11.5px;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          margin-top: 1px;
        }
        .sm-close {
          width: 32px; height: 32px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.35);
          font-size: 15px;
          transition: all 0.15s;
        }
        .sm-close:hover {
          background: rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.7);
        }

        /* ── Post preview ── */
        .sm-preview {
          margin: 0 16px 16px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .sm-preview-text {
          flex: 1;
          min-width: 0;
        }
        .sm-preview-name {
          font-size: 13px;
          font-weight: 600;
          color: #e2e8f0;
          margin-bottom: 3px;
        }
        .sm-preview-content {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 300;
        }

        /* ── Tabs ── */
        .sm-tabs {
          display: flex;
          margin: 0 16px 16px;
          background: rgba(255,255,255,0.04);
          border-radius: 12px;
          padding: 4px;
          gap: 2px;
        }
        .sm-tab {
          flex: 1;
          padding: 8px 12px;
          border-radius: 9px;
          border: none;
          background: transparent;
          font-family: 'Outfit', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          color: rgba(255,255,255,0.35);
          transition: all 0.2s;
          position: relative;
        }
        .sm-tab.active {
          background: rgba(99,102,241,0.2);
          color: #a5b4fc;
          border: 1px solid rgba(99,102,241,0.25);
        }
        .sm-tab:not(.active):hover {
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.04);
        }
        .sm-tab-dot {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #6366f1;
          margin-right: 5px;
          vertical-align: middle;
          box-shadow: 0 0 6px rgba(99,102,241,0.8);
        }

        /* ── Tab content ── */
        .sm-body {
          padding: 0 16px 20px;
        }

        /* Feed tab */
        .sm-textarea {
          width: 100%;
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 14px !important;
          color: #e2e8f0 !important;
          font-family: 'Outfit', sans-serif !important;
          font-size: 13.5px !important;
          font-weight: 400 !important;
          resize: none;
          padding: 12px 14px !important;
          outline: none !important;
          transition: border-color 0.2s, background 0.2s;
          min-height: 90px;
        }
        .sm-textarea:focus {
          border-color: rgba(99,102,241,0.45) !important;
          background: rgba(99,102,241,0.05) !important;
        }
        .sm-textarea::placeholder { color: rgba(255,255,255,0.2) !important; }

        .sm-hint {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Share button */
        .sm-share-btn {
          width: 100%;
          margin-top: 14px;
          padding: 13px;
          border-radius: 14px;
          border: none;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
          color: #fff;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          transition: all 0.2s;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }
        .sm-share-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .sm-share-btn:hover:not(:disabled)::before { opacity: 1; }
        .sm-share-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.5);
        }
        .sm-share-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .sm-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: sm-spin 0.7s linear infinite;
        }
        @keyframes sm-spin { to { transform: rotate(360deg); } }

        /* Socials grid */
        .sm-socials {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        .sm-social-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          padding: 14px 8px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.22s;
          text-decoration: none;
          color: inherit;
        }
        .sm-social-btn:hover {
          transform: translateY(-3px);
        }
        .sm-social-icon {
          width: 38px; height: 38px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          color: #fff;
          transition: box-shadow 0.22s;
          flex-shrink: 0;
        }
        .sm-social-label {
          font-size: 10.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-align: center;
          line-height: 1.2;
        }

        /* Copy link */
        .sm-copy-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
        }
        .sm-copy-icon {
          color: rgba(255,255,255,0.3);
          font-size: 15px;
          flex-shrink: 0;
        }
        .sm-copy-url {
          flex: 1;
          font-size: 11.5px;
          color: rgba(255,255,255,0.3);
          font-family: 'SF Mono', 'Fira Code', monospace;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sm-copy-btn {
          flex-shrink: 0;
          padding: 6px 14px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          display: flex; align-items: center; gap: 5px;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .sm-copy-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .sm-copy-btn.copied {
          border-color: rgba(52,211,153,0.35);
          background: rgba(52,211,153,0.1);
          color: #34d399;
        }

        /* ── Success overlay ── */
        .sm-success {
          position: absolute;
          inset: 0;
          background: rgba(13,13,18,0.96);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border-radius: 24px;
          z-index: 20;
          backdrop-filter: blur(8px);
        }
        .sm-success-ring {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #34d399);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          color: #fff;
          box-shadow: 0 0 0 12px rgba(99,102,241,0.1), 0 0 40px rgba(99,102,241,0.3);
        }
        .sm-success-title {
          font-size: 17px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: -0.01em;
        }
        .sm-success-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
        }

        /* confetti dots */
        .sm-confetti {
          position: absolute;
          width: 6px; height: 6px;
          border-radius: 50%;
          animation: sm-float 1.5s ease-out forwards;
        }
        @keyframes sm-float {
          0%   { opacity: 1; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.3); }
        }
      `}</style>

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