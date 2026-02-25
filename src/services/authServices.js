import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function registerUser(userData) {
  try {
    // const response = await axios.post("https://route-posts.routemisr.com/users/signup", userData);
    // return response;
     return  await axios.post(API_BASE_URL + "/users/signup", userData);
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
} 

export async function loginUser(loginData) {
  try {
    const response = await axios.post(API_BASE_URL + "/users/signin", loginData);
    return response;
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}

export async function getProfileData() {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile-data`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    // Normalize payload
    const payload = response?.data?.data ?? response?.data;
    return payload;
  } catch (error) {
    console.error("getProfileData API error:", error);
    throw error.response ? error : new Error("Network error");
  }
}

export async function changePassword(currentPassword, newPassword, confirmPassword) {
  try {
    // Backend expects `password` for current password and `newPassword`
    const payload = { password: currentPassword, newPassword };

    const response = await axios.post(`${API_BASE_URL}/users/change-password`, payload, {
      headers: { token: localStorage.getItem("token") },
    });

    return response.data;
  } catch (error) {
    console.error("changePassword API error:", error?.response || error);
    throw error.response ? error : new Error("Network error");
  }
}