import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import PostCard from "../../components/PostCard/PostCard";
import Footer from "../../components/Footer/Footer";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { getAllPosts } from "../../services/PostsServices";
import Skeleton from "../../components/Skeleton/Skeleton";
import PostDetails from "../../components/PostDetails/PostDetails";
import CreatePost from "../../components/CreatePost/CreatePost";
import { motion, AnimatePresence } from "framer-motion";

export default function NewFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const postsData = await getAllPosts();
        setPosts(postsData);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <SideBar />
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CreatePost />
            </motion.div>
            
            <PostDetails />
            
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="space-y-4">
                  {Array(3).fill(null).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Skeleton />
                    </motion.div>
                  ))}
                </div>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="transition-all duration-300"
                  >
                    <PostCard
                      postCreateName={post.user?.name || "Unknown User"}
                      post={post}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar - Hidden on mobile/tablet */}
          <div className="hidden xl:block xl:col-span-3">
            <div className="sticky top-20">
              <RightSideBar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}