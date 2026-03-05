import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Defined here — no longer imported from anywhere else
function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { token } : {};
}

export async function registerUser(userData) {
  try {
    return await axios.post(API_BASE_URL + "/users/signup", userData);
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}

export async function loginUser(loginData) {
  try {
    return await axios.post(API_BASE_URL + "/users/signin", loginData);
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}

export async function getProfileData() {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile-data`, {
      headers: authHeader(),
    });
    return response?.data?.data ?? response?.data;
  } catch (error) {
    console.error("getProfileData API error:", error);
    throw error.response ? error : new Error("Network error");
  }
}

export async function changePassword(currentPassword, newPassword) {
  const token = localStorage.getItem("token");
  console.log("🔑 Token:", token);
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/change-password`,
      {
        password: currentPassword,
        newPassword: newPassword,
      },
   {
  headers: { token: token }
}
    );
    return response.data;
  } catch (error) {
    console.error("changePassword error:", error?.response ?? error);
    throw error.response ? error : new Error("Network error");
  }
}