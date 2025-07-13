// File: /app/welcome/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/learn/ikagai");
  };

  return (
    <div className="w-[360px] h-[721px] flex flex-col bg-black text-white p-6 max-w-md mx-auto">
      {/* Top pinned header */}
      <div className="w-[16.4%] mb-4">
        <h1 className="w-full flex items-center justify-start text-lg font-semibold">
          Eekee
        </h1>
      </div>

      {/* Centered Title, Subtitle, Button */}
      <div className="flex flex-col flex-grow items-center justify-center text-center">
        <div className="w-[53.9%] flex items-center justify-center mx-auto">
          <h2 className="font-poppins text-[24px] leading-[30px] font-semibold tracking-normal text-center w-full">
            Let’s help you find your Ikigai
          </h2>
        </div>
        <p className="font-poppins font-medium text-[16px] leading-[24px] tracking-[0.05em] text-center w-full mt-4">
          Take just two minutes
        </p>
        <Button
          onClick={handleStart}
          className="w-[293px] h-[45px] bg-white text-black hover:bg-gray-200 rounded-xl text-base font-semibold mt-10"
        >
          Get started
        </Button>
      </div>
    </div>
  );
}
