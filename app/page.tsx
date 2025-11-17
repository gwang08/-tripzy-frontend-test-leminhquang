import { Suspense } from "react";
import Homepage from "@/components/Homepage";
import HomeSkeleton from "@/components/HomeSkeleton";

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Homepage />
    </Suspense>
  );
}
