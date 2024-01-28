"use client"
import { useRouter } from 'next/navigation'
export default function About() {
    const router=useRouter();
  return (
    <div>
      <p style={{margin:"5px"}}>About Page</p>
     <button className='btn' style={{margin:"5px"}} onClick={()=>router.push("/blogs")}> blogs </button>
    </div>
  )
}
