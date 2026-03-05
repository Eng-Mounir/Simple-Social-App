import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Local helper — NOT exported (was never meant to be)
function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { token } : {};
}

export async function getLoggededUserData() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/profile-data`,
      { headers: authHeader() }
    );
    return response.data.data;
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}

export async function uploadProfileImage(formData) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/upload-photo`,
      formData,
      {
        headers: {
          ...authHeader(),
          // ✅ Do NOT set Content-Type — axios sets multipart/form-data + boundary automatically
        },
      }
    );
    // Normalize response — return the user object regardless of API shape
    return response.data?.data?.user ?? response.data?.data ?? response.data;
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}

// In your services/UserServices.js or PostsServices.js

export async function getUserPosts(userId, page = 1, limit = 20) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/posts?page=${page}&limit=${limit}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    // Handle different response structures
    const payload = response?.data?.data ?? response?.data;
    
    // If posts are in payload.posts
    if (Array.isArray(payload?.posts)) {
      return payload.posts;
    }
    
    if (Array.isArray(payload)) {
      return payload;
    }
    
    if (Array.isArray(payload?.data)) {
      return payload.data;
    }
    
    return [];
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    throw error.response ? error : new Error("Network error");
  }
}