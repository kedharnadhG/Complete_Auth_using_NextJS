"use client";

import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>

      <hr />
      <h2 className="p-2 rounded text-black bg-orange-500">
        {token ? `Verify email with ${token}` : "No token found"}
      </h2>

      <hr />
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Go to Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-orange-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}