"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="w-full sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-4 text-white">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide bg-white bg-clip-text text-transparent hover:opacity-90 transition-all"
        >
          True Feedback 
        </Link>

        {/* Right side */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-3 md:mt-0">
          {session ? (
            <>
              <span className="text-sm text-gray-300">
                hey,{" "}
                <span className="font-semibold text-white">
                  {user?.username || user?.email?.split("@")[0]}
                </span>
              </span>
              <Button
                variant="outline"
                className="border-gray-600 hover:bg-gray-800 bg-gray-800 hover:text-gray-400 transition-all w-full md:w-auto"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-gray-800  text-white transition-all w-full md:w-auto">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
