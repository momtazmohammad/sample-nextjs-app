import dbConnect from "@/../lib/dbConnect";
import User from "@/../models/user";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await dbConnect();
    const { userid, username, email, userpass } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(userpass, 10);
    await User.create({
      userid,
      username,
      email,
      userpass: hashedPassword,
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
