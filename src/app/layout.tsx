"use client";
import "jsvectormap/dist/css/jsvectormap.css";
 import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
   
        {loading ? <Loader/> : children}
      </body>
    </html>
  );
}
