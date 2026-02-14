import axios from "axios";

export async function registerUser(userData) {
  try {
    const response = await axios.post("https://linked-posts.routemisr.com/users/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
} 