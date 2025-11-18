import { Suspense } from "react";
import Homepage from "@/components/Homepage/Homepage";
import HomeSkeleton from "@/components/Homepage/HomeSkeleton";

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Homepage />
    </Suspense>
  );
}
