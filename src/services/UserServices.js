// src/services/UserServices.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Local helper — NOT exported
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

// Get user posts
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

    const payload = response?.data?.data ?? response?.data;
    
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

// Get user suggestions (people to follow)
export async function getUserSuggestions(limit = 10) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/suggestions?limit=${limit}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const payload = response?.data?.data ?? response?.data;
    
    if (Array.isArray(payload?.users)) {
      return payload.users;
    }
    
    if (Array.isArray(payload?.suggestions)) {
      return payload.suggestions;
    }
    
    if (Array.isArray(payload)) {
      return payload;
    }
    
    return [];
  } catch (error) {
    console.error("Failed to fetch user suggestions:", error);
    throw error.response ? error : new Error("Network error");
  }
}

// Follow a user
export async function followUser(userId) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}/follow`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to follow user:", error);
    throw error.response ? error : new Error("Network error");
  }
}

// Unfollow a user
export async function unfollowUser(userId) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}/unfollow`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to unfollow user:", error);
    throw error.response ? error : new Error("Network error");
  }
}

// Get user followers - FIXED based on your API structure
export async function getUserFollowers(userId, page = 1, limit = 50) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/followers?page=${page}&limit=${limit}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const payload = response?.data?.data ?? response?.data;
    
    // Based on your API response, followers might be an array of user IDs
    // You'll need to fetch actual user data for these IDs
    if (Array.isArray(payload?.followers)) {
      // If it's just IDs, you might need to fetch user details for each
      return { users: payload.followers, total: payload.followers.length };
    }
    
    if (payload?.users) {
      return { users: payload.users, total: payload.total || payload.users.length };
    }
    
    if (Array.isArray(payload)) {
      return { users: payload, total: payload.length };
    }
    
    return { users: [], total: 0 };
  } catch (error) {
    console.error("Failed to fetch followers:", error);
    throw error.response ? error : new Error("Network error");
  }
}
// Get users that a user is following - FIXED based on your actual API response
export async function getUserFollowing(userId, page = 1, limit = 50) {
  try {
    // First, get the user's profile to get the following IDs array
    const userResponse = await axios.get(
      `${API_BASE_URL}/users/profile-data`, // This endpoint returns the full user data
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const userData = userResponse.data?.data?.user;
    
    if (!userData || !Array.isArray(userData.following)) {
      return { users: [], total: 0 };
    }

    // Get the following IDs array
    const followingIds = userData.following;
    
    // If there are no following, return empty array
    if (followingIds.length === 0) {
      return { users: [], total: 0 };
    }

    // Since your API doesn't have a bulk endpoint, you might need to:
    // Option 1: Fetch each user individually (if you need full user details)
    // Option 2: Just return the IDs and handle display in the component
    
    // For now, let's return the IDs and let the component handle it
    return { 
      users: followingIds, // Return just the IDs
      total: userData.followingCount || followingIds.length 
    };
    
  } catch (error) {
    console.error("Failed to fetch following:", error);
    throw error.response ? error : new Error("Network error");
  }
}
// In src/services/UserServices.js
export async function getUserById(userId) {
  try {
    // Use profile-data endpoint since it returns the full user data
    const response = await axios.get(
      `${API_BASE_URL}/users/profile-data`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const userData = response.data?.data?.user;
    
    // If the user ID matches the one we're looking for, return it
    if (userData && (userData._id === userId || userData.id === userId)) {
      return userData;
    }
    
    // If it's not the current user, we need another approach
    // For now, return null
    console.warn(`User ${userId} not found - might need a different endpoint`);
    return null;
    
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error.response ? error : new Error("Network error");
  }
}

export async function getUsersByIds(userIds) {
  try {
    // Since we don't have a bulk endpoint, we'll need to use profile-data
    // but that only works for the current user
    
    // For now, return empty array since we can't fetch other users
    console.warn("Cannot fetch other users - need backend endpoint");
    return [];
    
  } catch (error) {
    console.error("Failed to fetch users by IDs:", error);
    throw error;
  }
}