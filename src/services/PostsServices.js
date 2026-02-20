import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllPosts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      headers: {
        token: localStorage.getItem("token"), // or Authorization: `Bearer ${token}`
      },
    });
    console.log("Posts response:", response); // Debugging log
    return response.data.data.posts; // caller can destructure data
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}
