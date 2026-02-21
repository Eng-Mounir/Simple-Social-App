import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import PostCard from "../../components/PostCard/PostCard";
import Footer from "../../components/Footer/Footer";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { getAllPosts } from "../../services/PostsServices";
import Skeleton from "../../components/Skeleton/Skeleton";
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
    <main className="min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1">
            <SideBar />
          </div>

          <div className="col-span-2">
            {loading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  postCreateName={post.user?.name || "Unknown User"}
                  post={post}
                />
              ))
            )}
          </div>

          <div className="col-span-1">
            <RightSideBar />
          </div>
        </div>
      </div>
    </main>
  );
}