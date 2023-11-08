"use client";
import PreferencesForm from "@/components/forms/PreferencesForm";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <main className="w-full">
      <PreferencesForm />
    </main>
  );
};
export default page;
