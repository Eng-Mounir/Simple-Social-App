import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import PostCard from "../../components/PostCard/PostCard";
import Footer from "../../components/Footer/Footer";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { getAllPosts } from "../../services/PostsServices";
export default function NewFeed() {
  const [posts, setPosts] = useState([]);

useEffect(() => {
    async function fetchPosts() {
      try {
        const postsData = await getAllPosts(); // now this is the array directly
        setPosts(postsData);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
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
 {posts && posts.map((post) => (
            <PostCard postCreateName={post.user?.name || "Unknown User"}  key={post._id} post={post} />
          ))}
</div>

          <div className="col-span-1">
            <RightSideBar />
          </div>
        </div>
      </div>
    </main>
  );
}
