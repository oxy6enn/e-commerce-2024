import axios from "axios";

export const createProduct = async (token, form) => {
  // code
  return axios.post("http://localhost:5001/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  // code
  return axios.get("http://localhost:5001/api/products/"+count);
};

export const readProduct = async (token, id) => {
  // code
  return axios.get("http://localhost:5001/api/product/"+id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (token, id) => {
  // code
  return axios.delete("http://localhost:5001/api/product/"+id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateProduct = async (token, id, form) => {
  // code
  return axios.put("http://localhost:5001/api/product/"+id,form,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const uploadFiles = async (token, form) => {
  // code

  return axios.post("http://localhost:5001/api/images", {
    image: form
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFiles = async (token, public_id) => {
  // code

  return axios.post("http://localhost:5001/api/removeimages", {
    public_id
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchFilters = async (arg) => {
  // code
  return axios.post('http://localhost:5001/api/search/filters',arg);
};


