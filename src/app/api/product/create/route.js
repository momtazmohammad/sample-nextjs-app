import dbConnect from "@/../lib/dbConnect";
import Product from "@/../models/product";

export async function POST(request) {
  try {
    await dbConnect();
    const { prdid, prdname, price, remarks } = await request.json();
    await Product.create({
        prdid, prdname, price, remarks
    });

    return new Response(
      JSON.stringify({
        success: true,    
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
