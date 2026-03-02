// import React, { useEffect, useState } from "react";
// import { Avatar, Modal, ModalContent } from "@heroui/react";
// import { FaEdit, FaLock, FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
// import { HiOutlinePhotograph } from "react-icons/hi";
// import { BsGrid3X3, BsPeopleFill, BsPersonPlusFill } from "react-icons/bs";
// import PostCard from "../../components/PostCard/PostCard";
// import { getAllPosts } from "../../services/PostsServices";
// import { getProfileData, changePassword } from "../../services/authServices";

// function parseJwt(token) {
//   if (!token) return null;
//   try {
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join("")
//     );
//     return JSON.parse(jsonPayload);
//   } catch (e) {
//     return null;
//   }
// }

// export default function UserProfile() {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let mounted = true;
//     async function loadProfileAndPosts() {
//       try {
//         setLoading(true);
//         const profile = await getProfileData();
//         if (!mounted) return;
//         const userData = profile.user || profile.data || profile;
//         setUser({
//           id: userData._id || userData.id,
//           name: userData.name || userData.fullName || userData.username || "User",
//           username: userData.username || userData.userName || "username",
//           photo: userData.photo || userData.avatar || null,
//           bio: userData.bio || "",
//         });
//         const remotePosts = profile.posts || profile.userPosts || null;
//         if (Array.isArray(remotePosts)) {
//           setPosts(remotePosts);
//         } else {
//           const all = await getAllPosts();
//           if (!mounted) return;
//           const myPosts =
//             all?.filter((p) => {
//               const postUser = p?.user || p?.creator || p?.author || {};
//               return (
//                 postUser?._id === (userData._id || userData.id) ||
//                 postUser?.username === userData.username
//               );
//             }) || [];
//           setPosts(myPosts);
//         }
//       } catch (err) {
//         console.error("Failed to load profile or posts:", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     loadProfileAndPosts();
//     return () => { mounted = false; };
//   }, []);

//   const [showChangePwd, setShowChangePwd] = useState(false);
//   const [currentPwd, setCurrentPwd] = useState("");
//   const [newPwd, setNewPwd] = useState("");
//   const [confirmPwd, setConfirmPwd] = useState("");
//   const [pwdLoading, setPwdLoading] = useState(false);
//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNewPwd, setShowNewPwd] = useState(false);
//   const [showConfirmPwd, setShowConfirmPwd] = useState(false);

//   async function handleChangePassword() {
//     if (!currentPwd || !newPwd) return window.alert("Please fill both fields");
//     if (newPwd !== confirmPwd) return window.alert("New passwords do not match");
//     try {
//       setPwdLoading(true);
//       // debug values (will not log passwords in production)
//       console.debug("ChangePassword payload:", { currentPwd, newPwd, confirmPwd });
//       await changePassword(currentPwd, newPwd, confirmPwd);
//       window.alert("Password changed successfully");
//       setShowChangePwd(false);
//       setCurrentPwd("");
//       setNewPwd("");
//       setConfirmPwd("");
//     } catch (err) {
//       console.error(err);
//       window.alert("Failed to change password. Check console for details.");
//     } finally {
//       setPwdLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Banner */}
//       <div className="h-44 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

//       <div className="max-w-2xl mx-auto px-4">
//         {/* Avatar + action buttons row */}
//         <div className="flex items-end justify-between -mt-14 mb-4">
//           <div className="relative">
//             <div className="rounded-full ring-4 ring-white shadow-lg">
//               <Avatar
//                 src={user?.photo}
//                 name={user?.name}
//                 className="w-24 h-24 text-2xl"
//               />
//             </div>
//             <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-500 hover:text-violet-600 transition-colors">
//               <FaCamera className="text-xs" />
//             </button>
//           </div>

//           <div className="flex gap-2 pb-1">
//             <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-600 shadow-sm transition-all">
//               <FaEdit className="text-xs" />
//               Edit Profile
//             </button>
//             <button
//               onClick={() => setShowChangePwd(true)}
//               className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-violet-400 hover:text-violet-600 shadow-sm transition-all"
//             >
//               <FaLock className="text-xs" />
//               Password
//             </button>
//           </div>
//         </div>

//         {/* Name & Bio */}
//         <div className="mb-6">
//           <h1 className="text-xl font-bold text-gray-900">
//             {user?.name || "User Name"}
//           </h1>
//           <p className="text-sm text-violet-500 font-medium mb-2">
//             @{user?.username || "username"}
//           </p>
//           <p className="text-sm text-gray-500 leading-relaxed max-w-md">
//             {user?.bio || "This user has no bio yet."}
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="flex gap-3 mb-8 pb-6 border-b border-gray-200">
//           {[
//             { icon: <BsGrid3X3 />, value: posts.length, label: "Posts" },
//             { icon: <BsPeopleFill />, value: 0, label: "Followers" },
//             { icon: <BsPersonPlusFill />, value: 0, label: "Following" },
//           ].map((stat, i) => (
//             <div
//               key={i}
//               className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm border border-gray-100 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer"
//             >
//               <span className="text-violet-500 text-base">{stat.icon}</span>
//               <span className="text-xl font-bold text-gray-900">{stat.value}</span>
//               <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
//             </div>
//           ))}
//         </div>

//         {/* Posts */}
//         <div className="mb-10">
//           <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
//             Posts
//           </h2>

//           {loading && (
//             <div className="flex justify-center py-16">
//               <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
//             </div>
//           )}

//           {!loading && posts.length === 0 && (
//             <div className="flex flex-col items-center py-16 gap-3 text-center">
//               <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-400 text-2xl">
//                 <HiOutlinePhotograph />
//               </div>
//               <p className="font-semibold text-gray-700">No posts yet</p>
//               <p className="text-sm text-gray-400">Share your first post to get started.</p>
//             </div>
//           )}

//           <div className="flex flex-col gap-4">
//             {posts.map((post) => (
//               <PostCard key={post._id || post.id} post={post} />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Change Password Modal */}
//       <Modal
//         isOpen={showChangePwd}
//         onOpenChange={setShowChangePwd}
//         backdrop="blur"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
//                   <FaLock className="text-violet-600 text-sm" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-base">Change Password</h3>
//                   <p className="text-xs text-gray-400">Keep your account secure</p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-3 mb-6">
//                 {/* Current Password */}
//                 <label className="text-xs text-gray-500">Current Password</label>
//                 <div className="relative">
//                   <input
//                     type={showCurrent ? "text" : "password"}
//                     placeholder="Enter current password"
//                     value={currentPwd}
//                     onChange={(e) => setCurrentPwd(e.target.value)}
//                     className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-400"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowCurrent((s) => !s)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                     aria-label="Toggle current password visibility"
//                   >
//                     {showCurrent ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>

//                 {/* New Password */}
//                 <label className="text-xs text-gray-500">New Password</label>
//                 <div className="relative">
//                   <input
//                     type={showNewPwd ? "text" : "password"}
//                     placeholder="Enter new password"
//                     value={newPwd}
//                     onChange={(e) => setNewPwd(e.target.value)}
//                     className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-400"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPwd((s) => !s)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                     aria-label="Toggle new password visibility"
//                   >
//                     {showNewPwd ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>

//                 {/* Confirm New Password */}
//                 <label className="text-xs text-gray-500">Confirm New Password</label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPwd ? "text" : "password"}
//                     placeholder="Confirm new password"
//                     value={confirmPwd}
//                     onChange={(e) => setConfirmPwd(e.target.value)}
//                     className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-400"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPwd((s) => !s)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                     aria-label="Toggle confirm password visibility"
//                   >
//                     {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={onClose}
//                   className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleChangePassword}
//                   disabled={pwdLoading}
//                   className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all disabled:opacity-60"
//                 >
//                   {pwdLoading ? "Saving…" : "Save Changes"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }






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
      atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
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
          const myPosts = all?.filter((p) => {
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
      console.debug("ChangePassword payload:", { currentPwd, newPwd, confirmPwd });
      await changePassword(currentPwd, newPwd, confirmPwd);
      window.alert("Password changed successfully");
      setShowChangePwd(false);
      setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
    } catch (err) {
      console.error(err);
      window.alert("Failed to change password. Check console for details.");
    } finally {
      setPwdLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap');

        .up-root {
          min-height: 100vh;
          background: #f7f5f0;
          font-family: 'Outfit', sans-serif;
        }

        /* ── BANNER ── */
        .up-banner {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #1a1a2e;
        }
        .up-banner-noise {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(99,102,241,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 30%, rgba(236,72,153,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 55% 80%, rgba(20,184,166,0.15) 0%, transparent 60%);
        }
        .up-banner-lines {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.04) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.04) 40px);
        }
        .up-banner-tag {
          position: absolute;
          bottom: 16px;
          left: 24px;
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* ── BODY WRAPPER ── */
        .up-body {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── IDENTITY SECTION ── */
        .up-identity {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: -52px;
          margin-bottom: 24px;
        }

        .up-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .up-avatar-ring {
          width: 108px;
          height: 108px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #6366f1, #ec4899, #f59e0b);
          box-shadow: 0 8px 32px rgba(99,102,241,0.25);
        }
        .up-avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: #f7f5f0;
          border: 3px solid #f7f5f0;
        }
        .up-avatar-inner img,
        .up-avatar-inner > * {
          width: 100% !important;
          height: 100% !important;
          border-radius: 50% !important;
        }
        .up-camera-btn {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #1a1a2e;
          border: 2px solid #f7f5f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 10px;
        }
        .up-camera-btn:hover {
          background: #6366f1;
          color: #fff;
          transform: scale(1.1);
        }

        .up-actions {
          display: flex;
          gap: 8px;
          padding-bottom: 4px;
        }
        .up-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          letter-spacing: 0.01em;
        }
        .up-btn-outline {
          background: #fff;
          color: #1a1a2e;
          border: 1.5px solid #e2ddd6;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .up-btn-outline:hover {
          border-color: #6366f1;
          color: #6366f1;
          box-shadow: 0 2px 8px rgba(99,102,241,0.15);
          transform: translateY(-1px);
        }

        /* ── NAME & BIO ── */
        .up-name-section {
          margin-bottom: 28px;
          animation: up-fade 0.5s 0.1s both;
        }
        .up-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1.1;
          margin-bottom: 2px;
        }
        .up-handle {
          font-size: 13px;
          color: #6366f1;
          font-weight: 400;
          margin-bottom: 10px;
          letter-spacing: 0.01em;
        }
        .up-bio {
          font-size: 14px;
          color: #7a7264;
          line-height: 1.65;
          max-width: 440px;
          font-weight: 300;
        }

        @keyframes up-fade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── STATS ── */
        .up-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 36px;
          padding-bottom: 32px;
          border-bottom: 1.5px solid #e8e3da;
          animation: up-fade 0.5s 0.2s both;
        }
        .up-stat-card {
          flex: 1;
          background: #fff;
          border-radius: 16px;
          padding: 18px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          border: 1.5px solid #ede8e0;
          cursor: pointer;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        .up-stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99,102,241,0.06), rgba(236,72,153,0.04));
          opacity: 0;
          transition: opacity 0.25s;
        }
        .up-stat-card:hover {
          border-color: rgba(99,102,241,0.4);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.12);
        }
        .up-stat-card:hover::before { opacity: 1; }
        .up-stat-icon {
          font-size: 14px;
          color: #6366f1;
          position: relative;
        }
        .up-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1;
          position: relative;
        }
        .up-stat-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a89e8e;
          font-weight: 500;
          position: relative;
        }

        /* ── POSTS SECTION ── */
        .up-posts-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          animation: up-fade 0.5s 0.3s both;
        }
        .up-posts-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 500;
          color: #1a1a2e;
          font-style: italic;
        }
        .up-posts-count {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #a89e8e;
          background: #f0ede7;
          padding: 3px 10px;
          border-radius: 20px;
        }

        .up-spinner {
          display: flex;
          justify-content: center;
          padding: 60px 0;
        }
        .up-spinner-ring {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid #e8e3da;
          border-top-color: #6366f1;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .up-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 0;
          gap: 12px;
          text-align: center;
        }
        .up-empty-icon {
          width: 64px; height: 64px;
          border-radius: 20px;
          background: #fff;
          border: 1.5px solid #ede8e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #c4bdb0;
        }
        .up-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #1a1a2e;
        }
        .up-empty-sub {
          font-size: 13px;
          color: #a89e8e;
          font-weight: 300;
        }

        .up-posts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 60px;
          animation: up-fade 0.5s 0.35s both;
        }

        /* ── PASSWORD MODAL ── */
        .up-modal-inner {
          padding: 28px;
          font-family: 'Outfit', sans-serif;
        }
        .up-modal-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .up-modal-icon {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(99,102,241,0.3);
        }
        .up-modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1;
        }
        .up-modal-sub {
          font-size: 12px;
          color: #a89e8e;
          margin-top: 2px;
        }

        .up-field-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 14px;
        }
        .up-field-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #a89e8e;
        }
        .up-field-wrap {
          position: relative;
        }
        .up-field-input {
          width: 100%;
          padding: 11px 40px 11px 14px;
          border-radius: 10px;
          border: 1.5px solid #e2ddd6;
          font-size: 14px;
          font-family: 'Outfit', sans-serif;
          color: #1a1a2e;
          background: #faf9f7;
          outline: none;
          transition: all 0.2s;
        }
        .up-field-input:focus {
          border-color: #6366f1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        .up-field-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #c4bdb0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .up-field-toggle:hover { color: #6366f1; }

        .up-modal-divider {
          height: 1px;
          background: #ede8e0;
          margin: 20px 0;
        }

        .up-modal-actions {
          display: flex;
          gap: 10px;
        }
        .up-modal-cancel {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          border: 1.5px solid #e2ddd6;
          background: transparent;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          color: #7a7264;
          cursor: pointer;
          transition: all 0.2s;
        }
        .up-modal-cancel:hover {
          border-color: #c4bdb0;
          background: #f7f5f0;
        }
        .up-modal-save {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(99,102,241,0.3);
          transition: all 0.2s;
        }
        .up-modal-save:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.4);
        }
        .up-modal-save:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div className="up-root">
        {/* Banner */}
        <div className="up-banner">
          <div className="up-banner-noise" />
          <div className="up-banner-lines" />
          <span className="up-banner-tag">Profile</span>
        </div>

        <div className="up-body">
          {/* Identity Row */}
          <div className="up-identity">
            <div className="up-avatar-wrap">
              <div className="up-avatar-ring">
                <div className="up-avatar-inner">
                  <Avatar
                    src={user?.photo}
                    name={user?.name}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <button className="up-camera-btn">
                <FaCamera />
              </button>
            </div>

            <div className="up-actions">
              <button className="up-btn up-btn-outline">
                <FaEdit style={{ fontSize: 11 }} />
                Edit Profile
              </button>
              <button
                className="up-btn up-btn-outline"
                onClick={() => setShowChangePwd(true)}
              >
                <FaLock style={{ fontSize: 11 }} />
                Password
              </button>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="up-name-section">
            <h1 className="up-name">{user?.name || "User Name"}</h1>
            <p className="up-handle">@{user?.username || "username"}</p>
            <p className="up-bio">{user?.bio || "This user has no bio yet."}</p>
          </div>

          {/* Stats */}
          <div className="up-stats">
            {[
              { icon: <BsGrid3X3 />, value: posts.length, label: "Posts" },
              { icon: <BsPeopleFill />, value: 0, label: "Followers" },
              { icon: <BsPersonPlusFill />, value: 0, label: "Following" },
            ].map((stat, i) => (
              <div key={i} className="up-stat-card">
                <span className="up-stat-icon">{stat.icon}</span>
                <span className="up-stat-value">{stat.value}</span>
                <span className="up-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Posts */}
          <div className="up-posts-header">
            <h2 className="up-posts-title">Posts</h2>
            {!loading && (
              <span className="up-posts-count">{posts.length} total</span>
            )}
          </div>

          {loading && (
            <div className="up-spinner">
              <div className="up-spinner-ring" />
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="up-empty">
              <div className="up-empty-icon">
                <HiOutlinePhotograph />
              </div>
              <p className="up-empty-title">No posts yet</p>
              <p className="up-empty-sub">Share your first post to get started.</p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="up-posts-list">
              {posts.map((post) => (
                <PostCard key={post._id || post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal isOpen={showChangePwd} onOpenChange={setShowChangePwd} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <div className="up-modal-inner">
              <div className="up-modal-header">
                <div className="up-modal-icon">
                  <FaLock />
                </div>
                <div>
                  <h3 className="up-modal-title">Change Password</h3>
                  <p className="up-modal-sub">Keep your account secure</p>
                </div>
              </div>

              <div className="up-field-group">
                <label className="up-field-label">Current Password</label>
                <div className="up-field-wrap">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    className="up-field-input"
                  />
                  <button type="button" className="up-field-toggle" onClick={() => setShowCurrent((s) => !s)} aria-label="Toggle">
                    {showCurrent ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="up-field-group">
                <label className="up-field-label">New Password</label>
                <div className="up-field-wrap">
                  <input
                    type={showNewPwd ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    className="up-field-input"
                  />
                  <button type="button" className="up-field-toggle" onClick={() => setShowNewPwd((s) => !s)} aria-label="Toggle">
                    {showNewPwd ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="up-field-group">
                <label className="up-field-label">Confirm New Password</label>
                <div className="up-field-wrap">
                  <input
                    type={showConfirmPwd ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    className="up-field-input"
                  />
                  <button type="button" className="up-field-toggle" onClick={() => setShowConfirmPwd((s) => !s)} aria-label="Toggle">
                    {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="up-modal-divider" />

              <div className="up-modal-actions">
                <button className="up-modal-cancel" onClick={onClose}>Cancel</button>
                <button
                  className="up-modal-save"
                  onClick={handleChangePassword}
                  disabled={pwdLoading}
                >
                  {pwdLoading ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}