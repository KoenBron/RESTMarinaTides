"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../../components/navbar";

export default function Default() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, []);
  return (
    <div
      style={{
        backgroundImage:
          "url('https://marina-tides.com/HBIY/wp-content/uploads/2024/09/page_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Navbar />
      <div className="page-container">
        <h1 className="page-largeText">ALL-IN-ONE CRM OPLOSSING</h1>
        <h2 className="page-smallText">Voor de jachtmakelaardij</h2>
      </div>
    </div>
  );
}
