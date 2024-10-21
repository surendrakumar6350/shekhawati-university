import { decryptData, encryptData } from "@/utils/encrypt";
import axios from "axios";

const MAX_RETRIES = 5; // Maximum number of retries
const RETRY_DELAY = 1000; // Delay between retries in milliseconds

//all api calls
export const getStudents : any = async (data: any, page: any, retries = MAX_RETRIES) => {
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
    const decriptedResponse = {...responseData , user: decryptData(responseData.user)}
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

export const googlesignup : any = async (data: any, retries = MAX_RETRIES) => {
  try {
    const encryptDataa = encryptData(data);
    const response = await axios.post(`/api/signup`, {__VIR__W: encryptDataa});
    const responseData = response.data;
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


export const allUsers : any = async (retries = MAX_RETRIES) => {
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

export const getuser : any = async (retries = MAX_RETRIES) => {
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

export const click : any = async (data: any, retries = MAX_RETRIES) => {
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


export const allSearchJs : any = async (data: any , retries = MAX_RETRIES) => {
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

export const logOut : any = async (retries = MAX_RETRIES) => {
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
  try {
    const response = await axios.post(`/api/HeroImg`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return heroImages(retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};

export const recentSearches : any = async (retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/recentlySearchedProfiles`);
    const responseData = response.data;
    const decryptedResponse = {...responseData, heroImages: decryptData(responseData.heroImages)  };
    return decryptedResponse;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return recentSearches(retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};

export const recentSignup : any = async (retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(`/api/recentSignup`);
    const responseData = response.data;
    const decriptedResponse = {...responseData, data : decryptData(responseData.data)};
    return decriptedResponse;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      return recentSignup(retries - 1); // Retry the request
    } else {
      console.error(error);
      return null; // Return null if all retries fail
    }
  }
};