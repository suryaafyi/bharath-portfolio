export interface Project {
  id: string;
  title: string;
  category: string;
  video: string;
  slug: string;
  client: string;
  production: string;
  editor: string;
  style: string;
  tools: string[];
  description: string;
  size?: 'tall' | 'wide' | 'regular';
}
const R2 = 'https://pub-abc9673bee79483f90f3afd3e4864cd6.r2.dev';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aquamare Marine',
    category: 'Brand Media Refresh',
    video: `${R2}/01.mp4`,
    slug: 'aquamare-marine',
    client: 'Aquamare',
    production: 'TCM Studio',
    editor: 'Bharath',
    style: 'Cinematic / Luxury',
    tools: ['Premiere Pro', 'After Effects', 'Davinci Resolve'],
    description: 'A complete visual overhaul for a luxury yacht brand, focusing on high-speed motion and pristine textures.',
    size: 'tall',
  },
  {
    id: '2',
    title: 'MainStage Festival',
    category: 'Event Coverage',
    video: `${R2}/02.mp4`,
    slug: 'mainstage-festival',
    client: 'MainStage',
    production: 'Live Pulse',
    editor: 'Bharath',
    style: 'Energetic / Fast-Cut',
    tools: ['Premiere Pro', 'Red Giant'],
    description: 'Capturing the raw energy of Europe\'s largest electronic music festival through rhythmic editing and sound design.',
    size: 'wide',
  },
  {
    id: '3',
    title: 'Plymouth Argyle',
    category: 'Kit Launch Campaign',
    video: `${R2}/03.mp4`,
    slug: 'plymouth-argyle',
    client: 'PAFC',
    production: 'Goal Media',
    editor: 'Bharath',
    style: 'Editorial / Sport',
    tools: ['After Effects', 'Premiere Pro'],
    description: 'Introducing the new season kit with a high-impact cinematic trailer that blends street culture with sport.',
    size: 'regular',
  },
  {
    id: '4',
    title: 'Commercial Edit',
    category: 'Product Reel',
    video: `${R2}/04.mp4`,
    slug: 'commercial-edit',
    client: 'Lumina Tech',
    production: 'Visionary Co',
    editor: 'Bharath',
    style: 'Minimalist / Tech',
    tools: ['Premiere Pro', 'Element 3D'],
    description: 'A product reveal for a high-end tech startup, focusing on macro details and fluid transitions.',
    size: 'tall',
  },
  {
    id: '5',
    title: 'Motion Typography',
    category: 'Brand Ident',
    video: `${R2}/05.mp4`,
    slug: 'motion-typography',
    client: 'Typo Agency',
    production: 'In-House',
    editor: 'Bharath',
    style: 'Graphic / Bold',
    tools: ['After Effects', 'C4D'],
    description: 'Kinetic typography exploration focusing on the intersection of language and motion.',
    size: 'wide',
  },
  {
    id: '6',
    title: 'UGC Ad Series',
    category: 'Social Campaign',
    video: `${R2}/01.mp4`,
    slug: 'ugc-ad-series',
    client: 'Glossy Co',
    production: 'Social First',
    editor: 'Bharath',
    style: 'Fast-Paced / Vertical',
    tools: ['Premiere Pro', 'CapCut Desktop'],
    description: 'A series of high-conversion UGC ads designed to stop the scroll and drive engagement.',
    size: 'regular',
  }
];

export const ALTERNATIVE_HEADLINES = [
  "Frames that refuse to be forgotten.",
  "Frames that refuse to be skipped.",
  "We edit emotion into motion.",
  "Stories cut to hit harder.",
  "Every second earns its place.",
  "Motion that makes brands unforgettable.",
  "Cut with intent. Finished with obsession.",
  "The edit is where the story lives.",
];
