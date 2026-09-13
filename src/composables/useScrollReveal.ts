import { onMounted, onUnmounted } from 'vue';

/**
 * Ein "Composable" ist Vues Pendant zu einem React-Custom-Hook: eine
 * wiederverwendbare Funktion, die Reaktivitaet und Lifecycle nutzt.
 * Dieser fuegt jedem Element mit der Klasse `.reveal` ein `.is-visible` hinzu,
 * sobald es in den sichtbaren Bereich scrollt.
 */
export function useScrollReveal() {
  let observer: IntersectionObserver | undefined;

  // onMounted entspricht useEffect(() => …, []) — laeuft nach dem ersten Render.
  onMounted(() => {
    // Wer weniger Bewegung eingestellt hat, sieht sofort alles.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer!.observe(el));
  });

  // onUnmounted entspricht der Cleanup-Funktion eines useEffect.
  onUnmounted(() => observer?.disconnect());
}
