export type CurriculumModule = {
  moduleName: string;
  topic: string;
  keyConcepts: string[];
};

export type LearningPath = {
  slug: string;
  name: string;
  label: string;
  description: string;
  outcome: string;
  pace: string;
  signal: string;
  thumbnailNote: string;
  curriculum: (string | CurriculumModule)[];
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
      "Learn ROS 2 from setup to simulation, custom interfaces, hardware integration, and system debugging. Build the mental model for nodes, topics, services, actions, launch files, Gazebo, RViz2, sensors, and real robot control.",
    outcome: "Build a working robot loop: sense, decide, actuate, log, and debug the failure trail.",
    pace: "9 ROS 2 modules",
    signal: "Nodes, topics, simulation traces, and proof that it moved.",
    thumbnailNote: "Thumbnail slot reserved",
    curriculum: [
      {
        moduleName: "Introduction to ROS 2",
        topic: "Overview",
        keyConcepts: [
          "What is ROS (Robot Operating System)?",
          "Difference between ROS 1 and ROS 2",
          "Middleware: DDS (Data Distribution Service)",
          "ROS 2 ecosystem and modularity",
        ],
      },
      {
        moduleName: "Installing ROS 2",
        topic: "ROS 2 Environment Setup",
        keyConcepts: [
          "Installing a virtual machine on Windows",
          "Installing ROS 2 on Ubuntu 22.04",
          "Installing and setting up VS Code",
          "Environment setup with source, rosdep, and ros2 CLI",
        ],
      },
      {
        moduleName: "ROS 2 Core Concepts",
        topic: "CLI Tools",
        keyConcepts: [
          "Nodes, topics, services, and actions",
          "Parameters and their scope",
          "ROS 2 CLI tools: ros2 topic, ros2 node, and related commands",
          "ROS 2 packages and workspace layout",
        ],
      },
      {
        moduleName: "Writing ROS 2 Nodes",
        topic: "Node Development",
        keyConcepts: [
          "Publisher and subscriber APIs",
          "Service and client APIs",
          "Parameter usage and node configuration",
        ],
      },
      {
        moduleName: "Create Your Own Message Types",
        topic: "Working with Custom Interfaces",
        keyConcepts: [
          "Messages, services, and actions",
          ".msg, .srv, and .action file structures",
          "Interface generation and build process",
          "Using custom interfaces in code",
        ],
      },
      {
        moduleName: "Launch and Manage Nodes",
        topic: "Automation and Lifecycle Management",
        keyConcepts: [
          "ROS 2 launch system with Python launch files",
          "Writing launch arguments and node mappings",
          "Lifecycle node states and transitions",
        ],
      },
      {
        moduleName: "Simulation with RViz2 and Gazebo",
        topic: "Simulation, visualization, robot models, sensors, and control",
        keyConcepts: [
          "Introduction to simulation in robotics",
          "Gazebo simulation: what Gazebo is, classic vs Ignition, installation, running a simple robot, and ROS 2 integration through ros_gz_bridge",
          "URDF and Xacro robot models: understanding URDF, building a robot model, using Xacro, and visualizing the model in Gazebo",
          "Getting started with RViz2: purpose of visualization, adding displays such as LaserScan, TF, Image, and RobotModel, and interpreting data",
          "Simulating sensors: LiDAR, camera, IMU, and encoders",
          "Publishing sensor data to ROS 2 topics and using sensor data for perception and navigation",
          "Robot movement and control: velocity commands with cmd_vel, Twist messages, teleop nodes, differential drive control, and obstacle avoidance",
          "Synchronizing Gazebo and RViz2 by viewing real-time simulation data in RViz2",
        ],
      },
      {
        moduleName: "Integrating Hardware",
        topic: "Hardware Interfaces",
        keyConcepts: [
          "Serial communication with Arduino",
          "Interfacing with real sensors and actuators",
          "Connecting physical devices to ROS 2",
          "Publishing and subscribing real sensor data",
          "Visualizing sensor data in RViz2",
        ],
      },
      {
        moduleName: "System Monitoring and Maintenance",
        topic: "Debugging and Logging",
        keyConcepts: [
          "CLI tools: ros2 topic echo, ros2 node info, and related commands",
          "Logging levels and formatting",
          "Using ros2 bag for data recording and playback",
        ],
      },
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
