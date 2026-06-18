export type Category = "Guides" | "Engineering" | "Product" | "Community";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: string;
  role: string;
  date: string;
  readingTime: string;
  gradient: string;
  featured?: boolean;
  /** Article body as an array of blocks, rendered on the detail page. */
  body: Block[];
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "video"; youtubeId: string; caption?: string };

export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Guides",
  "Engineering",
  "Product",
  "Community",
];

export const POSTS: Post[] = [
  {
    slug: "why-we-started-theoddones",
    title: "Why we started TheOddOnes?",
    excerpt:
      "A few years back I was just a guy trying to get into robotics with no clear plan and no one to guide me. Here is why that led me to build The Odd Ones.",
    category: "Community",
    author: "Karthik",
    role: "Founder, TheOddOnes",
    date: "Jun 18, 2026",
    readingTime: "4 min read",
    gradient: "from-[#d96e3a] via-[#95431d] to-[#2a1109]",
    featured: true,
    body: [
      {
        type: "p",
        text: "So a few years back, I was just a guy trying to get into robotics. No clear plan. No one to tell me what to do next. Just me, my laptop, and a hundred browser tabs open at 2am.",
      },
      {
        type: "p",
        text: "If that is you right now, this one is for you.",
      },
      {
        type: "p",
        text: "I am Karthik. These days I work as a systems and robotics engineer at Haveli UAVs, building aerial robotics. I have spent time around sensor integration, software architecture, some vision systems, and a lot of ROS2.",
      },
      {
        type: "p",
        text: "For about 2.5 years now I have been deep in flight controllers, microcontrollers, different operating systems, simulation, and all the messy stuff in between. So trust me, I have seen how confusing this world can be when you are new.",
      },
      {
        type: "h2",
        text: "Here is the problem",
      },
      {
        type: "p",
        text: "When I started, it was overwhelming. Honestly, it felt like too much. There was so much to learn and no clear place to begin.",
      },
      {
        type: "p",
        text: "And the internet does not make it easier. You search one thing and you get a hundred blogs, a thousand youtube videos, random docs, half of them outdated. You end up more lost than when you started. I know that feeling because I lived it.",
      },
      {
        type: "p",
        text: "I got lucky though. I had a few good people around me who pushed me, answered my dumb questions, and helped me keep going. That changed everything for me.",
      },
      {
        type: "quote",
        text: "Real learning happens when you break things, get stuck, and figure it out anyway.",
      },
      {
        type: "h2",
        text: "So I decided to build something",
      },
      {
        type: "p",
        text: "I wanted to build a place that actually helps you understand robotics and ROS2. Not scattered links. Not videos you half watch and forget. A real place where things make sense and you are not doing it alone.",
      },
      {
        type: "p",
        text: "And that is how The Odd Ones started.",
      },
      {
        type: "h2",
        text: "What is The Odd Ones",
      },
      {
        type: "p",
        text: "It is more than just another learning platform. It is a community for curious builders, engineers, creators, and the people who like to break things and figure out how they work.",
      },
      {
        type: "p",
        text: "It does not matter if you are into robotics, drones, autonomous systems, embedded, computer vision, AI, or anything that helps you build something real. The idea is simple. Learning should not stop at watching a video. It should keep going through building, trying things, failing, and sharing.",
      },
      {
        type: "p",
        text: "Because real learning happens when you build something of your own.",
      },
      {
        type: "p",
        text: "So that is why I started this. If any of this sounds like you, you are already one of us.",
      },
      {
        type: "p",
        text: "If you want to hear the full thing, here is the video. I will see you in the next one.",
      },
      {
        type: "video",
        youtubeId: "Bt6i3AT4uMU",
        caption: "Why we started The Odd Ones.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}
