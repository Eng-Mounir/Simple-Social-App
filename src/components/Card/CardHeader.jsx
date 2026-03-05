import React from 'react';
import { 
  Avatar, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from "@heroui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaGlobe, FaLock, FaUsers } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';

export default function CardHeader({ post }) {
  // Early return if post is undefined
  if (!post) {
    return null;
  }

  const { user, createdAt, privacy } = post;
  
  // Handle missing user
  if (!user) {
    return (
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12" />
        <div className="flex-1">
          <p className="font-semibold">Unknown User</p>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold hover:underline cursor-pointer">
            {user?.name || "Unknown User"}
          </p>
          <span className="text-xs text-slate-500">
            @{user?.username || "unknown"}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
          <span>
            {createdAt 
              ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) 
              : "Unknown time"}
          </span>
          <span>·</span>
          <div className="flex items-center gap-1">
            <PrivacyIcon className="w-3 h-3" />
            <span className="capitalize">{privacy || "public"}</span>
          </div>
        </div>
      </div>

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            isIconOnly
            variant="light"
            className="rounded-full"
          >
            <HiDotsHorizontal className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Post actions">
          <DropdownItem key="save">Save post</DropdownItem>
          <DropdownItem key="hide">Hide post</DropdownItem>
          <DropdownItem key="report" className="text-red-500">Report</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}