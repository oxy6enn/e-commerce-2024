import axios from "axios";

export const createProduct = async (token, form) => {
  // code
  return axios.post("http://localhost:5001/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (token, count = 20) => {
  // code
  return axios.get("http://localhost:5001/api/products/"+count,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
