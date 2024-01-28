import styles from './page.module.css'
import Link from "next/link"

export default function Home() {  
  return (
    <main className={styles.main}>
      <h1>Next App</h1>
      {/* <div style={{display:"flex", flexDirection:"row" }}>
        <button style={{padding:"5px" , margin:"10px"}}><Link href="/About"> About </Link></button>
        <button style={{padding:"5px" , margin:"10px"}}><Link href="/contact"> Contact </Link></button>        
      </div> */}
    </main>
  )
}
