"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Products = () => {
  const [resProducts, setResProducts] = useState([]);
  const router = useRouter();  
  let _id = 1;
  const getProducts = async () => {
    const response = await fetch(`http://localhost:3000/api/product/list`, {
      method: "GET",
      next: { revalidate: 360 }
    });
    const result = await response.json();
    setResProducts(result.data);
  };
  const newProduct = async () => {
    const response = await fetch(`http://localhost:3000/api/product/create`, {
      method: "POST",
      body: JSON.stringify({
        prdid: _id,
        prdname: "fixture " + _id,
        price: _id * 10000,
        remarks: "machine products",
      }),
      headers: {
        withCredentials: true,
      },
    });
    _id++;
    const data = await response.json();
    console.log(data);
  };
  const productDetail=async (id)=>{
    router.push("/product/"+id);
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <div>
        <button className='btn' style={{ margin: "2px 10px" }} onClick={newProduct}>
          ايجاد محصول جديد
        </button>

        <table style={{ margin:"10px",borderCollapse: "collapse", tableLayout:"fixed",width:"100%"}}>
          <thead>
            <tr>
              <th className="table-th">نام محصول </th>
              <th className="table-th">قيمت </th>
              <th className="table-th">شرح </th>
              <th className="table-th">action</th>
            </tr>
          </thead>
          <tbody>
            {resProducts?.map((product) => (
              <tr key={product.prdid}>
                <td className="table-td">{product.prdname}</td>
                <td className="table-td">{product.price}</td>
                <td className="table-td">{product.remarks}</td>
                <td style={{textAlign:"center"}} className="table-td"><button className='btn'  onClick={()=>productDetail(product.prdid)}>Detail</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Products;
