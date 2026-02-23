import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Card,
  Skeleton,
} from "@heroui/react";

import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardActions from "../Card/CardActions";

import {
  getPostDetails,
  getPostComments,
} from "../../services/PostsServices";

export default function PostDetails({
  isOpen,
  onOpenChange,
  postId,
}) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !postId) return;

    async function fetchPost() {
      try {
        setLoading(true);

        // 1️⃣ Fetch post details
        const postData = await getPostDetails(postId);

        // 2️⃣ Fetch all comments
        const commentsData = await getPostComments(postId);

        // 3️⃣ Merge post + comments
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

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      size="2xl"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="border-b text-lg font-semibold">
              Post Details
            </ModalHeader>

            <ModalBody className="bg-gray-50 p-0">

              {/* 🔥 Loading Skeleton */}
              {loading && (
                <Card className="m-6 p-6 space-y-4">
                  <Skeleton className="h-4 w-1/3 rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-4 w-1/4 rounded-lg" />
                </Card>
              )}

              {/* 🔥 Full Post */}
              {!loading && post && (
                <div className="p-6 space-y-6">

                  {/* Post Card */}
                  <Card className="shadow-lg rounded-2xl border">

                    <div className="px-6 pt-6">
                      <CardHeader post={post} />
                    </div>

                    <Divider className="my-4" />

                    <div className="px-6">
                      <CardBody post={post} />
                    </div>

                    <Divider className="my-4" />

                    <div className="px-6 pb-4">
                      <CardActions post={post} />
                    </div>

                  </Card>

                  {/* 🔥 Comments Section */}
                  <Card className="shadow-md rounded-2xl border p-6">
                    <h3 className="font-semibold mb-4">
                      All Comments ({post.comments?.length || 0})
                    </h3>

                    {/* No Comments */}
                    {post.comments?.length === 0 && (
                      <p className="text-gray-500 text-sm">
                        No comments yet
                      </p>
                    )}

                    {/* Comments List */}
                    <div className="space-y-4">
                      {post.comments?.map((comment) => (
                        <div
                          key={comment._id}
                          className="p-3 bg-gray-100 rounded-xl"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <img
                              src={comment.commentCreator?.photo}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-semibold text-sm">
                                {comment.commentCreator?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                @{comment.commentCreator?.username}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>

                  </Card>

                </div>
              )}

            </ModalBody>

            <ModalFooter className="border-t">
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}