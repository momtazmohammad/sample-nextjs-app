import dbConnect from "@/../lib/dbConnect";
import Product from "@/../models/product";

export async function GET(request) {
  try {
    await dbConnect();
    const resProducts = await Product.find({}).select({
        __v: 0,
      });
    return new Response(
      JSON.stringify({
        success: true,   
        data: resProducts
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
