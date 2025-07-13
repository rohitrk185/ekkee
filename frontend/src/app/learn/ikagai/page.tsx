"use client";

import WordSeparator from "@/components/ui/wordSeperator";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function IkigaiDefinitionPage() {
  const router = useRouter();

  //handler for go next
  const handleNavigate = () => {
    router.push("/onboarding");
  };

  // handler for the page click
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("button")) return;
    handleNavigate();
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-start bg-white text-black p-6 mx-auto relative cursor-pointer"
      onClick={handleContainerClick}
    >
      {/* Top-right arrow button */}
      <button
        onClick={handleNavigate}
        aria-label="Go to onboarding"
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/10 transition"
      >
        <ArrowRight size={24} />
      </button>

      {/* 生きがい - Japanese text */}
      <h1
        className="font-shippori text-3xl text-[50px] leading-[24px] text-center mt-[233px]"
        // style={{ fontFamily: "Shippori Mincho B1, serif" }}
      >
        生きがい
      </h1>

      {/* Ikigai */}
      <h2
        className="font-[600] text-[40px] leading-[24px] text-center mt-[50px]"
        style={{ fontFamily: "Shippori Mincho B1, serif" }}
      >
        Ikagai
      </h2>

      {/* [ik-ee-guy] noun */}
      <WordSeparator
        text="[ik-ee-guy] Japanese noun"
        className="text-[14px] leading-[24px] text-center text-[#5D5D5D] mt-[18px]"
      />

      {/* Black container with definition */}
      <div className="bg-black text-white w-[293px] h-[93px] rounded-[8px] flex items-center justify-center mt-[24px] p-4">
        <p className="font-poppins font-medium text-[14px] leading-[24px] text-center">
          A reason for being; having a sense of purpose in life and a feeling of
          well-being
        </p>
      </div>
    </div>
  );
}
