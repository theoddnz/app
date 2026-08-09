import { getChannelShorts } from "@/lib/youtube-shorts";
import YouTubeShortsList from "./YouTubeShortsList";

const CHANNEL_URL = "https://www.youtube.com/@TheOddOneshub";
const SUBSCRIBE_URL = `${CHANNEL_URL}?sub_confirmation=1`;

// Only show the newest Shorts; the list auto-refreshes as new ones are posted.
const MAX_VISIBLE_SHORTS = 5;

export default async function YouTubeShorts() {
  const shorts = (await getChannelShorts()).slice(0, MAX_VISIBLE_SHORTS);

  if (shorts.length === 0) return null;

  return (
    <section className="bg-background px-4 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="inline-flex items-center rounded-full border border-border/60 bg-muted px-3 py-1 font-space text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            From our channel
          </p>

          <h2 className="mt-4 font-space text-3xl font-extrabold tracking-tight text-foreground/80 md:text-[42px] md:leading-[1.1]">
            Fresh <span className="text-[#c4622d]">Shorts.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-space text-[15px] leading-relaxed text-muted-foreground">
            Quick build-first robotics moments, notes, and behind-the-scenes clips.
            Tap any short to play it right here.
          </p>
        </div>

        <YouTubeShortsList shorts={shorts} subscribeUrl={SUBSCRIBE_URL} />
      </div>
    </section>
  );
}
