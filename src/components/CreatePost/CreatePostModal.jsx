import { Modal, ModalContent, Button, Avatar, Divider } from "@heroui/react";
import {
  FaImage,
  FaVideo,
  FaMapMarkerAlt,
  FaSmile,
  FaUserTag,
  FaPaperPlane,
  FaTimes,
  FaGlobe,
  FaLock,
  FaUsers
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultImageUser from "../../assets/images/deafultPerson2.jpg";
import { createPost } from "../../services/PostsServices";

export default function CreatePostModal({ isOpen, onOpenChange }) {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [posting, setPosting] = useState(false);
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  
  const fileInput = useRef();
  const textareaRef = useRef();

  const privacyOptions = [
    { value: "public", label: "Public", icon: FaGlobe, color: "text-green-500" },
    { value: "friends", label: "Friends", icon: FaUsers, color: "text-blue-500" },
    { value: "private", label: "Only me", icon: FaLock, color: "text-red-500" },
  ];

  function openFileInput() {
    fileInput.current?.click();
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    
    const url = URL.createObjectURL(file);
    setSelectedImage(file);
    setPreviewUrl(url);
  }

  function removeImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedImage(null);
    setPreviewUrl("");
    if (fileInput.current) fileInput.current.value = null;
  }

  async function createPostData() {
    const formData = new FormData();
    if (postText?.trim()) {
      formData.append("body", postText.trim());
    }
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("privacy", privacy);

    try {
      setPosting(true);
      const created = await createPost(formData);
      setPostText("");
      removeImage();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setPosting(false);
    }
  }

  const currentPrivacy = privacyOptions.find(opt => opt.value === privacy);

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-transparent",
        wrapper: "backdrop-blur-md",
      }}
    >
      <ModalContent className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
        {(onClose) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Post
              </h2>
              <Button
                isIconOnly
                variant="light"
                onClick={onClose}
                className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FaTimes />
              </Button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 max-h-[60vh] overflow-y-auto scrollbar-thin">
              
              {/* User Info & Privacy */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar 
                    src={defaultImageUser} 
                    className="w-12 h-12 ring-2 ring-blue-100 dark:ring-blue-900"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <div className="relative">
                      <button
                        onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        {currentPrivacy && (
                          <>
                            <currentPrivacy.icon className={`w-3 h-3 ${currentPrivacy.color}`} />
                            <span>{currentPrivacy.label}</span>
                          </>
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {showPrivacyMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50"
                          >
                            {privacyOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setPrivacy(option.value);
                                  setShowPrivacyMenu(false);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 first:rounded-t-xl last:rounded-b-xl"
                              >
                                <option.icon className={`w-4 h-4 ${option.color}`} />
                                <span>{option.label}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                
                <Button
                  isIconOnly
                  variant="light"
                  className="rounded-full"
                >
                  <HiDotsHorizontal />
                </Button>
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full resize-none bg-transparent border-0 focus:ring-0 text-lg placeholder-slate-400 dark:placeholder-slate-600 min-h-[120px] outline-none"
                autoFocus
              />

              {/* Image Preview */}
              <AnimatePresence>
                {previewUrl && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800"
                  >
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full max-h-96 object-contain bg-slate-100 dark:bg-slate-900"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-slate-900/50 hover:bg-slate-900/70 backdrop-blur-sm text-white rounded-full transition-colors"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hidden file input */}
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Divider */}
              <Divider className="my-4" />

              {/* Add to Post */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Add to your post</p>
                <div className="flex flex-wrap gap-2">
                  <ActionButton2 
                    icon={<FaImage />} 
                    label="Photo" 
                    color="text-green-500"
                    onClick={openFileInput}
                  />
                  <ActionButton2 
                    icon={<FaVideo />} 
                    label="Video" 
                    color="text-red-500"
                  />
                  <ActionButton2 
                    icon={<FaUserTag />} 
                    label="Tag" 
                    color="text-blue-500"
                  />
                  <ActionButton2 
                    icon={<FaMapMarkerAlt />} 
                    label="Location" 
                    color="text-pink-500"
                  />
                  <ActionButton2 
                    icon={<FaSmile />} 
                    label="Feeling" 
                    color="text-yellow-500"
                  />
                  <ActionButton2 
                    icon={<BsEmojiSmile />} 
                    label="Activity" 
                    color="text-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex gap-3">
                <Button
                  variant="bordered"
                  onPress={onClose}
                  className="flex-1 border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={createPostData}
                  isLoading={posting}
                  isDisabled={!postText?.trim() && !selectedImage}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                  startContent={!posting && <FaPaperPlane className="w-4 h-4" />}
                >
                  {posting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </ModalContent>
    </Modal>
  );
}

function ActionButton2({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105"
    >
      <span className={`${color} text-lg`}>{icon}</span>
      <span className="text-sm font-medium hidden sm:block">{label}</span>
    </button>
  );
}