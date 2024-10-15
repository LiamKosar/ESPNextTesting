"use client";

import Image from "next/image";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();
  return <main>
    {user ? <h1>{user.email}</h1> : <h1>home</h1> }
  </main>;
}
