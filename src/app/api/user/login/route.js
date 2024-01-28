import dbConnect from "@/../lib/dbConnect";
import User from "@/../models/user";
const bcrypt = require("bcrypt");
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request) {
  await dbConnect();
  const body = await request.json();

  const { email, userpass } = body;
  if (await isValidCredentials(email, userpass)) {
    const user = await User.findOne({ email });

    const token = await generateToken({
      email,
      userid: user.userid,
      username: user.username,
    });
    const response = NextResponse.json({
      success: true,
    });
    setTokenCookie(response.cookies, token);

    return response;
  }

  return NextResponse.json({ success: false });
}

async function generateToken(userInfo) {
  const token = await new SignJWT(userInfo)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3m")
    .sign(new TextEncoder().encode(process.env.SECRET));

  return token;
}

function setTokenCookie(cookieJar, token) {
  cookieJar.set({ name: "token", value: token, httpOnly: true, path: "/" });
}

async function isValidCredentials(email, userpass) {
  const user = await User.findOne({ email });

  return user && (await bcrypt.compare(userpass, user?.userpass));
}
