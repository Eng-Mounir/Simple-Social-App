import React from "react";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardStats from "../Card/CardStats";
import CardActions from "../Card/CardActions";
import TopComment from "../Card/TopComment";
export default function PostCard({ post }) {
  if (!post) return null; // Defensive: in case post is undefined

  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open) => setIsOpen(!!open);

  return (
    <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm mb-4">
      <div className="p-4">
      {/* Header */}
      <CardHeader post={post} />
        {/* Post Body */}
        <CardBody post={post} />
      </div>

      {/* Stats */}
      <CardStats post={post} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />

      <div className="mx-4 border-t border-slate-200"></div>

      {/* Actions */}
      <CardActions post={post} onOpen={onOpen} />

      {/* Top Comment */}
      <TopComment post={post} />
    </article>
  );
}