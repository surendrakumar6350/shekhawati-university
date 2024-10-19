import axios from "axios";
import toast, { toastConfig } from 'react-simple-toasts';
toastConfig({ theme: 'dark' });
//all api calls
export const getStudents = async (data: any, page: any) => {
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
    return responseData;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};

export const googlesignup = async (data: any) => {
  try {
    const response = await axios.post(`/api/signup`, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};


export const allUsers = async () => {
  try {
    const response = await axios.post(`/api/allusers`);
    const responseData = response.data;
    return responseData.find;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};

export const getuser = async () => {
  try {
    const response = await axios.post(`/api/verifyuser`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};

export const click = async (data: any) => {
  try {
    const response = await axios.post(`/api/postclick`, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};


export const allSearchJs = async (data: any) => {
  try {
    const response = await axios.post(`/api/allsearch`, data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};

export const logOut = async () => {
  try {
    const response = await axios.post(`/api/logout`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};

export const heroImages = async () => {
  try {
    const response = await axios.post(`/api/HeroImg`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};

export const recentSearches = async () => {
  try {
    const response = await axios.post(`/api/recentlySearchedProfiles`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    toast("Request Failed!! ⚠️⚠️");
    console.error(error);
    return null;
  }
};