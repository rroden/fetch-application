'use client'
import { useEffect } from "react";
import { redirect, useRouter } from 'next/navigation'
import TopBar from "./components/top-bar";
import { logOut } from "./api/authentication";
import { useAuth } from "./context/AuthContext";
import Login from "./components/login";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/search"); // Redirect to search page
    }
    else {
      router.push("/");
    }
  }, [isLoggedIn]);

  async function handleLogOut() {
    const response = await logOut();
    if (response) {
      setIsLoggedIn(false);
      redirect("/"); // Ensure logout redirects to login
    }
  }

  return (
      <div className="bg-stone-100 text-stone-900 min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col">
        <TopBar handleLogOut={handleLogOut} />
        <Login/>
      </div>
  );
}
