import type { Project } from '@/types';

// Inhalte getrennt vom Layout — hier pflegst du Projekte, ohne Komponenten anzufassen.
export const projects: Project[] = [
  {
    id: 'stauraum-loft',
    title: 'Stauraum-Loft',
    category: 'Innenausbau',
    year: '2025',
    description:
      'Ein kompaktes Loft, das durch raumhohe Einbauten und eine zusätzliche Ebene fast doppelt so viel nutzbaren Raum gewonnen hat — ohne beengt zu wirken.',
    image: '/projects/project-1.jpg',
    href: '#',
  },
  {
    id: 'sideboard-quadra',
    title: 'Sideboard Quadra',
    category: 'Möbeldesign',
    year: '2025',
    description:
      'Ein minimalistisches Sideboard nach Maß. Ruhige Proportionen, ehrliche Materialien, gebaut, um Jahrzehnte zu halten.',
    image: '/projects/project-2.jpg',
    href: '#',
  },
  {
    id: 'raumteiler-empore',
    title: 'Raumteiler & Empore',
    category: 'Raumkonzept',
    year: '2024',
    description:
      'Wohnen und Schlafen in einem Raum — getrennt durch eine begehbare Empore statt einer Wand. Zonierung, die Licht und Weite erhält.',
    image: '/projects/project-3.jpg',
    href: '#',
  },
  {
    id: 'mikroapartment',
    title: 'Mikroapartment',
    category: 'Innenausbau',
    year: '2024',
    description:
      'Auf wenigen Quadratmetern: Hochbett, Arbeitsplatz und Stauraum in einem durchdachten Einbau vereint.',
    image: '/projects/project-4.jpg',
    href: '#',
  },
];
