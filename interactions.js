export function setupInteractions(onHashChange) {
  window.addEventListener('hashchange', onHashChange);
  onHashChange();
}

export function setupOverlayActions(overlay, onSeek) {
  const overlayIsShown = () => overlay.classList.contains('show');

  const close = overlay.querySelector('.close');
  close.addEventListener('click', () => {
    if (overlayIsShown()) location.hash = '#home';
  });

  const previous = overlay.querySelector('.previous');
  previous.addEventListener('click', () => overlayIsShown() && onSeek(false));

  const next = overlay.querySelector('.next');
  next.addEventListener('click', () => overlayIsShown() && onSeek(true));

  window.addEventListener('keydown', (event) => {
    if (!overlayIsShown()) return;
    if (event.key === 'ArrowRight') onSeek(true);
    if (event.key === 'ArrowLeft') onSeek(false);
    if (event.key === 'Escape') {
      location.hash = '#home';
    }
  });
}
