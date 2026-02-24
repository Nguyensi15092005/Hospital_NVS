import { getCookie } from "../../helpers/cookie";

const API_DOMAIN = "https://hospital-be-full.vercel.app/api/admin/";
// const API_DOMAIN = "http://localhost:3006/api/admin/";




const getToken = () => getCookie("tokenAdmin");
export const get = async (path) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      credentials: "include", // cookie sẽ được gửi
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const post = async (path, options) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      credentials: "include", // cookie sẽ được gửi
      body: JSON.stringify(options),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postCookie = async (path, options) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(options),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleted = async (path) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "DELETE",
      credentials: "include", // cookie sẽ được gửi
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const pacth = async (path, options) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      credentials: "include", // cookie sẽ được gửi
      body: JSON.stringify(options),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
