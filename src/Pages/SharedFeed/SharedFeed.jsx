// src/Pages/SharedFeed/SharedFeed.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiShareForwardLine, RiFilterLine } from 'react-icons/ri';
import SharedPostCard from '../../components/SharedPost/SharedPostCard';
import { getSharedPosts } from '../../services/PostsServices';

export default function SharedFeed() {
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, from-following, my-shares

  useEffect(() => {
    fetchSharedPosts();
  }, [filter]);

  async function fetchSharedPosts() {
    try {
      setLoading(true);
      const data = await getSharedPosts({ filter });
      setShares(data);
    } catch (error) {
      console.error('Failed to fetch shared posts:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
            <RiShareForwardLine size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Shared Posts</h1>
            <p className="text-sm text-slate-400">Posts shared by the community</p>
          </div>
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-slate-300">
            <RiFilterLine />
            <span className="text-sm capitalize">{filter.replace('-', ' ')}</span>
          </button>
          
          {/* Dropdown menu - you can make this a proper dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-[rgba(18,18,24,0.95)] border border-white/10 rounded-lg shadow-xl">
            {['all', 'from-following', 'my-shares'].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/5 capitalize"
              >
                {option.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shares list */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-12"
          >
            <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          </motion.div>
        ) : shares.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <RiShareForwardLine className="text-2xl text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No shared posts yet</h3>
            <p className="text-sm text-slate-400">
              When someone shares a post, it will appear here
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {shares.map((share) => (
              <SharedPostCard key={share._id} share={share} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}