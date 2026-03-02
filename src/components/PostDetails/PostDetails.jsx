import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Divider,
  Card,
  Skeleton,
  Chip,
  Textarea,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AiOutlineLike, 
  AiFillLike, 
  AiOutlineMessage, 
  AiOutlineShareAlt,
  AiOutlineHeart,
  AiFillHeart
} from "react-icons/ai";
import { 
  FaRegCommentDots, 
  FaReply, 
  FaEllipsisH,
  FaPaperPlane,
  FaRegSmile,
  FaImage,
  FaGift
} from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsEmojiSmile, BsCalendar2Heart } from "react-icons/bs";

import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardActions from "../Card/CardActions";
import {
  getPostDetails,
  getPostComments,
} from "../../services/PostsServices";
import { createComment } from "../../services/PostsServices";

export default function PostDetails({
  isOpen,
  onOpenChange,
  postId,
}) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [activeTab, setActiveTab] = useState("comments"); // comments, reactions, shares
  
  const commentsEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !postId) return;

    async function fetchPost() {
      try {
        setLoading(true);
        
        const [postData, commentsData] = await Promise.all([
          getPostDetails(postId),
          getPostComments(postId)
        ]);

        setPost({
          ...postData,
          comments: commentsData || [],
        });

      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [isOpen, postId]);

  const scrollToComments = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Like functionality is now UI-only - you can implement actual API calls later
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
    // When you have the API endpoints, uncomment this:
    // try {
    //   if (liked) {
    //     await yourUnlikeFunction(postId);
    //   } else {
    //     await yourLikeFunction(postId);
    //   }
    // } catch (err) {
    //   console.error("Failed to toggle like:", err);
    // }
  };

  // Demo data for reactions tab - remove if not needed
  const reactions = [
    { emoji: "👍", label: "Like", count: post?.likesCount || 0, active: liked, color: "blue" },
    { emoji: "❤️", label: "Love", count: 24, active: false, color: "red" },
    { emoji: "😂", label: "Haha", count: 12, active: false, color: "yellow" },
    { emoji: "😮", label: "Wow", count: 8, active: false, color: "purple" },
    { emoji: "😢", label: "Sad", count: 3, active: false, color: "blue" },
    { emoji: "😡", label: "Angry", count: 1, active: false, color: "red" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      size="3xl"
      backdrop="blur"
      classNames={{
        base: "bg-transparent",
        wrapper: "backdrop-blur-md",
        closeButton: "hover:bg-slate-100 dark:hover:bg-slate-800",
      }}
    >
      <ModalContent className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaRegCommentDots className="w-5 h-5 text-blue-500" />
                </motion.div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Post Details
                </h2>
              </div>
              <Chip 
                variant="flat" 
                color="primary" 
                size="sm"
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30"
              >
                {post?.comments?.length || 0} comments
              </Chip>
            </ModalHeader>

            <ModalBody className="p-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">

              {/* Loading State */}
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 space-y-4"
                  >
                    <Card className="border-0 shadow-lg">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-1/3 rounded-lg" />
                            <Skeleton className="h-3 w-1/4 rounded-lg" />
                          </div>
                        </div>
                        <Skeleton className="h-24 w-full rounded-lg" />
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-20 rounded-full" />
                          <Skeleton className="h-8 w-20 rounded-full" />
                          <Skeleton className="h-8 w-20 rounded-full" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Content */}
                {!loading && post && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="divide-y divide-slate-200 dark:divide-slate-800"
                  >

                    {/* Post Card */}
                    <div className="p-6">
                      <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden bg-white dark:bg-slate-900">
                          
                          {/* Header */}
                          <div className="p-6 pb-3">
                            <CardHeader post={post} />
                          </div>

                          {/* Body */}
                          <div className="px-6">
                            <CardBody post={post} />
                          </div>

                          {/* Stats with Reactions */}
                          <div className="px-6 py-4 flex items-center justify-between border-y border-slate-100 dark:border-slate-800 mt-4">
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs border-2 border-white dark:border-slate-900">
                                  👍
                                </div>
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xs border-2 border-white dark:border-slate-900">
                                  ❤️
                                </div>
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white text-xs border-2 border-white dark:border-slate-900">
                                  😂
                                </div>
                              </div>
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                {(post?.likesCount || 0) + 44} reactions
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <button 
                                onClick={scrollToComments}
                                className="hover:text-blue-600 transition-colors"
                              >
                                {post.comments?.length || 0} comments
                              </button>
                              <span>{post.sharesCount || 0} shares</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="px-6 py-2">
                            <div className="grid grid-cols-3 gap-2">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleLike}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                                  liked 
                                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                                    : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                              >
                                {liked ? <AiFillLike className="w-5 h-5" /> : <AiOutlineLike className="w-5 h-5" />}
                                <span>{liked ? 'Liked' : 'Like'}</span>
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={scrollToComments}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                              >
                                <FaRegCommentDots className="w-5 h-5" />
                                <span>Comment</span>
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                              >
                                <AiOutlineShareAlt className="w-5 h-5" />
                                <span>Share</span>
                              </motion.button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Tabs Section */}
                    <div className="px-6 pt-4">
                      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                        {['comments', 'reactions', 'shares'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 px-4 rounded-xl font-medium text-sm capitalize transition-all ${
                              activeTab === tab
                                ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            {tab} {tab === 'comments' && `(${post.comments?.length || 0})`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                      <AnimatePresence mode="wait">
                        {activeTab === 'comments' && (
                          <motion.div
                            key="comments"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                          >
                            {/* Add Comment */}
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 p-4">
                              <div className="flex gap-3">
                                <Avatar 
                                  src="https://i.pravatar.cc/150?img=7" 
                                  className="w-10 h-10 ring-2 ring-blue-100 dark:ring-blue-900"
                                />
                                <div className="flex-1">
                                  <div className="relative">
                                    <Textarea
                                      ref={textareaRef}
                                      value={commentText}
                                      onChange={(e) => setCommentText(e.target.value)}
                                      placeholder="Write a comment..."
                                      minRows={2}
                                      className="w-full"
                                      classNames={{
                                        input: "bg-slate-100 dark:bg-slate-800 border-0 pr-20",
                                      }}
                                    />
                                    <div className="absolute bottom-2 right-2 flex items-center gap-1">
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        className="rounded-full"
                                      >
                                        <BsEmojiSmile className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        className="rounded-full"
                                      >
                                        <FaImage className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end mt-2">
                                    <Button
                                      color="primary"
                                      size="sm"
                                      onPress={async () => {
                                        if (!commentText.trim() || addingComment) return;
                                        try {
                                          setAddingComment(true);
                                          const newComment = await createComment(postId, commentText.trim());
                                          
                                          setPost(prev => ({
                                            ...prev,
                                            comments: prev?.comments
                                              ? [newComment, ...prev.comments]
                                              : [newComment],
                                          }));
                                          
                                          setCommentText("");
                                          setTimeout(scrollToComments, 100);
                                        } catch (err) {
                                          console.error("Failed to add comment:", err);
                                        } finally {
                                          setAddingComment(false);
                                        }
                                      }}
                                      isLoading={addingComment}
                                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                                      startContent={!addingComment && <FaPaperPlane className="w-3 h-3" />}
                                    >
                                      {addingComment ? "Posting..." : "Post"}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>

                            {/* Comments List */}
                            <div className="space-y-4" ref={commentsEndRef}>
                              {post.comments?.length === 0 ? (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-center py-12"
                                >
                                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <FaRegCommentDots className="w-8 h-8 text-slate-400" />
                                  </div>
                                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                                    No comments yet
                                  </p>
                                  <p className="text-sm text-slate-400 mt-1">
                                    Be the first to share your thoughts!
                                  </p>
                                </motion.div>
                              ) : (
                                post.comments?.map((comment, index) => (
                                  <motion.div
                                    key={comment._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                  >
                                    <Card className="border-0 shadow-sm hover:shadow-md transition-all p-4 bg-white dark:bg-slate-900">
                                      <div className="flex gap-3">
                                        <Avatar 
                                          src={comment.commentCreator?.photo}
                                          className="w-10 h-10 ring-2 ring-white dark:ring-slate-800"
                                        />
                                        
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between mb-1">
                                            <div>
                                              <span className="font-semibold text-sm hover:underline cursor-pointer">
                                                {comment.commentCreator?.name}
                                              </span>
                                              <span className="text-xs text-slate-500 ml-2">
                                                @{comment.commentCreator?.username}
                                              </span>
                                            </div>
                                            <Button
                                              isIconOnly
                                              size="sm"
                                              variant="light"
                                              className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                              <HiOutlineDotsHorizontal className="w-4 h-4" />
                                            </Button>
                                          </div>
                                          
                                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                                            {comment.content}
                                          </p>
                                          
                                          <div className="flex items-center gap-4 text-xs">
                                            <button className="font-medium text-slate-500 hover:text-blue-600 transition-colors">
                                              Like
                                            </button>
                                            <button 
                                              onClick={() => setReplyingTo(comment._id)}
                                              className="font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                                            >
                                              <FaReply className="w-3 h-3" />
                                              Reply
                                            </button>
                                            <span className="text-slate-400">
                                              {new Date(comment.createdAt).toLocaleDateString()}
                                            </span>
                                          </div>

                                          {/* Reply Input */}
                                          {replyingTo === comment._id && (
                                            <motion.div
                                              initial={{ opacity: 0, height: 0 }}
                                              animate={{ opacity: 1, height: "auto" }}
                                              exit={{ opacity: 0, height: 0 }}
                                              className="mt-3"
                                            >
                                              <div className="flex gap-2">
                                                <Avatar 
                                                  src="https://i.pravatar.cc/150?img=7"
                                                  className="w-8 h-8"
                                                />
                                                <div className="flex-1 flex gap-2">
                                                  <input
                                                    type="text"
                                                    placeholder="Write a reply..."
                                                    className="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-xl border-0 focus:ring-2 focus:ring-blue-500"
                                                  />
                                                  <Button
                                                    size="sm"
                                                    color="primary"
                                                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                                                  >
                                                    Reply
                                                  </Button>
                                                </div>
                                              </div>
                                            </motion.div>
                                          )}
                                        </div>
                                      </div>
                                    </Card>
                                  </motion.div>
                                ))
                              )}
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'reactions' && (
                          <motion.div
                            key="reactions"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {reactions.map((reaction, index) => (
                                <motion.button
                                  key={reaction.label}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ scale: 1.02 }}
                                  className={`p-4 rounded-xl border-2 transition-all ${
                                    reaction.active 
                                      ? `border-${reaction.color}-500 bg-${reaction.color}-50 dark:bg-${reaction.color}-900/20` 
                                      : 'border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                                  }`}
                                >
                                  <div className="text-3xl mb-2">{reaction.emoji}</div>
                                  <div className="font-medium text-sm">{reaction.label}</div>
                                  <div className="text-xs text-slate-500">{reaction.count} people</div>
                                </motion.button>
                              ))}
                            </div>
                            
                            <Divider className="my-4" />
                            
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm">Recent reactions</h4>
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Avatar src={`https://i.pravatar.cc/150?img=${i}`} className="w-8 h-8" />
                                    <div>
                                      <p className="text-sm font-medium">User Name</p>
                                      <p className="text-xs text-slate-500">2 hours ago</p>
                                    </div>
                                  </div>
                                  <span className="text-2xl">👍</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'shares' && (
                          <motion.div
                            key="shares"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="text-center py-12"
                          >
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <BiRepost className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                              No shares yet
                            </p>
                            <p className="text-sm text-slate-400 mt-1">
                              When someone shares this post, they'll appear here
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ModalBody>

            <ModalFooter className="border-t border-slate-200 dark:border-slate-800 px-6 py-4">
              <Button
                variant="light"
                onPress={onClose}
                className="rounded-xl"
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
              >
                Done
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}