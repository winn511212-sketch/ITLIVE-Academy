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
    status: "graded",
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
    status: "pending",
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
