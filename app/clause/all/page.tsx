"use client";
import React from "react";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const router = useRouter();
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("handleing submit");
    router.push("/");
  }
  return (
    <div className="login">
      <b>All Clauses</b>
    </div>
  );
};

export default UsersPage;
