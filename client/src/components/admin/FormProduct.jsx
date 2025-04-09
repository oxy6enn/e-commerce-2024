// rafce

import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  console.log(products);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    //code
    getCategory(token);
    getProduct(token, 100);
  }, []);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      // console.log(res);
      setForm(initialState)
      getProduct(token)
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('ต้องการลบข้อมูลหรือไม่')){
      // console.log(id);
      try{
        //code
        const res = await deleteProduct(token, id);
        console.log(res)
        toast.success(`Deleted สินค้าเรียบร้อยแล้ว`)
        getProduct(token)
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      FormProduct
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
          name="title"
        />
        <input
          className="border"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
        />
        <input
          type="number"
          className="border"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
        />
        <input
          type="number"
          className="border"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
          name="quantity"
        />
        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="">Please Select</option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />

        {/* uploadfile */}
        <Uploadfile form={form} setForm={setForm} />

        <button className="bg-blue-500">เพิ่มสินค้า</button>

        <br />
        <hr />
        <br />

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">รูปสินค้า</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">ขายได้</th>
              <th scope="col">วันที่อัปเดท</th>
              <th scope="col">แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              // console.log(item.images[0].url);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {item.images.length > 0 ? (
                      <img
                        className="w-24 h-24 rounded-lg shadow-md"
                        src={item.images[0].url}
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-md 
                      flex items-center justify-center shadow-sm">
                        No Image
                      </div>
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sold}</td>
                  <td>{item.updatedAt}</td>
                  <td className="flex gap-2">
                    <p className="bg-yellow-500 rounded-md p-1 shadow-md mx-2">
                      <Link to={"/admin/product/" + item.id}>แก้ไข</Link>
                    </p>
                    <p 
                    className="bg-red-500 rounded-md p-1 shadow-md mx-2"
                    onClick={()=>handleDelete(item.id)}
                    >ลบ</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
