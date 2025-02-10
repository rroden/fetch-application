'use client'
import { useState } from "react";
import { logIn } from "../api/authentication";
import { useAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";

interface FormData {
    name: string;
    email: string;
}

export default function Login(){
    const { setIsLoggedIn } = useAuth();

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await logIn(formData.name, formData.email)
        if (response === true){
            setIsLoggedIn(true);
            redirect("/search");
        }
      };

    return (
        <div className="h-screen flex justify-center items-center">
        <form className="flex flex-col items-center p-8 gap-4 w-full max-w-md" onSubmit={handleSubmit}>
            <label className="text-lg">
                Name: <input 
                        required={true} 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="border"
                        />
            </label>
            <label className="text-lg">
                Email: <input 
                        required={true} 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="border"
                        />
            </label>
            <button className="text-lg mt-4 cursor-pointer place-self-center rounded-lg border border-solid border-transparent transition-colors bg-stone-300 gap-2 hover:bg-stone-400 py-2 px-4 sm:px-5" type="submit">Login</button>
        </form>
        </div>
    );
}