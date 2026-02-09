import {
  // Layout & Navigation
  Dashboard as DashboardIcon,
  CalendarToday as AppointmentsIcon,
  MedicalServices as RecordsIcon,
  Spa as WellnessIcon,
  SupportAgent as SupportIcon,
  People as StaffIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,

  // User & Auth
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  PersonAdd as PersonAddIcon,
  AdminPanelSettings as AdminIcon,

  // Theme & UI
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  CalendarMonth as CalendarIcon,
  Computer as ComputerIcon,
  Bolt as BoltIcon,
  LocalHospital as HospitalIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,

  // Actions
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Assessment as ReportIcon,
  Notifications as NotificationIcon,
  Announcement as AnnouncementIcon,
  Speed as SpeedIcon,
  AccessTime as AccessTimeIcon,
  EventAvailable as EventAvailableIcon,
  MedicalInformation as MedicalInfoIcon,
  Groups as GroupsIcon,
  HealthAndSafety as HealthSafetyIcon,

  // Status
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Circle as CircleIcon,

  // Additional icons (new imports)
  Description as DocumentIcon,
  AccessTime as TimeIcon,
  EventAvailable as EventIcon,
  HealthAndSafety as HealthIcon,
  Medication as MedicationIcon,
  Assignment as AssignmentIcon,
  NotificationsActive as NotificationActiveIcon,
  School as SchoolIcon,
  EmojiEmotions as EmojiIcon,
  ArrowForward as ArrowForwardIcon,
  Psychology as PsychologyIcon,
  PhoneInTalk as PhoneIcon,
  Group as GroupIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  WorkOutline as WorkIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
  Schedule as ScheduleIcon,
  MedicalServices as MedicalIcon,
  ArrowForward as ArrowIcon,
  FilterList as FilterListIcon,
  Spa as SpaIcon,
  Favorite as FavoriteIcon,
  Restaurant as RestaurantIcon,
  FitnessCenter as FitnessCenterIcon,
  CalendarToday as CalendarTodayIcon,
  LocalHospital as LocalHospitalIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  MenuBook as MenuBookIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

// Individual icon exports
export {
  // Layout & Navigation
  DashboardIcon,
  AppointmentsIcon,
  RecordsIcon,
  WellnessIcon,
  SupportIcon,
  StaffIcon,
  SettingsIcon,
  MenuIcon,

  // User & Auth
  PersonIcon,
  LogoutIcon,
  PersonAddIcon,
  AdminIcon,

  // Theme & UI
  DarkModeIcon,
  LightModeIcon,
  CalendarIcon,
  ComputerIcon,
  BoltIcon,
  HospitalIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  VerifiedIcon,
  WarningIcon,

  // Actions
  AddIcon,
  EditIcon,
  DeleteIcon,
  SearchIcon,
  DownloadIcon,
  ReportIcon,
  NotificationIcon,
  AnnouncementIcon,
  SpeedIcon,
  AccessTimeIcon,
  EventAvailableIcon,
  MedicalInfoIcon,
  GroupsIcon,
  HealthSafetyIcon,

  // Status
  ActiveIcon,
  InactiveIcon,
  CircleIcon,

  // Additional icons
  DocumentIcon,
  TimeIcon,
  EventIcon,
  HealthIcon,
  MedicationIcon,
  AssignmentIcon,
  NotificationActiveIcon,
  SchoolIcon,
  EmojiIcon,
  ArrowForwardIcon,
  PsychologyIcon,
  PhoneIcon,
  GroupIcon,
  MedicalIcon,
  CheckIcon,
  FilterIcon,
  StarIcon,
  WorkIcon,
  LocationIcon,
  CloseIcon,
  ScheduleIcon,
  ArrowIcon,
  FilterListIcon,
  SpaIcon,
  FavoriteIcon,
  RestaurantIcon,
  FitnessCenterIcon,
  CalendarTodayIcon,
  LocalHospitalIcon,
  EmojiEmotionsIcon,
  BookmarkIcon,
  ShareIcon,
  MenuBookIcon,
  CheckCircleIcon,
};

// Icon mapping for easier access
export const IconMap = {
  // Layout & Navigation
  Dashboard: DashboardIcon,
  Appointments: AppointmentsIcon,
  Records: RecordsIcon,
  Wellness: WellnessIcon,
  Support: SupportIcon,
  Staff: StaffIcon,
  Settings: SettingsIcon,
  Menu: MenuIcon,

  // User & Auth
  Person: PersonIcon,
  Logout: LogoutIcon,
  PersonAdd: PersonAddIcon,
  Admin: AdminIcon,

  // Theme & UI
  DarkMode: DarkModeIcon,
  LightMode: LightModeIcon,
  Calendar: CalendarIcon,
  Computer: ComputerIcon,
  Bolt: BoltIcon,
  Hospital: HospitalIcon,
  TrendingUp: TrendingUpIcon,
  TrendingDown: TrendingDownIcon,
  Verified: VerifiedIcon,
  Warning: WarningIcon,

  // Actions
  Add: AddIcon,
  Edit: EditIcon,
  Delete: DeleteIcon,
  Search: SearchIcon,
  Download: DownloadIcon,
  Report: ReportIcon,
  Notification: NotificationIcon,
  Announcement: AnnouncementIcon,
  Speed: SpeedIcon,
  AccessTime: AccessTimeIcon,
  EventAvailable: EventAvailableIcon,
  MedicalInfo: MedicalInfoIcon,
  Groups: GroupsIcon,
  HealthSafety: HealthSafetyIcon,

  // Status
  Active: ActiveIcon,
  Inactive: InactiveIcon,
  Circle: CircleIcon,

  // Additional icons
  Document: DocumentIcon,
  Time: TimeIcon,
  Event: EventIcon,
  Health: HealthIcon,
  Medication: MedicationIcon,
  Assignment: AssignmentIcon,
  NotificationActive: NotificationActiveIcon,
  School: SchoolIcon,
  Emoji: EmojiIcon,
  ArrowForward: ArrowForwardIcon,
  Psychology: PsychologyIcon,
  Phone: PhoneIcon,
} as const;

// Type for icon names
export type IconName = keyof typeof IconMap;

// Helper function to get icon by name
export const getIconByName = (name: IconName) => {
  return IconMap[name] || DashboardIcon;
};
