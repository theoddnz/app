import { notFound } from "next/navigation";
import { getLearningPath } from "@/lib/learning";
import Link from "next/link";
import { ArrowLeft, Play, Clock3, Info, Lock } from "@/components/ui/tabler-icons";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { studentHasSelectedPath } from "@/lib/student-learning";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ v?: string }>;
};

export const dynamic = "force-dynamic";

function isDirectVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { v } = await searchParams;
  const path = await getLearningPath(slug);

  if (!path) return { title: "Video not found | TheOddOnes" };

  const activeVideoIndex = v ? parseInt(v as string, 10) : 0;
  const safeIndex =
    isNaN(activeVideoIndex) || activeVideoIndex < 0 || activeVideoIndex >= path.videos.items.length
      ? 0
      : activeVideoIndex;

  const activeVideo = path.videos.items[safeIndex];
  const title = activeVideo ? `${activeVideo.title} - ${path.name}` : path.name;
  const description = `Watch ${title} on TheOddOnes. ${path.description}`;

  return pageMetadata({
    title,
    description,
    path: `/learn/${slug}/watch?v=${safeIndex}`,
    images: activeVideo?.thumbnailUrl ? [activeVideo.thumbnailUrl] : undefined,
    noIndex: true,
  });
}

export default async function WatchPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { v } = await searchParams;
  const path = await getLearningPath(slug);

  if (!path) notFound();

  if (!(await studentHasSelectedPath(path.id))) {
    redirect("/my-learning");
  }

  const activeVideoIndex = v ? parseInt(v as string, 10) : 0;
  const safeIndex =
    isNaN(activeVideoIndex) || activeVideoIndex < 0 || activeVideoIndex >= path.videos.items.length
      ? 0
      : activeVideoIndex;

  const activeVideo = path.videos.items[safeIndex];

  return (
    <main className="min-h-screen bg-background text-foreground font-space pt-28 pb-12">
      {/* Full width container similar to YouTube */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/learn/${slug}`}
          className="mb-6 inline-flex items-center gap-1.5 font-inter text-xs font-semibold text-foreground/40 transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back to {path.name}
        </Link>

        {path.videos.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-24 text-center">
            <Info size={32} className="mb-4 text-foreground/20" />
            <h2 className="font-space text-2xl font-bold">No videos yet</h2>
            <p className="mt-2 font-inter text-sm text-foreground/40">
              Videos are currently being drafted for this course.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] items-start">
            {/* Left Column: Main Player */}
            <div className="flex flex-col gap-6">
              {/* Player */}
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-[#0a0a0a] border border-black/8 dark:border-white/[0.07] relative shadow-lg">
                {activeVideo?.videoUrl && isDirectVideoUrl(activeVideo.videoUrl) ? (
                  <video
                    src={activeVideo.videoUrl}
                    poster={activeVideo.thumbnailUrl || undefined}
                    controls
                    className="h-full w-full bg-black object-contain"
                  />
                ) : activeVideo?.videoUrl ? (
                  <iframe
                    src={activeVideo.videoUrl}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <div className="group flex h-full w-full items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    <div className="text-center text-white">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all group-hover:scale-105 group-hover:bg-white/20">
                        <Play size={32} className="ml-1 text-white" />
                      </div>
                      <p className="font-inter text-xs uppercase tracking-widest text-white/40">Video URL missing</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div>
                <h1 className="font-space text-2xl font-bold sm:text-3xl lg:text-4xl leading-tight">
                  {activeVideo.title}
                </h1>
                <div className="mt-4 flex items-center gap-4 border-b border-black/8 dark:border-white/[0.07] pb-6">
                  <span className={`rounded-full px-3.5 py-1.5 font-inter text-[10px] uppercase tracking-[0.18em] ${
                    activeVideo.status.toLowerCase().includes("available")
                      ? "bg-secondary text-white"
                      : "bg-foreground/7 text-foreground/60 dark:bg-white/10"
                  }`}>
                    {activeVideo.status}
                  </span>
                  <span className="flex items-center gap-1.5 font-inter text-sm text-foreground/50">
                    <Clock3 size={15} strokeWidth={1.8} />
                    {activeVideo.length}
                  </span>
                </div>
                
                {/* Description Box */}
                <div className="mt-6 rounded-2xl border border-black/8 bg-foreground/[0.015] p-6 dark:border-white/[0.07] dark:bg-white/[0.01]">
                   <p className="font-inter text-base leading-relaxed text-foreground/70">
                      {activeVideo.description || path.videos.note}
                   </p>
                   <p className="font-inter text-sm leading-relaxed text-foreground/40 mt-4">
                      {activeVideo.isFallback
                        ? "This fallback appears only when the database has no lesson videos for this path."
                        : <>You are currently viewing video {safeIndex + 1} of {path.videos.items.length} in the <strong className="font-medium text-foreground/60">{path.name}</strong> module.</>}
                   </p>
                </div>
              </div>
            </div>

            {/* Right Column: Playlist Sidebar */}
            <div className="lg:sticky lg:top-28 flex flex-col rounded-2xl border border-black/8 bg-foreground/[0.015] dark:border-white/[0.07] dark:bg-white/[0.01] overflow-hidden">
               <div className="border-b border-black/8 dark:border-white/[0.07] p-5 bg-foreground/[0.01] dark:bg-white/[0.01]">
                  <h3 className="font-space text-lg font-bold">{path.name}</h3>
                  <p className="font-inter text-xs text-foreground/40 mt-1">
                     {safeIndex + 1} / {path.videos.items.length} videos
                  </p>
               </div>
               <div className="flex flex-col overflow-y-auto max-h-[70vh] divide-y divide-black/5 dark:divide-white/[0.05]">
                  {path.videos.items.map((video, index) => {
                     const isActive = index === safeIndex;
                     const isAvailable = video.status.toLowerCase().includes("available");

                     return (
                        <Link
                           key={`${video.title}-${index}`}
                           href={`/learn/${slug}/watch?v=${index}`}
                           className={`group relative flex gap-3 p-4 transition-colors hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04] ${isActive ? 'bg-foreground/[0.05] dark:bg-white/[0.05]' : ''}`}
                        >
                           {/* Video Thumbnail */}
                           <div className="relative aspect-video w-[140px] shrink-0 overflow-hidden rounded-lg bg-[#0a0a0a] border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-foreground/20 dark:group-hover:border-white/20 transition-all">
                              {isActive && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[2px]">
                                   <Play size={20} className="text-secondary fill-secondary" />
                                </div>
                              )}
                              <Play size={18} className={`text-white/20 ${isActive ? 'opacity-0' : 'group-hover:text-white/40 transition-colors'}`} />
                              <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded font-inter text-[9px] text-white">
                                {video.length}
                              </div>
                           </div>

                           <div className="flex-1 flex flex-col justify-start pt-1">
                              <h4 className={`font-space text-sm leading-snug line-clamp-2 ${isActive ? 'font-bold text-foreground' : 'font-medium text-foreground/80'}`}>
                                 {video.title}
                              </h4>
                              <div className="mt-auto pt-2 flex items-center gap-3 font-inter text-[10px] text-foreground/50">
                                 {!isAvailable && (
                                    <span className="flex items-center gap-1 uppercase tracking-wider text-foreground/40 bg-foreground/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                                       <Lock size={10} strokeWidth={2} />
                                       {video.status}
                                    </span>
                                 )}
                              </div>
                           </div>
                        </Link>
                     )
                  })}
               </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
