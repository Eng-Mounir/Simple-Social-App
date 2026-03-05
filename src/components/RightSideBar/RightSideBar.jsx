import React, { useState, useEffect } from 'react';
import { Card, Input, Avatar, Button, Badge } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUsers, 
  FiSearch, 
  FiUserPlus,
  FiUserCheck,
  FiMessageCircle,
  FiStar,
  FiX
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineUserGroup } from "react-icons/hi";
import { toast } from 'react-toastify';
import { getUserSuggestions, followUser, unfollowUser } from '../../services/UserServices';
import { useTheme } from '../../context/ThemeContext';

export default function RightSideBar() {
  const { dark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState({});
  const [ignored, setIgnored] = useState({});

  useEffect(() => {
    fetchSuggestions();
  }, []);

  async function fetchSuggestions() {
    try {
      setLoading(true);
      const data = await getUserSuggestions(10);
      setSuggestions(data);
      
      // Initialize following state
      const followingState = {};
      data.forEach(user => {
        followingState[user._id || user.id] = user.isFollowing || false;
      });
      setFollowing(followingState);
    } catch (err) {
      console.error("Failed to load suggestions:", err);
      toast.error("Failed to load suggestions");
    } finally {
      setLoading(false);
    }
  }

  async function handleFollow(userId) {
    try {
      // Optimistic update
      setFollowing(prev => ({ ...prev, [userId]: true }));
      
      await followUser(userId);
      toast.success("User followed successfully!");
    } catch (err) {
      // Revert on error
      setFollowing(prev => ({ ...prev, [userId]: false }));
      toast.error("Failed to follow user");
    }
  }

  async function handleUnfollow(userId) {
    try {
      // Optimistic update
      setFollowing(prev => ({ ...prev, [userId]: false }));
      
      await unfollowUser(userId);
      toast.success("User unfollowed");
    } catch (err) {
      // Revert on error
      setFollowing(prev => ({ ...prev, [userId]: true }));
      toast.error("Failed to unfollow user");
    }
  }

  function handleIgnore(userId) {
    setIgnored(prev => ({ ...prev, [userId]: true }));
    
    // Optional: You could call an API endpoint for ignore if available
    toast.info("User ignored");
    
    // Remove from suggestions after a short delay
    setTimeout(() => {
      setSuggestions(prev => prev.filter(user => (user._id || user.id) !== userId));
      setIgnored(prev => ({ ...prev, [userId]: false }));
    }, 300);
  }

  // Filter suggestions based on search and ignored
  const filteredSuggestions = suggestions.filter(user => {
    if (ignored[user._id || user.id]) return false;
    
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.username?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <Card className={`border-0 shadow-xl overflow-hidden transition-colors duration-300 ${
      dark 
        ? 'bg-stone-900/90 backdrop-blur-sm border-stone-800' 
        : 'bg-white/90 backdrop-blur-sm border-slate-200'
    }`}>
      
      {/* Header */}
      <div className={`p-4 border-b ${dark ? 'border-stone-800' : 'border-slate-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <HiOutlineSparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className={`font-bold text-lg ${dark ? 'text-white' : 'text-gray-800'}`}>
              Suggestions
            </h3>
          </div>
          {!loading && suggestions.length > 0 && (
            <Badge color="primary" variant="flat" className="text-xs">
              {suggestions.length} new
            </Badge>
          )}
        </div>

        {/* Search */}
        <Input
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<FiSearch className={`w-4 h-4 ${dark ? 'text-stone-400' : 'text-slate-400'}`} />}
          classNames={{
            input: `text-sm ${dark ? 'text-white' : 'text-gray-800'}`,
            inputWrapper: `border-0 ${
              dark 
                ? 'bg-stone-800/50 data-[hover=true]:bg-stone-700/50' 
                : 'bg-slate-100 data-[hover=true]:bg-slate-200'
            }`
          }}
        />
      </div>

      {/* Suggestions List */}
      <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin">
        {loading ? (
          // Loading Skeletons
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className={`p-3 rounded-xl ${dark ? 'bg-stone-800/50' : 'bg-slate-50'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full ${dark ? 'bg-stone-700' : 'bg-slate-200'}`} />
                  <div className="flex-1">
                    <div className={`h-4 w-24 ${dark ? 'bg-stone-700' : 'bg-slate-200'} rounded mb-2`} />
                    <div className={`h-3 w-16 ${dark ? 'bg-stone-700' : 'bg-slate-200'} rounded`} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : filteredSuggestions.length === 0 ? (
          <div className="text-center py-8">
            <div className={`text-4xl mb-3 ${dark ? 'text-stone-600' : 'text-slate-300'}`}>
              <FiUsers className="mx-auto" />
            </div>
            <p className={`text-sm ${dark ? 'text-stone-400' : 'text-slate-500'}`}>
              {searchQuery ? 'No users found' : 'No suggestions available'}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredSuggestions.map((user, index) => {
              const userId = user._id || user.id;
              const isFollowing = following[userId];
              
              return (
                <motion.div
                  key={userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`relative p-3 rounded-xl transition-all ${
                    dark
                      ? 'bg-stone-800/30 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20'
                      : 'bg-slate-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                  }`}>
                    
                    {/* User Info */}
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar 
                          src={user.photo || user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                          name={user.name}
                          className={`w-12 h-12 ring-2 transition-all ${
                            dark
                              ? 'ring-stone-700 group-hover:ring-blue-500/50'
                              : 'ring-white group-hover:ring-blue-200'
                          }`}
                        />
                        {user.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-stone-800" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`font-semibold text-sm truncate ${dark ? 'text-white' : 'text-gray-800'}`}>
                              {user.name}
                            </p>
                            <p className={`text-xs ${dark ? 'text-stone-400' : 'text-slate-500'}`}>
                              @{user.username || user.email?.split('@')[0]}
                            </p>
                          </div>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className={`rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                              dark ? 'text-stone-400 hover:text-white' : 'text-slate-500 hover:text-gray-800'
                            }`}
                            onClick={() => handleIgnore(userId)}
                          >
                            <FiX className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className={`flex items-center gap-1 text-xs ${dark ? 'text-stone-400' : 'text-slate-500'}`}>
                            <FiUsers className="w-3 h-3" />
                            <span>{user.followersCount || user.followers || 0} followers</span>
                          </div>
                          {user.mutualFollowers > 0 && (
                            <div className={`flex items-center gap-1 text-xs ${dark ? 'text-stone-400' : 'text-slate-500'}`}>
                              <FiStar className="w-3 h-3" />
                              <span>{user.mutualFollowers} mutual</span>
                            </div>
                          )}
                        </div>

                        {/* Bio Preview */}
                        {user.bio && (
                          <p className={`text-xs mt-2 line-clamp-1 ${dark ? 'text-stone-500' : 'text-slate-400'}`}>
                            {user.bio}
                          </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => isFollowing ? handleUnfollow(userId) : handleFollow(userId)}
                            className={`flex-1 text-xs border-0 transition-all ${
                              isFollowing
                                ? dark
                                  ? 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                            }`}
                            startContent={isFollowing ? <FiUserCheck className="w-3 h-3" /> : <FiUserPlus className="w-3 h-3" />}
                          >
                            {isFollowing ? 'Following' : 'Follow'}
                          </Button>
                          <Button
                            size="sm"
                            variant="bordered"
                            className={`flex-1 text-xs ${
                              dark
                                ? 'border-stone-700 text-stone-300 hover:border-stone-600'
                                : 'border-slate-300 text-slate-700 hover:border-slate-400'
                            }`}
                            startContent={<FiMessageCircle className="w-3 h-3" />}
                          >
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* View More */}
      {!loading && suggestions.length > 0 && (
        <div className="p-4 pt-0">
          <Button
            variant="light"
            className={`w-full text-sm font-medium transition-all ${
              dark
                ? 'bg-stone-800/50 hover:bg-stone-700/50 text-stone-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            endContent={<HiOutlineUserGroup className={dark ? 'text-stone-400' : 'text-slate-500'} />}
          >
            View all suggestions
          </Button>
        </div>
      )}
    </Card>
  );
}