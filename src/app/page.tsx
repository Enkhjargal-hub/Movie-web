"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card>
        <CardHeader>Movie Name</CardHeader>
        <CardContent onClick={() => push("/detail/2")} className="cursor-pointer">
          Click me to navigate to detail page
        </CardContent>
      </Card>
    </div>
  );
}
