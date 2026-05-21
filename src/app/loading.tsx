import Image from "next/image";

export default function Loading() {
  return (
    <main className="flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/assets/theoddones-white-logo.png"
          alt="TheOddOnes"
          width={64}
          height={64}
          className="h-16 w-16 animate-pulse object-contain dark:hidden"
          priority
        />
        <Image
          src="/assets/theoddones-black-logo.png"
          alt="TheOddOnes"
          width={64}
          height={64}
          className="hidden h-16 w-16 animate-pulse object-contain dark:block"
          priority
        />
        <p className="font-space text-xs font-medium uppercase tracking-[0.22em] text-foreground/35">
          Loading
        </p>
      </div>
    </main>
  );
}
