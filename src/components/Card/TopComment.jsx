import React from 'react'
export default function TopComment({post}) {
    const { topComment } = post || {};
  return (
    <>
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
    </>
  )
}
