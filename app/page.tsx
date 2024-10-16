"use client";

import Image from "next/image";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();
  return <main>
    {user ? <h1>{user.email} Give me back my meat sauce</h1> : <h1>fasdf</h1> }
  </main>;
}
