import dbConnect from "@/../lib/dbConnect";
import productModel from "@/../models/product";
import { cache } from 'react'

export const revalidate = 3600 // revalidate the data at most every hour
 
const  getproduct=cache(async (id)=>{
    let resproduct;
    try {
      await dbConnect();
      resproduct = await productModel.find({ prdid: id }).select({        
        __v: 0,
      });
    } catch (err) {
      resproduct = [];
    }
    return resproduct
  })
  
export default async function Page({ params: { id } }) {
    const resproduct=await getproduct(id);
    const {prdname,price,remarks}=resproduct[0]
    return (
        <div className="card" style={{ marginLeft: "10px", maxWidth: "300px", marginBottom: "10px" ,borderRadius: "5px 5px 0px 0px" }}>
          <div className="card-container">            
            <h3 style={{margin:"10px",textAlign:"center"}}>
            <b >product details</b>
          </h3>
            <p style={{marginTop:"10px"}}><span style={{fontWeight:"600"}}>product name:</span> {prdname}</p>
            <p style={{marginTop:"10px"}}><span style={{fontWeight:"600"}}>price:</span> {price}</p>
            <p style={{margin:"10px 0px 10px"}}><span style={{fontWeight:"600"}}>remarks:</span> {remarks}</p>
            </div>
        </div>
    )
  
  
}