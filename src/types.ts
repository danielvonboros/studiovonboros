export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  /** Optionales Bild in doppelter Breite fuer scharfe Darstellung auf Retina. */
  image2x?: string;
  href?: string;
}
