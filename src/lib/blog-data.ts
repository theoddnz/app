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
      "We were the kids who learned differently, built weird things, and never quite fit the mold. So we built the place we always wished existed.",
    category: "Community",
    author: "Neel",
    role: "Founder, TheOddOnes",
    date: "Jun 18, 2026",
    readingTime: "5 min read",
    gradient: "from-[#d96e3a] via-[#95431d] to-[#2a1109]",
    featured: true,
    body: [
      {
        type: "p",
        text: "Let me be honest with you. TheOddOnes didn't start as a business plan or a polished pitch deck. It started as a frustration. A quiet, nagging feeling that the way most of us were taught to learn was just... wrong for people like us.",
      },
      {
        type: "p",
        text: "We were the odd ones. The kids who got bored in lectures but stayed up till 3am building something nobody asked for. The ones who couldn't memorize formulas but could take apart a whole system to understand how it actually worked. School called it a problem. We think it was the point.",
      },
      {
        type: "h2",
        text: "The system wasn't built for builders",
      },
      {
        type: "p",
        text: "Most learning is designed around passing tests, not building things. You sit, you absorb, you repeat it back, and then you forget it a week later. It optimizes for looking like you learned something instead of actually being able to do something.",
      },
      {
        type: "p",
        text: "But the people we admired never learned that way. They learned by making a mess, breaking things, getting stuck, and figuring it out anyway. They learned by doing. And every single time, that hands-on, in-the-trenches way of learning stuck far better than any classroom ever did.",
      },
      {
        type: "quote",
        text: "We didn't want to build another course library. We wanted to build the place we wished existed when we were teaching ourselves everything alone at 2am.",
      },
      {
        type: "h2",
        text: "Learning alone is brutal",
      },
      {
        type: "p",
        text: "Here's the part nobody talks about. Teaching yourself is lonely. When you're stuck, there's no one to ask. When you finally ship something, there's no one who gets why it matters. You start to wonder if you're the only one who thinks this way, who cares this much about the weird details.",
      },
      {
        type: "p",
        text: "You're not. There are thousands of us. We just never had a room to find each other in. TheOddOnes is that room — a community where building strange, ambitious things isn't weird, it's the whole point.",
      },
      {
        type: "h2",
        text: "So what is TheOddOnes, really?",
      },
      {
        type: "p",
        text: "It's a learning community for people who learn by building. Not passive videos you half-watch. Real paths that push you to make things, surrounded by people who are doing the same. Here's what we actually care about:",
      },
      {
        type: "list",
        items: [
          "Build first — you learn by making real things, not by memorizing slides.",
          "People over content — the community is the product, not just the lessons.",
          "Honest over polished — we share the messy middle, the failures, the field notes, not just the highlight reel.",
          "Different is welcome — if you've always felt a little out of place, you've found your people.",
        ],
      },
      {
        type: "h2",
        text: "Why now",
      },
      {
        type: "p",
        text: "Because the tools have never been more accessible, and the gatekeepers have never mattered less. You don't need permission, a degree, or the right zip code to build something that matters anymore. You just need a path, a push, and people who believe the way you think is a feature, not a bug.",
      },
      {
        type: "p",
        text: "That's why we started TheOddOnes. Not to fit you into the mold — but to remind you that you were never supposed to. If that sounds like you, welcome. You're one of us now.",
      },
      {
        type: "p",
        text: "If you want to know more, here's the video where we talk about it:",
      },
      {
        type: "video",
        youtubeId: "Bt6i3AT4uMU",
        caption: "Why we started TheOddOnes — the full story.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}
