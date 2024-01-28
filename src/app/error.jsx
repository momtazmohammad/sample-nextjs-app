"use client";
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, []);
  return (
    <div>
      <p>
        خطا در بازیابی / ثبت اطلاعات لطفاارتباط شبکه و یا فیلدهای اطلاعاتی را چک
        نمایید
      </p>
      <button>
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </button>
    </div>
  );
};
export default ErrorPage;
