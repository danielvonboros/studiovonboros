import type { Project } from '@/types';

// Inhalte getrennt vom Layout — hier pflegst du Projekte, ohne Komponenten anzufassen.
export const projects: Project[] = [
  {
    id: 'homeoffice-nische',
    title: 'Homeoffice',
    category: 'Innenausbau',
    year: '2025',
    description:
      'Homeoffice in einer Nische. Ein Raum, der alles kann: Arbeiten, Wohnen und Entspannen. Mit maßgefertigten Einbauten und cleverer Zonierung.',
    image: '/projects/homeoffice_nische_wohnzimmer.webp',
    href: '#',
  },
  {
    id: 'sideboard-alto',
    title: 'Sideboard Alto',
    category: 'Möbeldesign',
    year: '2020',
    description:
      'Ein minimalistisches Sideboard nach Maß. Ruhige Proportionen, ehrliche Materialien, gebaut, um Jahrzehnte zu halten.',
    image: '/projects/sideboard_alto.webp',
    href: '#',
  },
  {
    id: 'raumteiler',
    title: 'Raumteiler',
    category: 'Raumkonzept & Möbeldesign',
    year: '2026',
    description:
      'Wohnen und Schlafen in einem Raum — getrennt durch einen Kleiderschrank mit Spiegeltüren. Zonierung, die Licht und Weite erhält.',
    image: '/projects/schlafzimmer_trennwand_wohnbereich.webp',
    href: '#',
  },
  {
    id: 'mikroapartment',
    title: 'Mikroapartment',
    category: 'Innenausbau',
    year: '2026',
    description:
      'Auf wenigen Quadratmetern: Hochbett, Arbeitsplatz und Stauraum in einem durchdachten Einbau vereint. Optisch getrennt aber funktional verbunden. Ein Raum, der alles kann.',
    image: '/projects/gaestezimmer_kleiderschrank_durchgang.webp',
    href: '#',
  },
];
