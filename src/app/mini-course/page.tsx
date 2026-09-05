import type { Metadata } from "next";
import { getChannelShorts } from "@/lib/youtube-shorts";
import { MiniCourseApp } from "@/components/mini-course/MiniCourseApp";

// Standalone, immersive experience - kept out of search and site navigation.
export const metadata: Metadata = {
  title: "Mini-Series Course",
  robots: { index: false, follow: false },
};

export default async function MiniCoursePage() {
  const shorts = await getChannelShorts();

  return (
    <main className="h-dvh w-full overflow-hidden bg-background">
      <MiniCourseApp shorts={shorts} />
    </main>
  );
}
