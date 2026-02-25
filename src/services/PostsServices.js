// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export async function getAllPosts() {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/posts`, {
//       headers: {
//         token: localStorage.getItem("token"), // or Authorization: `Bearer ${token}`
//       },
//     });
//     console.log("Posts response:", response); // Debugging log
//     return response.data.data.posts; // caller can destructure data
//   } catch (error) {
//     throw error.response ? error : new Error("Network error");
//   }
// }


// export async function getPostDetails(postId) {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/posts/${postId}`, {
//       headers: {
//         token: localStorage.getItem("token"), 
//       },
//     });
//     console.log("Posts response:", response); // Debugging log
//     return response.data.data.posts; 
//   } catch (error) {
//     throw error.response ? error : new Error("Network error");
//   }
// }


import axios from "axios";
import { FaLinux } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllPosts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return response.data.data.posts;
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}
export async function getPostDetails(postId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    console.log("Post details response:", response.data);

    const payload = response?.data?.data ?? response?.data;

    // Normalize possible shapes:
    // - { data: { posts: [post] } }
    // - { data: { post: post } }
    // - { data: post }
    if (!payload) return null;

    if (Array.isArray(payload.posts) && payload.posts.length > 0) {
      return payload.posts[0];
    }

    if (payload.post) {
      return payload.post;
    }

    // If payload looks like a post already (has _id), return it
    if (payload._id) {
      return payload;
    }

    // Fallback: return payload as-is
    return payload;

  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
}

export async function getPostComments(postId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/posts/${postId}/comments`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data.data.comments;

  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}

export async function getPostLikes(postId, page = 1, limit = 20) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/posts/${postId}/likes?page=${page}&limit=${limit}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data.data.likes || response.data.data || [];
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}

export async function createComment(postId, content) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/posts/${postId}/comments`,
      { content },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    // Try to return the created comment in a few possible shapes
    const payload = response?.data?.data ?? response?.data;
    if (!payload) return null;

    // If API returns { comment: {...} }
    if (payload.comment) return payload.comment;

    // If it returns the comment directly
    if (payload._id) return payload;

    return payload;
  } catch (error) {
    console.error("createComment API error:", error);
    throw error.response ? error : new Error("Network error");
  }
}

export async function createPost(formData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/posts`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
          // Let axios/browser set Content-Type for FormData
        },
      }
    );

    const payload = response?.data?.data ?? response?.data;
    if (!payload) return null;

    if (payload.post) return payload.post;
    if (Array.isArray(payload.posts) && payload.posts.length > 0) return payload.posts[0];
    if (payload._id) return payload;

    return payload;
  } catch (error) {
    console.error("createPost API error:", error);
    throw error.response ? error : new Error("Network error");
  }
}
