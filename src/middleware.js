import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function verifyToken(token) {
  try {
    const decodedToken = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET)
    );
    //console.log({ payload: decodedToken.payload });
    const isExpired = isTokenExpired(decodedToken);
    return !isExpired;
  } catch (error) {
    console.error("Error while verifying token:", error);
    return false;
  }
}
function isTokenExpired(decodedToken) {
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedToken) {
    return decodedToken.payload.exp <= currentTime;
  }
  return true;
}
// This function can be marked `async` if using `await` inside
export default async function middleware(request) {
  //console.log("middle ware:", request.url);
  //const {token}=request.cookies
  try{
  const cookieStore = cookies();
  const { value } = cookieStore.get("token");
  const authorized = await verifyToken(value);
  if (authorized) {
    console.log("authorized");
    return NextResponse.next();
  }}
  catch(err){
    return NextResponse.redirect(new URL("/login", request.url));  
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/protected/:path*",
};
