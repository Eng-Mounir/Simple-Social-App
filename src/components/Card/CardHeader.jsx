import React from 'react';
import { Avatar, Button, Dropdown } from "@heroui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaGlobe, FaLock, FaUsers } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';

export default function CardHeader({ post }) {
  const { user, createdAt, privacy } = post || {};

  const privacyIcons = {
    public: FaGlobe,
    friends: FaUsers,
    private: FaLock
  };

  const PrivacyIcon = privacyIcons[privacy] || FaGlobe;

  return (
    <div className="flex items-start gap-3">
      <Avatar 
        src={user?.photo} 
        className="w-12 h-12 ring-2 ring-blue-100 dark:ring-blue-900"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold hover:underline cursor-pointer">
            {user?.name || "Unknown User"}
          </p>
          <span className="text-xs text-slate-500">@{user?.username || "unknown"}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
          <span>{createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : "Unknown time"}</span>
          <span>·</span>
          <div className="flex items-center gap-1">
            <PrivacyIcon className="w-3 h-3" />
            <span className="capitalize">{privacy || "public"}</span>
          </div>
        </div>
      </div>

      <Dropdown>
        <Button
          isIconOnly
          variant="light"
          className="rounded-full"
        >
          <HiDotsHorizontal className="w-5 h-5" />
        </Button>
        <Dropdown.Menu>
          <Dropdown.Item>Save post</Dropdown.Item>
          <Dropdown.Item>Hide post</Dropdown.Item>
          <Dropdown.Item className="text-red-500">Report</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}