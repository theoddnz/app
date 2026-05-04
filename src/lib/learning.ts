export type LearningPath = {
  slug: string;
  name: string;
  label: string;
  description: string;
  outcome: string;
  pace: string;
  signal: string;
  thumbnailNote: string;
  curriculum: string[];
  articles: {
    title: string;
    excerpt: string;
    type: string;
    readTime: string;
  }[];
  videos: {
    available: boolean;
    note: string;
    items: {
      title: string;
      length: string;
      status: string;
    }[];
  };
};

export const learningPaths: LearningPath[] = [
  {
    slug: "go-lang",
    name: "Go Lang",
    label: "Systems",
    description:
      "Learn Go by building the small tools real teams actually keep: CLIs, APIs, workers, tests, and clean concurrency patterns.",
    outcome: "Ship a production-style service with logs, tests, graceful shutdown, and a deployable shape.",
    pace: "4 lab sprints",
    signal: "Fast feedback, tiny programs, real constraints.",
    thumbnailNote: "Thumbnail slot reserved",
    curriculum: [
      "Go syntax through command-line utilities",
      "Structs, interfaces, errors, and package design",
      "HTTP services, middleware, and JSON APIs",
      "Goroutines, channels, context, and cancellation",
      "Testing, benchmarks, and release-ready project structure",
    ],
    articles: [
      {
        title: "Write the boring Go first",
        excerpt:
          "The quickest way to understand Go is to stop decorating it. Start with plain functions, sharp errors, and code that survives reading twice.",
        type: "Field note",
        readTime: "5 min",
      },
      {
        title: "Concurrency is a design problem",
        excerpt:
          "Goroutines are easy to start and hard to own. This note treats cancellation and ownership as the real curriculum.",
        type: "Deep dive",
        readTime: "8 min",
      },
    ],
    videos: {
      available: true,
      note: "Studio walkthroughs are planned as short build-alongs, not long lecture dumps.",
      items: [
        { title: "Build a log parser in Go", length: "18 min", status: "Available soon" },
        { title: "Context cancellation without panic", length: "14 min", status: "Drafting" },
      ],
    },
  },
  {
    slug: "robotics",
    name: "Robotics",
    label: "Hardware",
    description:
      "A hands-on path for people who learn by wiring, breaking, debugging, and making the robot move for reasons they can explain.",
    outcome: "Build a working robot loop: sense, decide, actuate, log, and debug the failure trail.",
    pace: "6 build sprints",
    signal: "Circuit dust, code traces, and proof that it moved.",
    thumbnailNote: "Thumbnail slot reserved",
    curriculum: [
      "Robot anatomy: sensors, actuators, controllers, and power",
      "Microcontroller basics and safe bench habits",
      "ROS2 mental models, nodes, topics, and launch files",
      "Motor control, sensor fusion, and calibration",
      "Debugging dead robots with logs, meters, and patience",
    ],
    articles: [
      {
        title: "The robot did not fail. Your assumption did.",
        excerpt:
          "Most robotics bugs are not mysterious. They are untested assumptions hiding between code, voltage, and physics.",
        type: "Build log",
        readTime: "7 min",
      },
      {
        title: "ROS2 before confidence",
        excerpt:
          "You do not need to feel ready for ROS2. You need a tiny system, one topic, and the courage to inspect every message.",
        type: "Guide",
        readTime: "9 min",
      },
    ],
    videos: {
      available: true,
      note: "Video sessions focus on bench work, debugging passes, and build reviews.",
      items: [
        { title: "From dead wheel to first motion", length: "22 min", status: "Available soon" },
        { title: "Reading ROS2 topic flow", length: "16 min", status: "Planned" },
      ],
    },
  },
  {
    slug: "manual-testing",
    name: "Manual Testing",
    label: "Quality",
    description:
      "Manual testing taught as investigative work: observe the product, form a theory, pressure the edges, and write bugs people can fix.",
    outcome: "Create a test charter, run exploratory sessions, and publish clean reports with reproduction steps.",
    pace: "3 investigation sprints",
    signal: "Curiosity, evidence, and bug reports that do not waste anyone's time.",
    thumbnailNote: "Thumbnail slot reserved",
    curriculum: [
      "Product reading, risk mapping, and test charters",
      "Exploratory testing sessions and note taking",
      "Boundary values, negative paths, and state transitions",
      "Bug reports with evidence, severity, and clean repro steps",
      "Regression passes, test summaries, and release judgment",
    ],
    articles: [
      {
        title: "A tester is a professional noticer",
        excerpt:
          "Manual testing is not random clicking. It is structured attention, guided by risk and sharpened by evidence.",
        type: "Article",
        readTime: "4 min",
      },
      {
        title: "The bug report is part of the product",
        excerpt:
          "A good report reduces confusion. A great one makes the fix feel inevitable.",
        type: "Checklist",
        readTime: "6 min",
      },
    ],
    videos: {
      available: false,
      note: "No videos are live yet. The first set will be product teardown sessions and bug-report reviews.",
      items: [],
    },
  },
];

export function getLearningPath(slug: string) {
  return learningPaths.find((path) => path.slug === slug);
}
