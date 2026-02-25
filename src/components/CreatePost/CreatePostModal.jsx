import { Modal, ModalContent } from "@heroui/react";
import {
  FaImage,
  FaVideo,
  FaMapMarkerAlt,
  FaSmile,
  FaUserTag,
  FaPaperPlane,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import React, { useRef, useState } from "react";
import defaultImageUser from "../../assets/images/deafultPerson2.jpg";
import { createPost } from "../../services/PostsServices";

export default function CreatePostModal({ isOpen, onOpenChange }) {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInput = useRef();
  const userTextArea = useRef();
  const [posting, setPosting] = useState(false);
  function openFileInput() {
    fileInput.current?.click();
  }

  function chooseFile(e) {
    const file = e?.target?.files?.[0] ?? fileInput.current?.files?.[0];
    if (!file) return;

    // revoke previous preview
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

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);


  async function createPostData() {
    const formData = new FormData();
    if (postText && postText.trim()) {
      formData.append("body", postText.trim());
    }
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      setPosting(true);
      const created = await createPost(formData);
      // clear UI
      setPostText("");
      removeImage();
      if (typeof onOpenChange === "function") onOpenChange(false);
      console.log("gamed y mon");
      return created;
    } catch (error) {
      console.error("createPost failed:", error?.response?.data ?? error);
      try { window.alert("Failed to create post. See console for details."); } catch {}
      return null;
    } finally {
      setPosting(false);
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent className="bg-transparent shadow-none p-0 rounded-3xl">
        {(onClose) => (
          <div className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden max-h-[80vh] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-neutral-800">
              <h2 className="text-lg font-semibold">Create Post</h2>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5 overflow-auto">

              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={defaultImageUser}
                  alt="user"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">John Doe</p>
                  <span className="text-xs text-gray-500">🌍 Public</span>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full resize-none bg-transparent focus:outline-none text-lg placeholder-gray-400"
                rows={2}
                ref={userTextArea}
              />

              {/* Image Preview / Picker */}
              <input
                onChange={chooseFile}
                ref={fileInput}
                type="file"
                accept="image/*"
                hidden
              />

              {previewUrl ? (
                <div className="relative rounded-2xl overflow-hidden h-44">
                  <img src={previewUrl} alt="preview" className="object-cover w-full h-full" />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white bg-opacity-80 text-gray-700 rounded-full p-1 hover:bg-opacity-100"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div
                  onClick={openFileInput}
                  className="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-2xl h-44 flex items-center justify-center text-gray-400 text-sm cursor-pointer"
                >
                  Click to add an image
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-neutral-800" />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-between">
                <ActionButton icon={<FaImage />} label="Photo" color="text-green-500" onClick={openFileInput} />
                <ActionButton icon={<FaVideo />} label="Video" color="text-red-500" />
                <ActionButton icon={<FaUserTag />} label="Tag" color="text-blue-500" />
                <ActionButton icon={<FaMapMarkerAlt />} label="Location" color="text-pink-500" />
                <ActionButton icon={<FaSmile />} label="Feeling" color="text-yellow-500" />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-neutral-800">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={createPostData}
                  disabled={posting || (!postText.trim() && !selectedImage)}
                  className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition 
                    ${
                      postText.trim() || selectedImage
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {posting ? (
                    <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  ) : (
                    <FaPaperPlane />
                  )}
                  <span>{posting ? "Posting..." : "Post"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

function ActionButton({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-sm font-medium"
    >
      <span className={`${color} text-lg`}>{icon}</span>
      {label}
    </button>
  );
}