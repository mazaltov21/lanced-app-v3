import { useState, useRef, useEffect } from "react";

// ─── SVG Icons (kept from hi-fi) ─────────────────────────────────────────────
function Icon({ type, size = 17 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    dashboard:     <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    appearance:    <svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    opportunities: <svg {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>,
    media:         <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    notifications: <svg {...p}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    messages:      <svg {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    portfolios:    <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>,
    applications:  <svg {...p}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
    hub:           <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    career:        <svg {...p}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
    testimonials:  <svg {...p}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>,
    circles:       <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>,
  };
  return icons[type] || icons.circles;
}

// ─── Sessions data ────────────────────────────────────────────────────────────
const SESSIONS = [
  {
    id: 1,
    title: "Your artistic identity online",
    question: "How do you want to be seen as an artist?",
    img: "https://picsum.photos/seed/artistic1/600/220",
    date: "Thu 22 May · 18:00",
    duration: "120 min",
    spotsLeft: 2,
    expert: {
      name: "Dani Mwangi",
      role: "Choreographer & Co-founder, moving.digital",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Dani has built an international following as a choreographer and regularly advises emerging artists on digital presence, positioning, and audience-building.",
      link: "instagram.com/dani.mwangi",
      linkLabel: "Instagram",
    },
    plan: [
      { type: "expert", min: 25 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 20 },
      { type: "qa",     min: 15 },
    ],
    tool: "Artist Bio & Positioning Worksheet",
    outcomes: [
      "Clarify your artistic positioning in one sentence",
      "Identify what your online presence is missing",
      "Define your next concrete step for visibility",
    ],
  },
  {
    id: 2,
    title: "Making your own work",
    question: "You have an idea. Now what?",
    img: "https://picsum.photos/seed/creatework/600/220",
    date: "Mon 26 May · 17:00",
    duration: "135 min",
    spotsLeft: 4,
    expert: {
      name: "Tara Vos",
      role: "Artistic Director, Korzo Theater Den Haag",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Tara has supported emerging choreographers and dance makers at Korzo Theater for over a decade — one of the Netherlands' leading dance production houses.",
      link: "korzo.nl",
      linkLabel: "korzo.nl",
    },
    plan: [
      { type: "expert", min: 40 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 20 },
      { type: "qa",     min: 15 },
    ],
    tool: "Project Development Canvas",
    outcomes: [
      "Understand the steps from idea to produced work",
      "Know what support structures exist for emerging makers",
      "Define one concrete first action toward your own project",
    ],
  },
  {
    id: 3,
    title: "After rejection",
    question: "How do you keep going?",
    img: "https://picsum.photos/seed/resilience3/600/220",
    date: "Wed 28 May · 18:30",
    duration: "120 min",
    spotsLeft: 3,
    expert: {
      name: "Amara Diallo",
      role: "Dancer, Coach & former principal, Scapino Ballet",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Amara combines 15 years of professional performance experience with certified coaching practice focused on resilience, identity, and artistic longevity.",
      link: "linkedin.com/in/amaradiallo",
      linkLabel: "LinkedIn",
    },
    plan: [
      { type: "expert", min: 25 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 20 },
      { type: "qa",     min: 15 },
    ],
    tool: "Rejection Reframe Map",
    outcomes: [
      "Shift your relationship to rejection from personal to professional",
      "Extract career data from recent setbacks",
      "Leave with one concrete next move",
    ],
  },
  {
    id: 4,
    title: "Finding the right collaborators",
    question: "Who do you want to make work with?",
    img: "https://picsum.photos/seed/collab4/600/220",
    date: "Tue 3 Jun · 17:30",
    duration: "130 min",
    spotsLeft: 5,
    expert: {
      name: "Lotte van Dijk",
      role: "Choreographer & Co-founder, Club Guy & Roni",
      photo: "https://randomuser.me/api/portraits/women/55.jpg",
      bio: "Lotte co-founded one of the Netherlands' most internationally touring dance companies and has built her practice on long-term collaborative relationships.",
      link: "clubguyroni.nl",
      linkLabel: "clubguyroni.nl",
    },
    plan: [
      { type: "expert", min: 30 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 25 },
      { type: "qa",     min: 15 },
    ],
    tool: "Collaboration Intention Map",
    outcomes: [
      "Clarify what you're looking for in a creative collaborator",
      "Learn how others find and build working relationships",
      "Identify one concrete step toward a new collaboration",
    ],
  },
  {
    id: 5,
    title: "Staying relevant as an artist",
    question: "How do you evolve without losing yourself?",
    img: "https://picsum.photos/seed/evolve5/600/220",
    date: "Thu 5 Jun · 18:00",
    duration: "130 min",
    spotsLeft: 3,
    expert: {
      name: "Marco Berends",
      role: "Artistic Director, Dansateliers Rotterdam",
      photo: "https://randomuser.me/api/portraits/men/71.jpg",
      bio: "Marco has worked with hundreds of dance artists at different career stages and has a sharp eye for how artists navigate artistic evolution and cultural relevance.",
      link: "dansateliers.nl",
      linkLabel: "dansateliers.nl",
    },
    plan: [
      { type: "expert", min: 30 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 25 },
      { type: "qa",     min: 15 },
    ],
    tool: "Artistic Evolution Timeline",
    outcomes: [
      "Understand how other artists navigate reinvention",
      "Identify what you want to change and what to protect",
      "Leave with one concrete next direction to explore",
    ],
  },
];

// ─── Messages data ─────────────────────────────────────────────────────────────
const CHATS = [
  {
    id: "general", type: "group", name: "Career Circles — General",
    sub: "Community chat for all Career Circles members", initials: "CC", unread: 3,
    msgs: [
      { id:1, from:"Lena D.",  init:"L", self:false, time:"Mon 9:12", text:"Does anyone know if the next session will be recorded? I have a conflict." },
      { id:2, from:"Mira K.",  init:"M", self:false, time:"Mon 9:18", text:"I don't think they record — that's why I find these sessions more useful. You have to show up." },
      { id:3, from:"Sophie",   init:"S", self:true,  time:"Mon 9:21", text:"Agreed. The peer exchange is the actual value. I learned more in 10 min of sharing than months of Googling." },
      { id:4, from:"Tomas R.", init:"T", self:false, time:"Mon 10:04", text:"Just signed up for the 'Making your own work' session. Nervous but excited." },
      { id:5, from:"Lena D.",  init:"L", self:false, time:"Mon 11:45", text:"I did that one last month! Tara Vos is incredible. You'll leave with so much clarity." },
    ],
  },
  {
    id: "session-chat", type: "group", name: "After rejection — May 28",
    sub: "Circle group · 6 participants · Amara Diallo", initials: "AR", completed: true, unread: 1,
    msgs: [
      { id:1, from:"Amara (Expert)", init:"A", expert:true, self:false, time:"18:31", text:"Great session everyone. Your Rejection Reframe Maps are in the chat. Use them this week while the session is fresh." },
      { id:2, from:"Mira K.",  init:"M", self:false, time:"18:33", text:"This was so needed. Naming it as data instead of judgement changes everything." },
      { id:3, from:"Sophie",   init:"S", self:true,  time:"18:36", text:"The reframe from 'I wasn't good enough' to 'it wasn't the right fit' feels obvious now — but I couldn't see it before today." },
      { id:4, from:"Tomas R.", init:"T", self:false, time:"18:40", text:"Amara — do artists who've had more success still struggle with rejection the same way?" },
      { id:5, from:"Amara (Expert)", init:"A", expert:true, self:false, time:"18:42", text:"Always. The scale changes but the vulnerability doesn't. The difference is more tools for processing it quickly." },
      { id:6, from:"Lanced", init:"◆", system:true, self:false, time:"Wed 18:31", text:"📌 One week since your session on After Rejection! How did you use the Rejection Reframe Map? Share with your group." },
      { id:7, from:"Mira K.",  init:"M", self:false, time:"Wed 19:10", text:"Used it on two rejections I'd been avoiding. One I now want to reapply to." },
      { id:8, from:"Sophie",   init:"S", self:true,  time:"Wed 19:45", text:"I revisited a rejection from 6 months ago. Turns out it had nothing to do with me — the company went in a different direction." },
    ],
  },
];

const DM_CHATS = [
  {
    id: "dm-mira", type: "dm", name: "Mira Kowalski",
    sub: "After rejection session", init: "M", unread: 0,
    msgs: [
      { id:1, from:"Mira K.", self:false, time:"Wed 20:14", text:"Hey Sophie! What you said about the reframe really resonated. How did you actually apply it?" },
      { id:2, from:"Sophie",  self:true,  time:"Wed 20:31", text:"I filled in every field of the map. The 'fit score' section was the most useful — the company wasn't looking for what I do at all." },
      { id:3, from:"Mira K.", self:false, time:"Wed 20:35", text:"That's such a useful way to make it less personal. I've been avoiding filling mine in." },
      { id:4, from:"Sophie",  self:true,  time:"Wed 20:38", text:"Just do the first field. That's what got me started." },
    ],
  },
];

// ─── Primitives (v3 style) ────────────────────────────────────────────────────

function Badge({ children, color = "gray" }) {
  const c = {
    gray:   "bg-gray-100 text-gray-500",
    purple: "bg-purple-100 text-purple-700",
    green:  "bg-green-50 text-green-600 border border-green-200",
    orange: "bg-orange-50 text-orange-500 border border-orange-200",
  };
  return (
    <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium ${c[color]}`}>
      {children}
    </span>
  );
}

function PBtn({ children, onClick, className = "", disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`px-4 py-2 bg-purple-700 text-white text-sm font-semibold rounded-lg hover:bg-purple-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  );
}

function OBtn({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors ${className}`}>
      {children}
    </button>
  );
}

function Back({ onClick, label = "Back" }) {
  return (
    <button onClick={onClick} className="text-sm text-gray-400 hover:text-gray-700 mb-4 flex items-center gap-1 transition-colors">
      ← {label}
    </button>
  );
}

function Img({ src, alt = "", className = "" }) {
  return (
    <img src={src} alt={alt}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={(e) => { e.target.style.background = "#f3f4f6"; e.target.style.display = "block"; }} />
  );
}

function ExpertPhoto({ src, name }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-xl font-bold text-purple-700 flex-shrink-0">
        {name[0]}
      </div>
    );
  }
  return (
    <img src={src} alt={name}
      className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
      onError={() => setErr(true)} />
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">{children}</p>
  );
}

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((n) => (
        <button key={n} onClick={() => onChange(n)} className="text-2xl transition-colors"
          style={{ color: n <= value ? "#F59E0B" : "#E5E7EB" }}>★</button>
      ))}
    </div>
  );
}

// ─── Plan colour bar ──────────────────────────────────────────────────────────
const PHASE_BG  = { expert: "#7C3AED", peer: "#10B981", disc: "#F59E0B", qa: "#EF4444" };
const PHASE_LBL = { expert: "Expert", peer: "Peer exchange", disc: "Discussion", qa: "Q&A" };

function PlanBar({ plan }) {
  const total = plan.reduce((s, p) => s + p.min, 0);
  return (
    <div>
      <div className="flex rounded-full overflow-hidden h-2.5 mb-3">
        {plan.map((p, i) => (
          <div key={i} style={{ width: `${(p.min / total) * 100}%`, background: PHASE_BG[p.type] }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mb-2">
        {plan.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: PHASE_BG[p.type] }} />
            <span className="text-xs text-gray-500">{PHASE_LBL[p.type]}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400">* Peer exchange is about 10 min per participant</p>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",    label: "Dashboard",     icon: "dashboard"     },
  { id: "appearance",   label: "Appearance",    icon: "appearance"    },
  { id: "opportunities",label: "Opportunities", icon: "opportunities" },
  { id: "media",        label: "Media Library", icon: "media"         },
  { id: "notifications",label: "Notifications", icon: "notifications" },
  { id: "messages",     label: "Messages",      icon: "messages",      clickable: true },
  null,
  { id: "portfolios",   label: "My Portfolios", icon: "portfolios"    },
  { id: "applications", label: "Applications",  icon: "applications"  },
  { id: "hub",          label: "Artist Hub",    icon: "hub"           },
  { id: "career",       label: "Career Center", icon: "career"        },
  { id: "testimonials", label: "Testimonials",  icon: "testimonials"  },
  { id: "circles",      label: "Career Circles",icon: "circles",       clickable: true, badge: "New" },
];

function Sidebar({ active, onNav, unreadMsg }) {
  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col py-5 px-3 overflow-y-auto">
      <div className="font-bold text-purple-700 px-2 mb-6 text-sm tracking-wide flex items-center gap-2">
        <div className="w-7 h-7 bg-purple-700 rounded-lg flex items-center justify-center text-white text-xs font-black">L</div>
        Lanced
      </div>

      <nav className="flex-1 space-y-0.5">
        {NAV.map((item, i) => {
          if (!item) {
            return <div key={`div-${i}`} className="my-2 h-px bg-gray-100" />;
          }
          const isActive = item.id === active;
          return (
            <button key={item.id}
              onClick={item.clickable ? () => onNav(item.id) : undefined}
              className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2.5 transition-colors ${
                isActive
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : item.clickable
                  ? "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  : "text-gray-300 cursor-default"
              }`}>
              <span className={isActive ? "text-purple-600" : item.clickable ? "text-gray-400" : "text-gray-200"}>
                <Icon type={item.icon} size={16} />
              </span>
              <span className="flex-1">{item.label}</span>
              {item.id === "messages" && unreadMsg > 0 && (
                <span className="text-xs w-4 h-4 rounded-full bg-red-400 text-white flex items-center justify-center font-bold leading-none">
                  {unreadMsg}
                </span>
              )}
              {item.badge && (
                <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 pt-3 px-2 border-t border-gray-100 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700 flex-shrink-0">S</div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-700 truncate">Sophie Marler</p>
          <p className="text-xs text-gray-400">Artist</p>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREER CIRCLES SCREENS
// ─────────────────────────────────────────────────────────────────────────────

// Overview
function CC_Overview({ onSelect }) {
  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Career Circles</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-sm text-gray-500">Guided by experts. Shaped by peers.</p>
          <Badge color="gray">6 artists + 1 expert per session</Badge>
        </div>
      </div>

      <div className="space-y-3">
        {SESSIONS.map((s) => (
          <div key={s.id}
            onClick={() => onSelect(s)}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-purple-300 hover:shadow-sm transition-all">
            <div className="flex">
              <Img src={s.img} className="w-24 flex-shrink-0 self-stretch min-h-[90px]" />
              <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 leading-snug">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.question}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-800 flex-shrink-0">€_</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="text-xs text-gray-400">📅 {s.date}</span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs font-medium text-gray-700">{s.expert.name}</span>
                  <span className="text-xs text-gray-300">·</span>
                  <Badge color={s.spotsLeft <= 2 ? "orange" : "gray"}>
                    {s.spotsLeft} spot{s.spotsLeft !== 1 ? "s" : ""} left
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Detail
function CC_Detail({ session: s, onJoin, back }) {
  const [tab, setTab] = useState("plan");

  return (
    <div className="max-w-xl">
      {/* Gradient header */}
      <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-purple-50 to-white border-b border-purple-100">
        <Back onClick={back} label="All sessions" />
        <h2 className="text-xl font-bold text-gray-900 mb-0.5">{s.title}</h2>
        <p className="text-sm text-gray-500 mb-3">{s.question}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge color="gray">📅 {s.date}</Badge>
          <Badge color="gray">⏱ {s.duration}</Badge>
          <Badge color={s.spotsLeft <= 2 ? "orange" : "gray"}>
            {s.spotsLeft} spots left
          </Badge>
        </div>
      </div>

      <div className="p-5">


        {/* Tab selector */}
        <div className="flex gap-1 p-1 rounded-xl bg-gray-100 mb-5">
          {["plan", "expert"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${
                tab === t ? "bg-white text-purple-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}>
              {t === "plan" ? "Session plan" : "Expert"}
            </button>
          ))}
        </div>

        {/* Tab: Plan */}
        {tab === "plan" && (
          <div>
            <SectionLabel>Session structure</SectionLabel>
            <PlanBar plan={s.plan} />

            <div className="mt-5">
              <SectionLabel>What you'll get</SectionLabel>
              <ul className="space-y-2 mb-4">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-purple-400 mt-0.5 flex-shrink-0">✓</span>{o}
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm font-medium text-gray-800">
                  <span className="mt-0.5 flex-shrink-0">🛠</span>{s.tool}
                </li>
              </ul>
            </div>

            {/* Pricing */}
            <div className="pt-5 border-t border-gray-100 flex gap-3">
              <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">€_</p>
                <p className="text-xs text-gray-400 mt-0.5">Single session</p>
                <p className="text-xs text-purple-600 mt-1 leading-relaxed font-medium">
                  + your circle chat<br />+ community chat
                </p>
                <PBtn onClick={onJoin} className="w-full mt-3 py-1.5 text-xs">
                  Join this session
                </PBtn>
              </div>
              <div className="flex-1 bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <p className="text-2xl font-bold text-purple-700">€_</p>
                  <Badge color="green">Save €_</Badge>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Bundle · 6 sessions</p>
                <p className="text-xs text-purple-600 mt-1 leading-relaxed font-medium">
                  + your circle chat<br />+ community chat
                </p>
                <OBtn className="w-full mt-3 py-1.5 text-xs border-purple-200 text-purple-700 hover:bg-purple-100">
                  Buy bundle
                </OBtn>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Expert */}
        {tab === "expert" && (
          <div>
            <SectionLabel>Your expert</SectionLabel>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-4">
              <ExpertPhoto src={s.expert.photo} name={s.expert.name} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">{s.expert.name}</p>
                <p className="text-sm text-purple-600 mb-2">{s.expert.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{s.expert.bio}</p>
                <a href={`https://${s.expert.link}`} target="_blank" rel="noreferrer"
                  className="text-xs text-purple-600 font-medium hover:underline">
                  ↗ {s.expert.linkLabel}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Session in progress — Zoom UI (intentionally dark)
function CC_Session({ session: s, onEnd }) {
  const participants = ["Sophie", "Mira", "Lena", "Jules", "Tomas", "Annika"];

  return (
    <div className="flex flex-col h-full" style={{ background: "#0F0F23" }}>
      <div className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <p className="text-white text-sm font-semibold">{s.title}</p>
          <p className="text-xs text-white/40">Career Circle · with {s.expert.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs font-semibold text-green-400">Live</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-5">
        {/* Expert main tile */}
        <div className="rounded-2xl flex flex-col items-center justify-center relative"
          style={{ background: "#1C1A3A", width: "100%", maxWidth: 520, aspectRatio: "16/9",
            border: "2px solid #7C3AED", boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}>
          <ExpertPhoto src={s.expert.photo} name={s.expert.name} />
          <p className="text-white font-semibold mt-3 text-sm">{s.expert.name}</p>
          <p className="text-xs text-purple-300 mt-0.5">{s.expert.role}</p>
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/50">
            <span className="text-xs text-green-400">🎤</span>
            <span className="text-xs text-white/70">Speaking</span>
          </div>
        </div>

        {/* Participant tiles */}
        <div className="flex gap-2.5 justify-center">
          {participants.map((p) => (
            <div key={p} className="flex flex-col items-center gap-1.5">
              <div className="w-16 rounded-xl flex items-center justify-center font-bold text-sm text-purple-300"
                style={{ background: "#1C1A3A", aspectRatio: "4/3", border: "1.5px solid rgba(255,255,255,0.08)" }}>
                {p[0]}
              </div>
              <span className="text-xs text-white/40">{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 px-6 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {[{ icon: "🎤", label: "Mute" }, { icon: "📷", label: "Camera" }, { icon: "👥", label: "Participants" }, { icon: "💬", label: "Chat" }].map((c) => (
          <button key={c.label} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>
            <span className="text-lg">{c.icon}</span>
            <span className="text-xs">{c.label}</span>
          </button>
        ))}
        <button onClick={onEnd}
          className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl ml-4 bg-red-500 text-white">
          <span className="text-lg">📴</span>
          <span className="text-xs font-semibold">End session</span>
        </button>
      </div>
    </div>
  );
}

// Feedback
function CC_Feedback({ session: s, onDone, back }) {
  const [rating, setRating]   = useState(0);
  const [expert, setExpert]   = useState(null);
  const [best, setBest]       = useState("");
  const [improve, setImprove] = useState("");
  const [again, setAgain]     = useState(null);
  const ready = rating > 0 && expert && again;

  const choiceRow = (opts, val, set) => (
    <div className="flex gap-2">
      {opts.map((o) => (
        <button key={o} onClick={() => set(o)}
          className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
            val === o ? "bg-purple-700 text-white border-purple-700" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
          }`}>
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-xl">
      <Back onClick={back} label="Session" />
      <h2 className="text-xl font-bold text-gray-900 mb-6">Session feedback</h2>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <SectionLabel>How would you rate this session?</SectionLabel>
          <Stars value={rating} onChange={setRating} />
          {rating > 0 && (
            <p className="text-xs text-purple-600 mt-2">
              {["","Not what I expected","Below average","It was okay","Really valuable","Excellent — would highly recommend"][rating]}
            </p>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <SectionLabel>Was the expert relevant and useful?</SectionLabel>
          {choiceRow(["Yes, very", "Somewhat", "Not really"], expert, setExpert)}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <SectionLabel>What worked best?</SectionLabel>
          <textarea value={best} onChange={(e) => setBest(e.target.value)} rows={2}
            placeholder="e.g. the peer exchange, the expert's framework, the tool..."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-purple-300 text-gray-700 placeholder-gray-300 mt-1" />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <SectionLabel>What could be improved?</SectionLabel>
          <textarea value={improve} onChange={(e) => setImprove(e.target.value)} rows={2}
            placeholder="Be specific — this goes directly to the Lanced team."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-purple-300 text-gray-700 placeholder-gray-300 mt-1" />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <SectionLabel>Would you join another Career Circle?</SectionLabel>
          {choiceRow(["Yes, definitely", "Maybe", "No"], again, setAgain)}
        </div>
      </div>

      <PBtn onClick={onDone} disabled={!ready} className="w-full mt-6 py-3">
        Submit feedback →
      </PBtn>
      {!ready && <p className="text-center text-xs text-gray-400 mt-2">Please answer the required questions above</p>}
    </div>
  );
}

// Done
function CC_Done({ session: s, goBack }) {
  return (
    <div className="p-6 max-w-lg flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-3xl mb-4">🎉</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Session complete!</h2>
      <p className="text-sm text-gray-500 mb-5">
        Thank you for your feedback — it goes directly to the Lanced team.<br />Your group chats are open.
      </p>
      <div className="w-full bg-purple-50 border border-purple-200 rounded-xl p-4 text-left mb-5 flex gap-3">
        <span className="text-xl flex-shrink-0">🛠</span>
        <div>
          <p className="font-semibold text-sm text-gray-900">{s.tool}</p>
          <p className="text-xs text-gray-500 mt-0.5">Shared to your circle group chat.</p>
          <p className="text-xs text-purple-600 mt-1 font-medium">
            In 7 days, your group will be reminded to share how it went.
          </p>
        </div>
      </div>
      <PBtn onClick={goBack} className="w-full py-3">Back to Career Circles</PBtn>
    </div>
  );
}

function CareerCircles() {
  const [screen, setScreen] = useState("overview");
  const [session, setSession] = useState(null);

  const go = (s, data) => { if (data) setSession(data); setScreen(s); };

  const isZoom = screen === "session";

  return (
    <div className={isZoom ? "h-full flex flex-col" : ""}>
      {screen === "overview" && <CC_Overview onSelect={(s) => go("detail", s)} />}
      {screen === "detail"   && session && <CC_Detail session={session} onJoin={() => go("session")} back={() => go("overview")} />}
      {screen === "session"  && session && <CC_Session session={session} onEnd={() => go("feedback")} />}
      {screen === "feedback" && session && <CC_Feedback session={session} onDone={() => go("done")} back={() => go("session")} />}
      {screen === "done"     && session && <CC_Done session={session} goBack={() => go("overview")} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MESSAGES
// ─────────────────────────────────────────────────────────────────────────────

function ChatRow({ chat, onClick }) {
  const last = chat.msgs[chat.msgs.length - 1];
  const isDM = chat.type === "dm";
  return (
    <div onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-purple-300 hover:shadow-sm transition-all">
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
            isDM ? "bg-purple-100 text-purple-700" : "bg-gray-900 text-white"
          }`}>
            {isDM ? chat.init : chat.initials}
          </div>
          {chat.completed && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-white" style={{ fontSize: 8 }}>✓</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-sm text-gray-900 truncate">{chat.name}</p>
            <span className="text-xs text-gray-400 flex-shrink-0">{last.time}</span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {last.system ? "📌 Lanced reminder" : `${last.from}: ${last.text}`}
          </p>
        </div>
        {chat.unread > 0 && (
          <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
            {chat.unread}
          </div>
        )}
      </div>
    </div>
  );
}

function MSG_List({ onOpen }) {
  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Messages</h2>

      <div className="mb-5">
        <SectionLabel>Career Circles chats</SectionLabel>
        <div className="space-y-2">
          {CHATS.map((c) => <ChatRow key={c.id} chat={c} onClick={() => onOpen(c)} />)}
        </div>
      </div>

      <div>
        <SectionLabel>Direct messages</SectionLabel>
        <div className="space-y-2">
          {DM_CHATS.map((c) => <ChatRow key={c.id} chat={c} onClick={() => onOpen(c)} />)}
        </div>
      </div>
    </div>
  );
}

function MSG_Chat({ chat, back }) {
  const [msgs, setMsgs] = useState(chat.msgs);
  const [text, setText] = useState("");
  const ref = useRef(null);
  const isDM = chat.type === "dm";

  const send = () => {
    if (!text.trim()) return;
    setMsgs((p) => [...p, {
      id: Date.now(), from: "Sophie", init: "S", self: true,
      time: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
      text: text.trim(),
    }]);
    setText("");
  };

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={back} className="text-sm text-gray-400 hover:text-gray-700 mr-1">←</button>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
          isDM ? "bg-purple-100 text-purple-700" : "bg-gray-900 text-white"
        }`}>
          {isDM ? chat.init : chat.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{chat.name}</p>
          <p className="text-xs text-gray-400">{chat.sub}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {msgs.map((m) => {
          if (m.system) {
            return (
              <div key={m.id} className="flex justify-center">
                <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 max-w-sm text-center">
                  <p className="text-xs font-semibold text-purple-700 mb-0.5">📌 Lanced</p>
                  <p className="text-xs text-gray-500">{m.text}</p>
                </div>
              </div>
            );
          }
          const self   = m.self;
          const expert = m.expert;
          return (
            <div key={m.id} className={`flex gap-2.5 ${self ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5 ${
                expert ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                {(m.init || m.from)[0]}
              </div>
              <div className={`flex flex-col gap-0.5 max-w-xs ${self ? "items-end" : ""}`}>
                {!self && (
                  <span className={`text-xs font-semibold ${expert ? "text-purple-700" : "text-gray-500"}`}>
                    {m.from}
                  </span>
                )}
                <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  self   ? "bg-purple-700 text-white rounded-tr-sm" :
                  expert ? "bg-white border border-purple-100 text-gray-800 rounded-tl-sm" :
                           "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                }`}>
                  {m.text}
                </div>
                {!self && !isDM && (
                  <button className="text-xs text-purple-400 hover:text-purple-600 mt-0.5">
                    Message privately
                  </button>
                )}
                <span className="text-xs text-gray-300">{m.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={ref} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-3 py-2.5 flex gap-2 flex-shrink-0">
        <input value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={isDM ? `Message ${chat.name.split(" ")[0]}...` : "Message the group..."}
          className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 text-gray-700 placeholder-gray-300" />
        <PBtn onClick={send} className="px-4 py-2">Send</PBtn>
      </div>
    </div>
  );
}

function Messages() {
  const [screen, setScreen] = useState("list");
  const [chat, setChat]     = useState(null);

  if (screen === "chat" && chat) {
    return (
      <div className="flex flex-col h-full">
        <MSG_Chat chat={chat} back={() => setScreen("list")} />
      </div>
    );
  }
  return <MSG_List onOpen={(c) => { setChat(c); setScreen("chat"); }} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [section, setSection] = useState("circles");
  const totalUnread = [...CHATS, ...DM_CHATS].reduce((s, c) => s + (c.unread || 0), 0);
  const isChat = section === "messages";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar active={section} onNav={setSection} unreadMsg={totalUnread} />
      <main className={`flex-1 ${isChat ? "overflow-hidden flex flex-col" : "overflow-y-auto"}`}>
        {section === "circles"  && <CareerCircles />}
        {section === "messages" && <Messages />}
        {section !== "circles" && section !== "messages" && (
          <div className="p-10 text-sm text-gray-400 italic">
            This section is not in the prototype scope.
          </div>
        )}
      </main>
    </div>
  );
}
