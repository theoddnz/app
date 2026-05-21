import Image from "next/image";

export default function UsersLoading() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-background px-6 text-foreground">
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/assets/theoddones-white-logo.png"
          alt="TheOddOnes"
          width={56}
          height={56}
          className="h-14 w-14 animate-pulse object-contain dark:hidden"
          priority
        />
        <Image
          src="/assets/theoddones-black-logo.png"
          alt="TheOddOnes"
          width={56}
          height={56}
          className="hidden h-14 w-14 animate-pulse object-contain dark:block"
          priority
        />
        <p className="font-space text-xs font-medium uppercase tracking-[0.22em] text-foreground/35">
          Loading
        </p>
      </div>
    </main>
  );
}
