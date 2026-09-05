import type { YouTubeShort } from "@/lib/youtube-shorts";
import type { ProjectSlide, QuizSlide, Slide } from "./types";

/** Number of videos shown before a checkpoint interrupts the feed. */
const VIDEOS_PER_CHAPTER = 2;

// Dummy-but-on-brand checkpoints. These are cycled through as chapters grow so
// the course always has questions and projects regardless of how many Shorts
// the channel has published.
const QUIZ_BANK: Omit<QuizSlide, "kind" | "id" | "chapter">[] = [
  {
    question: "What does a microcontroller actually do in a robot?",
    hint: "Think brain, not muscle.",
    options: [
      "Stores the robot's battery charge",
      "Runs the code that reads sensors and drives outputs",
      "Physically moves the wheels on its own",
      "Only lights up the status LED",
    ],
    answer: 1,
    explanation:
      "A microcontroller is the brain. It reads sensor inputs, runs your logic, and sends signals to motors, servos and LEDs.",
  },
  {
    question: "A servo is different from a DC motor because it can...",
    hint: "One cares about position.",
    options: [
      "Spin faster forever",
      "Hold and move to a precise angle",
      "Only run in reverse",
      "Work without any power",
    ],
    answer: 1,
    explanation:
      "Servos take a target angle and hold it. DC motors just spin continuously - great for wheels, not for precise joints.",
  },
  {
    question: "Why do we add a resistor in series with an LED?",
    hint: "Protect the tiny thing.",
    options: [
      "To make it brighter",
      "To limit current so the LED doesn't burn out",
      "To change its colour",
      "It is purely decorative",
    ],
    answer: 1,
    explanation:
      "Without a current-limiting resistor the LED draws too much current and dies. The resistor keeps it in a safe range.",
  },
  {
    question: "In code, what is a 'loop' used for on a robot?",
    hint: "It never really stops.",
    options: [
      "Running setup once at power on",
      "Repeating the read-decide-act cycle continuously",
      "Deleting the program",
      "Charging the battery",
    ],
    answer: 1,
    explanation:
      "The loop runs forever: read sensors, decide with your logic, act on motors. That repeat is what makes a robot feel alive.",
  },
  {
    question: "An ultrasonic sensor measures distance by...",
    hint: "Bats do it too.",
    options: [
      "Detecting colour",
      "Timing how long an echo takes to return",
      "Measuring temperature",
      "Counting wheel rotations",
    ],
    answer: 1,
    explanation:
      "It sends a sound pulse and times the echo. Distance = (speed of sound x time) / 2. Perfect for obstacle avoidance.",
  },
  {
    question: "What is the safest first step before wiring a new circuit?",
    hint: "Respect the power.",
    options: [
      "Power everything on immediately",
      "Disconnect power and plan the connections first",
      "Skip the datasheet",
      "Touch every pin to test it",
    ],
    answer: 1,
    explanation:
      "Always wire with the power off and plan first. It saves your components - and your fingers.",
  },
];

const PROJECT_BANK: Omit<ProjectSlide, "kind" | "id" | "chapter">[] = [
  {
    title: "Blink, but with intent",
    brief:
      "Wire one LED and make it blink in a pattern that means something - a heartbeat, an SOS, a status code.",
    steps: [
      "Connect an LED + resistor to a GPIO pin",
      "Write a loop that toggles the pin",
      "Change the timing to encode a real signal",
    ],
  },
  {
    title: "Obstacle sensor buzzer",
    brief:
      "Use a distance sensor to trigger a buzzer when something gets too close. Your first reflex circuit.",
    steps: [
      "Read distance from the ultrasonic sensor",
      "Set a threshold in your code",
      "Sound the buzzer only under the threshold",
    ],
  },
  {
    title: "One-servo sweeper",
    brief:
      "Drive a single servo back and forth on a schedule. This is the seed of every robotic arm.",
    steps: [
      "Attach the servo to a stable base",
      "Sweep it from 0 to 180 degrees",
      "Add a pause so the motion looks deliberate",
    ],
  },
];

/**
 * Builds the ordered slide list by interleaving the channel's Shorts with
 * quizzes and projects so learners can't just scroll - they hit checkpoints.
 */
export function buildCurriculum(shorts: YouTubeShort[]): Slide[] {
  const slides: Slide[] = [
    {
      kind: "intro",
      id: "intro",
      chapter: 0,
      title: "Build-First Robotics",
      subtitle:
        "A vertical, no-fluff mini-series. Watch a clip, answer, build. Swipe up to begin.",
    },
  ];

  if (shorts.length === 0) return slides;

  let chapter = 1;
  let quizIndex = 0;
  let projectIndex = 0;

  for (let i = 0; i < shorts.length; i += VIDEOS_PER_CHAPTER) {
    const batch = shorts.slice(i, i + VIDEOS_PER_CHAPTER);

    for (const short of batch) {
      slides.push({ kind: "video", id: `video-${short.id}`, chapter, short });
    }

    // A quiz after every chapter of videos.
    const quiz = QUIZ_BANK[quizIndex % QUIZ_BANK.length];
    slides.push({
      kind: "quiz",
      id: `quiz-${chapter}`,
      chapter,
      ...quiz,
    });
    quizIndex += 1;

    // A hands-on project every second chapter.
    if (chapter % 2 === 0) {
      const project = PROJECT_BANK[projectIndex % PROJECT_BANK.length];
      slides.push({
        kind: "project",
        id: `project-${chapter}`,
        chapter,
        ...project,
      });
      projectIndex += 1;
    }

    chapter += 1;
  }

  slides.push({ kind: "outro", id: "outro", chapter });
  return slides;
}
