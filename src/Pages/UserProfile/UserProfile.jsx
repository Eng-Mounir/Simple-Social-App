// src/Pages/UserProfile/UserProfile.jsx
import React, { useEffect, useState, useContext } from "react";
import { Avatar, Modal, ModalContent, Spinner } from "@heroui/react";
import { FaEdit, FaLock, FaCamera, FaUserPlus, FaUserCheck, FaSpinner } from "react-icons/fa";
import { HiOutlinePhotograph, HiUserGroup } from "react-icons/hi";
import { BsGrid3X3, BsPeopleFill, BsPersonPlusFill, BsPersonCheckFill } from "react-icons/bs";
import { FiUsers, FiUserX } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { RiLoader4Line } from "react-icons/ri";
import PostCard from "../../components/PostCard/PostCard";
import { 
  getUserPosts, 
  getUserFollowers, 
  getUserFollowing, 
  followUser, 
  unfollowUser,
  getUserById,
  getUsersByIds  // Add this import
} from "../../services/UserServices";
import { UserContext } from "../../context/UserContext";
import { uploadProfileImage } from "../../services/UserServices";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast } from 'react-toastify';
import SideBar from "../../components/SideBar/SideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from "framer-motion";

export default function UserProfile() {
  const { dark } = useTheme();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const { userData, isLoading } = useContext(UserContext);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showChangePwd, setShowChangePwd] = useState(false);
  
  // Followers/Following states
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  
  // Follow action loading states
  const [followLoading, setFollowLoading] = useState({});
  const [unfollowLoading, setUnfollowLoading] = useState({});
  
  // Modal states
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [modalType, setModalType] = useState('followers');

  // Set user from context
  useEffect(() => {
    if (userData?.user) {
      const userId = userData.user._id || userData.user.id;
      setUser({ 
        id: userId,
        name: userData.user.name || "User",
        username: userData.user.email?.split('@')[0] || "username",
        email: userData.user.email,
        photo: userData.user.photo || null,
        bio: userData.user.bio || "",
      });
      
      // Set counts directly from userData
      setFollowersCount(userData.user.followersCount || 0);
      setFollowingCount(userData.user.followingCount || 0);
      
      // Store following IDs for reference
      setFollowing(userData.user.following || []);
      
      fetchUserPosts(userId);
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

  async function fetchFullUserDetails(userId) {
    try {
      const userDetails = await getUserById(userId);
      return userDetails;
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      return null;
    }
  }

  async function handleViewFollowers() {
    setModalType('followers');
    setShowFollowersModal(true);
    setLoadingFollowers(true);
    
    try {
      const data = await getUserFollowers(user?.id);
      
      if (data.users && data.users.length > 0) {
        if (typeof data.users[0] === 'string') {
          setFollowers(data.users.map(id => ({ _id: id, name: 'Loading...', isId: true })));
        } else {
          setFollowers(data.users);
        }
      } else {
        setFollowers([]);
      }
    } catch (err) {
      toast.error("Failed to load followers");
      setFollowers([]);
    } finally {
      setLoadingFollowers(false);
    }
  }

// In UserProfile.jsx, fix the handleViewFollowing function
const handleViewFollowing = async () => {
  setModalType('following');
  setShowFollowingModal(true);
  setLoadingFollowing(true);
  
  try {
    const result = await getUserFollowing(user?.id); // Change userId to user?.id
    
    if (result.users.length > 0 && typeof result.users[0] === 'string') {
      // If it's an array of IDs, fetch the actual user data
      const userDetails = await getUsersByIds(result.users); // You'll need to create this function
      setFollowing(userDetails);
    } else {
      // If it's already user objects
      setFollowing(result.users);
    }
  } catch (error) {
    console.error("Error fetching following:", error);
    toast.error("Failed to load following");
  } finally {
    setLoadingFollowing(false);
  }
};

  async function handleFollow(targetUserId) {
    // Set loading state for this specific user
    setFollowLoading(prev => ({ ...prev, [targetUserId]: true }));
    
    try {
      await followUser(targetUserId);
      toast.success("User followed successfully!");
      
      // Update counts
      setFollowingCount(prev => prev + 1);
      
      // Update UI - mark as following
      if (showFollowingModal) {
        setFollowing(prev => prev.map(u => {
          if ((u._id || u) === targetUserId) {
            return { ...u, isFollowing: true };
          }
          return u;
        }));
      }
      
      // Also update the main following list
      setFollowing(prev => [...prev, { _id: targetUserId, isFollowing: true }]);
      
    } catch (err) {
      toast.error("Failed to follow user");
    } finally {
      // Clear loading state
      setFollowLoading(prev => ({ ...prev, [targetUserId]: false }));
    }
  }

  async function handleUnfollow(targetUserId) {
    // Set loading state for this specific user
    setUnfollowLoading(prev => ({ ...prev, [targetUserId]: true }));
    
    try {
      await unfollowUser(targetUserId);
      toast.success("User unfollowed!");
      
      // Update counts
      setFollowingCount(prev => prev - 1);
      
      // Update UI - remove from lists
      if (showFollowingModal) {
        setFollowing(prev => prev.filter(u => (u._id || u) !== targetUserId));
      }
      
      // Update main following list
      setFollowing(prev => prev.filter(u => (u._id || u) !== targetUserId));
      
    } catch (err) {
      toast.error("Failed to unfollow user");
    } finally {
      // Clear loading state
      setUnfollowLoading(prev => ({ ...prev, [targetUserId]: false }));
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

  // Check if a user is being followed
  const isFollowing = (userId) => {
    return following.some(u => (u._id || u) === userId);
  };

  // Check if a follow action is loading
  const isFollowLoading = (userId) => {
    return followLoading[userId] || unfollowLoading[userId];
  };

  // Followers/Following Modal Component
  const UserListModal = ({ isOpen, onClose, title, users, loading, type }) => (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose}
      size="md"
      backdrop="blur"
      classNames={{
        base: "bg-transparent",
        wrapper: "backdrop-blur-xl",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className={`p-6 ${dark ? 'bg-stone-900' : 'bg-white'} rounded-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  type === 'followers' 
                    ? 'bg-blue-500/20 text-blue-500' 
                    : 'bg-green-500/20 text-green-500'
                }`}>
                  {type === 'followers' ? <FiUsers size={20} /> : <HiUserGroup size={20} />}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-gray-800'}`}>
                    {title}
                  </h3>
                  <p className={`text-sm ${dark ? 'text-stone-400' : 'text-gray-500'}`}>
                    {users.length} {type}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-stone-800 transition-colors ${
                  dark ? 'text-stone-400' : 'text-gray-500'
                }`}
              >
                ✕
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                    <div className={`w-10 h-10 rounded-full ${dark ? 'bg-stone-700' : 'bg-gray-200'}`} />
                    <div className="flex-1">
                      <div className={`h-4 w-24 ${dark ? 'bg-stone-700' : 'bg-gray-200'} rounded mb-2`} />
                      <div className={`h-3 w-16 ${dark ? 'bg-stone-700' : 'bg-gray-200'} rounded`} />
                    </div>
                  </div>
                ))
              ) : users.length === 0 ? (
                <div className="text-center py-10">
                  <div className={`text-4xl mb-3 ${dark ? 'text-stone-700' : 'text-gray-300'}`}>
                    <HiOutlinePhotograph className="mx-auto" />
                  </div>
                  <p className={`text-sm ${dark ? 'text-stone-500' : 'text-gray-400'}`}>
                    No {type} yet
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {users.map((targetUser, index) => {
                    const targetUserId = targetUser._id || targetUser;
                    const following_status = isFollowing(targetUserId);
                    const loading_status = isFollowLoading(targetUserId);
                    const isCurrentUser = targetUserId === user?.id;
                    
                    return (
                      <motion.div
                        key={targetUserId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between p-3 rounded-xl mb-2 ${
                          dark ? 'hover:bg-stone-800' : 'hover:bg-gray-50'
                        } transition-colors`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={targetUser.photo}
                            name={targetUser.name || 'User'}
                            className="w-10 h-10"
                          />
                          <div>
                            <p className={`font-medium text-sm ${dark ? 'text-white' : 'text-gray-800'}`}>
                              {targetUser.name || `User ${targetUserId.slice(-4)}`}
                            </p>
                            <p className={`text-xs ${dark ? 'text-stone-400' : 'text-gray-500'}`}>
                              {targetUser.isId ? 'Loading...' : `@${targetUser.username || 'user'}`}
                            </p>
                          </div>
                        </div>

                        {!isCurrentUser && !targetUser.isId && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => following_status ? handleUnfollow(targetUserId) : handleFollow(targetUserId)}
                            disabled={loading_status}
                            className={`p-2 rounded-lg transition-all min-w-[32px] flex items-center justify-center ${
                              following_status
                                ? dark
                                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                  : 'bg-green-100 text-green-600 hover:bg-green-200'
                                : dark
                                  ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            } ${loading_status ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {loading_status ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <ImSpinner2 size={14} className={dark ? 'text-white' : 'text-current'} />
                              </motion.div>
                            ) : (
                              following_status ? <FaUserCheck size={14} /> : <FaUserPlus size={14} />
                            )}
                          </motion.button>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Loading indicator for more users (optional) */}
            {users.length > 0 && users.length % 10 === 0 && (
              <div className="mt-4 text-center">
                <button className={`text-sm ${dark ? 'text-stone-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                  Load more
                </button>
              </div>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  return (
    <div className={`min-h-screen font-['Outfit'] transition-colors duration-300 ${
      dark 
        ? 'bg-gradient-to-br from-stone-900 to-stone-800' 
        : 'bg-gradient-to-br from-stone-50 to-stone-100'
    }`}>
      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="sticky top-20">
            <SideBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-7">
          {/* Banner */}
          <div className={`relative h-48 overflow-hidden rounded-xl transition-colors duration-300 ${
            dark
              ? 'bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
          }`}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(255,255,255,0.3)_0%,transparent_60%)]" />
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 40px),
                    repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 40px)
                  `
                }} 
              />
            </div>
            <span className="absolute bottom-4 left-6 text-xs font-medium tracking-[0.2em] uppercase text-white/40">
              Profile
            </span>
          </div>

          {/* Identity Section */}
          <div className="flex items-end justify-between -mt-14 mb-6 px-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-indigo-500 via-pink-500 to-amber-500 shadow-2xl">
                <div className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-colors duration-300 ${
                  dark 
                    ? 'bg-stone-800 border-stone-800' 
                    : 'bg-stone-100 border-stone-100'
                }`}>
                  <Avatar
                    src={photoPreview || user?.photo}
                    name={user?.name}
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
              <button className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium shadow-sm transition-all ${
                dark
                  ? 'bg-stone-800 border-stone-700 text-stone-300 hover:border-indigo-400 hover:text-indigo-400'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-indigo-400 hover:text-indigo-600'
              }`}>
                <FaEdit className="text-xs" />
                Edit Profile
              </button>
              <button
                onClick={() => setShowChangePwd(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium shadow-sm transition-all ${
                  dark
                    ? 'bg-stone-800 border-stone-700 text-stone-300 hover:border-indigo-400 hover:text-indigo-400'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                <FaLock className="text-xs" />
                Password
              </button>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="mb-8 px-4 animate-[fadeIn_0.5s_ease-out_0.1s_both]">
            <h1 className={`font-['Cormorant_Garamond'] text-4xl font-semibold leading-tight mb-1 transition-colors duration-300 ${
              dark ? 'text-stone-100' : 'text-stone-900'
            }`}>
              {user?.name || "User Name"}
            </h1>
            <p className="text-sm text-indigo-600 font-normal mb-3 tracking-wide">
              {user?.email || "email@example.com"}
            </p>
            <p className={`text-base leading-relaxed max-w-md font-light transition-colors duration-300 ${
              dark ? 'text-stone-400' : 'text-stone-600'
            }`}>
              {user?.bio || "This user has no bio yet."}
            </p>
          </div>

          {/* Stats Cards */}
          <div className={`flex gap-4 mb-10 pb-8 border-b px-4 animate-[fadeIn_0.5s_ease-out_0.2s_both] transition-colors duration-300 ${
            dark ? 'border-stone-700' : 'border-stone-200'
          }`}>
            {/* Posts Stat */}
            <div className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-2 border relative overflow-hidden group transition-all duration-300 ${
              dark
                ? 'bg-stone-800 border-stone-700'
                : 'bg-white border-stone-200'
            }`}>
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${
                dark
                  ? 'from-indigo-900/30 to-pink-900/20'
                  : 'from-indigo-50/50 to-pink-50/30'
              }`} />
              <span className="text-sm text-indigo-600 relative z-10"><BsGrid3X3 /></span>
              <span className={`font-['Cormorant_Garamond'] text-3xl font-semibold leading-none relative z-10 transition-colors duration-300 ${
                dark ? 'text-stone-100' : 'text-stone-900'
              }`}>
                {posts.length}
              </span>
              <span className={`text-xs uppercase tracking-wider font-medium relative z-10 transition-colors duration-300 ${
                dark ? 'text-stone-500' : 'text-stone-400'
              }`}>
                Posts
              </span>
            </div>

            {/* Followers Stat - Clickable */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewFollowers}
              className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-2 border cursor-pointer relative overflow-hidden group transition-all duration-300 ${
                dark
                  ? 'bg-stone-800 border-stone-700 hover:border-blue-400'
                  : 'bg-white border-stone-200 hover:border-blue-300'
              } hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${
                dark
                  ? 'from-blue-900/30 to-cyan-900/20'
                  : 'from-blue-50/50 to-cyan-50/30'
              }`} />
              <span className="text-sm text-blue-500 relative z-10"><BsPeopleFill /></span>
              <span className={`font-['Cormorant_Garamond'] text-3xl font-semibold leading-none relative z-10 transition-colors duration-300 ${
                dark ? 'text-stone-100' : 'text-stone-900'
              }`}>
                {followersCount}
              </span>
              <span className={`text-xs uppercase tracking-wider font-medium relative z-10 transition-colors duration-300 flex items-center gap-1 ${
                dark ? 'text-stone-500' : 'text-stone-400'
              }`}>
                Followers
                <FiUsers className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </motion.div>

            {/* Following Stat - Clickable */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewFollowing}
              className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-2 border cursor-pointer relative overflow-hidden group transition-all duration-300 ${
                dark
                  ? 'bg-stone-800 border-stone-700 hover:border-green-400'
                  : 'bg-white border-stone-200 hover:border-green-300'
              } hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${
                dark
                  ? 'from-green-900/30 to-emerald-900/20'
                  : 'from-green-50/50 to-emerald-50/30'
              }`} />
              <span className="text-sm text-green-500 relative z-10"><BsPersonPlusFill /></span>
              <span className={`font-['Cormorant_Garamond'] text-3xl font-semibold leading-none relative z-10 transition-colors duration-300 ${
                dark ? 'text-stone-100' : 'text-stone-900'
              }`}>
                {followingCount}
              </span>
              <span className={`text-xs uppercase tracking-wider font-medium relative z-10 transition-colors duration-300 flex items-center gap-1 ${
                dark ? 'text-stone-500' : 'text-stone-400'
              }`}>
                Following
                <BsPersonCheckFill className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </motion.div>
          </div>

          {/* Posts Section */}
          <div className="mb-5 px-4 animate-[fadeIn_0.5s_ease-out_0.3s_both]">
            <div className="flex items-center gap-3 mb-5">
              <h2 className={`font-['Cormorant_Garamond'] text-2xl font-medium italic transition-colors duration-300 ${
                dark ? 'text-stone-200' : 'text-stone-900'
              }`}>
                Posts
              </h2>
              {!postsLoading && (
                <span className={`text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 ${
                  dark
                    ? 'bg-stone-800 text-stone-400'
                    : 'bg-stone-100 text-stone-400'
                }`}>
                  {posts.length} total
                </span>
              )}
            </div>

            {/* Loading State */}
            {postsLoading && (
              <div className="flex justify-center py-16">
                <div className={`w-8 h-8 rounded-full border-2 animate-spin ${
                  dark
                    ? 'border-stone-700 border-t-indigo-400'
                    : 'border-stone-200 border-t-indigo-600'
                }`} />
              </div>
            )}

            {/* Empty State */}
            {!postsLoading && posts.length === 0 && (
              <div className="flex flex-col items-center py-16 gap-4 text-center">
                <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center text-3xl transition-colors duration-300 ${
                  dark
                    ? 'bg-stone-800 border-stone-700 text-stone-500'
                    : 'bg-white border-stone-200 text-stone-400'
                }`}>
                  <HiOutlinePhotograph />
                </div>
                <p className={`font-['Cormorant_Garamond'] text-xl transition-colors duration-300 ${
                  dark ? 'text-stone-300' : 'text-stone-800'
                }`}>
                  No posts yet
                </p>
                <p className={`text-sm font-light transition-colors duration-300 ${
                  dark ? 'text-stone-500' : 'text-stone-400'
                }`}>
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

        {/* Right Sidebar */}
        <div className="hidden xl:block xl:col-span-3">
          <div className="sticky top-20">
            <RightSideBar />
          </div>
        </div>
      </div>

      {/* Followers Modal */}
      <UserListModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="Followers"
        users={followers}
        loading={loadingFollowers}
        type="followers"
      />

      {/* Following Modal */}
      <UserListModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={following}
        loading={loadingFollowing}
        type="following"
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePwd}
        onOpenChange={setShowChangePwd}
      />
    </div>
  );
}