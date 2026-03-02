import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function CardBody({ post }) {
  const { body, image } = post || {};
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate = body?.length > 300;
  const displayText = expanded || !shouldTruncate ? body : body?.slice(0, 300) + "...";

  return (
    <div className="px-4 pb-2">
      <div className="relative">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
          {displayText}
        </p>
        
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-1 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:opacity-95 transition-opacity"
        >
          <img
            src={image}
            alt="Post content"
            className="w-full max-h-[500px] object-cover"
            loading="lazy"
          />
        </motion.div>
      )}
    </div>
  );
}