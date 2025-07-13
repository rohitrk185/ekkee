"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/welcome");
  }, [router]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Loader size={32} className="text-gray-500" />
      {/* <p className="mt-2 text-sm text-gray-500">Loading...</p> */}
    </div>
  );
}
