import React, { useEffect, useState } from "react";
import { Avatar, Modal, ModalContent } from "@heroui/react";
import { FaEdit, FaLock, FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { BsGrid3X3, BsPeopleFill, BsPersonPlusFill } from "react-icons/bs";
import PostCard from "../../components/PostCard/PostCard";
import { getAllPosts } from "../../services/PostsServices";
import { getProfileData, changePassword } from "../../services/authServices";

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadProfileAndPosts() {
      try {
        setLoading(true);
        const profile = await getProfileData();
        if (!mounted) return;
        const userData = profile.user || profile.data || profile;
        setUser({
          id: userData._id || userData.id,
          name: userData.name || userData.fullName || userData.username || "User",
          username: userData.username || userData.userName || "username",
          photo: userData.photo || userData.avatar || null,
          bio: userData.bio || "",
        });
        const remotePosts = profile.posts || profile.userPosts || null;
        if (Array.isArray(remotePosts)) {
          setPosts(remotePosts);
        } else {
          const all = await getAllPosts();
          if (!mounted) return;
          const myPosts =
            all?.filter((p) => {
              const postUser = p?.user || p?.creator || p?.author || {};
              return (
                postUser?._id === (userData._id || userData.id) ||
                postUser?.username === userData.username
              );
            }) || [];
          setPosts(myPosts);
        }
      } catch (err) {
        console.error("Failed to load profile or posts:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProfileAndPosts();
    return () => { mounted = false; };
  }, []);

  const [showChangePwd, setShowChangePwd] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  async function handleChangePassword() {
    if (!currentPwd || !newPwd) return window.alert("Please fill both fields");
    if (newPwd !== confirmPwd) return window.alert("New passwords do not match");
    try {
      setPwdLoading(true);
      // debug values (will not log passwords in production)
      console.debug("ChangePassword payload:", { currentPwd, newPwd, confirmPwd });
      await changePassword(currentPwd, newPwd, confirmPwd);
      window.alert("Password changed successfully");
      setShowChangePwd(false);
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } catch (err) {
      console.error(err);
      window.alert("Failed to change password. Check console for details.");
    } finally {
      setPwdLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="h-44 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

      <div className="max-w-2xl mx-auto px-4">
        {/* Avatar + action buttons row */}
        <div className="flex items-end justify-between -mt-14 mb-4">
          <div className="relative">
            <div className="rounded-full ring-4 ring-white shadow-lg">
              <Avatar
                src={user?.photo}
                name={user?.name}
                className="w-24 h-24 text-2xl"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-500 hover:text-violet-600 transition-colors">
              <FaCamera className="text-xs" />
            </button>
          </div>

          <div className="flex gap-2 pb-1">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-600 shadow-sm transition-all">
              <FaEdit className="text-xs" />
              Edit Profile
            </button>
            <button
              onClick={() => setShowChangePwd(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-600 shadow-sm transition-all"
            >
              <FaLock className="text-xs" />
              Password
            </button>
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            {user?.name || "User Name"}
          </h1>
          <p className="text-sm text-violet-500 font-medium mb-2">
            @{user?.username || "username"}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
            {user?.bio || "This user has no bio yet."}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-8 pb-6 border-b border-gray-200">
          {[
            { icon: <BsGrid3X3 />, value: posts.length, label: "Posts" },
            { icon: <BsPeopleFill />, value: 0, label: "Followers" },
            { icon: <BsPersonPlusFill />, value: 0, label: "Following" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm border border-gray-100 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-violet-500 text-base">{stat.icon}</span>
              <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Posts */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Posts
          </h2>

          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="flex flex-col items-center py-16 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-400 text-2xl">
                <HiOutlinePhotograph />
              </div>
              <p className="font-semibold text-gray-700">No posts yet</p>
              <p className="text-sm text-gray-400">Share your first post to get started.</p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post._id || post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={showChangePwd}
        onOpenChange={setShowChangePwd}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
                  <FaLock className="text-violet-600 text-sm" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">Change Password</h3>
                  <p className="text-xs text-gray-400">Keep your account secure</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {/* Current Password */}
                <label className="text-xs text-gray-500">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle current password visibility"
                  >
                    {showCurrent ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* New Password */}
                <label className="text-xs text-gray-500">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPwd ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPwd((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle new password visibility"
                  >
                    {showNewPwd ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Confirm New Password */}
                <label className="text-xs text-gray-500">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPwd ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPwd((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  disabled={pwdLoading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all disabled:opacity-60"
                >
                  {pwdLoading ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}