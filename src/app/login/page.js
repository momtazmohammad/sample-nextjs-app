"use client";
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();  
  const user={userid:"123",username:"momtaz",userpass:"123456",email:"momtaz@gmail.com"}

    const signin = async () => {
    const response = await fetch(
      `http://localhost:3000/api/user/login`,{
        method: "POST",
        body:JSON.stringify({
        userid: user.userid,
        userpass: user.userpass,
        email:user.email
      }),
      headers:{
        withCredentials: true,
      }
    }
    );
    const data=await response.json()
    console.log(data)
    router.push("/");
  };
  const register = async () => {
    const response = await fetch(
      `http://localhost:3000/api/user/register`,{
        method: "POST",
        body:JSON.stringify({
        userid: user.userid,
        userpass: user.userpass,
        username:user.username,
        email:user.email
      }),
      headers:{
        withCredentials: true,
      }
    }
    );
    const data=await response.json()
    console.log(data)
    router.push("/");
  };
  return (
    <div>
      <p style={{ margin: "10px" }}>login Page</p>
      <button className='btn' style={{ margin: "10px" }} onClick={signin}>        
        ورود
      </button>
      <button className='btn' style={{ margin: "10px" }} onClick={register}>
        رجيستر
      </button>
    </div>
  );
}
