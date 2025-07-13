"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft } from "lucide-react";
import Image from "next/image";
export default function OnboardingSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col">
      {/* <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-light transition"
        >
          <ArrowLeft size={24} className="text-primary" />
        </button>
      </div> */}
      <div className="flex text-center px-4 py-8 justify-center items-center ">
        <h1 className="text-2xl font-semibold text-primary">Eekee</h1>
      </div>
      <div className="flex flex-col items-center justify-center text-center px-6 py-8 space-y-4">
        <Image
          src="/assets/party-popper.svg"
          alt="Celebration"
          width={114}
          height={114}
          className=""
        />
        {/* Heading */}
        <h2 className="text-xl font-semibold">Congratulations!!</h2>
        {/* Subheading */}
        <p className="text-primary text-sm font-semibold">
          Your onboarding is complete. Start your conversation to start your
          self discovery journey.
        </p>
        {/* CTA Button */}
        <Button
          onClick={() =>
            router.push(
              "https://creator.voiceflow.com/prototype/6845655701606e704f0ea542"
            )
          }
          className="flex justify-center items-center min-w-[264px] max-w-[480px] bg-primary text-background rounded-md mt-4 px-4 py-3"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat
        </Button>
      </div>
    </div>
  );
}
