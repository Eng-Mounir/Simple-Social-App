import React from 'react'
import {
  AiOutlineGlobal,
  AiOutlineEllipsis,
} from "react-icons/ai";
import defaultImage from "../../assets/images/defaultImage.jpg";
export default function CardHeader({post}) {
    const { user, createdAt, privacy } = post || {};
  return (<>
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
    </>
  )     
}   
