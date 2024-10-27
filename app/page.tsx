"use client";
import Navbar from "@/components/Navbar";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();
  return <main>
    <Navbar />
    <div className="px-3 pt-2">{user ? <h1>{user.email}</h1> : <h1>fasdf</h1>}</div>
  </main>;
}
