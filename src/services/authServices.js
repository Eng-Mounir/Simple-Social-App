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
  // Backend expects `password` for current password and `newPassword`.
  // Some backends may expose different route names; try a list of common variants
  const payload = { password: currentPassword, newPassword };
  const candidatePaths = [
    "/users/change-password",
    "/users/changePassword",
    "/users/password/change",
    "/users/password/change-password",
    "/users/update-password",
  ];

  for (const p of candidatePaths) {
    const url = `${API_BASE_URL}${p}`;
    try {
      console.debug("Attempting changePassword ->", url);
      const response = await axios.post(url, payload, {
        headers: { token: localStorage.getItem("token") },
      });
      console.debug("changePassword success ->", url);
      return response.data;
    } catch (err) {
      const status = err?.response?.status;
      // If route not found, try next candidate; otherwise bubble up
      if (status === 404) {
        console.debug("changePassword route not found (404)", url);
        continue;
      }
      console.error("changePassword API error:", err?.response || err);
      throw err.response ? err : new Error("Network error");
    }
  }

  // If none matched
  const err = new Error("No matching change-password endpoint found on API host");
  console.error(err.message, { apiHost: API_BASE_URL });
  throw err;
}