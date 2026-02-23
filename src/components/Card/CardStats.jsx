import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import defaultImage from "../../assets/images/defaultImage.jpg";
import PostDetails from '../PostDetails/PostDetails';
export default function CardStats({post, showDetails = true, isOpen: isOpenProp, onOpen: onOpenProp, onOpenChange: onOpenChangeProp}) {
    const { likesCount, sharesCount, commentsCount} = post || {};
      const [internalOpen, setInternalOpen] = React.useState(false);
      const isControlled = typeof isOpenProp !== "undefined";
      const isOpen = isControlled ? isOpenProp : internalOpen;
      const onOpen = onOpenProp || (() => setInternalOpen(true));
      const onOpenChange = onOpenChangeProp || ((open) => setInternalOpen(!!open));

  return (
    <>
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

            {showDetails && (
              <>
                <button onClick={onOpen} className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                  View details
                </button>
                <PostDetails isOpen={isOpen} onOpenChange={onOpenChange} postId={post?._id} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
