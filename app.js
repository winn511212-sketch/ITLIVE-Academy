const { useState, useEffect, useMemo, useRef } = React;

// ============================================================================
// INITIAL SEED DATA
// ============================================================================

const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Azizbek Rahimov",
    email: "azizbek.r@gmail.com",
    phone: "+998 90 123 45 67",
    course: "Frontend React & Next.js Pro",
    category: "Development",
    progress: 85,
    status: "active",
    payment: "paid",
    enrolledDate: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 2,
    name: "Madina Karimova",
    email: "madina.k@gmail.com",
    phone: "+998 91 234 56 78",
    course: "UI/UX Dizayn Masterclass",
    category: "Design",
    progress: 92,
    status: "active",
    payment: "paid",
    enrolledDate: "2024-02-01",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 3,
    name: "Jasur Toshmatov",
    email: "jasur.t@itlive.uz",
    phone: "+998 93 345 67 89",
    course: "Python Fullstack & Django",
    category: "Development",
    progress: 64,
    status: "active",
    payment: "partial",
    enrolledDate: "2024-02-15",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 4,
    name: "Nilufar Umarova",
    email: "nilufar.u@gmail.com",
    phone: "+998 97 456 78 90",
    course: "Graphic Design & Brand Identity",
    category: "Design",
    progress: 100,
    status: "completed",
    payment: "paid",
    enrolledDate: "2023-11-10",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 5,
    name: "Shaxzod Aliyev",
    email: "shahzod.a@gmail.com",
    phone: "+998 99 567 89 01",
    course: "SMM & Digital Marketing",
    category: "Business",
    progress: 42,
    status: "active",
    payment: "paid",
    enrolledDate: "2024-03-01",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 6,
    name: "Dilnoza Xolmatova",
    email: "dilnoza.x@gmail.com",
    phone: "+998 94 678 90 12",
    course: "Frontend React & Next.js Pro",
    category: "Development",
    progress: 28,
    status: "pending",
    payment: "unpaid",
    enrolledDate: "2024-03-10",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 7,
    name: "Bobur Mirzayev",
    email: "bobur.m@gmail.com",
    phone: "+998 90 789 01 23",
    course: "IT Foundation & CS",
    category: "Foundation",
    progress: 75,
    status: "active",
    payment: "paid",
    enrolledDate: "2024-01-20",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 8,
    name: "Zarina Karimova",
    email: "zarina.k@gmail.com",
    phone: "+998 91 890 12 34",
    course: "UI/UX Dizayn Masterclass",
    category: "Design",
    progress: 55,
    status: "active",
    payment: "paid",
    enrolledDate: "2024-02-18",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  }
];

const INITIAL_COURSES = [
  {
    id: 1,
    title: "Frontend React & Next.js Pro",
    category: "Development",
    instructor: "Farxod Dadajonov",
    instructorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
    lessons: 32,
    duration: "4 oy",
    students: 340,
    rating: 4.9,
    reviews: 128,
    price: "1,400,000 UZS",
    bgGradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    description: "HTML5, CSS3, JavaScript ES6+, React 18, Next.js 14, Redux Toolkit va TailwindCSS amaliy loyihalari."
  },
  {
    id: 2,
    title: "Python Fullstack & Django",
    category: "Development",
    instructor: "Bekzod Normatov",
    instructorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80",
    lessons: 36,
    duration: "5 oy",
    students: 280,
    rating: 4.8,
    reviews: 94,
    price: "1,500,000 UZS",
    bgGradient: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    description: "Python asoslari, OOP, Django REST Framework, PostgreSQL, Docker, Redis va mikroservis arxitekturasi."
  },
  {
    id: 3,
    title: "UI/UX Dizayn Masterclass",
    category: "Design",
    instructor: "Kamila Salimova",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    lessons: 28,
    duration: "3 oy",
    students: 230,
    rating: 5.0,
    reviews: 142,
    price: "1,200,000 UZS",
    bgGradient: "linear-gradient(135deg, #5b21b6 0%, #8b5cf6 100%)",
    description: "Figma, Design Systems, Mobile Apps UI, Web UI, UX Research, Prototyping va mijoz bilan ishlash."
  },
  {
    id: 4,
    title: "Graphic Design & Brand Identity",
    category: "Design",
    instructor: "Otabek Shukurov",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    lessons: 26,
    duration: "3 oy",
    students: 190,
    rating: 4.7,
    reviews: 76,
    price: "1,100,000 UZS",
    bgGradient: "linear-gradient(135deg, #831843 0%, #ec4899 100%)",
    description: "Adobe Photoshop, Illustrator, InDesign, Logo dizayn, Branding, Poligrafiya va Visual Identity."
  },
  {
    id: 5,
    title: "SMM & Digital Marketing",
    category: "Business",
    instructor: "Dilnoza Rahimova",
    instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80",
    lessons: 24,
    duration: "2 oy",
    students: 210,
    rating: 4.8,
    reviews: 88,
    price: "1,100,000 UZS",
    bgGradient: "linear-gradient(135deg, #9a3412 0%, #f97316 100%)",
    description: "Instagram & Facebook reklama, Target, kontent reja, analitika va mijozlar oqimini jalb qilish."
  },
  {
    id: 6,
    title: "IT Foundation & CS Basics",
    category: "Foundation",
    instructor: "Bekzod Normatov",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
    lessons: 20,
    duration: "2 oy",
    students: 195,
    rating: 4.9,
    reviews: 64,
    price: "900,000 UZS",
    bgGradient: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    description: "Kompyuter arxitekturasi, algoritmlar, tarmoqlar, Git & GitHub va dasturlashga ilk qadam."
  }
];

// Initial Homeworks (Connected between Student and Manager)
const INITIAL_HOMEWORKS = [
  {
    id: 1,
    studentId: 1,
    studentName: "Azizbek Rahimov",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    course: "Frontend React & Next.js Pro",
    lessonTitle: "1-vazifa: HTML5 Semantikasi va Flexbox/Grid Responsive Layout",
    deadline: "2024-03-20",
    submittedAt: "2024-03-19 18:40",
    status: "graded", // graded, pending, not_submitted, rework
    githubUrl: "https://github.com/azizbek-dev/responsive-portfolio",
    liveUrl: "https://azizbek-portfolio.vercel.app",
    comment: "Portfolio saytini to'liq semantik teglarda qildim, mobil va planshet versiyalari ham moslashtirildi.",
    grade: 95,
    maxGrade: 100,
    feedback: "Ajoyib ish! Grid va Flexbox juda to'g'ri ishlatilgan. Responsive dizayn benchmarkdan ham yaxshi chiqqan.",
    reviewedBy: "Menejer IT LIVE"
  },
  {
    id: 2,
    studentId: 1,
    studentName: "Azizbek Rahimov",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    course: "Frontend React & Next.js Pro",
    lessonTitle: "2-vazifa: JavaScript ES6+ & LocalStorage To-do App",
    deadline: "2024-03-25",
    submittedAt: "2024-03-24 21:15",
    status: "pending", // pending review by manager/teacher
    githubUrl: "https://github.com/azizbek-dev/js-todo-modern",
    liveUrl: "https://azizbek-todo.netlify.app",
    comment: "LocalStorage bilan to'liq sinxronlangan. Qidiruv va filtrlar ham qo'shilgan.",
    grade: null,
    maxGrade: 100,
    feedback: "",
    reviewedBy: ""
  },
  {
    id: 3,
    studentId: 1,
    studentName: "Azizbek Rahimov",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    course: "Frontend React & Next.js Pro",
    lessonTitle: "3-vazifa: React Komponentlar, Props va Custom Hooks",
    deadline: "2024-04-02",
    submittedAt: null,
    status: "not_submitted",
    githubUrl: "",
    liveUrl: "",
    comment: "",
    grade: null,
    maxGrade: 100,
    feedback: "",
    reviewedBy: ""
  },
  {
    id: 4,
    studentId: 1,
    studentName: "Azizbek Rahimov",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    course: "Frontend React & Next.js Pro",
    lessonTitle: "4-vazifa: Next.js SSR va REST API Integratsiyasi",
    deadline: "2024-04-12",
    submittedAt: null,
    status: "not_submitted",
    githubUrl: "",
    liveUrl: "",
    comment: "",
    grade: null,
    maxGrade: 100,
    feedback: "",
    reviewedBy: ""
  },
  {
    id: 5,
    studentId: 2,
    studentName: "Madina Karimova",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    course: "UI/UX Dizayn Masterclass",
    lessonTitle: "Mobile Banking App UI va Interaktiv Prototip",
    deadline: "2024-03-22",
    submittedAt: "2024-03-21 14:10",
    status: "graded",
    githubUrl: "",
    liveUrl: "https://figma.com/@madina/fintech-app-case",
    comment: "Figma avtolayout, komponentlar va interaktiv animatsiyali prototip tayyorlandi.",
    grade: 98,
    maxGrade: 100,
    feedback: "Dizayn tizimi juda tartibli. Ranglar va kontrast qoidalariga rioya qilingan.",
    reviewedBy: "Menejer IT LIVE"
  },
  {
    id: 6,
    studentId: 3,
    studentName: "Jasur Toshmatov",
    studentAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    course: "Python Fullstack & Django",
    lessonTitle: "Django ORM va PostgreSQL bilan REST API",
    deadline: "2024-03-28",
    submittedAt: "2024-03-27 19:50",
    status: "pending",
    githubUrl: "https://github.com/jasur-it/django-shop-api",
    liveUrl: "",
    comment: "JWT autentifikatsiya, Swagger dokumentatsiya va Docker fayli kiritildi.",
    grade: null,
    maxGrade: 100,
    feedback: "",
    reviewedBy: ""
  }
];

// Initial Groups (For Manager)
const INITIAL_GROUPS = [
  {
    id: 1,
    name: "FN-204 (Frontend React & Next.js)",
    course: "Frontend React & Next.js Pro",
    mentor: "Farxod Dadajonov",
    studentsCount: 18,
    days: "Dush / Chor / Juma",
    time: "19:30 - 21:30",
    room: "Online Zoom #1",
    status: "active"
  },
  {
    id: 2,
    name: "PY-108 (Python Backend & Django)",
    course: "Python Fullstack & Django",
    mentor: "Bekzod Normatov",
    studentsCount: 15,
    days: "Sesh / Pay / Shan",
    time: "18:00 - 20:00",
    room: "302-auditoriya",
    status: "active"
  },
  {
    id: 3,
    name: "UX-302 (UI/UX Dizayn Masterclass)",
    course: "UI/UX Dizayn Masterclass",
    mentor: "Kamila Salimova",
    studentsCount: 12,
    days: "Dush / Chor / Juma",
    time: "15:00 - 17:00",
    room: "204-laboratoriya",
    status: "active"
  },
  {
    id: 4,
    name: "SMM-401 (Digital Marketing & SMM)",
    course: "SMM & Digital Marketing",
    mentor: "Dilnoza Rahimova",
    studentsCount: 20,
    days: "Sesh / Pay / Shan",
    time: "14:00 - 16:00",
    room: "105-auditoriya",
    status: "active"
  }
];

// Initial Staff (For Admin)
const INITIAL_STAFF = [
  {
    id: 1,
    name: "Admin IT LIVE",
    role: "Bosh Administrator",
    type: "admin",
    email: "admin@itlive.uz",
    phone: "+998 71 200 00 01",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    status: "active",
    permissions: "To'liq ruxsat (Super Admin)"
  },
  {
    id: 2,
    name: "Menejer IT LIVE",
    role: "O'quv Bo'limi Boshlig'i",
    type: "manager",
    email: "manager@itlive.uz",
    phone: "+998 90 999 88 77",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    status: "active",
    permissions: "Guruhlar, Uy ishlari tekshiruvi, Davomat"
  },
  {
    id: 3,
    name: "Farxod Dadajonov",
    role: "Lead Frontend Mentor",
    type: "mentor",
    email: "farxod.d@itlive.uz",
    phone: "+998 90 123 45 67",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    status: "active",
    permissions: "Darslar, Vazifalar, Kurs materiallari"
  },
  {
    id: 4,
    name: "Kamila Salimova",
    role: "Senior UI/UX Mentor",
    type: "mentor",
    email: "kamila.s@itlive.uz",
    phone: "+998 91 333 44 55",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    status: "active",
    permissions: "Dizayn laboratoriyasi, Vazifalar baholash"
  }
];

// Initial Schedule (For Student)
const INITIAL_SCHEDULE = [
  {
    id: 1,
    day: "Dushanba",
    time: "19:30 - 21:30",
    subject: "React 18: Custom Hooks va Global State",
    mentor: "Farxod Dadajonov",
    room: "Online Zoom #1",
    isToday: true,
    zoomUrl: "https://zoom.us/j/itlive-react-class"
  },
  {
    id: 2,
    day: "Chorshanba",
    time: "19:30 - 21:30",
    subject: "Next.js 14 App Router va Server Components",
    mentor: "Farxod Dadajonov",
    room: "Online Zoom #1",
    isToday: false,
    zoomUrl: "https://zoom.us/j/itlive-react-class"
  },
  {
    id: 3,
    day: "Juma",
    time: "19:30 - 21:30",
    subject: "Amaliy Workshop & Kod Revyusi (Code Review)",
    mentor: "Farxod Dadajonov",
    room: "Online Zoom #1",
    isToday: false,
    zoomUrl: "https://zoom.us/j/itlive-react-class"
  }
];

// Initial Leaderboard
const INITIAL_LEADERBOARD = [
  { id: 1, name: "Madina Karimova", course: "UI/UX & Frontend", points: 920, completedHw: 4, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80", badge: "Oltin Nishon" },
  { id: 2, name: "Azizbek Rahimov", course: "Frontend React Pro", points: 850, completedHw: 3, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80", badge: "Kumush Nishon", isCurrentUser: true },
  { id: 3, name: "Jasur Toshmatov", course: "Python Backend", points: 740, completedHw: 2, avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80", badge: "Bronza Nishon" },
  { id: 4, name: "Dilnoza Xolmatova", course: "Frontend React Pro", points: 680, completedHw: 2, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80", badge: "Faol Talaba" }
];

// Bar Chart Data (Students Overview)
const STUDENTS_CHART_DATA = [
  { month: "Jan", count: 320, pct: 32 },
  { month: "Feb", count: 480, pct: 48 },
  { month: "Mar", count: 620, pct: 62 },
  { month: "Apr", count: 750, pct: 75 },
  { month: "May", count: 880, pct: 88 },
  { month: "Jun", count: 940, pct: 94 },
  { month: "Jul", count: 1000, pct: 100 }
];

// Donut Chart Data (Courses by Category)
const COURSES_CATEGORY_DATA = [
  { name: "Development", percent: 40, color: "#3b82f6" },
  { name: "Design", percent: 25, color: "#8b5cf6" },
  { name: "Business", percent: 20, color: "#10b981" },
  { name: "Other", percent: 15, color: "#38bdf8" }
];

// Revenue Spline Data
const REVENUE_DATA = [
  { month: "Jan", revenue: 8400, x: 20, y: 130 },
  { month: "Feb", revenue: 11200, x: 100, y: 115 },
  { month: "Mar", revenue: 14800, x: 180, y: 95 },
  { month: "Apr", revenue: 16500, x: 260, y: 80 },
  { month: "May", revenue: 19300, x: 340, y: 65 },
  { month: "Jun", revenue: 21800, x: 420, y: 50 },
  { month: "Jul", revenue: 24560, x: 500, y: 35 }
];

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("itlive_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Login Form State
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Navigation & View State - dynamically defaults according to user role
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("itlive_user");
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u.role === "student") return "student_dashboard";
        if (u.role === "manager") return "manager_dashboard";
        if (u.role === "mentor") return "mentor_dashboard";
        if (u.role === "guest") return "guest_home";
        if (u.role === "blocked") return "blocked_page";
      } catch (e) {}
    }
    return "dashboard";
  });

  const [viewMode, setViewMode] = useState("fullscreen"); // fullscreen, mockup
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // App Data State (Synced to localStorage)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("itlive_students");
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("itlive_courses");
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [homeworks, setHomeworks] = useState(() => {
    const saved = localStorage.getItem("itlive_homeworks");
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORKS;
  });

  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("itlive_groups");
    return saved ? JSON.parse(saved) : INITIAL_GROUPS;
  });

  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [scheduleList, setScheduleList] = useState(INITIAL_SCHEDULE);
  const [leaderboardList, setLeaderboardList] = useState(INITIAL_LEADERBOARD);

  // Modals & Search Filters
  const [studentSearch, setStudentSearch] = useState("");
  const [studentFilterCourse, setStudentFilterCourse] = useState("all");
  const [studentFilterStatus, setStudentFilterStatus] = useState("all");
  const [courseFilterCategory, setCourseFilterCategory] = useState("all");
  const [hwFilterStatus, setHwFilterStatus] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);

  // Add Student Modal State
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Frontend React & Next.js Pro",
    category: "Development"
  });

  // Student Homework Link Submission Modal
  const [isSubmitHwModalOpen, setIsSubmitHwModalOpen] = useState(false);
  const [selectedHwForSubmit, setSelectedHwForSubmit] = useState(null);
  const [submitHwForm, setSubmitHwForm] = useState({
    hwId: "",
    githubUrl: "",
    liveUrl: "",
    comment: ""
  });

  // Manager Homework Review & Grading Modal
  const [isGradeHwModalOpen, setIsGradeHwModalOpen] = useState(false);
  const [gradingHw, setGradingHw] = useState(null);
  const [gradingForm, setGradingForm] = useState({
    grade: 95,
    status: "graded",
    feedback: ""
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("itlive_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("itlive_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("itlive_homeworks", JSON.stringify(homeworks));
  }, [homeworks]);

  useEffect(() => {
    localStorage.setItem("itlive_groups", JSON.stringify(groups));
  }, [groups]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // ==========================================================================
  // AUTHENTICATION LOGIC & ROLE SWITCHER
  // ==========================================================================

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setLoginError("");
    const u = usernameInput.trim();
    const p = passwordInput.trim();

    // 1. Admin
    if (u === "admin_itlive" && p === "admin_123") {
      const userObj = { username: "admin_itlive", role: "admin", roleName: "Bosh Administrator", name: "Admin IT LIVE", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" };
      setCurrentUser(userObj); setActiveTab("dashboard");
      localStorage.setItem("itlive_user", JSON.stringify(userObj));
      showToast("🛡️ Xush kelibsiz, Admin!"); return;
    }
    // 2. Manager
    if (u === "manager_itlive" && p === "manager_123") {
      const userObj = { username: "manager_itlive", role: "manager", roleName: "Akademiya Menejeri", name: "Menejer IT LIVE", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" };
      setCurrentUser(userObj); setActiveTab("manager_dashboard");
      localStorage.setItem("itlive_user", JSON.stringify(userObj));
      showToast("👔 Xush kelibsiz, Menejer!"); return;
    }
    // 3. Student
    if ((u === "student:itlive" || u === "student_itlive") && p === "student_123") {
      const userObj = { username: "student:itlive", role: "student", roleName: "Akademiya Talabasi", name: "Azizbek Rahimov", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" };
      setCurrentUser(userObj); setActiveTab("student_dashboard");
      localStorage.setItem("itlive_user", JSON.stringify(userObj));
      showToast("🎓 Xush kelibsiz, Azizbek!"); return;
    }
    // 4. Mentor
    if (u === "mentor_itlive" && p === "mentor_123") {
      const userObj = { username: "mentor_itlive", role: "mentor", roleName: "Kurs Mentori", name: "Farxod Dadajonov", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80" };
      setCurrentUser(userObj); setActiveTab("mentor_dashboard");
      localStorage.setItem("itlive_user", JSON.stringify(userObj));
      showToast("🎯 Xush kelibsiz, Mentor!"); return;
    }
    // 5. Guest
    if (u === "guest" && p === "guest_123") {
      const userObj = { username: "guest", role: "guest", roleName: "Mehmon Foydalanuvchi", name: "Mehmon", avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=120&q=80" };
      setCurrentUser(userObj); setActiveTab("guest_home");
      localStorage.setItem("itlive_user", JSON.stringify(userObj));
      showToast("👤 Mehmon sifatida kirdingiz!"); return;
    }
    // 6. Blocked
    if (u === "blocked_user" && p === "blocked_123") {
      const userObj = { username: "blocked_user", role: "blocked", roleName: "Bloklangan Foydalanuvchi", name: "Bloklangan Foydalanuvchi", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" };
      setCurrentUser(userObj); setActiveTab("blocked_page");
      localStorage.setItem("itlive_user", JSON.stringify(userObj));
      showToast("⛔ Bloklangan hisob."); return;
    }

    setLoginError("Login yoki parol noto'g'ri! Iltimos, tekshirib qaytadan kiriting.");
  };

  const handleQuickFill = (roleType) => {
    const creds = {
      admin:   { u: "admin_itlive",  p: "admin_123" },
      manager: { u: "manager_itlive",p: "manager_123" },
      student: { u: "student:itlive",p: "student_123" },
      mentor:  { u: "mentor_itlive", p: "mentor_123" },
      guest:   { u: "guest",         p: "guest_123" },
      blocked: { u: "blocked_user",  p: "blocked_123" }
    };
    if (creds[roleType]) {
      setUsernameInput(creds[roleType].u);
      setPasswordInput(creds[roleType].p);
    }
  };

  const handleQuickRoleSwitch = (roleType) => {
    setShowProfileMenu(false);
    const roles = {
      admin:   { username: "admin_itlive",  role: "admin",   roleName: "Bosh Administrator",    name: "Admin IT LIVE",    tab: "dashboard",       avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80", toast: "🛡️ Admin roliga o'tildi" },
      manager: { username: "manager_itlive",role: "manager", roleName: "Akademiya Menejeri",   name: "Menejer IT LIVE", tab: "manager_dashboard",avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", toast: "👔 Menejer roliga o'tildi" },
      student: { username: "student:itlive",role: "student", roleName: "Akademiya Talabasi",   name: "Azizbek Rahimov", tab: "student_dashboard", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80", toast: "🎓 Talaba kabinetiga o'tildi" },
      mentor:  { username: "mentor_itlive", role: "mentor",  roleName: "Kurs Mentori",          name: "Farxod Dadajonov",tab: "mentor_dashboard",avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80", toast: "🎯 Mentor paneliga o'tildi" },
      guest:   { username: "guest",         role: "guest",   roleName: "Mehmon Foydalanuvchi",  name: "Mehmon",           tab: "guest_home",       avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=120&q=80", toast: "👤 Mehmon rejimiga o'tildi" },
      blocked: { username: "blocked_user",  role: "blocked", roleName: "Bloklangan",            name: "Bloklangan User", tab: "blocked_page",     avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80", toast: "⛔ Bloklangan hisob ko'rindi" }
    };
    const r = roles[roleType];
    if (!r) return;
    const userObj = { username: r.username, role: r.role, roleName: r.roleName, name: r.name, avatar: r.avatar };
    setCurrentUser(userObj);
    setActiveTab(r.tab);
    localStorage.setItem("itlive_user", JSON.stringify(userObj));
    showToast(r.toast);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("itlive_user");
    setUsernameInput("");
    setPasswordInput("");
    setShowProfileMenu(false);
    showToast("👋 Tizimdan muvaffaqiyatli chiqildi.");
  };

  // ==========================================================================
  // HOMEWORK SUBMISSION & GRADING HANDLERS
  // ==========================================================================

  // Open Submit Homework Modal for Student
  const handleOpenSubmitModal = (hw) => {
    setSelectedHwForSubmit(hw);
    setSubmitHwForm({
      hwId: hw.id,
      githubUrl: hw.githubUrl || "",
      liveUrl: hw.liveUrl || "",
      comment: hw.comment || ""
    });
    setIsSubmitHwModalOpen(true);
  };

  // Student Submits or Updates Homework Link
  const handleSaveHomeworkSubmit = (e) => {
    e.preventDefault();
    if (!submitHwForm.githubUrl.trim() && !submitHwForm.liveUrl.trim()) {
      alert("Iltimos, hech bo'lmaganda bitta havola (GitHub repozitoriy yoki Jonli demo sayt linki) kiriting!");
      return;
    }
    const updated = homeworks.map((h) => {
      if (h.id === Number(submitHwForm.hwId)) {
        return {
          ...h,
          githubUrl: submitHwForm.githubUrl.trim(),
          liveUrl: submitHwForm.liveUrl.trim(),
          comment: submitHwForm.comment.trim(),
          submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
          status: "pending" // Sent to pending for manager/teacher review
        };
      }
      return h;
    });
    setHomeworks(updated);
    setIsSubmitHwModalOpen(false);
    if (window.confetti) {
      window.confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
    }
    showToast("🎉 Uy ishi havolasi topshirildi! Menejer/Ustoz tekshiruviga yuborildi.");
  };

  // Open Grading Modal for Manager
  const handleOpenGradingModal = (hw) => {
    setGradingHw(hw);
    setGradingForm({
      grade: hw.grade !== null ? hw.grade : 90,
      status: hw.status === "graded" ? "graded" : "graded",
      feedback: hw.feedback || "Vazifa to'liq va sifatli bajarilgan. Kod toza yozilgan."
    });
    setIsGradeHwModalOpen(true);
  };

  // Manager Saves Grade and Feedback
  const handleSaveGrading = (e) => {
    e.preventDefault();
    const updated = homeworks.map((h) => {
      if (h.id === gradingHw.id) {
        return {
          ...h,
          grade: Number(gradingForm.grade),
          status: gradingForm.status,
          feedback: gradingForm.feedback.trim(),
          reviewedBy: currentUser.name || "Menejer IT LIVE"
        };
      }
      return h;
    });
    setHomeworks(updated);
    setIsGradeHwModalOpen(false);
    if (window.confetti) {
      window.confetti({ particleCount: 80, spread: 70 });
    }
    showToast("✅ Talaba uy ishi baholandi va izoh yuborildi!");
  };

  // Student Actions
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.email) {
      alert("Iltimos, ism va emailni to'ldiring!");
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: newStudentForm.name,
      email: newStudentForm.email,
      phone: newStudentForm.phone || "+998 90 000 00 00",
      course: newStudentForm.course,
      category: newStudentForm.category,
      progress: 0,
      status: "active",
      payment: "paid",
      enrolledDate: new Date().toISOString().split("T")[0],
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80`
    };
    setStudents([newStudent, ...students]);
    setIsAddStudentModalOpen(false);
    setNewStudentForm({
      name: "",
      email: "",
      phone: "",
      course: "Frontend React & Next.js Pro",
      category: "Development"
    });
    if (window.confetti) {
      window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
    showToast("Yangi talaba muvaffaqiyatli ro'yxatga olindi!");
  };

  const handleDeleteStudent = (id) => {
    if (confirm("Haqiqatan ham bu talabani o'chirmoqchimisiz?")) {
      setStudents(students.filter((s) => s.id !== id));
      showToast("Talaba o'chirildi.");
    }
  };

  const handleEnrollCourse = (courseTitle) => {
    if (window.confetti) {
      window.confetti({ particleCount: 100, spread: 80 });
    }
    showToast(`"${courseTitle}" kursiga muvaffaqiyatli yozildingiz!`);
  };

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.phone.includes(studentSearch);
      const matchCourse = studentFilterCourse === "all" || s.course === studentFilterCourse;
      const matchStatus = studentFilterStatus === "all" || s.status === studentFilterStatus;
      return matchSearch && matchCourse && matchStatus;
    });
  }, [students, studentSearch, studentFilterCourse, studentFilterStatus]);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    if (courseFilterCategory === "all") return courses;
    return courses.filter((c) => c.category.toLowerCase() === courseFilterCategory.toLowerCase());
  }, [courses, courseFilterCategory]);

  // Filtered Homeworks for Student (Azizbek's homeworks)
  const studentHomeworks = useMemo(() => {
    return homeworks.filter((h) => {
      const isMine = h.studentName.toLowerCase().includes("azizbek") || h.studentId === 1;
      if (!isMine) return false;
      if (hwFilterStatus === "all") return true;
      return h.status === hwFilterStatus;
    });
  }, [homeworks, hwFilterStatus]);

  // Filtered Homeworks for Manager (All students' submissions)
  const managerHomeworks = useMemo(() => {
    return homeworks.filter((h) => {
      const matchSearch =
        h.studentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
        h.lessonTitle.toLowerCase().includes(studentSearch.toLowerCase());
      if (!matchSearch) return false;
      if (hwFilterStatus === "all") return true;
      return h.status === hwFilterStatus;
    });
  }, [homeworks, studentSearch, hwFilterStatus]);

  // ==========================================================================
  // RENDER: LOGIN VIEW (IF NOT LOGGED IN)
  // ==========================================================================
  if (!currentUser) {
    return /*#__PURE__*/React.createElement("div", {
      className: "auth-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "glow-orb glow-orb-1"
    }), /*#__PURE__*/React.createElement("div", {
      className: "glow-orb glow-orb-2"
    }), /*#__PURE__*/React.createElement("div", {
      className: "auth-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "auth-logo-box"
    }, /*#__PURE__*/React.createElement("span", {
      className: "logo-badge-red"
    }, "IT"), /*#__PURE__*/React.createElement("span", {
      className: "logo-title-text"
    }, "LIVE ", /*#__PURE__*/React.createElement("span", null, "ACADEMY"))), /*#__PURE__*/React.createElement("div", {
      className: "auth-header-text"
    }, /*#__PURE__*/React.createElement("h2", null, "Tizimga Kirish"), /*#__PURE__*/React.createElement("p", null, "Admin, Menejer yoki Talaba sifatida kiring:")), /*#__PURE__*/React.createElement("div", {
      className: "demo-accounts-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "demo-label"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-wand-magic-sparkles"
    }), /*#__PURE__*/React.createElement("span", null, "5 ta rol — birini bosib kiring:")),
    /*#__PURE__*/React.createElement("div", { className: "demo-chips" },
      [
        { key: "admin",   icon: "fa-shield-halved",   color: "#ef4444", label: "Admin",   login: "admin_itlive",   isActive: usernameInput === "admin_itlive" },
        { key: "manager", icon: "fa-user-tie",         color: "#f59e0b", label: "Manager", login: "manager_itlive", isActive: usernameInput === "manager_itlive" },
        { key: "student", icon: "fa-graduation-cap",   color: "#3b82f6", label: "Student", login: "student:itlive", isActive: usernameInput.startsWith("student") },
        { key: "mentor",  icon: "fa-chalkboard-user",  color: "#10b981", label: "Mentor",  login: "mentor_itlive",  isActive: usernameInput === "mentor_itlive" },
        { key: "guest",   icon: "fa-user",              color: "#8b5cf6", label: "Guest",   login: "guest",          isActive: usernameInput === "guest" },
        { key: "blocked", icon: "fa-ban",               color: "#94a3b8", label: "Blocked", login: "blocked_user",   isActive: usernameInput === "blocked_user" }
      ].map(function(r) { return /*#__PURE__*/React.createElement("button", {
        key: r.key, type: "button",
        className: "demo-chip " + (r.isActive ? "active" : ""),
        onClick: function() { return handleQuickFill(r.key); }
      },
        /*#__PURE__*/React.createElement("div", { className: "demo-chip-role" },
          /*#__PURE__*/React.createElement("i", { className: "fa-solid " + r.icon, style: { color: r.color } }),
          /*#__PURE__*/React.createElement("span", null, r.label)
        ),
        /*#__PURE__*/React.createElement("div", { className: "demo-chip-login" }, r.login)
      ); })
    )), /*#__PURE__*/React.createElement("form", {
      className: "auth-form",
      onSubmit: handleLogin
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Login (Foydalanuvchi nomi)"), /*#__PURE__*/React.createElement("div", {
      className: "input-icon-wrapper"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-user input-left-icon"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "auth-input",
      placeholder: "admin_itlive, manager_itlive yoki student:itlive",
      value: usernameInput,
      onChange: (e) => setUsernameInput(e.target.value),
      required: true
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Parol"), /*#__PURE__*/React.createElement("div", {
      className: "input-icon-wrapper"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-lock input-left-icon"
    }), /*#__PURE__*/React.createElement("input", {
      type: showPassword ? "text" : "password",
      className: "auth-input",
      placeholder: "Parolni kiriting...",
      value: passwordInput,
      onChange: (e) => setPasswordInput(e.target.value),
      required: true
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "input-toggle-btn",
      onClick: () => setShowPassword(!showPassword),
      title: showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"
    }, /*#__PURE__*/React.createElement("i", {
      className: `fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`
    })))), loginError && /*#__PURE__*/React.createElement("div", {
      className: "auth-error-banner"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-circle-exclamation"
    }), /*#__PURE__*/React.createElement("span", null, loginError)), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "submit-auth-btn"
    }, /*#__PURE__*/React.createElement("span", null, "Tizimga Kirish"), /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-arrow-right"
    })))), toastMessage && /*#__PURE__*/React.createElement("div", {
      className: "toast-banner"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-bell",
      style: { color: '#3b82f6' }
    }), /*#__PURE__*/React.createElement("span", null, toastMessage)));
  }

  // ==========================================================================
  // VIEW 1: ADMIN DASHBOARD (FULL OVERVIEW)
  // ==========================================================================

  const renderDashboardContent = () => /*#__PURE__*/React.createElement("div", {
    className: "dashboard-content-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stats-cards-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card",
    onClick: () => setActiveTab("students"),
    style: { cursor: "pointer" }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-icon-box stat-icon-blue"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-user-group"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, students.length.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "stat-bottom-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Jami Talabalar"), /*#__PURE__*/React.createElement("div", {
    className: "stat-trend"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-up"
  }), /*#__PURE__*/React.createElement("span", null, "12%")))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card",
    onClick: () => setActiveTab("courses"),
    style: { cursor: "pointer" }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-icon-box stat-icon-green"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-book-open"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, courses.length), /*#__PURE__*/React.createElement("div", {
    className: "stat-bottom-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Kurslar"), /*#__PURE__*/React.createElement("div", {
    className: "stat-trend"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-up"
  }), /*#__PURE__*/React.createElement("span", null, "8%")))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-icon-box stat-icon-purple"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-dollar-sign"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "$24,560"), /*#__PURE__*/React.createElement("div", {
    className: "stat-bottom-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Oylik Tushum"), /*#__PURE__*/React.createElement("div", {
    className: "stat-trend"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-up"
  }), /*#__PURE__*/React.createElement("span", null, "15%")))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-icon-box stat-icon-cyan"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-graduation-cap"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "83%"), /*#__PURE__*/React.createElement("div", {
    className: "stat-bottom-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Bitiruv Ko'rsatkichi"), /*#__PURE__*/React.createElement("div", {
    className: "stat-trend"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-up"
  }), /*#__PURE__*/React.createElement("span", null, "5%"))))), /*#__PURE__*/React.createElement("div", {
    className: "middle-charts-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dashboard-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header-bar"
  }, /*#__PURE__*/React.createElement("h3", null, "Students Overview"), /*#__PURE__*/React.createElement("span", {
    className: "card-action-tag"
  }, "Oylik tahlil")), /*#__PURE__*/React.createElement("div", {
    className: "bar-chart-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "y-axis-labels"
  }, /*#__PURE__*/React.createElement("span", null, "1,000"), /*#__PURE__*/React.createElement("span", null, "750"), /*#__PURE__*/React.createElement("span", null, "500"), /*#__PURE__*/React.createElement("span", null, "250"), /*#__PURE__*/React.createElement("span", null, "0")), /*#__PURE__*/React.createElement("div", {
    className: "chart-bars-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-line",
    style: { top: "0%" }
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-line",
    style: { top: "25%" }
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-line",
    style: { top: "50%" }
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-line",
    style: { top: "75%" }
  }), STUDENTS_CHART_DATA.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "bar-column"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar-tooltip"
  }, item.count, " talaba"), /*#__PURE__*/React.createElement("div", {
    className: "bar-fill",
    style: { height: `${item.pct}%` }
  }), /*#__PURE__*/React.createElement("span", {
    className: "bar-month-label"
  }, item.month)))))), /*#__PURE__*/React.createElement("div", {
    className: "dashboard-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header-bar"
  }, /*#__PURE__*/React.createElement("h3", null, "Courses by Category"), /*#__PURE__*/React.createElement("span", {
    className: "card-action-tag"
  }, "Kategoriyalar")), /*#__PURE__*/React.createElement("div", {
    className: "donut-chart-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "donut-svg-container"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "donut-svg",
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "donut-slice",
    cx: "50",
    cy: "50",
    r: "35",
    stroke: "#3b82f6",
    strokeDasharray: "87.96 219.91",
    strokeDashoffset: "0"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "donut-slice",
    cx: "50",
    cy: "50",
    r: "35",
    stroke: "#8b5cf6",
    strokeDasharray: "54.98 219.91",
    strokeDashoffset: "-87.96"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "donut-slice",
    cx: "50",
    cy: "50",
    r: "35",
    stroke: "#10b981",
    strokeDasharray: "43.98 219.91",
    strokeDashoffset: "-142.94"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "donut-slice",
    cx: "50",
    cy: "50",
    r: "35",
    stroke: "#38bdf8",
    strokeDasharray: "32.99 219.91",
    strokeDashoffset: "-186.92"
  })), /*#__PURE__*/React.createElement("div", {
    className: "donut-center-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "donut-total-num"
  }, courses.length), /*#__PURE__*/React.createElement("div", {
    className: "donut-total-text"
  }, "Jami Kurslar"))), /*#__PURE__*/React.createElement("div", {
    className: "category-legend-list"
  }, COURSES_CATEGORY_DATA.map((cat, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "legend-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-color-box",
    style: { background: cat.color }
  }), /*#__PURE__*/React.createElement("span", null, cat.name)), /*#__PURE__*/React.createElement("div", {
    className: "legend-percent"
  }, cat.percent, "%"))))))), /*#__PURE__*/React.createElement("div", {
    className: "revenue-chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header-bar"
  }, /*#__PURE__*/React.createElement("h3", null, "Revenue Overview"), /*#__PURE__*/React.createElement("span", {
    className: "card-action-tag"
  }, "Yillik daromad ($)")), /*#__PURE__*/React.createElement("div", {
    className: "revenue-spline-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "revenue-y-axis"
  }, /*#__PURE__*/React.createElement("span", null, "$30K"), /*#__PURE__*/React.createElement("span", null, "$20K"), /*#__PURE__*/React.createElement("span", null, "$10K"), /*#__PURE__*/React.createElement("span", null, "$0")), /*#__PURE__*/React.createElement("div", {
    className: "revenue-svg-wrapper"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "revenue-svg",
    viewBox: "0 0 520 160",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "revenueGradient",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#3b82f6",
    stopOpacity: "0.45"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#3b82f6",
    stopOpacity: "0.0"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "20",
    x2: "520",
    y2: "20",
    stroke: "rgba(255,255,255,0.05)",
    strokeDasharray: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "65",
    x2: "520",
    y2: "65",
    stroke: "rgba(255,255,255,0.05)",
    strokeDasharray: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "110",
    x2: "520",
    y2: "110",
    stroke: "rgba(255,255,255,0.05)",
    strokeDasharray: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "155",
    x2: "520",
    y2: "155",
    stroke: "rgba(255,255,255,0.1)"
  }), /*#__PURE__*/React.createElement("path", {
    className: "revenue-fill",
    d: "M 20 130 C 60 125, 80 118, 100 115 C 140 108, 160 98, 180 95 C 220 90, 240 82, 260 80 C 300 75, 320 68, 340 65 C 380 58, 400 52, 420 50 C 460 45, 480 38, 500 35 L 500 155 L 20 155 Z"
  }), /*#__PURE__*/React.createElement("path", {
    className: "revenue-path",
    d: "M 20 130 C 60 125, 80 118, 100 115 C 140 108, 160 98, 180 95 C 220 90, 240 82, 260 80 C 300 75, 320 68, 340 65 C 380 58, 400 52, 420 50 C 460 45, 480 38, 500 35"
  }), REVENUE_DATA.map((pt, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    className: "revenue-dot",
    cx: pt.x,
    cy: pt.y,
    onClick: () => showToast(`${pt.month} oyi daromadi: $${pt.revenue.toLocaleString()}`)
  }, /*#__PURE__*/React.createElement("title", null, `${pt.month}: $${pt.revenue.toLocaleString()}`)))))), /*#__PURE__*/React.createElement("div", {
    className: "revenue-x-axis"
  }, REVENUE_DATA.map((pt, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, pt.month)))));

  // ==========================================================================
  // VIEW 2: STUDENT DASHBOARD (PERSONAL OVERVIEW)
  // ==========================================================================

  const renderStudentDashboardContent = () => {
    const myHws = homeworks.filter(h => h.studentName.toLowerCase().includes("azizbek") || h.studentId === 1);
    const completedHws = myHws.filter(h => h.status === 'graded').length;
    const pendingHws = myHws.filter(h => h.status === 'pending').length;

    return /*#__PURE__*/React.createElement("div", {
      className: "student-dashboard-area"
    }, /*#__PURE__*/React.createElement("div", {
      className: "student-hero-banner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "student-hero-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "live-lesson-pill"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pulse-dot"
    }), /*#__PURE__*/React.createElement("span", null, "Jonli Dars: Bugun 19:30 da")), /*#__PURE__*/React.createElement("h2", {
      style: { fontSize: "24px", fontWeight: "800", color: "#fff" }
    }, "Salom, ", currentUser.name, "! 🚀"), /*#__PURE__*/React.createElement("p", {
      style: { color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }
    }, "Siz ", /*#__PURE__*/React.createElement("strong", { style: { color: "#60a5fa" } }, "Frontend React & Next.js Pro"), " kursida o'qiyapsiz. Bugungi mavzu: Custom Hooks va Global State boshqaruvi. Mentor: Farxod Dadajonov.")), /*#__PURE__*/React.createElement("div", {
      style: { display: "flex", gap: "10px", flexWrap: "wrap" }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      onClick: () => {
        window.open("https://zoom.us/j/itlive-react-class", "_blank");
        showToast("Zoom jonli dars xonasiga yo'naltirilmoqda...");
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-video"
    }), /*#__PURE__*/React.createElement("span", null, "Darsga Ulanish (Zoom)")), /*#__PURE__*/React.createElement("button", {
      className: "btn-secondary",
      onClick: () => setActiveTab("student_homework")
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-link"
    }), /*#__PURE__*/React.createElement("span", null, "Uy Ishini Topshirish")))), /*#__PURE__*/React.createElement("div", {
      className: "hw-stats-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hw-stat-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hw-stat-icon blue"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-spinner"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "22px", fontWeight: "800", color: "#fff" }
    }, "85%"), /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "12px", color: "var(--text-secondary)" }
    }, "Kursdagi O'zlashtirish"))), /*#__PURE__*/React.createElement("div", {
      className: "hw-stat-card",
      onClick: () => setActiveTab("student_homework"),
      style: { cursor: "pointer" }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hw-stat-icon green"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-circle-check"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "22px", fontWeight: "800", color: "#fff" }
    }, completedHws, " / ", myHws.length), /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "12px", color: "var(--text-secondary)" }
    }, "Baholangan Vazifalar"))), /*#__PURE__*/React.createElement("div", {
      className: "hw-stat-card",
      onClick: () => setActiveTab("student_homework"),
      style: { cursor: "pointer" }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hw-stat-icon yellow"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-hourglass-half"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "22px", fontWeight: "800", color: "#fff" }
    }, pendingHws, " ta"), /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "12px", color: "var(--text-secondary)" }
    }, "Tekshiruvdagi Ishlar"))), /*#__PURE__*/React.createElement("div", {
      className: "hw-stat-card",
      onClick: () => setActiveTab("leaderboard"),
      style: { cursor: "pointer" }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hw-stat-icon purple"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-trophy"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "22px", fontWeight: "800", color: "#fff" }
    }, "850 XP"), /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "12px", color: "var(--text-secondary)" }
    }, "Reyting: #2 O'rin")))), /*#__PURE__*/React.createElement("div", {
      className: "middle-charts-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dashboard-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header-bar"
    }, /*#__PURE__*/React.createElement("h3", null, "Oxirgi Vazifalarim va Holati"), /*#__PURE__*/React.createElement("button", {
      className: "card-action-tag",
      onClick: () => setActiveTab("student_homework"),
      style: { background: "transparent", border: "none", cursor: "pointer" }
    }, "Barchasini ko'rish →")), /*#__PURE__*/React.createElement("div", {
      style: { display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }
    }, myHws.map((hw) => /*#__PURE__*/React.createElement("div", {
      key: hw.id,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "10px",
        border: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: "12px" }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        background: hw.status === 'graded' ? 'rgba(16,185,129,0.15)' : hw.status === 'pending' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hw.status === 'graded' ? '#10b981' : hw.status === 'pending' ? '#f59e0b' : '#ef4444'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: hw.status === 'graded' ? 'fa-solid fa-check' : hw.status === 'pending' ? 'fa-solid fa-clock' : 'fa-solid fa-link'
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "14px", fontWeight: "700", color: "#fff" }
    }, hw.lessonTitle), /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "12px", color: "var(--text-secondary)" }
    }, "Muddat: ", hw.deadline))), hw.status === 'graded' ? /*#__PURE__*/React.createElement("span", {
      className: "hw-status-badge graded"
    }, "Baho: ", hw.grade, "/100") : hw.status === 'pending' ? /*#__PURE__*/React.createElement("span", {
      className: "hw-status-badge pending"
    }, "Tekshirilmoqda") : /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      style: { padding: "6px 12px", fontSize: "11px" },
      onClick: () => handleOpenSubmitModal(hw)
    }, "Link qo'yish"))))), /*#__PURE__*/React.createElement("div", {
      className: "dashboard-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header-bar"
    }, /*#__PURE__*/React.createElement("h3", null, "Dars Modullari Progressi"), /*#__PURE__*/React.createElement("span", {
      className: "card-action-tag"
    }, "4 ta Modul")), /*#__PURE__*/React.createElement("div", {
      style: { display: "flex", flexDirection: "column", gap: "16px", marginTop: "14px" }
    }, [{
      name: "1-Modul: HTML5 & Zamonaviy CSS Layouts",
      pct: 100,
      color: "#10b981"
    }, {
      name: "2-Modul: JavaScript ES6+ & Asinxron dasturlash",
      pct: 100,
      color: "#10b981"
    }, {
      name: "3-Modul: React 18, Hooks, Router & State",
      pct: 75,
      color: "#3b82f6"
    }, {
      name: "4-Modul: Next.js 14 Fullstack & REST APIs",
      pct: 10,
      color: "#8b5cf6"
    }].map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: { display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }
    }, /*#__PURE__*/React.createElement("span", null, m.name), /*#__PURE__*/React.createElement("strong", null, m.pct, "%")), /*#__PURE__*/React.createElement("div", {
      style: { height: "8px", background: "#1e293b", borderRadius: "4px", overflow: "hidden" }
    }, /*#__PURE__*/React.createElement("div", {
      style: { height: "100%", width: `${m.pct}%`, background: m.color, borderRadius: "4px" }
    }))))))));
  };

  // ==========================================================================
  // VIEW 3: STUDENT HOMEWORK & LINK SUBMISSION VIEW (USER REQUEST CORE)
  // ==========================================================================

  const renderStudentHomeworkContent = () => /*#__PURE__*/React.createElement("div", {
    className: "student-homework-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Uy Vazifalari va Amaliy Loyihalar"), /*#__PURE__*/React.createElement("p", null, "Topshiriqlarni bajaring va kod havolalarini (GitHub, Vercel yoki Figma) biriktiring")), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => {
      const firstNotSubmitted = studentHomeworks.find(h => h.status === 'not_submitted') || studentHomeworks[0];
      handleOpenSubmitModal(firstNotSubmitted);
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-link"
  }), /*#__PURE__*/React.createElement("span", null, "Uy Ishi Linkini Qo'yish"))), /*#__PURE__*/React.createElement("div", {
    className: "courses-category-tabs",
    style: { marginBottom: "20px" }
  }, [{
    id: "all",
    label: "Barcha Vazifalar"
  }, {
    id: "not_submitted",
    label: "Topshirilmagan (Yangi)"
  }, {
    id: "pending",
    label: "Tekshiruvda ⏳"
  }, {
    id: "graded",
    label: "Baholangan ✅"
  }].map((tab) => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    className: `cat-tab-btn ${hwFilterStatus === tab.id ? 'active' : ''}`,
    onClick: () => setHwFilterStatus(tab.id)
  }, tab.label))), /*#__PURE__*/React.createElement("div", {
    className: "hw-cards-grid"
  }, studentHomeworks.map((hw) => /*#__PURE__*/React.createElement("div", {
    key: hw.id,
    className: "hw-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hw-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "hw-card-title"
  }, hw.lessonTitle), /*#__PURE__*/React.createElement("div", {
    className: "hw-card-course"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-book"
  }), /*#__PURE__*/React.createElement("span", null, hw.course))), hw.status === 'graded' ? /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge graded"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-check"
  }), "Baholandi (", hw.grade, "/100)") : hw.status === 'pending' ? /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge pending"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-clock"
  }), "Tekshirilmoqda") : /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge not_submitted"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-circle-exclamation"
  }), "Topshirilmagan")), /*#__PURE__*/React.createElement("div", {
    className: "hw-meta-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-calendar",
    style: { marginRight: "6px" }
  }), "Muddat: ", /*#__PURE__*/React.createElement("strong", null, hw.deadline)), hw.submittedAt && /*#__PURE__*/React.createElement("span", {
    style: { color: "#60a5fa" }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-clock",
    style: { marginRight: "4px" }
  }), hw.submittedAt)), (hw.githubUrl || hw.liveUrl) && /*#__PURE__*/React.createElement("div", {
    className: "hw-links-container"
  }, hw.githubUrl && /*#__PURE__*/React.createElement("a", {
    href: hw.githubUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hw-link-pill"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hw-link-pill-left"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-brands fa-github",
    style: { fontSize: "16px" }
  }), /*#__PURE__*/React.createElement("span", null, hw.githubUrl)), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-up-right-from-square"
  })), hw.liveUrl && /*#__PURE__*/React.createElement("a", {
    href: hw.liveUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hw-link-pill"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hw-link-pill-left"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-globe",
    style: { fontSize: "16px", color: "#10b981" }
  }), /*#__PURE__*/React.createElement("span", null, hw.liveUrl)), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-up-right-from-square"
  }))), hw.comment && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)",
      background: "rgba(255,255,255,0.02)",
      padding: "8px 12px",
      borderRadius: "6px",
      fontStyle: "italic"
    }
  }, '"', hw.comment, '"'), hw.feedback && /*#__PURE__*/React.createElement("div", {
    className: "hw-feedback-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hw-feedback-header"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-comment-dots",
    style: { marginRight: "6px" }
  }), "Ustoz sharhi (", hw.reviewedBy, "):"), /*#__PURE__*/React.createElement("span", {
    style: { fontSize: "13px" }
  }, hw.grade, " ball")), /*#__PURE__*/React.createElement("p", {
    style: { color: "var(--text-secondary)", marginTop: "4px" }
  }, hw.feedback)), /*#__PURE__*/React.createElement("div", {
    style: { marginTop: "auto", paddingTop: "10px" }
  }, hw.status === 'not_submitted' ? /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    style: { width: "100%", justifyContent: "center" },
    onClick: () => handleOpenSubmitModal(hw)
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-link"
  }), /*#__PURE__*/React.createElement("span", null, "Uy Ishi Linkini Qo'yish")) : /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    style: { width: "100%", justifyContent: "center" },
    onClick: () => handleOpenSubmitModal(hw)
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-pen-to-square"
  }), /*#__PURE__*/React.createElement("span", null, "Havolani Yangilash / Qayta Yuborish")))))));

  // ==========================================================================
  // VIEW 4: MANAGER DASHBOARD & OVERVIEW
  // ==========================================================================

  const renderManagerDashboardContent = () => {
    const pendingReviewList = homeworks.filter(h => h.status === 'pending');
    return /*#__PURE__*/React.createElement("div", {
      className: "manager-dashboard-area"
    }, /*#__PURE__*/React.createElement("div", {
      className: "student-hero-banner",
      style: {
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%)",
        borderColor: "rgba(245, 158, 11, 0.3)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "student-hero-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "live-lesson-pill",
      style: { background: "rgba(245,158,11,0.2)", color: "#f59e0b", borderColor: "rgba(245,158,11,0.4)" }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-user-tie"
    }), /*#__PURE__*/React.createElement("span", null, "Akademiya Menejeri Paneli")), /*#__PURE__*/React.createElement("h2", {
      style: { fontSize: "24px", fontWeight: "800", color: "#fff" }
    }, "Xush kelibsiz, Menejer! 👔"), /*#__PURE__*/React.createElement("p", {
      style: { color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }
    }, "Bugun tekshirilishi kutilayotgan ", /*#__PURE__*/React.createElement("strong", { style: { color: "#f59e0b" } }, pendingReviewList.length, " ta uy vazifasi"), " mavjud. Talabalar yuborgan kod havolalarini ko'rib chiqing va baholang.")), /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      onClick: () => setActiveTab("homework_review"),
      style: { background: "#f59e0b", borderColor: "#f59e0b" }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-list-check"
    }), /*#__PURE__*/React.createElement("span", null, "Vazifalarni Tekshirish"))), /*#__PURE__*/React.createElement("div", {
      className: "stats-cards-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-card",
      onClick: () => setActiveTab("students"),
      style: { cursor: "pointer" }
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-card-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-icon-box stat-icon-blue"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-users"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "stat-value"
    }, students.length), /*#__PURE__*/React.createElement("div", {
      className: "stat-bottom-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-label"
    }, "Faol Talabalar"), /*#__PURE__*/React.createElement("div", {
      className: "stat-trend"
    }, "↑ 100%"))), /*#__PURE__*/React.createElement("div", {
      className: "stat-card",
      onClick: () => setActiveTab("homework_review"),
      style: { cursor: "pointer" }
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-card-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-icon-box stat-icon-yellow"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-file-signature"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "stat-value"
    }, pendingReviewList.length), /*#__PURE__*/React.createElement("div", {
      className: "stat-bottom-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-label"
    }, "Tekshiruv Kutayotgan Vazifalar"), /*#__PURE__*/React.createElement("div", {
      className: "stat-trend",
      style: { color: "#f59e0b" }
    }, "Kutilmoqda"))), /*#__PURE__*/React.createElement("div", {
      className: "stat-card",
      onClick: () => setActiveTab("groups"),
      style: { cursor: "pointer" }
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-card-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-icon-box stat-icon-green"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-people-roof"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "stat-value"
    }, groups.length), /*#__PURE__*/React.createElement("div", {
      className: "stat-bottom-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-label"
    }, "O'quv Guruhlari"), /*#__PURE__*/React.createElement("div", {
      className: "stat-trend"
    }, "4 ta aktiv"))), /*#__PURE__*/React.createElement("div", {
      className: "stat-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-card-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-icon-box stat-icon-cyan"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-user-check"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "stat-value"
    }, "94.6%"), /*#__PURE__*/React.createElement("div", {
      className: "stat-bottom-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat-label"
    }, "O'rtacha Davomat"), /*#__PURE__*/React.createElement("div", {
      className: "stat-trend"
    }, "↑ 2%")))), /*#__PURE__*/React.createElement("div", {
      className: "dashboard-card",
      style: { marginTop: "24px" }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header-bar"
    }, /*#__PURE__*/React.createElement("h3", null, "Tekshiruv Kutayotgan Uy Ishlari (Tezkor Havolalar)"), /*#__PURE__*/React.createElement("button", {
      className: "card-action-tag",
      onClick: () => setActiveTab("homework_review"),
      style: { background: "transparent", border: "none", cursor: "pointer" }
    }, "Barchasini ko'rish →")), /*#__PURE__*/React.createElement("div", {
      style: { display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }
    }, pendingReviewList.length === 0 ? /*#__PURE__*/React.createElement("p", {
      style: { color: "var(--text-muted)", padding: "20px", textAlign: "center" }
    }, "Ayni paytda tekshirish kutilayotgan yangi uy ishlari mavjud emas. Barchasi baholangan!") : pendingReviewList.map((hw) => /*#__PURE__*/React.createElement("div", {
      key: hw.id,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px",
        background: "rgba(255,255,255,0.02)",
        borderRadius: "10px",
        border: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: "12px" }
    }, /*#__PURE__*/React.createElement("img", {
      src: hw.studentAvatar,
      style: { width: "42px", height: "42px", borderRadius: "50%", border: "2px solid #f59e0b" }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "14px", fontWeight: "700", color: "#fff" }
    }, hw.studentName, " • ", /*#__PURE__*/React.createElement("span", { style: { color: "#60a5fa", fontWeight: "500" } }, hw.course)), /*#__PURE__*/React.createElement("div", {
      style: { fontSize: "12px", color: "var(--text-secondary)" }
    }, hw.lessonTitle))), /*#__PURE__*/React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: "10px" }
    }, hw.githubUrl && /*#__PURE__*/React.createElement("a", {
      href: hw.githubUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "btn-secondary",
      style: { padding: "6px 12px", fontSize: "12px" }
    }, /*#__PURE__*/React.createElement("i", { className: "fa-brands fa-github" }), " Kodni Ko'rish"), /*#__PURE__*/React.createElement("button", {
      className: "btn-primary",
      style: { padding: "6px 14px", fontSize: "12px" },
      onClick: () => handleOpenGradingModal(hw)
    }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-star" }), " Baholash")))))));
  };

  // ==========================================================================
  // VIEW 5: MANAGER HOMEWORK REVIEW (VIEW & GRADE SUBMITTED LINKS)
  // ==========================================================================

  const renderHomeworkReviewContent = () => /*#__PURE__*/React.createElement("div", {
    className: "manager-review-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Talabalar Uy Vazifalarini Tekshirish va Baholash"), /*#__PURE__*/React.createElement("p", null, "Talabalar yuborgan kod havolalarini ochib ko'ring, ball qo'ying va izoh qoldiring")), /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", gap: "10px" }
  }, /*#__PURE__*/React.createElement("span", {
    className: "table-grade-badge",
    style: { fontSize: "13px", padding: "8px 14px" }
  }, "Jami Vazifalar: ", homeworks.length))), /*#__PURE__*/React.createElement("div", {
    className: "table-filter-bar",
    style: { marginBottom: "20px" }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-filter-input"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-magnifying-glass search-icon-header"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Talaba ismi yoki vazifa bo'yicha qidiring...",
    value: studentSearch,
    onChange: (e) => setStudentSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "courses-category-tabs"
  }, [{
    id: "all",
    label: "Barchasi"
  }, {
    id: "pending",
    label: "Tekshiruvda ⏳"
  }, {
    id: "graded",
    label: "Baholangan ✅"
  }].map((tab) => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    className: `cat-tab-btn ${hwFilterStatus === tab.id ? 'active' : ''}`,
    onClick: () => setHwFilterStatus(tab.id)
  }, tab.label)))), /*#__PURE__*/React.createElement("div", {
    className: "hw-cards-grid"
  }, managerHomeworks.map((hw) => /*#__PURE__*/React.createElement("div", {
    key: hw.id,
    className: "hw-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hw-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", alignItems: "center", gap: "12px" }
  }, /*#__PURE__*/React.createElement("img", {
    src: hw.studentAvatar,
    style: { width: "44px", height: "44px", borderRadius: "50%", border: "2px solid #3b82f6" }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "hw-card-title",
    style: { fontSize: "15px" }
  }, hw.studentName), /*#__PURE__*/React.createElement("div", {
    className: "hw-card-course"
  }, hw.course))), hw.status === 'graded' ? /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge graded"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-check"
  }), "Baholandi: ", hw.grade, "/100") : hw.status === 'pending' ? /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge pending"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-clock"
  }), "Tekshiruvda") : /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge not_submitted"
  }, "Topshirilmagan")), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "14px", fontWeight: "600", color: "#fff" }
  }, hw.lessonTitle), /*#__PURE__*/React.createElement("div", {
    className: "hw-meta-row"
  }, /*#__PURE__*/React.createElement("span", null, "Muddat: ", hw.deadline), hw.submittedAt ? /*#__PURE__*/React.createElement("span", {
    style: { color: "#60a5fa" }
  }, "Topshirildi: ", hw.submittedAt) : /*#__PURE__*/React.createElement("span", {
    style: { color: "#ef4444" }
  }, "Kutilmoqda")), (hw.githubUrl || hw.liveUrl) ? /*#__PURE__*/React.createElement("div", {
    className: "hw-links-container"
  }, hw.githubUrl && /*#__PURE__*/React.createElement("a", {
    href: hw.githubUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hw-link-pill"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hw-link-pill-left"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-brands fa-github",
    style: { fontSize: "16px" }
  }), /*#__PURE__*/React.createElement("span", null, "GitHub: ", hw.githubUrl)), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-up-right-from-square"
  })), hw.liveUrl && /*#__PURE__*/React.createElement("a", {
    href: hw.liveUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hw-link-pill"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hw-link-pill-left"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-globe",
    style: { fontSize: "16px", color: "#10b981" }
  }), /*#__PURE__*/React.createElement("span", null, "Demo: ", hw.liveUrl)), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-up-right-from-square"
  }))) : /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "12px", color: "var(--text-muted)", padding: "8px 0" }
  }, "Hozircha link biriktirilmagan."), hw.comment && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)",
      background: "rgba(255,255,255,0.02)",
      padding: "8px 12px",
      borderRadius: "6px"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Talaba izohi: "), '"', hw.comment, '"'), hw.feedback && /*#__PURE__*/React.createElement("div", {
    className: "hw-feedback-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hw-feedback-header"
  }, /*#__PURE__*/React.createElement("span", null, "Qo'yilgan baho: ", hw.grade, " ball"), /*#__PURE__*/React.createElement("span", {
    style: { fontSize: "11px", color: "var(--text-muted)" }
  }, hw.reviewedBy)), /*#__PURE__*/React.createElement("p", {
    style: { color: "var(--text-secondary)", marginTop: "4px" }
  }, hw.feedback)), /*#__PURE__*/React.createElement("div", {
    style: { marginTop: "auto", paddingTop: "12px" }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    style: { width: "100%", justifyContent: "center" },
    onClick: () => handleOpenGradingModal(hw)
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("span", null, hw.status === 'graded' ? "Bahoni Tahrirlash" : "Baholash & Izoh Qoldirish")))))));

  // ==========================================================================
  // VIEW 6: GROUPS VIEW (FOR MANAGER)
  // ==========================================================================

  const renderGroupsContent = () => /*#__PURE__*/React.createElement("div", {
    className: "groups-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Akademiya O'quv Guruhlari"), /*#__PURE__*/React.createElement("p", null, "Faol guruhlar taqvimi, mentorlar va auditoriyalar nazorati")), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => showToast("Yangi guruh ochish oynasi")
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-plus"
  }), /*#__PURE__*/React.createElement("span", null, "Yangi Guruh Ochish"))), /*#__PURE__*/React.createElement("div", {
    className: "groups-grid"
  }, groups.map((g) => /*#__PURE__*/React.createElement("div", {
    key: g.id,
    className: "group-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", justifyContent: "space-between", alignItems: "center" }
  }, /*#__PURE__*/React.createElement("h3", {
    style: { fontSize: "16px", fontWeight: "700" }
  }, g.name), /*#__PURE__*/React.createElement("span", {
    className: "schedule-day-badge"
  }, g.status === 'active' ? "Faol Guruh" : "Yopilgan")), /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "var(--text-secondary)" }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", { style: { color: "#fff" } }, "Mentor: "), g.mentor), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", { style: { color: "#fff" } }, "Dars kunlari: "), g.days), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", { style: { color: "#fff" } }, "Vaqti: "), g.time), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", { style: { color: "#fff" } }, "Auditoriya: "), g.room), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", { style: { color: "#fff" } }, "Talabalar: "), g.studentsCount, " nafar")), /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", gap: "8px", marginTop: "10px" }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    style: { flex: 1, padding: "8px", fontSize: "12px", justifyContent: "center" },
    onClick: () => showToast(`${g.name} guruh jurnali`)
  }, "Jurnal"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    style: { flex: 1, padding: "8px", fontSize: "12px", justifyContent: "center" },
    onClick: () => showToast(`${g.name} guruhiga xabar yuborish`)
  }, "Xabar Yuborish"))))));

  // ==========================================================================
  // VIEW 7: ATTENDANCE & REPORTS VIEW (FOR MANAGER)
  // ==========================================================================

  const renderAttendanceReportsContent = () => /*#__PURE__*/React.createElement("div", {
    className: "reports-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Davomat va O'zlashtirish Hisobotlari"), /*#__PURE__*/React.createElement("p", null, "Haftalik dars qatnashuvi va talabalar faolligi tahlili")), /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: () => showToast("Hisobot PDF shaklida eksport qilindi")
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-file-pdf"
  }), /*#__PURE__*/React.createElement("span", null, "PDF Hisobot"))), /*#__PURE__*/React.createElement("div", {
    className: "review-table-card"
  }, /*#__PURE__*/React.createElement("table", {
    className: "students-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Talaba"), /*#__PURE__*/React.createElement("th", null, "Guruh"), /*#__PURE__*/React.createElement("th", null, "Oxirgi Dars"), /*#__PURE__*/React.createElement("th", null, "Oylik Qatnashuv"), /*#__PURE__*/React.createElement("th", null, "Holati"))), /*#__PURE__*/React.createElement("tbody", null, students.map((s) => /*#__PURE__*/React.createElement("tr", {
    key: s.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", alignItems: "center", gap: "10px" }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.avatar,
    style: { width: "32px", height: "32px", borderRadius: "50%" }
  }), /*#__PURE__*/React.createElement("span", {
    style: { fontWeight: "700" }
  }, s.name))), /*#__PURE__*/React.createElement("td", null, "FN-204"), /*#__PURE__*/React.createElement("td", null, "Bugun 19:30"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", alignItems: "center", gap: "8px" }
  }, /*#__PURE__*/React.createElement("div", {
    style: { width: "80px", height: "6px", background: "#1e293b", borderRadius: "3px", overflow: "hidden" }
  }, /*#__PURE__*/React.createElement("div", {
    style: { width: `${s.progress}%`, height: "100%", background: "#10b981" }
  })), /*#__PURE__*/React.createElement("span", null, s.progress, "%"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge graded"
  }, "Kelgan"))))))));

  // ==========================================================================
  // VIEW 8: MY COURSES VIEW (FOR STUDENT)
  // ==========================================================================

  const renderMyCoursesContent = () => /*#__PURE__*/React.createElement("div", {
    className: "my-courses-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Mening Kurslarim"), /*#__PURE__*/React.createElement("p", null, "Siz tahsil olayotgan kurslar va barcha o'quv materiallari"))), /*#__PURE__*/React.createElement("div", {
    className: "courses-grid"
  }, courses.slice(0, 2).map((course) => /*#__PURE__*/React.createElement("div", {
    key: course.id,
    className: "course-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "course-banner",
    style: { background: course.bgGradient }
  }, /*#__PURE__*/React.createElement("span", {
    className: "course-cat-badge"
  }, "Faol Talaba"), /*#__PURE__*/React.createElement("div", {
    className: "course-rating-pill"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("span", null, course.rating))), /*#__PURE__*/React.createElement("div", {
    className: "course-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "course-title"
  }, course.title), /*#__PURE__*/React.createElement("div", {
    className: "instructor-row"
  }, /*#__PURE__*/React.createElement("img", {
    src: course.instructorAvatar,
    className: "instructor-avatar"
  }), /*#__PURE__*/React.createElement("span", null, "Ustoz: ", /*#__PURE__*/React.createElement("strong", null, course.instructor))), /*#__PURE__*/React.createElement("p", {
    style: { fontSize: "12px", color: "var(--text-secondary)", marginBottom: "14px", lineHeight: "1.4" }
  }, course.description), /*#__PURE__*/React.createElement("div", {
    className: "course-metrics-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "course-metric-item"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-layer-group" }), course.lessons, " dars"), /*#__PURE__*/React.createElement("div", {
    className: "course-metric-item"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-regular fa-clock" }), course.duration)), /*#__PURE__*/React.createElement("div", {
    className: "course-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    style: { width: "100%", justifyContent: "center" },
    onClick: () => {
      window.open("https://zoom.us/j/itlive-react-class", "_blank");
      showToast("Dars xonasiga kirildi");
    }
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-play" }), " Darsni Davom Ettirish")))))));

  // ==========================================================================
  // VIEW 9: SCHEDULE VIEW (FOR STUDENT)
  // ==========================================================================

  const renderScheduleContent = () => /*#__PURE__*/React.createElement("div", {
    className: "schedule-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Dars Jadvali va Jonli Efirlar"), /*#__PURE__*/React.createElement("p", null, "Haftalik jonli mashg'ulotlar, Zoom ulanish havolalari"))), /*#__PURE__*/React.createElement("div", {
    className: "schedule-grid"
  }, scheduleList.map((sc) => /*#__PURE__*/React.createElement("div", {
    key: sc.id,
    className: `schedule-card ${sc.isToday ? 'active-today' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", justifyContent: "space-between", alignItems: "center" }
  }, /*#__PURE__*/React.createElement("span", {
    className: "schedule-day-badge"
  }, sc.day), sc.isToday && /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge pending"
  }, /*#__PURE__*/React.createElement("span", { className: "pulse-dot" }), " Bugun!")), /*#__PURE__*/React.createElement("h3", {
    style: { fontSize: "16px", fontWeight: "700", color: "#fff" }
  }, sc.subject), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "13px", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "6px" }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("i", { className: "fa-regular fa-clock", style: { marginRight: "6px" } }), sc.time), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-user", style: { marginRight: "6px" } }), "Mentor: ", sc.mentor), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-location-dot", style: { marginRight: "6px" } }), sc.room)), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    style: { marginTop: "10px", width: "100%", justifyContent: "center" },
    onClick: () => {
      window.open(sc.zoomUrl, "_blank");
      showToast("Zoom darsiga yo'naltirilmoqda...");
    }
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-video" }), " Jonli Efirga Kirish")))));

  // ==========================================================================
  // VIEW 10: LEADERBOARD VIEW (FOR STUDENT)
  // ==========================================================================

  const renderLeaderboardContent = () => /*#__PURE__*/React.createElement("div", {
    className: "leaderboard-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Guruh Talabalari Reytingi"), /*#__PURE__*/React.createElement("p", null, "Topshirilgan uy ishlari va to'plangan XP ballar bo'yicha saralash"))), /*#__PURE__*/React.createElement("div", {
    className: "podium-container"
  }, leaderboardList.slice(0, 3).map((lead, idx) => /*#__PURE__*/React.createElement("div", {
    key: lead.id,
    className: `podium-card ${idx === 0 ? 'first' : ''}`
  }, idx === 0 && /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-crown podium-crown" }), /*#__PURE__*/React.createElement("img", {
    src: lead.avatar,
    className: `podium-avatar ${idx === 0 ? 'gold' : idx === 1 ? 'silver' : 'bronze'}`
  }), /*#__PURE__*/React.createElement("h3", {
    style: { fontSize: "16px", fontWeight: "700" }
  }, lead.name, lead.isCurrentUser ? " (Siz)" : ""), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0" }
  }, lead.course), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "20px", fontWeight: "800", color: "#60a5fa" }
  }, lead.points, " XP"), /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge graded",
    style: { marginTop: "10px" }
  }, lead.badge)))));

  // ==========================================================================
  // VIEW 11: STUDENT PROFILE VIEW
  // ==========================================================================

  const renderStudentProfileContent = () => /*#__PURE__*/React.createElement("div", {
    className: "student-profile-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Mening Profilim va Ma'lumotlarim"), /*#__PURE__*/React.createElement("p", null, "Shaxsiy ma'lumotlar, to'lov kvitansiyalari va sertifikat talablari"))), /*#__PURE__*/React.createElement("div", {
    style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dashboard-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }
  }, /*#__PURE__*/React.createElement("img", {
    src: currentUser.avatar,
    style: { width: "72px", height: "72px", borderRadius: "50%", border: "3px solid #3b82f6" }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: { fontSize: "18px" }
  }, currentUser.name), /*#__PURE__*/React.createElement("span", {
    className: "hw-status-badge graded"
  }, currentUser.roleName))), /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Telefon: "), "+998 90 123 45 67"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Kurs: "), "Frontend React & Next.js Pro"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Guruh: "), "FN-204"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Shartnoma raqami: "), "ITL-2024-884"))), /*#__PURE__*/React.createElement("div", {
    className: "dashboard-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: { marginBottom: "14px" }
  }, "Oylik To'lov va Sertifikat"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px",
      background: "rgba(16,185,129,0.1)",
      border: "1px solid rgba(16,185,129,0.3)",
      borderRadius: "10px",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: { fontWeight: "700", color: "#10b981", marginBottom: "4px" }
  }, "To'lov Holati: To'liq to'langan ✅"), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "12px", color: "var(--text-secondary)" }
  }, "Joriy oy uchun to'lov to'liq qabul qilingan. Keyingi to'lov: 2024-04-15.")), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "13px", color: "var(--text-secondary)" }
  }, /*#__PURE__*/React.createElement("strong", null, "Sertifikat shartlari: "), "Kamida 80% o'zlashtirish va barcha 4 ta amaliy uy vazifalarini muvaffaqiyatli topshirish kerak."))));

  // ==========================================================================
  // VIEW 12: STAFF VIEW (FOR ADMIN)
  // ==========================================================================

  const renderStaffContent = () => /*#__PURE__*/React.createElement("div", {
    className: "staff-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Akademiya Xodimlari va Rollari"), /*#__PURE__*/React.createElement("p", null, "Administratorlar, menejerlar va o'qituvchilar tizimi"))), /*#__PURE__*/React.createElement("div", {
    className: "staff-grid"
  }, staffList.map((s) => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: "staff-card"
  }, /*#__PURE__*/React.createElement("img", {
    src: s.avatar,
    className: "staff-avatar"
  }), /*#__PURE__*/React.createElement("div", {
    style: { flex: 1 }
  }, /*#__PURE__*/React.createElement("h3", {
    style: { fontSize: "15px", fontWeight: "700" }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "12px", color: "#60a5fa", margin: "2px 0" }
  }, s.role), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "11px", color: "var(--text-muted)" }
  }, s.permissions))))));

  // ==========================================================================
  // VIEW 13: STUDENTS MANAGEMENT TABLE (SHARED / ADMIN & MANAGER)
  // ==========================================================================

  const renderStudentsContent = () => /*#__PURE__*/React.createElement("div", {
    className: "students-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Talabalar Ro'yxati"), /*#__PURE__*/React.createElement("p", null, "Jami ", students.length, " nafar o'quvchi ro'yxatdan o'tgan")), /*#__PURE__*/React.createElement("div", {
    className: "action-buttons-group"
  }, (currentUser.role === 'admin' || currentUser.role === 'manager') && /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => setIsAddStudentModalOpen(true)
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-plus" }), /*#__PURE__*/React.createElement("span", null, "Yangi Talaba Qo'shish")), /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: () => {
      const csv = students.map((s) => `${s.name},${s.email},${s.course},${s.progress}%,${s.status}`).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "itlive_students.csv";
      a.click();
      showToast("Talabalar ro'yxati CSV shaklida yuklandi!");
    }
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-file-export" }), /*#__PURE__*/React.createElement("span", null, "Eksport (CSV)")))), /*#__PURE__*/React.createElement("div", {
    className: "table-filter-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-filter-input"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-magnifying-glass search-icon-header" }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ism, email yoki telefon bo'yicha qidiring...",
    value: studentSearch,
    onChange: (e) => setStudentSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-selects"
  }, /*#__PURE__*/React.createElement("select", {
    className: "filter-select",
    value: studentFilterCourse,
    onChange: (e) => setStudentFilterCourse(e.target.value)
  }, /*#__PURE__*/React.createElement("option", { value: "all" }, "Barcha Kurslar"), courses.map((c) => /*#__PURE__*/React.createElement("option", { key: c.id, value: c.title }, c.title))), /*#__PURE__*/React.createElement("select", {
    className: "filter-select",
    value: studentFilterStatus,
    onChange: (e) => setStudentFilterStatus(e.target.value)
  }, /*#__PURE__*/React.createElement("option", { value: "all" }, "Barcha Holatlar"), /*#__PURE__*/React.createElement("option", { value: "active" }, "Faol"), /*#__PURE__*/React.createElement("option", { value: "completed" }, "Bitirgan"), /*#__PURE__*/React.createElement("option", { value: "pending" }, "Kutilmoqda")))), /*#__PURE__*/React.createElement("div", {
    className: "students-table-wrapper"
  }, /*#__PURE__*/React.createElement("table", {
    className: "students-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Talaba"), /*#__PURE__*/React.createElement("th", null, "Kurs"), /*#__PURE__*/React.createElement("th", null, "Telefon"), /*#__PURE__*/React.createElement("th", null, "Progress"), /*#__PURE__*/React.createElement("th", null, "Holat"), /*#__PURE__*/React.createElement("th", null, "To'lov"), currentUser.role === 'admin' && /*#__PURE__*/React.createElement("th", null, "Amallar"))), /*#__PURE__*/React.createElement("tbody", null, filteredStudents.map((student) => /*#__PURE__*/React.createElement("tr", {
    key: student.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "table-user-cell"
  }, /*#__PURE__*/React.createElement("img", {
    src: student.avatar,
    alt: student.name,
    className: "table-user-avatar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "table-user-info"
  }, /*#__PURE__*/React.createElement("div", { className: "table-user-name" }, student.name), /*#__PURE__*/React.createElement("div", { className: "table-user-email" }, student.email)))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "course-name-tag"
  }, student.course)), /*#__PURE__*/React.createElement("td", {
    style: { fontSize: "13px" }
  }, student.phone), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "progress-bar-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill-bar",
    style: {
      width: `${student.progress}%`,
      background: student.progress === 100 ? "#10b981" : student.progress > 50 ? "#3b82f6" : "#f59e0b"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "progress-num"
  }, student.progress, "%"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `status-badge status-${student.status}`
  }, student.status === 'active' ? 'Faol' : student.status === 'completed' ? 'Bitirgan' : 'Kutilmoqda')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `payment-badge payment-${student.payment}`
  }, student.payment === 'paid' ? "To'langan" : student.payment === 'partial' ? 'Qisman' : "To'lanmagan")), currentUser.role === 'admin' && /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "table-icon-btn delete-btn",
    onClick: () => handleDeleteStudent(student.id),
    title: "O'chirish"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-trash-can" })))))))));

  // ==========================================================================
  // VIEW 14: COURSES VIEW (CATALOG)
  // ==========================================================================

  const renderCoursesContent = () => /*#__PURE__*/React.createElement("div", {
    className: "courses-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Akademiya Kurslari"), /*#__PURE__*/React.createElement("p", null, "Amaliy va talab yuqori bo'lgan zamonaviy IT mutaxassisliklari")), currentUser.role === 'admin' && /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => showToast("Yangi kurs qo'shish oynasi")
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-plus" }), /*#__PURE__*/React.createElement("span", null, "Yangi Kurs Qo'shish"))), /*#__PURE__*/React.createElement("div", {
    className: "courses-category-tabs"
  }, ["all", "development", "design", "business", "foundation"].map((cat) => /*#__PURE__*/React.createElement("button", {
    key: cat,
    className: `cat-tab-btn ${courseFilterCategory === cat ? 'active' : ''}`,
    onClick: () => setCourseFilterCategory(cat)
  }, cat === 'all' ? 'Barcha Kurslar' : cat.charAt(0).toUpperCase() + cat.slice(1)))), /*#__PURE__*/React.createElement("div", {
    className: "courses-grid"
  }, filteredCourses.map((course) => /*#__PURE__*/React.createElement("div", {
    key: course.id,
    className: "course-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "course-banner",
    style: { background: course.bgGradient }
  }, /*#__PURE__*/React.createElement("span", {
    className: "course-cat-badge"
  }, course.category), /*#__PURE__*/React.createElement("div", {
    className: "course-rating-pill"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-star" }), /*#__PURE__*/React.createElement("span", null, course.rating, " (", course.reviews, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "course-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "course-title"
  }, course.title), /*#__PURE__*/React.createElement("div", {
    className: "instructor-row"
  }, /*#__PURE__*/React.createElement("img", {
    src: course.instructorAvatar,
    className: "instructor-avatar"
  }), /*#__PURE__*/React.createElement("span", null, "Mentor: ", /*#__PURE__*/React.createElement("strong", null, course.instructor))), /*#__PURE__*/React.createElement("p", {
    style: { fontSize: "12px", color: "var(--text-secondary)", marginBottom: "14px", lineHeight: "1.4" }
  }, course.description), /*#__PURE__*/React.createElement("div", {
    className: "course-metrics-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "course-metric-item"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-layer-group" }), course.lessons, " dars"), /*#__PURE__*/React.createElement("div", {
    className: "course-metric-item"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-regular fa-clock" }), course.duration), /*#__PURE__*/React.createElement("div", {
    className: "course-metric-item"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-users" }), course.students, " o'quvchi")), /*#__PURE__*/React.createElement("div", {
    className: "course-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "course-price"
  }, course.price, " ", /*#__PURE__*/React.createElement("span", null, "/ oy")), currentUser.role === 'student' ? /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    style: { padding: "8px 14px", fontSize: "12px" },
    onClick: () => handleEnrollCourse(course.title)
  }, /*#__PURE__*/React.createElement("span", null, "Yozilish")) : /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    style: { padding: "8px 14px", fontSize: "12px" },
    onClick: () => showToast(`${course.title} kursini tahrirlash`)
  }, /*#__PURE__*/React.createElement("span", null, "Tahrirlash"))))))));

  // ==========================================================================
  // VIEW 15: ANALYTICS VIEW (FOR ADMIN)
  // ==========================================================================

  const renderAnalyticsContent = () => /*#__PURE__*/React.createElement("div", {
    className: "analytics-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Akademiya Analitikasi va Tahlili"), /*#__PURE__*/React.createElement("p", null, "O'sish sur'atlari, talabalar davomati va o'quv samaradorligi"))), /*#__PURE__*/React.createElement("div", {
    className: "stats-cards-grid",
    style: { marginBottom: "24px" }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-icon-box stat-icon-blue"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-user-check" }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "94.2%"), /*#__PURE__*/React.createElement("div", {
    className: "stat-bottom-row"
  }, /*#__PURE__*/React.createElement("div", { className: "stat-label" }, "O'rtacha Qatnashuv"), /*#__PURE__*/React.createElement("div", { className: "stat-trend" }, "↑ 3.2%"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-icon-box stat-icon-green"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-award" }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "88.6%"), /*#__PURE__*/React.createElement("div", {
    className: "stat-bottom-row"
  }, /*#__PURE__*/React.createElement("div", { className: "stat-label" }, "Imtihon Muvaffaqiyati"), /*#__PURE__*/React.createElement("div", { className: "stat-trend" }, "↑ 4.1%"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-icon-box stat-icon-yellow"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-briefcase" }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "76%"), /*#__PURE__*/React.createElement("div", {
    className: "stat-bottom-row"
  }, /*#__PURE__*/React.createElement("div", { className: "stat-label" }, "Ishga Joylashish"), /*#__PURE__*/React.createElement("div", { className: "stat-trend" }, "↑ 6.0%"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-icon-box stat-icon-purple"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-star" }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, "4.92 / 5"), /*#__PURE__*/React.createElement("div", {
    className: "stat-bottom-row"
  }, /*#__PURE__*/React.createElement("div", { className: "stat-label" }, "Mamnunlik Ko'rsatkichi"), /*#__PURE__*/React.createElement("div", { className: "stat-trend" }, "↑ 0.3")))));

  // ==========================================================================
  // VIEW 16: SETTINGS VIEW
  // ==========================================================================

  const renderSettingsContent = () => /*#__PURE__*/React.createElement("div", {
    className: "settings-view-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-title-box"
  }, /*#__PURE__*/React.createElement("h2", null, "Tizim Sozlamalari"), /*#__PURE__*/React.createElement("p", null, "Profil ma'lumotlari, xavfsizlik va akademiya konfiguratsiyasi"))), /*#__PURE__*/React.createElement("div", {
    style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dashboard-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: { marginBottom: "16px" }
  }, "Foydalanuvchi Profili"), /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }
  }, /*#__PURE__*/React.createElement("img", {
    src: currentUser.avatar,
    style: { width: "64px", height: "64px", borderRadius: "50%", border: "2px solid #3b82f6" }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: { fontSize: "16px" }
  }, currentUser.name), /*#__PURE__*/React.createElement("p", {
    style: { fontSize: "13px", color: "var(--text-secondary)" }
  }, currentUser.roleName))), /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", flexDirection: "column", gap: "12px" }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    style: { justifyContent: "center" },
    onClick: () => showToast("Parolni yangilash oynasi ochildi")
  }, "Parolni O'zgartirish"), /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    style: { justifyContent: "center", color: "#ef4444" },
    onClick: handleLogout
  }, "Tizimdan Chiqish"))), /*#__PURE__*/React.createElement("div", {
    className: "dashboard-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: { marginBottom: "16px" }
  }, "Platforma Ma'lumotlari"), /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }
  }, /*#__PURE__*/React.createElement("div", {
    style: { padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }
  }, /*#__PURE__*/React.createElement("strong", null, "Akademiya:"), " IT LIVE ACADEMY"), /*#__PURE__*/React.createElement("div", {
    style: { padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }
  }, /*#__PURE__*/React.createElement("strong", null, "Manzil:"), " Toshkent shahri, Chilonzor"), /*#__PURE__*/React.createElement("div", {
    style: { padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }
  }, /*#__PURE__*/React.createElement("strong", null, "Aloqa:"), " +998 71 200 00 00 | info@itlive.uz")))));

  // ==========================================================================
  // SIDEBAR NAVIGATION RENDERING (ROLE-SPECIFIC MENUS)
  // ==========================================================================

  const renderSidebarNav = () => {
    // 1. ADMIN MENUS
    if (currentUser.role === 'admin') {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'dashboard' ? 'active' : ''}`,
        onClick: () => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-chart-line" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Dashboard")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'students' ? 'active' : ''}`,
        onClick: () => { setActiveTab('students'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-user-group" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Talabalar (Students)")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'courses' ? 'active' : ''}`,
        onClick: () => { setActiveTab('courses'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-book-open" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Kurslar (Courses)")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'analytics' ? 'active' : ''}`,
        onClick: () => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-chart-pie" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Moliya & Tahlil")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'staff' ? 'active' : ''}`,
        onClick: () => { setActiveTab('staff'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-users-gear" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Xodimlar & Rollar")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'settings' ? 'active' : ''}`,
        onClick: () => { setActiveTab('settings'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-gear" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Tizim Sozlamalari")));
    }

    // 2. MANAGER MENUS
    if (currentUser.role === 'manager') {
      const pendingCount = homeworks.filter(h => h.status === 'pending').length;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'manager_dashboard' ? 'active' : ''}`,
        onClick: () => { setActiveTab('manager_dashboard'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-table-columns" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Menejer Paneli")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'homework_review' ? 'active' : ''}`,
        onClick: () => { setActiveTab('homework_review'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-list-check" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", {
        style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }
      }, /*#__PURE__*/React.createElement("span", null, "Uy Ishlari Tekshiruvi"), pendingCount > 0 && /*#__PURE__*/React.createElement("span", {
        style: { background: "#f59e0b", color: "#000", fontSize: "10px", padding: "1px 6px", borderRadius: "10px", fontWeight: "800" }
      }, pendingCount))), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'students' ? 'active' : ''}`,
        onClick: () => { setActiveTab('students'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-user-check" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Talabalar & Davomat")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'groups' ? 'active' : ''}`,
        onClick: () => { setActiveTab('groups'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-people-roof" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "O'quv Guruhlari")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'attendance_reports' ? 'active' : ''}`,
        onClick: () => { setActiveTab('attendance_reports'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-chart-column" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Davomat & Hisobotlar")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'settings' ? 'active' : ''}`,
        onClick: () => { setActiveTab('settings'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-gear" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Sozlamalar")));
    }

    // 3. STUDENT MENUS
    if (currentUser.role === 'student') {
      const myHws = homeworks.filter(h => h.studentName.toLowerCase().includes("azizbek") || h.studentId === 1);
      const notSubmittedCount = myHws.filter(h => h.status === 'not_submitted').length;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'student_dashboard' ? 'active' : ''}`,
        onClick: () => { setActiveTab('student_dashboard'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-house-laptop" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Mening Kabinetim")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'student_homework' ? 'active' : ''}`,
        onClick: () => { setActiveTab('student_homework'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-file-code" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", {
        style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }
      }, /*#__PURE__*/React.createElement("span", null, "Uy Ishlari (Topshirish)"), notSubmittedCount > 0 && /*#__PURE__*/React.createElement("span", {
        style: { background: "#ef4444", color: "#fff", fontSize: "10px", padding: "1px 6px", borderRadius: "10px", fontWeight: "800" }
      }, notSubmittedCount))), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'my_courses' ? 'active' : ''}`,
        onClick: () => { setActiveTab('my_courses'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-graduation-cap" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Mening Kurslarim")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'schedule' ? 'active' : ''}`,
        onClick: () => { setActiveTab('schedule'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-calendar-days" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Dars Jadvali")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'leaderboard' ? 'active' : ''}`,
        onClick: () => { setActiveTab('leaderboard'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-trophy" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Reyting & Ballar")), /*#__PURE__*/React.createElement("button", {
        className: `nav-item-btn ${activeTab === 'profile' ? 'active' : ''}`,
        onClick: () => { setActiveTab('profile'); setIsMobileMenuOpen(false); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-id-card" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Mening Profilim")));
    }

    // 4. MENTOR MENUS
    if (currentUser.role === 'mentor') {
      return React.createElement(React.Fragment, null,
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'mentor_dashboard' ? 'active' : ''), onClick: function() { setActiveTab('mentor_dashboard'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-chalkboard-user' }), !isSidebarCollapsed && React.createElement('span', null, 'Mentor Paneli')),
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'groups' ? 'active' : ''), onClick: function() { setActiveTab('groups'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-people-roof' }), !isSidebarCollapsed && React.createElement('span', null, 'Guruhlarim')),
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'homework_review' ? 'active' : ''), onClick: function() { setActiveTab('homework_review'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-list-check' }), !isSidebarCollapsed && React.createElement('span', null, 'Vazifalar')),
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'schedule' ? 'active' : ''), onClick: function() { setActiveTab('schedule'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-calendar-days' }), !isSidebarCollapsed && React.createElement('span', null, 'Dars Jadvali'))
      );
    }

    // 5. GUEST MENUS
    if (currentUser.role === 'guest') {
      return React.createElement(React.Fragment, null,
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'guest_home' ? 'active' : ''), onClick: function() { setActiveTab('guest_home'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-house' }), !isSidebarCollapsed && React.createElement('span', null, 'Bosh Sahifa')),
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'courses' ? 'active' : ''), onClick: function() { setActiveTab('courses'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-book-open' }), !isSidebarCollapsed && React.createElement('span', null, 'Kurslar Katalogi'))
      );
    }

    // 6. BLOCKED MENUS
    if (currentUser.role === 'blocked') {
      return React.createElement(React.Fragment, null,
        React.createElement('button', { className: 'nav-item-btn', style: { background: 'rgba(148,163,184,0.1)', color: '#94a3b8', cursor: 'not-allowed' } }, React.createElement('i', { className: 'fa-solid fa-ban' }), !isSidebarCollapsed && React.createElement('span', null, 'Hisob Bloklangan'))
      );
    }

    return null;
  };

  // ==========================================================================
  // COMPLETE DASHBOARD CONTAINER (SHARED BY BOTH FULLSCREEN & MOCKUP)
  // ==========================================================================

  const dashboardApp = /*#__PURE__*/React.createElement("div", {
    className: "app-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: `app-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-red-badge"
  }, "IT"), !isSidebarCollapsed && /*#__PURE__*/React.createElement("div", {
    className: "brand-label-text"
  }, "LIVE ", /*#__PURE__*/React.createElement("span", null, "ACADEMY"))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-menu"
  }, renderSidebarNav()), /*#__PURE__*/React.createElement("button", {
    className: "sidebar-logout-btn",
    onClick: handleLogout
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-arrow-right-from-bracket" }), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "Chiqish")), !isSidebarCollapsed && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user-footer"
  }, /*#__PURE__*/React.createElement("img", {
    src: currentUser.avatar,
    alt: currentUser.name,
    className: "user-avatar-mini"
  }), /*#__PURE__*/React.createElement("div", {
    className: "user-info-text"
  }, /*#__PURE__*/React.createElement("span", { className: "user-name" }, currentUser.name), /*#__PURE__*/React.createElement("span", {
    className: `user-role-tag ${currentUser.role}`
  }, currentUser.roleName)))), /*#__PURE__*/React.createElement("div", {
    className: "main-wrapper"
  }, /*#__PURE__*/React.createElement("header", {
    className: "top-navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-left-controls"
  }, /*#__PURE__*/React.createElement("button", {
    className: "menu-toggle-btn",
    onClick: () => {
      if (window.innerWidth <= 768) {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      } else {
        setIsSidebarCollapsed(!isSidebarCollapsed);
      }
    },
    title: "Menyuni ochish/yopish"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-bars" })), /*#__PURE__*/React.createElement("div", {
    className: "header-search"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-magnifying-glass search-icon-header" }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Qidiruv (Talabalar, kurslar, vazifalar...)",
    value: studentSearch,
    onChange: (e) => {
      setStudentSearch(e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "role-quick-switch",
    title: "Tezkor Rol Almashtirgich"
  },
    ["admin","manager","student","mentor","guest","blocked"].map(function(r) {
      var icons = { admin: "fa-shield-halved", manager: "fa-user-tie", student: "fa-graduation-cap", mentor: "fa-chalkboard-user", guest: "fa-user", blocked: "fa-ban" };
      var labels = { admin: "Admin", manager: "Manager", student: "Student", mentor: "Mentor", guest: "Guest", blocked: "Blocked" };
      return /*#__PURE__*/React.createElement("button", {
        key: r, type: "button",
        className: "role-switch-btn " + r + " " + (currentUser.role === r ? "active " + r : ""),
        onClick: function() { return handleQuickRoleSwitch(r); }
      }, /*#__PURE__*/React.createElement("i", { className: "fa-solid " + icons[r] }), labels[r]);
    })
  ), /*#__PURE__*/React.createElement("button", {
    className: "icon-action-btn",
    onClick: () => setShowNotifications(!showNotifications),
    title: "Bildirishnomalar"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-bell" }), /*#__PURE__*/React.createElement("div", { className: "unread-badge-dot" })), showNotifications && /*#__PURE__*/React.createElement("div", {
    className: "notifications-popup"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-header"
  }, /*#__PURE__*/React.createElement("span", null, "Bildirishnomalar"), /*#__PURE__*/React.createElement("span", {
    style: { fontSize: "11px", color: "#3b82f6", cursor: "pointer" },
    onClick: () => setShowNotifications(false)
  }, "Yopish")), /*#__PURE__*/React.createElement("div", {
    className: "notif-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-item"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-circle-check", style: { color: "#10b981", marginTop: "3px" } }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Uy ishi baholandi"), ": HTML & CSS portfolio vazifangiz 95 ball bilan qabul qilindi.")), /*#__PURE__*/React.createElement("div", {
    className: "notif-item"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-video", style: { color: "#3b82f6", marginTop: "3px" } }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Jonli dars"), ": Bugun soat 19:30 da Zoomda dars boshlanadi.")), /*#__PURE__*/React.createElement("div", {
    className: "notif-item"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-trophy", style: { color: "#eab308", marginTop: "3px" } }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Reyting yangilandi"), ": Azizbek Rahimov guruhda 2-o'ringa ko'tarildi!")))), /*#__PURE__*/React.createElement("div", {
    className: "header-profile-btn",
    ref: profileMenuRef,
    onClick: function() { return setShowProfileMenu(function(v) { return !v; }); },
    style: { position: "relative", cursor: "pointer" }
  }, /*#__PURE__*/React.createElement("img", {
    src: currentUser.avatar,
    alt: "Profile",
    className: "header-avatar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-user-meta"
  }, /*#__PURE__*/React.createElement("span", { className: "header-user-name" }, currentUser.name),
    /*#__PURE__*/React.createElement("span", { className: "header-user-badge" }, currentUser.roleName)
  ),
  /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-chevron-" + (showProfileMenu ? "up" : "down"), style: { fontSize: "10px", marginLeft: "4px", color: "#94a3b8" } }),
  showProfileMenu && /*#__PURE__*/React.createElement("div", { className: "profile-dropdown-menu" },
    /*#__PURE__*/React.createElement("div", { className: "profile-dropdown-header" },
      /*#__PURE__*/React.createElement("img", { src: currentUser.avatar, className: "profile-dropdown-avatar" }),
      /*#__PURE__*/React.createElement("div", null,
        /*#__PURE__*/React.createElement("div", { style: { fontWeight: "700", fontSize: "14px" } }, currentUser.name),
        /*#__PURE__*/React.createElement("div", { style: { fontSize: "11px", color: "#60a5fa" } }, currentUser.roleName)
      )
    ),
    /*#__PURE__*/React.createElement("div", { className: "profile-dropdown-section-label" }, "Rol almashtirish:"),
    [
      { key: "admin",   icon: "fa-shield-halved",  color: "#ef4444", label: "Admin — Bosh Administrator" },
      { key: "manager", icon: "fa-user-tie",        color: "#f59e0b", label: "Manager — Akademiya Menejeri" },
      { key: "student", icon: "fa-graduation-cap",  color: "#3b82f6", label: "Student — Talaba" },
      { key: "mentor",  icon: "fa-chalkboard-user", color: "#10b981", label: "Mentor — Kurs Mentori" },
      { key: "guest",   icon: "fa-user",             color: "#8b5cf6", label: "Guest — Mehmon" },
      { key: "blocked", icon: "fa-ban",              color: "#94a3b8", label: "Blocked — Bloklangan" }
    ].map(function(r) {
      return /*#__PURE__*/React.createElement("button", {
        key: r.key, className: "profile-dropdown-item " + (currentUser.role === r.key ? "active" : ""),
        onClick: function() { return handleQuickRoleSwitch(r.key); }
      },
        /*#__PURE__*/React.createElement("i", { className: "fa-solid " + r.icon, style: { color: r.color } }),
        /*#__PURE__*/React.createElement("span", null, r.label),
        currentUser.role === r.key && /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-check", style: { marginLeft: "auto", color: "#10b981", fontSize: "11px" } })
      );
    }),
    /*#__PURE__*/React.createElement("div", { className: "profile-dropdown-divider" }),
    /*#__PURE__*/React.createElement("button", { className: "profile-dropdown-logout", onClick: handleLogout },
      /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-arrow-right-from-bracket" }),
      /*#__PURE__*/React.createElement("span", null, "Tizimdan Chiqish")
    )
  )
  )), /*#__PURE__*/React.createElement("main", {
    className: "content-viewport"
  }, activeTab === 'dashboard' && renderDashboardContent(), activeTab === 'students' && renderStudentsContent(), activeTab === 'courses' && renderCoursesContent(), activeTab === 'analytics' && renderAnalyticsContent(), activeTab === 'staff' && renderStaffContent(), activeTab === 'settings' && renderSettingsContent(), activeTab === 'manager_dashboard' && renderManagerDashboardContent(), activeTab === 'homework_review' && renderHomeworkReviewContent(), activeTab === 'groups' && renderGroupsContent(), activeTab === 'attendance_reports' && renderAttendanceReportsContent(), activeTab === 'student_dashboard' && renderStudentDashboardContent(), activeTab === 'student_homework' && renderStudentHomeworkContent(), activeTab === 'my_courses' && renderMyCoursesContent(), activeTab === 'schedule' && renderScheduleContent(), activeTab === 'leaderboard' && renderLeaderboardContent(), activeTab === 'profile' && renderStudentProfileContent(), activeTab === 'mentor_dashboard' && renderMentorContent(), activeTab === 'guest_home' && renderGuestContent(), activeTab === 'blocked_page' && renderBlockedContent())), isAddStudentModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setIsAddStudentModalOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-window",
    onClick: (e) => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Yangi Talaba Qo'shish"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close-btn",
    onClick: () => setIsAddStudentModalOpen(false)
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-xmark" }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAddStudent,
    style: { display: "flex", flexDirection: "column", gap: "16px" }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Talabaning To'liq Ismi"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "auth-input",
    placeholder: "Masalan: Sardor Rustamov",
    value: newStudentForm.name,
    onChange: (e) => setNewStudentForm({ ...newStudentForm, name: e.target.value }),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Email Manzili"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    className: "auth-input",
    placeholder: "sardor@gmail.com",
    value: newStudentForm.email,
    onChange: (e) => setNewStudentForm({ ...newStudentForm, email: e.target.value }),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Telefon Raqami"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "auth-input",
    placeholder: "+998 90 123 45 67",
    value: newStudentForm.phone,
    onChange: (e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "O'quv Kursi"), /*#__PURE__*/React.createElement("select", {
    className: "filter-select",
    style: { width: "100%", padding: "12px", background: "var(--bg-input)" },
    value: newStudentForm.course,
    onChange: (e) => {
      const selected = courses.find((c) => c.title === e.target.value);
      setNewStudentForm({
        ...newStudentForm,
        course: e.target.value,
        category: selected ? selected.category : "Development"
      });
    }
  }, courses.map((c) => /*#__PURE__*/React.createElement("option", { key: c.id, value: c.title }, c.title, " (", c.price, ")")))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "submit-auth-btn"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-check" }), /*#__PURE__*/React.createElement("span", null, "Ro'yxatga Saqlash"))))), isSubmitHwModalOpen && selectedHwForSubmit && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setIsSubmitHwModalOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-window",
    onClick: (e) => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Uy Ishi Havolasini Biriktirish / Topshirish"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close-btn",
    onClick: () => setIsSubmitHwModalOpen(false)
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-xmark" }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveHomeworkSubmit,
    style: { display: "flex", flexDirection: "column", gap: "16px" }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Topshirilayotgan Vazifa:"), /*#__PURE__*/React.createElement("select", {
    className: "filter-select",
    style: { width: "100%", padding: "10px", background: "var(--bg-input)" },
    value: submitHwForm.hwId,
    onChange: (e) => {
      const chosen = homeworks.find(h => h.id === Number(e.target.value));
      if (chosen) {
        setSelectedHwForSubmit(chosen);
        setSubmitHwForm({
          ...submitHwForm,
          hwId: chosen.id,
          githubUrl: chosen.githubUrl || "",
          liveUrl: chosen.liveUrl || "",
          comment: chosen.comment || ""
        });
      }
    }
  }, homeworks.filter(h => h.studentName.toLowerCase().includes("azizbek") || h.studentId === 1).map((h) => /*#__PURE__*/React.createElement("option", { key: h.id, value: h.id }, h.lessonTitle)))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "GitHub / Kod Havolasi (Repository Link) *"), /*#__PURE__*/React.createElement("div", {
    className: "input-icon-wrapper"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-brands fa-github input-left-icon" }), /*#__PURE__*/React.createElement("input", {
    type: "url",
    className: "auth-input",
    placeholder: "https://github.com/foydalanuvchi/loyiha-nomi",
    value: submitHwForm.githubUrl,
    onChange: (e) => setSubmitHwForm({ ...submitHwForm, githubUrl: e.target.value })
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Jonli Demo Sayt yoki Figma Havolasi (Live Preview / Figma)"), /*#__PURE__*/React.createElement("div", {
    className: "input-icon-wrapper"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-link input-left-icon" }), /*#__PURE__*/React.createElement("input", {
    type: "url",
    className: "auth-input",
    placeholder: "https://loyiha.vercel.app yoki https://figma.com/...",
    value: submitHwForm.liveUrl,
    onChange: (e) => setSubmitHwForm({ ...submitHwForm, liveUrl: e.target.value })
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Vazifa haqida izohingiz (Ustozga sharh)"), /*#__PURE__*/React.createElement("textarea", {
    className: "auth-input",
    rows: "3",
    style: { resize: "none", height: "80px" },
    placeholder: "Vazifada nimalar bajarildi, qiyinchiliklar yoki qo'shimcha imkoniyatlar...",
    value: submitHwForm.comment,
    onChange: (e) => setSubmitHwForm({ ...submitHwForm, comment: e.target.value })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "submit-auth-btn"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-paper-plane" }), /*#__PURE__*/React.createElement("span", null, "Vazifani Yuborish"))))), isGradeHwModalOpen && gradingHw && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setIsGradeHwModalOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-window",
    onClick: (e) => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Uy Ishini Tekshirish va Baholash"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close-btn",
    onClick: () => setIsGradeHwModalOpen(false)
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-xmark" }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveGrading,
    style: { display: "flex", flexDirection: "column", gap: "16px" }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px",
      background: "rgba(255,255,255,0.03)",
      borderRadius: "10px",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: { fontWeight: "700", color: "#fff", marginBottom: "4px" }
  }, gradingHw.studentName, " (", gradingHw.course, ")"), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: "12px", color: "var(--text-secondary)" }
  }, gradingHw.lessonTitle), (gradingHw.githubUrl || gradingHw.liveUrl) && /*#__PURE__*/React.createElement("div", {
    style: { marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }
  }, gradingHw.githubUrl && /*#__PURE__*/React.createElement("a", {
    href: gradingHw.githubUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn-secondary",
    style: { padding: "4px 10px", fontSize: "11px" }
  }, /*#__PURE__*/React.createElement("i", { className: "fa-brands fa-github" }), " GitHub Havola"), gradingHw.liveUrl && /*#__PURE__*/React.createElement("a", {
    href: gradingHw.liveUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn-secondary",
    style: { padding: "4px 10px", fontSize: "11px" }
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-globe" }), " Demo Sayt"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Baho (0 dan 100 gacha) *"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "100",
    className: "auth-input",
    value: gradingForm.grade,
    onChange: (e) => setGradingForm({ ...gradingForm, grade: e.target.value }),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Status:"), /*#__PURE__*/React.createElement("select", {
    className: "filter-select",
    style: { width: "100%", padding: "10px", background: "var(--bg-input)" },
    value: gradingForm.status,
    onChange: (e) => setGradingForm({ ...gradingForm, status: e.target.value })
  }, /*#__PURE__*/React.createElement("option", { value: "graded" }, "Qabul qilindi (Baholandi) ✅"), /*#__PURE__*/React.createElement("option", { value: "pending" }, "Kutilmoqda (Tekshiruvda) ⏳"), /*#__PURE__*/React.createElement("option", { value: "rework" }, "Qayta ishlashga qaytarish 🔄"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Ustoz / Menejer Izohi (Talabaga feedback)"), /*#__PURE__*/React.createElement("textarea", {
    className: "auth-input",
    rows: "3",
    style: { resize: "none", height: "80px" },
    placeholder: "Kod toza yozilgan, komponentlar tuzilishi a'lo darajada...",
    value: gradingForm.feedback,
    onChange: (e) => setGradingForm({ ...gradingForm, feedback: e.target.value })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "submit-auth-btn"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-check" }), /*#__PURE__*/React.createElement("span", null, "Bahoni Tasdiqlash"))))), toastMessage && /*#__PURE__*/React.createElement("div", {
    className: "toast-banner"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-circle-check",
    style: { color: "#10b981" }
  }), /*#__PURE__*/React.createElement("span", null, toastMessage)));

  // ==========================================================================
  // VIEW MODE: PRESENTATION LAPTOP MOCKUP VS FULLSCREEN APP
  // ==========================================================================

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "view-mode-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mockup-brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mockup-badge-pill"
  }, "IT LIVE 20"), /*#__PURE__*/React.createElement("span", null, "IT LIVE Academy - Rolga Asoslangan Dashboard"), /*#__PURE__*/React.createElement("span", {
    style: { fontSize: "11px", color: "#60a5fa" }
  }, "• Foydalanuvchi: ", currentUser.roleName)), /*#__PURE__*/React.createElement("div", {
    className: "mode-toggle-group"
  }, /*#__PURE__*/React.createElement("button", {
    className: `mode-btn ${viewMode === 'fullscreen' ? 'active' : ''}`,
    onClick: () => setViewMode('fullscreen')
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-desktop" }), /*#__PURE__*/React.createElement("span", null, "To'liq Ekran")), /*#__PURE__*/React.createElement("button", {
    className: `mode-btn ${viewMode === 'mockup' ? 'active' : ''}`,
    onClick: () => setViewMode('mockup')
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-laptop" }), /*#__PURE__*/React.createElement("span", null, "3D Mockup")), /*#__PURE__*/React.createElement("button", {
    className: "mode-btn",
    style: { color: "#ef4444" },
    onClick: handleLogout,
    title: "Chiqish"
  }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-arrow-right-from-bracket" }), /*#__PURE__*/React.createElement("span", null, "Chiqish")))), viewMode === 'fullscreen' ? dashboardApp : /*#__PURE__*/React.createElement("div", {
    className: "presentation-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "presentation-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slide-promo-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "promo-badge-20"
  }, "20"), /*#__PURE__*/React.createElement("div", {
    className: "promo-title-group"
  }, /*#__PURE__*/React.createElement("h1", null, "Mini loyiha"), /*#__PURE__*/React.createElement("h2", null, "IT LIVE Academy Role-Based Dashboard")), /*#__PURE__*/React.createElement("div", {
    className: "promo-checklist"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checklist-item"
  }, /*#__PURE__*/React.createElement("div", { className: "check-icon-circle" }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-check" })), /*#__PURE__*/React.createElement("span", null, "Admin Boshqaruvi")), /*#__PURE__*/React.createElement("div", {
    className: "checklist-item"
  }, /*#__PURE__*/React.createElement("div", { className: "check-icon-circle" }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-check" })), /*#__PURE__*/React.createElement("span", null, "Manager: Uy ishlari tekshiruvi")), /*#__PURE__*/React.createElement("div", {
    className: "checklist-item"
  }, /*#__PURE__*/React.createElement("div", { className: "check-icon-circle" }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-check" })), /*#__PURE__*/React.createElement("span", null, "Student: Uy ishi linkini qo'yish")), /*#__PURE__*/React.createElement("div", {
    className: "checklist-item"
  }, /*#__PURE__*/React.createElement("div", { className: "check-icon-circle" }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-check" })), /*#__PURE__*/React.createElement("span", null, "Interaktiv Jonli Sinxronlash")))), /*#__PURE__*/React.createElement("div", {
    className: "laptop-mockup-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "laptop-lid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "laptop-camera-notch"
  }, /*#__PURE__*/React.createElement("div", { className: "camera-lens" })), /*#__PURE__*/React.createElement("div", {
    className: "laptop-screen-inner"
  }, dashboardApp)), /*#__PURE__*/React.createElement("div", {
    className: "laptop-base"
  }, /*#__PURE__*/React.createElement("div", { className: "laptop-base-notch" }))))));
}

// Render into DOM safely
function mountApp() {
  const rootElement = document.getElementById("root");
  if (rootElement && window.ReactDOM) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(/*#__PURE__*/React.createElement(App, null));
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}