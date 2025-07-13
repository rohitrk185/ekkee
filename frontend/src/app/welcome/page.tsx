// File: /app/welcome/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const translations = {
  en: {
    appName: "Eekee",
    title: "Let’s help you find your Ikigai",
    subtitle: "Take just two minutes",
    getStarted: "Get started",
  },
  es: {
    appName: "Eekee",
    title: "Vamos a ayudarte a encontrar tu Ikigai",
    subtitle: "Solo te tomará dos minutos",
    getStarted: "Comenzar",
  },
} as const;

function WelcomeContent() {
  const router = useRouter();
  const t = translations.en;

  const handleStart = () => {
    router.push("/learn/ikagai");
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-black text-white p-6  mx-auto">
      {/* Top pinned header */}
      <div className="w-[16.4%] mb-4">
        <h1 className="w-full flex items-center justify-start text-lg font-semibold">
          {t.appName}
        </h1>
      </div>
      {/* Centered Title, Subtitle, Button */}
      <div className="flex flex-col flex-grow items-center justify-center text-center">
        <div className="w-[58%] flex items-center justify-center mx-auto">
          <h2 className="font-poppins text-[24px] leading-[30px] font-semibold tracking-normal text-center w-full">
            {t.title}
          </h2>
        </div>
        <p className="font-poppins font-medium text-[16px] leading-[24px] tracking-[0.05em] text-center w-full mt-4">
          {t.subtitle}
        </p>
        <Button
          onClick={handleStart}
          className="w-[293px] h-[45px] bg-white text-black hover:bg-gray-200 rounded-xl text-base font-semibold mt-10"
        >
          {t.getStarted}
        </Button>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return <WelcomeContent />;
}
