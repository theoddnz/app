import { forwardRef } from "react";
import { HugeiconsIcon, type HugeiconsProps, type IconSvgElement } from "@hugeicons/react";
import {
  Add01Icon,
  Alert01Icon,
  ArrowDownBigIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Award01Icon,
  BookOpen01Icon,
  BotIcon,
  BubbleChatIcon,
  Calendar03Icon,
  Camera01Icon,
  Cancel01Icon,
  Chair01Icon,
  CheckmarkBadge01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  CodeIcon,
  CpuIcon,
  DashboardSquare01Icon,
  Delete02Icon,
  File02Icon,
  GitMergeIcon,
  Globe02Icon,
  Heading02Icon,
  Home01Icon,
  ImageUploadIcon,
  InformationCircleIcon,
  LaptopIcon,
  Layers01Icon,
  Link01Icon,
  Loading03Icon,
  LockIcon,
  Logout01Icon,
  Mail01Icon,
  MapsIcon,
  Menu01Icon,
  Moon02Icon,
  Notebook01Icon,
  Orbit01Icon,
  PauseCircleIcon,
  PencilEdit01Icon,
  PlayIcon,
  Radio01Icon,
  Rocket01Icon,
  Route01Icon,
  SaveIcon,
  Search01Icon,
  Settings01Icon,
  ShapeCollectionIcon,
  Share01Icon,
  Shield01Icon,
  SparklesIcon,
  Sun03Icon,
  TerminalIcon,
  TestTube01Icon,
  TextBoldIcon,
  TextItalicIcon,
  Tick02Icon,
  Timer01Icon,
  UserGroupIcon,
  UserIcon,
  VideoOffIcon,
  ViewIcon,
  ViewOffIcon,
  WaveIcon,
  Wrench01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";

type AppIconProps = Omit<HugeiconsProps, "icon">;

function createIcon(icon: IconSvgElement) {
  const AppIcon = forwardRef<SVGSVGElement, AppIconProps>((props, ref) => (
    <HugeiconsIcon ref={ref} icon={icon} color="currentColor" {...props} />
  ));

  AppIcon.displayName = "AppHugeIcon";
  return AppIcon;
}

export const ArrowRight = createIcon(ArrowRight01Icon);
export const ArrowRightIcon = ArrowRight;
export const ArrowLeft = createIcon(ArrowLeft01Icon);
export const ArrowUpRight = createIcon(ArrowUpRight01Icon);
export const ArrowBigDown = createIcon(ArrowDownBigIcon);
export const Armchair = createIcon(Chair01Icon);
export const BadgeCheck = createIcon(CheckmarkBadge01Icon);
export const Bold = createIcon(TextBoldIcon);
export const BookOpen = createIcon(BookOpen01Icon);
export const Bot = createIcon(BotIcon);
export const CalendarDays = createIcon(Calendar03Icon);
export const Camera = createIcon(Camera01Icon);
export const Check = createIcon(Tick02Icon);
export const CheckCircle2 = createIcon(CheckmarkCircle01Icon);
export const ChevronRight = createIcon(ArrowRight01Icon);
export const CircleCheckIcon = createIcon(CheckmarkCircle01Icon);
export const Clock = createIcon(Clock01Icon);
export const Clock3 = createIcon(Clock01Icon);
export const Code = createIcon(CodeIcon);
export const Code2 = createIcon(CodeIcon);
export const Cpu = createIcon(CpuIcon);
export const ExternalLink = createIcon(ArrowUpRight01Icon);
export const Eye = createIcon(ViewIcon);
export const EyeOff = createIcon(ViewOffIcon);
export const FileText = createIcon(File02Icon);
export const FlaskConical = createIcon(TestTube01Icon);
export const GitMerge = createIcon(GitMergeIcon);
export const Globe = createIcon(Globe02Icon);
export const Heading2 = createIcon(Heading02Icon);
export const Home = createIcon(Home01Icon);
export const ImageUp = createIcon(ImageUploadIcon);
export const Info = createIcon(InformationCircleIcon);
export const InfoIcon = Info;
export const Italic = createIcon(TextItalicIcon);
export const Laptop = createIcon(LaptopIcon);
export const Layers3 = createIcon(Layers01Icon);
export const LayoutDashboard = createIcon(DashboardSquare01Icon);
export const LinkIcon = createIcon(Link01Icon);
export const Loader2 = createIcon(Loading03Icon);
export const Loader2Icon = Loader2;
export const Lock = createIcon(LockIcon);
export const LogOut = createIcon(Logout01Icon);
export const Mail = createIcon(Mail01Icon);
export const Map = createIcon(MapsIcon);
export const Menu = createIcon(Menu01Icon);
export const MessageCircle = createIcon(BubbleChatIcon);
export const Moon = createIcon(Moon02Icon);
export const NotebookText = createIcon(Notebook01Icon);
export const OctagonXIcon = createIcon(Cancel01Icon);
export const Orbit = createIcon(Orbit01Icon);
export const PauseCircle = createIcon(PauseCircleIcon);
export const PenLine = createIcon(PencilEdit01Icon);
export const Play = createIcon(PlayIcon);
export const PlayCircle = createIcon(PlayIcon);
export const Plus = createIcon(Add01Icon);
export const Radio = createIcon(Radio01Icon);
export const RadioTower = createIcon(Radio01Icon);
export const Rocket = createIcon(Rocket01Icon);
export const Route = createIcon(Route01Icon);
export const Save = createIcon(SaveIcon);
export const Search = createIcon(Search01Icon);
export const Settings = createIcon(Settings01Icon);
export const Shapes = createIcon(ShapeCollectionIcon);
export const Share2 = createIcon(Share01Icon);
export const Shield = createIcon(Shield01Icon);
export const ShieldCheck = createIcon(Shield01Icon);
export const Sparkles = createIcon(SparklesIcon);
export const Sun = createIcon(Sun03Icon);
export const Terminal = createIcon(TerminalIcon);
export const TestTube2 = createIcon(TestTube01Icon);
export const Timer = createIcon(Timer01Icon);
export const Trash2 = createIcon(Delete02Icon);
export const TriangleAlertIcon = createIcon(Alert01Icon);
export const Trophy = createIcon(Award01Icon);
export const User = createIcon(UserIcon);
export const Users = createIcon(UserGroupIcon);
export const VideoOff = createIcon(VideoOffIcon);
export const Waves = createIcon(WaveIcon);
export const Wrench = createIcon(Wrench01Icon);
export const X = createIcon(Cancel01Icon);
export const Zap = createIcon(ZapIcon);
