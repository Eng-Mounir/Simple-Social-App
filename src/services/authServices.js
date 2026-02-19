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