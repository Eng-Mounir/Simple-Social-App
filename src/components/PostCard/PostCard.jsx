import React from "react";
import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
  AiOutlineGlobal,
  AiOutlineEllipsis,
} from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import defaultImage from "../../assets/images/defaultImage.jpg";
export default function PostCard({ post }) {
  if (!post) return null; // Defensive: in case post is undefined

  const { user, topComment, createdAt, body, image, likesCount, sharesCount, commentsCount, privacy } = post;

  return (
    <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm mb-4">
      
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.photo || defaultImage}
            alt={user?.name || "Unknown User"}
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground hover:underline">
              {user?.name || "Unknown User"}
            </p>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>@{user?.username || "unknown"}</span>
              <span>·</span>
              <span>{createdAt ? new Date(createdAt).toLocaleTimeString() : "Unknown time"}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <AiOutlineGlobal size={12} />
                {privacy || "Public"}
              </span>
            </div>
          </div>

          <button className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
            <AiOutlineEllipsis size={18} />
          </button>
        </div>

        {/* Post Body */}
        <div className="mt-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {body}
          </p>

          {image && (
            <img
              src={image || defaultImage}
              alt="post"
              className="mt-2 w-full max-h-[400px] object-cover rounded-md"
            />
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <AiOutlineLike size={12} />
            </span>
            <span className="font-semibold">{likesCount || 0} likes</span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <BiRepost size={14} />
              {sharesCount || 0} shares
            </span>

            <span>{commentsCount || 0} comments</span>

            <button className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
              View details
            </button>
          </div>
        </div>
      </div>

      <div className="mx-4 border-t border-slate-200"></div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-1 p-1">
        <button className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <AiOutlineLike size={18} />
          Like
        </button>

        <button className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <AiOutlineMessage size={18} />
          Comment
        </button>

        <button className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <AiOutlineShareAlt size={18} />
          Share
        </button>
      </div>

      {/* Top Comment */}
      {topComment && (
        <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Top Comment
          </p>

          <div className="flex items-start gap-2">
            <img
              src={topComment.commentCreator?.photo || "https://via.placeholder.com/150"}
              alt={topComment.commentCreator?.name || "Unknown"}
              className="h-8 w-8 rounded-full object-cover"
            />

            <div className="flex-1 rounded-2xl bg-white px-3 py-2">
              <p className="truncate text-xs font-bold text-slate-900">
                {topComment.commentCreator?.name || "Unknown"}
              </p>

              <p className="mt-0.5 text-sm text-slate-700">
                {topComment.content || ""}
              </p>
            </div>
          </div>

          <button className="mt-2 text-xs font-bold text-[#1877f2] hover:underline">
            View all comments
          </button>
        </div>
      )}
    </article>
  );
}