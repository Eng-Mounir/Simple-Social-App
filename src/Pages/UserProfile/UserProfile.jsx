import React, { useEffect, useState } from "react";
import { Avatar } from "@heroui/react";
import { FaEdit, FaLock, FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { BsGrid3X3, BsPeopleFill, BsPersonPlusFill } from "react-icons/bs";
import PostCard from "../../components/PostCard/PostCard";
import { getProfileData } from "../../services/authServices";
import { getUserPosts } from "../../services/UserServices";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { uploadProfileImage } from "../../services/UserServices";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast } from 'react-toastify';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const { userData, isLoading } = useContext(UserContext);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showChangePwd, setShowChangePwd] = useState(false);

  // Set user from context
  useEffect(() => {
    if (userData?.user) {
      setUser({ 
        id: userData.user._id || userData.user.id,
        name: userData.user.name || userData.user.fullName || userData.user.username || "User",
        username: userData.user.username || userData.user.userName || "username",
        photo: userData.user.photo || userData.user.avatar || null,
        bio: userData.user.bio || "",
      });
      
      fetchUserPosts(userData.user._id || userData.user.id);
    }
  }, [userData]);

  async function fetchUserPosts(userId) {
    if (!userId) return;
    
    try {
      setPostsLoading(true);
      const userPosts = await getUserPosts(userId);
      setPosts(userPosts);
    } catch (err) {
      console.error("Failed to load user posts:", err);
      toast.error("Failed to load your posts");
    } finally {
      setPostsLoading(false);
    }
  }

  async function handleUploadImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      const localPreview = URL.createObjectURL(file);
      setPhotoPreview(localPreview);
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("photo", file);

      try {
        const updatedUser = await toast.promise(
          uploadProfileImage(formData),
          {
            pending: "Uploading photo...",
            success: "Profile photo updated 🎉",
            error: "Upload failed. Please try again.",
          }
        );
        
        const newPhoto = updatedUser?.photo ?? updatedUser?.profileImage ?? localPreview;
        setPhotoPreview(newPhoto);
        setUser((prev) => ({ ...prev, photo: newPhoto }));
      } catch (err) {
        setPhotoPreview(null);
        console.error("Upload error:", err);
      } finally {
        setUploadingImage(false);
      }
    };

    input.click();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 font-['Outfit']">
      {/* Banner */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(255,255,255,0.3)_0%,transparent_60%)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 40px)
            `
          }} />
        </div>
        <span className="absolute bottom-4 left-6 text-xs font-medium tracking-[0.2em] uppercase text-white/40">
          Profile
        </span>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6">
        {/* Identity Section */}
        <div className="flex items-end justify-between -mt-14 mb-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-indigo-500 via-pink-500 to-amber-500 shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100 border-4 border-stone-100">
                <Avatar
                  src={photoPreview || user?.photo || userData?.user?.photo}
                  name={userData?.user?.name}
                  className="w-full h-full"
                  style={{ opacity: uploadingImage ? 0.5 : 1 }}
                />
                {uploadingImage && (
                  <div className="absolute inset-0 rounded-full bg-black/35 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full border-3 border-white/30 border-t-white animate-spin" />
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleUploadImage}
              disabled={uploadingImage}
              className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-stone-900 border-2 border-stone-100 flex items-center justify-center text-white/70 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Change profile photo"
            >
              <FaCamera className="text-xs" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pb-1">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg border border-stone-200 text-stone-700 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 shadow-sm transition-all">
              <FaEdit className="text-xs" />
              Edit Profile
            </button>
            <button
              onClick={() => setShowChangePwd(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg border border-stone-200 text-stone-700 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 shadow-sm transition-all"
            >
              <FaLock className="text-xs" />
              Password
            </button>
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mb-8 animate-[fadeIn_0.5s_ease-out_0.1s_both]">
          <h1 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-stone-900 leading-tight mb-1">
            {userData?.user?.name || "User Name"}
          </h1>
          <p className="text-sm text-indigo-600 font-normal mb-3 tracking-wide">
            {userData?.user?.email || "username"}
          </p>
          <p className="text-base text-stone-600 leading-relaxed max-w-md font-light">
            {userData?.user?.bio || "This user has no bio yet."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4 mb-10 pb-8 border-b border-stone-200 animate-[fadeIn_0.5s_ease-out_0.2s_both]">
          {[
            { icon: <BsGrid3X3 />, value: posts.length, label: "Posts" },
            { icon: <BsPeopleFill />, value: 0, label: "Followers" },
            { icon: <BsPersonPlusFill />, value: 0, label: "Following" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex-1 bg-white rounded-2xl p-5 flex flex-col items-center gap-2 border border-stone-200 cursor-pointer relative overflow-hidden group hover:border-indigo-300 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm text-indigo-600 relative z-10">{stat.icon}</span>
              <span className="font-['Cormorant_Garamond'] text-3xl font-semibold text-stone-900 leading-none relative z-10">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium relative z-10">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Posts Section */}
        <div className="mb-5 animate-[fadeIn_0.5s_ease-out_0.3s_both]">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-medium text-stone-900 italic">
              Posts
            </h2>
            {!postsLoading && (
              <span className="text-xs font-medium uppercase tracking-wider text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                {posts.length} total
              </span>
            )}
          </div>

          {/* Loading State */}
          {postsLoading && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full border-2 border-stone-200 border-t-indigo-600 animate-spin" />
            </div>
          )}

          {/* Empty State */}
          {!postsLoading && posts.length === 0 && (
            <div className="flex flex-col items-center py-16 gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-stone-400 text-3xl">
                <HiOutlinePhotograph />
              </div>
              <p className="font-['Cormorant_Garamond'] text-xl text-stone-800">
                No posts yet
              </p>
              <p className="text-sm text-stone-400 font-light">
                Share your first post to get started.
              </p>
            </div>
          )}

          {/* Posts List */}
          {!postsLoading && posts.length > 0 && (
            <div className="flex flex-col gap-4 pb-16 animate-[fadeIn_0.5s_ease-out_0.35s_both]">
              {posts.map((post) => (
                <PostCard key={post._id || post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePwd}
        onOpenChange={setShowChangePwd}
      />
    </div>
  );
}