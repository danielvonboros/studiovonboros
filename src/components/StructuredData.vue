<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import { SITE_URL } from '@/site';

// Schema.org-Daten für Google und KI-Assistenten: Wer steckt hinter Studio von Boros,
// was wird angeboten, wo. Rendert nichts Sichtbares, nur ein JSON-LD-Script im <head>.
// Sobald das Google-Unternehmensprofil (oder Houzz o. Ä.) online ist: URL bei `sameAs` ergänzen.

const studioId = `${SITE_URL}/#studio`;
const personId = `${SITE_URL}/#daniel-von-boros`;

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    // ─────────────────────────────────────────────────────────────
    // 1. STUDIO
    // ─────────────────────────────────────────────────────────────
    {
      '@type': 'ProfessionalService',
      '@id': studioId,

      name: 'Studio von Boros',
      alternateName: 'studiovonboros',
      slogan: 'Räume mit Haltung.',

      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.svg`,
      image: `${SITE_URL}/og.jpg`,

      description:
        'Büro für Innenarchitektur und Möbel nach Maß in Berlin. Raumkonzepte, Einbauten und Möbel für Altbau- und Loftwohnungen – geplant, gezeichnet und bis zur Montage begleitet von Architekt Daniel von Boros.',

      email: 'studio@studiovonboros.com',
      telephone: '+491604958148',

      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kolonnenstraße 8',
        postalCode: '10827',
        addressLocality: 'Berlin',
        addressCountry: 'DE',
      },

      areaServed: { '@type': 'City', name: 'Berlin' },

      priceRange: 'ab 2.400 €',
      currenciesAccepted: 'EUR',

      founder: { '@id': personId },

      sameAs: ['https://www.instagram.com/studiovonboros'],

      knowsAbout: [
        'Innenarchitektur',
        'Möbel nach Maß',
        'Einbauten nach Maß',
        'Altbauwohnungen',
        'Loftwohnungen',
        'Zonierung',
        'Raumteiler',
        'Homeoffice in der Wohnung',
        'Hochbett und Stauraum im Mikroapartment',
        'Material- und Farbkonzept',
      ],

      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Innenarchitektur und Möbel nach Maß',
        itemListElement: [
          {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              minPrice: 2400,
              priceCurrency: 'EUR',
              unitText: 'pro Raum',
            },
            itemOffered: {
              '@type': 'Service',
              name: 'Raumkonzept',
              serviceType: 'Innenarchitektur und Möbelplanung',
              description:
                'Festpreis pro Raum: Erstgespräch und Aufmaß vor Ort in Berlin, Raumkonzept mit Grundriss und Möblierung, Entwurf der Einbauten und Möbel nach Maß, Material- und Farbkonzept, Detailpläne für die Umsetzung.',
              provider: { '@id': studioId },
              areaServed: { '@type': 'City', name: 'Berlin' },
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Individuelle Projekte',
              serviceType: 'Innenarchitektur und Projektbegleitung',
              description:
                'Komplette Wohnungen, mehrere Räume oder eine laufende Begleitung von der Planung bis zur Montage. Umfang und Angebot nach gemeinsamer Abstimmung.',
              provider: { '@id': studioId },
              areaServed: { '@type': 'City', name: 'Berlin' },
            },
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────
    // 2. PERSON
    // ─────────────────────────────────────────────────────────────
    {
      '@type': 'Person',
      '@id': personId,

      name: 'Daniel von Boros',
      jobTitle: 'Architekt',

      description:
        'Architekt in Berlin, eingetragen in der Architektenliste der Architektenkammer Berlin. Gründer von Studio von Boros für Innenarchitektur, Einbauten und Möbel nach Maß.',

      url: `${SITE_URL}/ueber-mich`,
      worksFor: { '@id': studioId },

      memberOf: {
        '@type': 'Organization',
        name: 'Architektenkammer Berlin',
        url: 'https://www.ak-berlin.de',
      },

      knowsAbout: ['Architektur', 'Innenarchitektur', 'Möbeldesign', 'Möbelbau', 'Raumplanung'],

      sameAs: ['https://www.linkedin.com/in/danielvonboros'],
    },

    // ─────────────────────────────────────────────────────────────
    // 3. WEBSITE
    // ─────────────────────────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Studio von Boros',
      inLanguage: ['de', 'en'],
      publisher: { '@id': studioId },
    },
  ],
};

// Bewusst ohne <template>: Ein leeres Template rendert auf Server und Client unterschiedlich
// und stört die Hydration. `() => null` ist auf beiden Seiten derselbe leere Knoten.
export default defineComponent({
  name: 'StructuredData',
  setup() {
    useHead({
      script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }],
    });
    return () => null;
  },
});
</script>
