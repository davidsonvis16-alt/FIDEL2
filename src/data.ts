export const contact = {
  phoneDisplay: '+254 706 577 697',
  phone: '+254706577697',
  email: 'brillbrall380@gmail.com',
  location: 'Homa Bay, Kenya',
  whatsapp:
    'https://wa.me/254706577697?text=Hi%20Fidel%2C%20I%27d%20like%20to%20book%20a%20coaching%20session.',
  hubspotWhatsapp:
    'https://wa.me/254706577697?text=Hi%20Fidel%2C%20I%27m%20interested%20in%20learning%20HubSpot%20with%20you.',
} as const

export const nav = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
  { href: '#automation', label: 'Automation' },
  { href: '#contact', label: 'Contact' },
  { href: '/hubspot', label: 'HubSpot' },
] as const

export type ServiceIcon = 'GraduationCap' | 'Clock' | 'Check' | 'Users'
export interface Service {
  icon: ServiceIcon
  title: string
  text: string
}
export const services: Service[] = [
  {
    icon: 'GraduationCap',
    title: 'Academic Coaching',
    text: 'Tailored success plans that lift grades, build confidence and set clear, reachable goals.',
  },
  {
    icon: 'Clock',
    title: 'Time Management',
    text: 'Workshops and routines that help students balance studies, life and the future.',
  },
  {
    icon: 'Check',
    title: 'Motivation & Accountability',
    text: 'Regular check-ins that keep students focused, consistent and on track.',
  },
  {
    icon: 'Users',
    title: 'Peer Mentoring',
    text: 'Mentoring circles that build a supportive, collaborative community among students.',
  },
]

export const ticker = [
  'Academic Coaching',
  'Time Management',
  'Study Strategies',
  'Peer Mentoring',
  'Motivation & Accountability',
]

export type Stat = { label: string } & (
  { value: number; suffix: string; text?: never } | { text: string; value?: never; suffix?: never }
)
export const stats: Stat[] = [
  { value: 30, suffix: '%', label: 'Boost in student retention from tailored success plans' },
  { value: 100, suffix: '+', label: 'Students guided to their academic & personal goals' },
  { text: '1:1', label: 'Regular check-ins so no student falls off track' },
]

export interface Experience {
  date: string
  title: string
  where: string
  points: string[]
}
export const experience: Experience[] = [
  {
    date: 'Jan 2022 – 2025',
    title: 'Student Success Coach',
    where: 'Mbita High School, Homa Bay, Kenya',
    points: [
      'Developed tailored success plans, boosting student retention rates by 30%.',
      'Facilitated workshops on time management, enhancing student productivity.',
      'Guided 100+ students to achieve their academic goals and personal growth.',
      'Conducted regular check-ins, ensuring students remained on track for academic success.',
      'Organized peer mentoring initiatives, fostering a supportive and collaborative community.',
    ],
  },
  {
    date: 'Jan 2019 – Apr 2020',
    title: 'Advanced Coaching Certification',
    where: 'Alison (Online)',
    points: [
      'Developed innovative coaching strategies, enhancing client performance by 30%.',
      'Presented research on coaching effectiveness at a national coaching conference.',
    ],
  },
]

// Copied straight from the resume, as Fidel asked
export const skills = [
  'Student Engagement',
  'Learning Strategies',
  'Motivational Interviewing',
  'Academic Coaching',
]
export const languages = [
  { name: 'Swahili', level: 'Proficient' },
  { name: 'English', level: 'Proficient' },
]

export interface FlowStep {
  tag: string
  title: string
  text: string
  wait?: boolean
}
export const flow: FlowStep[] = [
  {
    tag: 'Trigger',
    title: 'Landing page',
    text: '“Inbound Lead Generation” — the visitor claims a free guide and submits the form.',
  },
  {
    tag: 'Step 1 · instantly',
    title: 'Welcome email',
    text: '“Thanks for reaching out to our Agency. Let’s chat.” — invites them to a 15-minute discovery call.',
  },
  {
    tag: 'Step 2',
    title: 'Wait 2 days',
    text: 'Business days only, so follow-ups never land on a weekend.',
    wait: true,
  },
  {
    tag: 'Step 3',
    title: 'Nurture email',
    text: '“Quick questions about your goals…” — shares an insight and points to the breakdown guide.',
  },
]

export interface Shot {
  src: string
  w: number
  h: number
  kind: 'wide' | 'phone' | 'photo'
  title: string
  caption: string
  alt: string
}
export const shots: Shot[] = [
  {
    src: '/images/hubspot-landing-page.jpg',
    w: 1200,
    h: 800,
    kind: 'wide',
    title: 'The landing page',
    caption: 'Published and live, tied to the “FY26 Inbound Lead Acquisition & Funnel” campaign.',
    alt: 'HubSpot page details for the Inbound Lead Generation landing page, published and public, part of the FY26 Inbound Lead Acquisition & Funnel campaign',
  },
  {
    src: '/images/workflow-sequence.jpg',
    w: 1210,
    h: 854,
    kind: 'wide',
    title: 'The workflow',
    caption: '“Inbound Lead Nurture: Welcome & Promo Sequence”, switched on.',
    alt: "HubSpot workflow 'Inbound Lead Nurture: Welcome & Promo Sequence', switched on, with a send email step followed by a 2 business day delay",
  },
  {
    src: '/images/email-1-welcome.jpg',
    w: 738,
    h: 1260,
    kind: 'phone',
    title: 'Email 1',
    caption: 'The instant welcome.',
    alt: "Automated welcome email preview: thanks for your inquiry, let's set up a 15-minute discovery call",
  },
  {
    src: '/images/email-2-nurture.jpg',
    w: 738,
    h: 1180,
    kind: 'phone',
    title: 'Email 2',
    caption: 'The nurture follow-up.',
    alt: 'Automated nurture email preview sent two days later with a quick marketing insight',
  },
  {
    src: '/images/hubspot-inbound.jpg',
    w: 736,
    h: 506,
    kind: 'photo',
    title: 'HubSpot',
    caption: 'Marketing Hub — where it’s all built.',
    alt: 'HubSpot sign at a HubSpot conference',
  },
]

export interface Track {
  title: string
  status: string
  points: { label: string; text: string }[]
}
export const tracks: Track[] = [
  {
    title: 'CRM / Data Specialist & Pipeline Administration',
    status: 'Foundations',
    points: [
      {
        label: 'Contact management',
        text: 'Learning the foundations of contact management, customer database cleanliness and tracking operational lifecycle stages.',
      },
      {
        label: 'Sales Hub & pipelines',
        text: 'Developing competencies in Sales Hub & Pipeline Administration to format deal stages and map visual client journeys.',
      },
    ],
  },
  {
    title: 'Inbound & Inside Sales Concepts',
    status: 'Understanding',
    points: [
      {
        label: 'Lead conversion',
        text: 'Understanding standard lead conversion methodologies, contact engagement workflows and communication qualification frameworks.',
      },
      {
        label: 'Marketing Hub',
        text: 'Actively exploring Marketing Hub execution & lead management to understand lead-scoring basics and alignment strategies.',
      },
    ],
  },
  {
    title: 'Digital Marketing Assistance & Analytics',
    status: 'In training',
    points: [
      {
        label: 'Engagement',
        text: 'Exploring multi-channel content pathways, automated engagement logic and basic audience segmentation.',
      },
      {
        label: 'Reporting',
        text: 'Training in basic reporting & dashboard maintenance to extract actionable metric interpretations and update core tracking screens.',
      },
    ],
  },
]

export const learnSteps = [
  {
    title: 'Message me',
    text: 'Say where you are with HubSpot (never opened it is fine) and what you want to use it for.',
  },
  {
    title: 'Pick one area',
    text: 'CRM and pipelines, inbound and lead management, or reporting. One at a time.',
  },
  {
    title: 'Build something real',
    text: 'We work in a free HubSpot account and check in each week, so you keep going.',
  },
]

// "Find your starting point" quiz on the HubSpot page — a small lead-scoring demo
export interface QuizOption {
  label: string
  points: number
  track?: number
}
export const quiz: { question: string; key: string; options: QuizOption[] }[] = [
  {
    question: 'What do you want HubSpot for?',
    key: 'Goal',
    options: [
      { label: 'A CRM or sales-ops job', points: 0, track: 0 },
      { label: 'Growing my own business', points: 0, track: 1 },
      { label: 'Marketing & reporting work', points: 0, track: 2 },
    ],
  },
  {
    question: 'How well do you know HubSpot?',
    key: 'Experience',
    options: [
      { label: 'Never opened it', points: 25 },
      { label: 'Clicked around a bit', points: 20 },
      { label: 'I use it already', points: 12 },
    ],
  },
  {
    question: 'How much time can you give it each week?',
    key: 'Time per week',
    options: [
      { label: '1–2 hours', points: 10 },
      { label: '3–5 hours', points: 18 },
      { label: '6+ hours', points: 22 },
    ],
  },
]
