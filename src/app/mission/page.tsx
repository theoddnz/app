import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mission",
  description:
    "TheOddOnes mission: build a focused learning community for people who think differently about learning.",
  path: "/mission",
  keywords: ["TheOddOnes mission", "people who learn differently", "learning community mission"],
});
export default function MissionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <article className="mx-auto mt-20 max-w-3xl px-6 py-16 md:px-8 md:py-24">
        <header className="mb-12">
          <h1 className="font-space text-4xl font-bold leading-tight tracking-[-0.04em] text-foreground/90 md:text-5xl">
            why we&apos;re building this.
          </h1>

          <p className="mt-4 text-sm lowercase text-foreground/50">
            our story
          </p>
        </header>

        <section className="space-y-8 font-space text-base leading-[2] text-foreground/70 md:text-lg">
          <p>
            the internet already has endless tutorials,
            courses, playlists, and guides. that&apos;s not
            the real problem. the real problem is that many
            people finish all of it and still feel stuck
            when building something alone. they know{" "}
            <span className="font-semibold text-foreground">
              what to watch next
            </span>
            , but not{" "}
            <span className="font-semibold text-foreground">
              what to make next
            </span>
            . somewhere along the way, learning became
            passive. people started measuring progress
            through certificates, completion rates,
            streaks, and dashboards instead of real
            understanding. but understanding rarely comes
            from watching someone else solve problems. it
            comes from struggling with them yourself.
            staring at bugs for hours. rebuilding things
            from scratch because the first version was
            wrong. reading documentation nobody explains.
            asking better questions after failing the first
            time. systems were designed to produce workers.
            people who follow instructions. people who
            don&apos;t question things. not builders. not
            thinkers. theoddones is for the people who
            learn differently. the ones who break things,
            question things, and obsess over how things
            work. because understanding doesn&apos;t come
            from watching. it comes from{" "}
            <span className="font-semibold text-foreground">
              building
            </span>
            ,{" "}
            <span className="font-semibold text-foreground">
              failing
            </span>
            ,{" "}
            <span className="font-semibold text-foreground">
              fixing
            </span>
            , and{" "}
            <span className="font-semibold text-foreground">
              repeating
            </span>
            . most people consume. theoddones build.
          </p>

          <div className="mt-12 border-t border-border pt-8">
            <p className="text-lg font-semibold text-foreground">
              not another course platform.
              <br />
              a place for people who learn differently.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
