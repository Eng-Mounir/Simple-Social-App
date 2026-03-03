import axios from "axios";
import { FaLinux } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function getLoggededUserData() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/profile-data`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}