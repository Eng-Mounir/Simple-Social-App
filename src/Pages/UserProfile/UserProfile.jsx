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
  getUsersByIds
} from "../../services/UserServices";
import { UserContext } from "../../context/UserContext";
import { uploadProfileImage } from "../../services/UserServices";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast } from 'react-toastify';
import SideBar from "../../components/SideBar/SideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from "framer-motion";

// ULTRA ADVANCED ANIMATED BACKGROUND WITH COMPLEX ANIMATIONS
const AnimatedBackground = ({ dark }) => {
  // Advanced particle system with physics
  const ParticleField = () => {
    const particles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 0.5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      vx: (Math.random() - 0.5) * 100,
      vy: Math.random() * -150,
    }));

    return (
      <>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: [particle.y, particle.y - 300, particle.y - 600],
              x: [0, particle.vx, particle.vx * 1.5],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut",
            }}
            className={`absolute rounded-full pointer-events-none backdrop-blur-sm`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: dark
                ? `radial-gradient(circle, rgba(255,255,255,0.8), rgba(100,200,255,0.4))`
                : `radial-gradient(circle, rgba(59,130,246,0.6), rgba(147,197,253,0.2))`,
              boxShadow: dark
                ? `0 0 ${particle.size * 4}px rgba(34,211,238,0.9), inset 0 0 ${particle.size * 2}px rgba(255,255,255,0.5)`
                : `0 0 ${particle.size * 3}px rgba(59,130,246,0.7), inset 0 0 ${particle.size}px rgba(191,219,254,0.5)`,
              filter: `blur(${particle.size * 0.3}px)`,
            }}
          />
        ))}
      </>
    );
  };

  // Advanced morphing blobs with stable SVG values
  const MorphingBlobs = () => (
    <>
      {/* Primary morphing blob - Blue */}
      <motion.div
        className="absolute w-96 h-96 -top-40 -right-40 pointer-events-none rounded-full blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: dark
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent)'
            : 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)',
        }}
      />

      {/* Secondary morphing blob - Purple */}
      <motion.div
        className="absolute w-96 h-96 -bottom-40 -left-40 pointer-events-none rounded-full blur-3xl"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 100, -70, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: dark
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.4), transparent)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)',
        }}
      />

      {/* Tertiary morphing blob - Pink */}
      <motion.div
        className="absolute w-80 h-80 top-1/3 right-1/4 pointer-events-none rounded-full blur-3xl"
        animate={{
          x: [0, 70, -50, 0],
          y: [0, -100, 80, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{
          background: dark
            ? 'radial-gradient(circle, rgba(236, 72, 153, 0.35), transparent)'
            : 'radial-gradient(circle, rgba(244, 114, 182, 0.25), transparent)',
        }}
      />
    </>
  );

  // Energy waves (simplified, no SVG issues)
  const EnergyWaves = () => (
    <>
      {[0, 1, 2, 3].map((wave) => (
        <motion.div
          key={`wave-${wave}`}
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: `${25 + wave * 20}%`,
            height: '3px',
            background: dark
              ? `linear-gradient(90deg, transparent, rgba(34,211,238,${0.3 - wave * 0.07}), transparent)`
              : `linear-gradient(90deg, transparent, rgba(59,130,246,${0.2 - wave * 0.05}), transparent)`,
            filter: 'blur(2px)',
          }}
          animate={{
            scaleX: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + wave * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: wave * 0.3,
          }}
        />
      ))}
    </>
  );

  // Rotating orbital rings with dynamic dots
  const OrbitalSystem = () => (
    <>
      {[0, 1, 2, 3].map((ring) => (
        <motion.div
          key={`ring-${ring}`}
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: `${300 + ring * 150}px`,
            height: `${300 + ring * 150}px`,
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${dark ? `rgba(34,211,238,${0.15 - ring * 0.03})` : `rgba(59,130,246,${0.1 - ring * 0.02})`}`,
            borderRadius: '50%',
          }}
          animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 20 + ring * 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Orbital dots */}
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={`dot-${ring}-${dot}`}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                left: '50%',
                top: '0%',
                transform: `translate(-50%, -50%) rotate(${dot * 120}deg) translateY(-${45 + ring * 5}px)`,
                background: dark ? '#22d3ee' : '#0ea5e9',
                boxShadow: dark
                  ? `0 0 10px rgba(34,211,238,0.9), 0 0 20px rgba(34,211,238,0.5)`
                  : `0 0 8px rgba(14,165,233,0.7), 0 0 16px rgba(34,211,238,0.4)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: dot * 0.3,
              }}
            />
          ))}
        </motion.div>
      ))}
    </>
  );

  // Complex gradient mesh
  const GradientMesh = () => (
    <>
      {[0, 1, 2, 3].map((mesh) => (
        <motion.div
          key={`mesh-${mesh}`}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dark
              ? `radial-gradient(circle at ${20 + mesh * 15}% ${30 + mesh * 20}%, rgba(${99 + mesh * 10},${102 + mesh * 20},${242 + mesh * 5},.15) 0%, transparent 50%)`
              : `radial-gradient(circle at ${20 + mesh * 15}% ${30 + mesh * 20}%, rgba(${59 + mesh * 10},${130 + mesh * 20},${246 + mesh * 5},.1) 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + mesh * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: mesh * 1.5,
          }}
        />
      ))}
    </>
  );

  // Flowing ribbons
  const FlowingRibbons = () => (
    <>
      {[0, 1, 2].map((ribbon) => (
        <motion.div
          key={`ribbon-${ribbon}`}
          className="absolute pointer-events-none"
          style={{
            width: '300px',
            height: '3px',
            left: `${20 + ribbon * 30}%`,
            top: `${30 + ribbon * 25}%`,
            background: dark
              ? `linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)`
              : `linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)`,
            filter: 'blur(2px)',
          }}
          animate={{
            x: [-500, 500],
            opacity: [0, 1, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 6 + ribbon * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ribbon * 0.8,
          }}
        />
      ))}
    </>
  );

  // Pulsing cores
  const PulsingCores = () => (
    <>
      {[
        { top: '20%', left: '30%', duration: 5, delay: 0, color: 'blue' },
        { top: '70%', left: '70%', duration: 7, delay: 1, color: 'purple' },
        { top: '50%', left: '50%', duration: 6, delay: 2, color: 'pink' },
      ].map((core, idx) => (
        <motion.div
          key={`core-${idx}`}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: '300px',
            height: '300px',
            top: core.top,
            left: core.left,
            transform: 'translate(-50%, -50%)',
            background:
              core.color === 'blue'
                ? dark
                  ? 'radial-gradient(circle, rgba(6,182,212,0.3), transparent)'
                  : 'radial-gradient(circle, rgba(34,211,238,0.2), transparent)'
                : core.color === 'purple'
                ? dark
                  ? 'radial-gradient(circle, rgba(147,51,234,0.3), transparent)'
                  : 'radial-gradient(circle, rgba(168,85,247,0.2), transparent)'
                : dark
                ? 'radial-gradient(circle, rgba(236,72,153,0.3), transparent)'
                : 'radial-gradient(circle, rgba(244,114,182,0.2), transparent)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: core.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: core.delay,
          }}
        />
      ))}
    </>
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          dark
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50'
        }`}
      />

      {/* Secondary gradient layer with animation */}
      <motion.div
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 transition-all duration-1000 ${
          dark
            ? 'bg-gradient-to-tl from-blue-900/40 via-transparent to-purple-900/40'
            : 'bg-gradient-to-tl from-blue-200/30 via-transparent to-purple-200/30'
        }`}
      />

      {/* Morphing blobs */}
      <MorphingBlobs />

      {/* Energy waves */}
      <EnergyWaves />

      {/* Orbital system */}
      <OrbitalSystem />

      {/* Gradient mesh */}
      <GradientMesh />

      {/* Flowing ribbons */}
      <FlowingRibbons />

      {/* Pulsing cores */}
      <PulsingCores />

      {/* Advanced particle field */}
      <ParticleField />

      {/* Noise texture with animation */}
      <motion.div
        animate={{
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              ${dark ? 'rgba(255,255,255,0.03)' : 'rgba(59,130,246,0.03)'} 2px,
              ${dark ? 'rgba(255,255,255,0.03)' : 'rgba(59,130,246,0.03)'} 4px
            )
          `,
          backgroundSize: '100% 100%',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: dark
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(15,23,42,0.4) 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(148,163,184,0.15) 100%)',
        }}
      />
    </div>
  );
};

export default function UserProfile() {
  const { dark } = useTheme();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const { userData, isLoading } = useContext(UserContext);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showChangePwd, setShowChangePwd] = useState(false);
  
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  
  const [followLoading, setFollowLoading] = useState({});
  const [unfollowLoading, setUnfollowLoading] = useState({});
  
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [modalType, setModalType] = useState('followers');

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
      
      setFollowersCount(userData.user.followersCount || 0);
      setFollowingCount(userData.user.followingCount || 0);
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

  const handleViewFollowing = async () => {
    setModalType('following');
    setShowFollowingModal(true);
    setLoadingFollowing(true);
    
    try {
      const result = await getUserFollowing(user?.id);
      
      if (result.users.length > 0 && typeof result.users[0] === 'string') {
        const userDetails = await getUsersByIds(result.users);
        setFollowing(userDetails);
      } else {
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
    setFollowLoading(prev => ({ ...prev, [targetUserId]: true }));
    
    try {
      await followUser(targetUserId);
      toast.success("User followed successfully!");
      
      setFollowingCount(prev => prev + 1);
      
      if (showFollowingModal) {
        setFollowing(prev => prev.map(u => {
          if ((u._id || u) === targetUserId) {
            return { ...u, isFollowing: true };
          }
          return u;
        }));
      }
      
      setFollowing(prev => [...prev, { _id: targetUserId, isFollowing: true }]);
      
    } catch (err) {
      toast.error("Failed to follow user");
    } finally {
      setFollowLoading(prev => ({ ...prev, [targetUserId]: false }));
    }
  }

  async function handleUnfollow(targetUserId) {
    setUnfollowLoading(prev => ({ ...prev, [targetUserId]: true }));
    
    try {
      await unfollowUser(targetUserId);
      toast.success("User unfollowed!");
      
      setFollowingCount(prev => prev - 1);
      
      if (showFollowingModal) {
        setFollowing(prev => prev.filter(u => (u._id || u) !== targetUserId));
      }
      
      setFollowing(prev => prev.filter(u => (u._id || u) !== targetUserId));
      
    } catch (err) {
      toast.error("Failed to unfollow user");
    } finally {
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

  const isFollowing = (userId) => {
    return following.some(u => (u._id || u) === userId);
  };

  const isFollowLoading = (userId) => {
    return followLoading[userId] || unfollowLoading[userId];
  };

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`p-6 rounded-2xl backdrop-blur-2xl border ${
              dark 
                ? 'bg-slate-900/90 border-slate-700/50' 
                : 'bg-white/90 border-white/30'
            } shadow-2xl`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-3 rounded-xl backdrop-blur-xl border transition-all ${
                    type === 'followers' 
                      ? dark
                        ? 'bg-blue-500/30 border-blue-400/30 text-blue-400' 
                        : 'bg-blue-100/50 border-blue-300/50 text-blue-600'
                      : dark
                        ? 'bg-green-500/30 border-green-400/30 text-green-400'
                        : 'bg-green-100/50 border-green-300/50 text-green-600'
                  }`}
                >
                  {type === 'followers' ? <FiUsers size={20} /> : <HiUserGroup size={20} />}
                </motion.div>
                <div>
                  <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
                    {title}
                  </h3>
                  <p className={`text-sm ${dark ? 'text-slate-400' : 'text-gray-500'}`}>
                    {users.length} {type}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition-all ${
                  dark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                ✕
              </motion.button>
            </motion.div>

            <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 mb-2 animate-pulse"
                  >
                    <div className={`w-10 h-10 rounded-full ${dark ? 'bg-slate-700' : 'bg-gray-200'}`} />
                    <div className="flex-1">
                      <div className={`h-4 w-24 ${dark ? 'bg-slate-700' : 'bg-gray-200'} rounded mb-2`} />
                      <div className={`h-3 w-16 ${dark ? 'bg-slate-700' : 'bg-gray-200'} rounded`} />
                    </div>
                  </motion.div>
                ))
              ) : users.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className={`text-4xl mb-3 ${dark ? 'text-slate-700' : 'text-gray-300'}`}>
                    <HiOutlinePhotograph className="mx-auto" />
                  </div>
                  <p className={`text-sm ${dark ? 'text-slate-500' : 'text-gray-400'}`}>
                    No {type} yet
                  </p>
                </motion.div>
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ x: 4 }}
                        className={`flex items-center justify-between p-3 rounded-xl mb-2 backdrop-blur-sm border transition-all ${
                          dark 
                            ? 'hover:bg-slate-800/50 hover:border-slate-600/50 border-slate-700/20' 
                            : 'hover:bg-gray-100/50 hover:border-gray-300/50 border-gray-200/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Avatar
                              src={targetUser.photo}
                              name={targetUser.name || 'User'}
                              className="w-10 h-10 ring-2 ring-offset-1 transition-all ring-blue-400/50"
                            />
                          </motion.div>
                          <div>
                            <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>
                              {targetUser.name || `User ${targetUserId.slice(-4)}`}
                            </p>
                            <p className={`text-xs ${dark ? 'text-slate-400' : 'text-gray-500'}`}>
                              {targetUser.isId ? 'Loading...' : `@${targetUser.username || 'user'}`}
                            </p>
                          </div>
                        </div>

                        {!isCurrentUser && !targetUser.isId && (
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => following_status ? handleUnfollow(targetUserId) : handleFollow(targetUserId)}
                            disabled={loading_status}
                            className={`p-2 rounded-lg transition-all min-w-[32px] flex items-center justify-center font-medium text-sm backdrop-blur-sm border ${
                              following_status
                                ? dark
                                  ? 'bg-green-500/20 text-green-400 border-green-400/30 hover:bg-green-500/30'
                                  : 'bg-green-100 text-green-600 border-green-300/50 hover:bg-green-200'
                                : dark
                                  ? 'bg-blue-500/20 text-blue-400 border-blue-400/30 hover:bg-blue-500/30'
                                  : 'bg-blue-100 text-blue-600 border-blue-300/50 hover:bg-blue-200'
                            } ${loading_status ? 'opacity-60 cursor-not-allowed' : ''}`}
                          >
                            {loading_status ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <ImSpinner2 size={14} />
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

            {users.length > 0 && users.length % 10 === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                    dark 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Load more
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </ModalContent>
    </Modal>
  );

  return (
    <div className={`min-h-screen font-['Outfit'] transition-colors duration-500 ${
      dark 
        ? 'bg-slate-900' 
        : 'bg-slate-50'
    }`}>
      <AnimatedBackground dark={dark} />

      {/* Main Layout Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="sticky top-20">
            <SideBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-7 space-y-6">
          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative h-48 overflow-hidden rounded-2xl transition-all duration-500 backdrop-blur-xl border ${
              dark
                ? 'bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-pink-900/40 border-purple-700/30'
                : 'bg-gradient-to-r from-indigo-400/30 via-purple-400/30 to-pink-400/30 border-purple-300/40'
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 opacity-40"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
            </motion.div>
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.05) 40px),
                  repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.05) 40px)
                `
              }} 
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-6 text-xs font-medium tracking-[0.2em] uppercase text-white/50"
            >
              Profile
            </motion.span>
          </motion.div>

          {/* Identity Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-end justify-between -mt-14 mb-6 px-4"
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex-shrink-0"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.6)',
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-indigo-500 via-pink-500 to-amber-500 shadow-2xl"
              >
                <div className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-colors duration-300 backdrop-blur-xl ${
                  dark 
                    ? 'bg-slate-800/80 border-slate-800' 
                    : 'bg-slate-100/80 border-slate-100'
                }`}>
                  <Avatar
                    src={photoPreview || user?.photo}
                    name={user?.name}
                    className="w-full h-full"
                    style={{ opacity: uploadingImage ? 0.5 : 1 }}
                  />
                  {uploadingImage && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-black/35 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-7 h-7 rounded-full border-3 border-white/30 border-t-white"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleUploadImage}
                disabled={uploadingImage}
                className={`absolute bottom-1 right-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-white transition-all backdrop-blur-xl shadow-lg ${
                  dark
                    ? 'bg-slate-900/80 border-slate-100 hover:bg-blue-600'
                    : 'bg-slate-900/80 border-slate-100 hover:bg-blue-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title="Change profile photo"
              >
                <FaCamera className="text-xs" />
              </motion.button>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex gap-2 pb-1"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium shadow-lg backdrop-blur-xl transition-all duration-300 ${
                  dark
                    ? 'bg-slate-800/50 border-slate-700/50 text-slate-200 hover:border-indigo-400/50 hover:bg-indigo-600/20'
                    : 'bg-white/50 border-white/30 text-slate-700 hover:border-indigo-300/50 hover:bg-indigo-100/50'
                }`}
              >
                <motion.div
                  whileHover={{ rotate: -15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaEdit className="text-xs" />
                </motion.div>
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChangePwd(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium shadow-lg backdrop-blur-xl transition-all duration-300 ${
                  dark
                    ? 'bg-slate-800/50 border-slate-700/50 text-slate-200 hover:border-purple-400/50 hover:bg-purple-600/20'
                    : 'bg-white/50 border-white/30 text-slate-700 hover:border-purple-300/50 hover:bg-purple-100/50'
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaLock className="text-xs" />
                </motion.div>
                Password
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Name & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 px-4"
          >
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`font-['Cormorant_Garamond'] text-4xl font-semibold leading-tight mb-1 transition-colors duration-300 ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {user?.name || "User Name"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-sm text-indigo-600 font-normal mb-3 tracking-wide"
            >
              {user?.email || "email@example.com"}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-base leading-relaxed max-w-md font-light transition-colors duration-300 ${
                dark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {user?.bio || "This user has no bio yet."}
            </motion.p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`flex gap-4 mb-10 pb-8 border-b px-4 transition-colors duration-300 ${
              dark ? 'border-slate-700/40' : 'border-slate-200/40'
            }`}
          >
            {/* Posts Stat */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-2 border relative overflow-hidden group transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-2xl ${
                dark
                  ? 'bg-slate-800/40 border-slate-700/40 hover:border-slate-600/50'
                  : 'bg-white/40 border-white/30 hover:border-white/50'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                  dark
                    ? 'bg-gradient-to-br from-indigo-900/30 to-pink-900/20'
                    : 'bg-gradient-to-br from-indigo-100/50 to-pink-100/30'
                }`}
              />
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-sm text-indigo-600 relative z-10"
              >
                <BsGrid3X3 />
              </motion.span>
              <span className={`font-['Cormorant_Garamond'] text-3xl font-semibold leading-none relative z-10 transition-colors duration-300 ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {posts.length}
              </span>
              <span className={`text-xs uppercase tracking-wider font-medium relative z-10 transition-colors duration-300 ${
                dark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Posts
              </span>
            </motion.div>

            {/* Followers Stat - Clickable */}
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewFollowers}
              className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-2 border cursor-pointer relative overflow-hidden group transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-2xl ${
                dark
                  ? 'bg-slate-800/40 border-slate-700/40 hover:border-blue-400/50'
                  : 'bg-white/40 border-white/30 hover:border-blue-300/50'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                  dark
                    ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/20'
                    : 'bg-gradient-to-br from-blue-100/50 to-cyan-100/30'
                }`}
              />
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-blue-500 relative z-10"
              >
                <BsPeopleFill />
              </motion.span>
              <span className={`font-['Cormorant_Garamond'] text-3xl font-semibold leading-none relative z-10 transition-colors duration-300 ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {followersCount}
              </span>
              <motion.span
                className={`text-xs uppercase tracking-wider font-medium relative z-10 transition-colors duration-300 flex items-center gap-1 ${
                  dark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Followers
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3"
                >
                  <FiUsers className="w-3 h-3" />
                </motion.span>
              </motion.span>
            </motion.button>

            {/* Following Stat - Clickable */}
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewFollowing}
              className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-2 border cursor-pointer relative overflow-hidden group transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-2xl ${
                dark
                  ? 'bg-slate-800/40 border-slate-700/40 hover:border-green-400/50'
                  : 'bg-white/40 border-white/30 hover:border-green-300/50'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                  dark
                    ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/20'
                    : 'bg-gradient-to-br from-green-100/50 to-emerald-100/30'
                }`}
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
                className="text-sm text-green-500 relative z-10"
              >
                <BsPersonPlusFill />
              </motion.span>
              <span className={`font-['Cormorant_Garamond'] text-3xl font-semibold leading-none relative z-10 transition-colors duration-300 ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {followingCount}
              </span>
              <motion.span
                className={`text-xs uppercase tracking-wider font-medium relative z-10 transition-colors duration-300 flex items-center gap-1 ${
                  dark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Following
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-3 h-3"
                >
                  <BsPersonCheckFill className="w-3 h-3" />
                </motion.span>
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Posts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-5 px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <h2 className={`font-['Cormorant_Garamond'] text-2xl font-medium italic transition-colors duration-300 ${
                dark ? 'text-slate-200' : 'text-slate-900'
              }`}>
                Posts
              </h2>
              {!postsLoading && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 backdrop-blur-sm border ${
                    dark
                      ? 'bg-slate-800/50 text-slate-400 border-slate-700/30'
                      : 'bg-white/50 text-slate-400 border-white/30'
                  }`}
                >
                  {posts.length} total
                </motion.span>
              )}
            </motion.div>

            {/* Loading State */}
            {postsLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center py-16"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className={`w-8 h-8 rounded-full border-3 ${
                    dark
                      ? 'border-slate-700 border-t-indigo-400'
                      : 'border-slate-200 border-t-indigo-600'
                  }`}
                />
              </motion.div>
            )}

            {/* Empty State */}
            {!postsLoading && posts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col items-center py-16 gap-4 text-center rounded-2xl backdrop-blur-xl border ${
                  dark
                    ? 'bg-slate-800/40 border-slate-700/40'
                    : 'bg-white/40 border-white/30'
                }`}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl transition-colors duration-300 ${
                    dark
                      ? 'bg-slate-800/50 border-slate-700/50 text-slate-500'
                      : 'bg-white/50 border-white/30 text-slate-400'
                  }`}
                >
                  <HiOutlinePhotograph />
                </motion.div>
                <p className={`font-['Cormorant_Garamond'] text-xl transition-colors duration-300 ${
                  dark ? 'text-slate-300' : 'text-slate-800'
                }`}>
                  No posts yet
                </p>
                <p className={`text-sm font-light transition-colors duration-300 ${
                  dark ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Share your first post to get started.
                </p>
              </motion.div>
            )}

            {/* Posts List */}
            {!postsLoading && posts.length > 0 && (
              <div className="flex flex-col gap-4 pb-16">
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id || post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
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