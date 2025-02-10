'use client'

import Search from "../components/search";
import TopBar from "../components/top-bar";
import { redirect, useRouter } from 'next/navigation'
import { useAuth } from "../context/AuthContext";
import { logOut } from "../api/authentication";
import { useEffect } from "react";

export default function SearchPage() {

  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // Redirect to login page
    }
  }, [isLoggedIn, router]);

  async function handleLogOut() {
      const response = await logOut();
      if (response) {
        setIsLoggedIn(false);
        redirect("/"); // Ensure logout redirects to login
      }
  }

  return (
    <>
      <TopBar handleLogOut={handleLogOut} />
      <Search />
    </>
  );

}