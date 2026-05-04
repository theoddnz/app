export type BlogPost = {
  slug: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  featured: boolean;
  author: string;
  dek: string;
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const posts: BlogPost[] = [
  {
    slug: "why-ros2-breaks-you-first",
    tag: "ROS2",
    date: "APR 2025",
    title: "Why ROS2 breaks you before it helps you.",
    excerpt:
      "Everyone who's touched ROS2 has a story. It usually starts with three days of install trouble and ends with something that almost works. That gap is the whole point.",
    readTime: "6 min",
    featured: true,
    author: "TheOddOnes Lab",
    dek: "ROS2 feels unfriendly until you realize it is forcing you to think in systems, messages, contracts, and failure modes.",
    sections: [
      {
        heading: "The first lesson is friction",
        body: [
          "ROS2 does not reward passive learning. You can watch ten tutorials and still freeze the moment a launch file fails. The learning starts when the system refuses to hide its moving parts.",
          "That friction is useful. It teaches you that robotics is never just code. It is timing, naming, dependencies, hardware, logs, and the confidence to isolate one signal at a time.",
        ],
      },
      {
        heading: "Build smaller than your ego wants",
        body: [
          "The correct first robot is not impressive. It is one publisher, one subscriber, one visible change, and a notebook full of what you expected versus what happened.",
          "Once the smallest loop is honest, the bigger system has somewhere to grow from. That is the difference between copying commands and understanding the machine.",
        ],
      },
    ],
  },
  {
    slug: "the-drone-that-crashed-twelve-times",
    tag: "DRONES",
    date: "MAR 2025",
    title: "The drone that crashed twelve times before it flew.",
    excerpt:
      "We tracked every failure on one build. Twelve distinct crashes. Here's what each one taught us and why we'd do it again.",
    readTime: "9 min",
    featured: false,
    author: "Build Crew",
    dek: "A crash log is not a failure record. It is the curriculum, if you are honest enough to read it.",
    sections: [
      {
        heading: "Every crash had a reason",
        body: [
          "The first crash looked dramatic. The fifth looked boring. By the twelfth, the team had stopped asking who caused it and started asking what the system was telling us.",
          "That shift matters. Hardware learning gets better when blame leaves the room and evidence takes its place.",
        ],
      },
      {
        heading: "The fix was rarely the obvious part",
        body: [
          "Sometimes the answer was a loose connector. Sometimes it was a bad assumption about battery sag. Sometimes the code was right and the bench setup was lying.",
          "The drone flew when the debugging process became calmer than the crash.",
        ],
      },
    ],
  },
  {
    slug: "firmware-before-you-understand-it",
    tag: "EMBEDDED",
    date: "MAR 2025",
    title: "Write firmware before you understand it.",
    excerpt:
      "The instinct is to learn first, build second. That instinct is wrong. Here's what happens when you flip the order.",
    readTime: "5 min",
    featured: false,
    author: "TheOddOnes Lab",
    dek: "Understanding arrives faster when your code has to face a board, a clock, and a real output pin.",
    sections: [
      {
        heading: "Start with the blinking thing",
        body: [
          "A blinking LED is not childish. It is proof that your toolchain, board, timing, and mental model are all touching the same reality.",
          "From there, each new concept has a surface to land on. Registers, interrupts, and timing stop being vocabulary and start becoming causes.",
        ],
      },
      {
        heading: "Confusion is a measurement",
        body: [
          "When firmware confuses you, write down exactly where the confusion begins. The sentence usually points to the missing model.",
          "That is why building early works. It turns vague insecurity into a specific question.",
        ],
      },
    ],
  },
  {
    slug: "soldering-is-a-philosophy",
    tag: "HARDWARE",
    date: "FEB 2025",
    title: "Soldering is a philosophy, not a skill.",
    excerpt:
      "Bad joints are not just a technique problem. They are a patience problem. And patience is the one thing robotics will either build in you or destroy.",
    readTime: "4 min",
    featured: false,
    author: "Hardware Desk",
    dek: "The joint tells the truth about heat, pressure, attention, and whether you were rushing.",
    sections: [
      {
        heading: "The board knows your mood",
        body: [
          "A rushed solder joint has a look. Too much solder, too little heat, a pad treated like an obstacle instead of a surface.",
          "Good soldering is quiet work. You prepare, breathe, place the iron, feed the solder, and stop before you turn confidence into damage.",
        ],
      },
      {
        heading: "Repair changes how you build",
        body: [
          "Once you have repaired enough mistakes, you start designing with future repair in mind. Wires get strain relief. Headers get labels. The board becomes readable.",
          "That is the deeper skill: making work that your future self can understand.",
        ],
      },
    ],
  },
  {
    slug: "what-happens-when-the-robot-doesnt-move",
    tag: "DEBUG",
    date: "FEB 2025",
    title: "What happens when the robot doesn't move.",
    excerpt:
      "You've written the code. You've checked the wiring. It still does not move. Here's the actual debugging process, not the clean version.",
    readTime: "7 min",
    featured: false,
    author: "Debug Table",
    dek: "A still robot is not silent. It is giving you a sequence of questions.",
    sections: [
      {
        heading: "Start with power",
        body: [
          "Before you rewrite code, prove the robot is powered correctly. Measure voltage where it matters, not where it is convenient.",
          "Then prove the command exists. Then prove the motor driver hears it. Then prove the motor can respond. Debugging is a chain, not a mood.",
        ],
      },
      {
        heading: "Change one thing",
        body: [
          "The temptation is to fix everything at once. That only creates a new mystery.",
          "Change one thing, record the result, and keep the trail clean enough that someone else could follow it.",
        ],
      },
    ],
  },
  {
    slug: "the-swarm-problem",
    tag: "ADVANCED",
    date: "JAN 2025",
    title: "The swarm problem nobody talks about.",
    excerpt:
      "Multi-agent coordination sounds fascinating until three of your bots are trying to occupy the same square meter. Communication is harder than locomotion.",
    readTime: "11 min",
    featured: false,
    author: "Systems Group",
    dek: "A swarm is not many robots. It is many partial truths trying to become one decision.",
    sections: [
      {
        heading: "Local truth is messy",
        body: [
          "Each robot sees a slice of the world. That slice is delayed, noisy, and sometimes wrong. The swarm problem begins when every unit acts like its slice is complete.",
          "Coordination is the art of making useful decisions without perfect agreement.",
        ],
      },
      {
        heading: "The protocol is the product",
        body: [
          "Movement gets the attention, but messaging carries the system. A weak protocol turns capable robots into confused neighbors.",
          "Design the conversation before you celebrate the choreography.",
        ],
      },
    ],
  },
  {
    slug: "obsession-is-the-only-prerequisite",
    tag: "PHILOSOPHY",
    date: "JAN 2025",
    title: "Obsession is the only prerequisite.",
    excerpt:
      "We do not care what you know. We care whether you keep returning to the problem. That is the baseline. Everything else is learnable.",
    readTime: "3 min",
    featured: false,
    author: "TheOddOnes",
    dek: "Skill matters, but return rate matters more. The learner who keeps coming back becomes dangerous in the best way.",
    sections: [
      {
        heading: "Interest is not enough",
        body: [
          "Interest gets you to the first video. Obsession gets you back after the first confusing error.",
          "The people who grow fastest are not always the most prepared. They are the ones who cannot leave the question alone.",
        ],
      },
      {
        heading: "Make the loop visible",
        body: [
          "Build, break, repair, repeat. That loop is not branding. It is how confidence becomes evidence.",
          "Everything else is just decoration around the work.",
        ],
      },
    ],
  },
];

export const tagColors: Record<string, string> = {
  ROS2: "bg-black text-white dark:bg-white dark:text-black",
  DRONES: "bg-[#f0eeeb] text-black dark:bg-white/10 dark:text-white/75",
  EMBEDDED: "bg-[#f0eeeb] text-black dark:bg-white/10 dark:text-white/75",
  HARDWARE: "bg-[#f0eeeb] text-black dark:bg-white/10 dark:text-white/75",
  DEBUG: "bg-[#f0eeeb] text-black dark:bg-white/10 dark:text-white/75",
  ADVANCED: "bg-black text-white dark:bg-white dark:text-black",
  PHILOSOPHY: "bg-[#f0eeeb] text-black dark:bg-white/10 dark:text-white/75",
};

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
