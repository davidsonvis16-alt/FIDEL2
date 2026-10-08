export const contact = {
  phoneDisplay: '+254 706 577 697',
  phone: '+254706577697',
  email: 'brillbrall380@gmail.com',
  location: 'Homa Bay, Kenya',
  whatsapp:
    'https://wa.me/254706577697?text=Hi%20Fidel%2C%20I%27d%20like%20to%20book%20a%20coaching%20session.',
} as const

export const nav = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
  { href: '#automation', label: 'Automation' },
  { href: '#contact', label: 'Contact' },
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
