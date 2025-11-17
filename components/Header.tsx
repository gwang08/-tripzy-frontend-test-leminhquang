"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header 
      className="w-full" 
      style={{
        background: "linear-gradient(180deg, #F5F8FF 0%, #DBF5FF 100%)",
        height: "495px"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Tripzy Logo"
              width={120}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
