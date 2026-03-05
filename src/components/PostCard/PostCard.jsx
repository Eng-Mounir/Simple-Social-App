import React from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardStats from "../Card/CardStats";
import CardActions from "../Card/CardActions";
import TopComment from "../Card/TopComment";

// Add these console logs
console.log('CardHeader import:', CardHeader);
console.log('CardBody import:', CardBody);
console.log('CardStats import:', CardStats);
console.log('CardActions import:', CardActions);
console.log('TopComment import:', TopComment);

export default function PostCard({ post }) {
  if (!post) return null;

  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open) => setIsOpen(!!open);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 overflow-hidden hover:shadow-xl transition-shadow">
        
        {/* Header */}
        <div className="p-4 pb-2">
          <CardHeader post={post} />
        </div>

        {/* Body */}
        <CardBody post={post} />

        {/* Stats */}
        <CardStats 
          post={post} 
          isOpen={isOpen} 
          onOpen={onOpen} 
          onOpenChange={onOpenChange} 
        />

        <div className="mx-4 border-t border-slate-200 dark:border-slate-800"></div>

        {/* Actions */}
        <CardActions post={post} onOpen={onOpen} />

        {/* Top Comment */}
        <TopComment post={post} />
      </Card>
    </motion.div>
  );
}