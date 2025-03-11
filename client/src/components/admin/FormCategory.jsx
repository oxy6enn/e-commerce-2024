// rafce

import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  // javascript
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categoies, setCategories] = useState([]);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  // add category
  const handleSubmit = async (e) => {
    //code
    e.preventDefault();
    if (!name) {
      return toast.warning("Please Fill Data!!");
    }
    try {
      const res = await createCategory(token, { name });
      console.log(res.data.name);
      toast.success(`Add Category ${res.data.name} Success!!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  // delete category
  const handleRemove = async (id) => {
    //code
    console.log(id);
    try {
      const res = await removeCategory(token, id);
      console.log(res);
      toast.success(`Deleted Category ${res.data.name} Success!!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
        <button className="bg-blue-500">Add Category</button>
      </form>

      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between my-2">
            <span>{item.name}</span>
            <button
              className="bg-red-500"
              onClick={() => handleRemove(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
