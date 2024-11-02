import { decryptData, encryptData } from "@/utils/encrypt";
import axios from "axios";

const MAX_RETRIES = 5; // Maximum number of retries
const RETRY_DELAY = 1000; // Delay between retries in milliseconds

//all api calls
export const getStudents: any = async (data: any, page: any, retries = MAX_RETRIES) => {
  let str = "/api/find?";
  if (data.name) {
    str += `name=${data.name}&`;
  }
  if (data.fatherName) {
    str += `fatherName=${data.fatherName}&`;
  }
  if (data.address) {
    str += `address=${data.address}&`;
  }
  if (data.course) {
    str += `course=${data.course}&`;
  }
  if (data.mobile) {
    str += `mobile=${data.mobile}&`;
  }
  if (page) {
    str += `page=${page}`;
  }

  try {
    const response = await axios.get(`${str}`);
    const responseData = response.data;
    const decriptedResponse = { ...responseData, user: decryptData(responseData.user) }
    return decriptedResponse;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return getStudents(data, page, retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};

export const googlesignup: any = async (data: any, retries = MAX_RETRIES) => {
  try {
    const encryptDataa = encryptData(data);
    const response = await axios.post(`/api/signup`, { __VIR__W: encryptDataa });
    const responseData = response?.data;
    return responseData;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return googlesignup(data, retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};


export const allUsers: any = async (retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/allusers`);
    const responseData = response.data;
    return responseData.find;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return allUsers(retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};

export const getuser: any = async (retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/verifyuser`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return getuser(retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};

export const click: any = async (data: any, retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/postclick`, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return click(data, retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};


export const allSearchJs: any = async (data: any, retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/allsearch`, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return allSearchJs(data, retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};

export const logOut: any = async (retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/logout`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return logOut(retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};


export const heroImages: any = async (retries = MAX_RETRIES) => {
  const response = await fetch('https://shekhawati-kaa-data.online/api/HeroImg', { cache: "no-store" });
  if (!response.ok) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return heroImages(retries - 1); // Retry the request
    } else {
      return null; // Return null if all retries fail
    }
  }
  const data = await response.json();
  return data;
};

export const recentSearches: any = async (retries = MAX_RETRIES) => {
  const response = await fetch('https://shekhawati-kaa-data.online/api/recentlySearchedProfiles', { cache: "no-store" });
  if (!response.ok) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return recentSearches(retries - 1); // Retry the request
    } else {
      return null; // Return null if all retries fail
    }
  }
  const data = await response.json();
  const decryptedResponse = { ...data, heroImages: decryptData(data.heroImages) };
  return decryptedResponse;
};


export const sendOTP: any = async (data: any, retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/mobile/sendotp`, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return sendOTP(data, retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};

export const verifyOTP: any = async (data: any, retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/mobile/verifyotp`, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return verifyOTP(data, retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};