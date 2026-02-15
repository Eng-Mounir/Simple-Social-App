import axios from "axios";

export async function registerUser(userData) {
  try {
    const response = await axios.post("https://linked-posts.routemisr.com/users/signup", userData);
    return response;
    //   return  await axios.post("https://linked-posts.routemisr.com/users/signup", userData);
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
} 

export async function loginUser(loginData) {
  try {
    const response = await axios.post("https://linked-posts.routemisr.com/users/signin", loginData);
    return response;
  } catch (error) {
    throw error.response ? error : new Error("Network error");
  }
}