export function renderAlbums(container, albums) {
  const containerContent = document.createDocumentFragment();

  albums.forEach(album => {
    const albumElement = document.createElement('div');
    albumElement.id = album.id;
    albumElement.classList.add('album', 'loading');
    if (album.emphasized) albumElement.classList.add('emphasized');

    const albumLinkElement = document.createElement('a');
    albumLinkElement.href = `#${album.id}`;
    albumLinkElement.classList.add('album-link');

    const albumImgElement = document.createElement('img');
    albumImgElement.alt = `Album cover for "${album.album}" by ${album.artist}`;
    albumImgElement.classList.add('album-cover');
    albumImgElement.loading = 'lazy';
    albumImgElement.onload = () => albumElement.classList.remove('loading');
    albumImgElement.src = `./images/${album.id}.jpeg`;

    albumLinkElement.appendChild(albumImgElement);
    albumElement.appendChild(albumLinkElement);
    containerContent.appendChild(albumElement);
  });

  container.appendChild(containerContent);
}

export function renderAlbumOverlay(overlay, album) {
  const title = overlay.querySelector('.title');
  const genre = overlay.querySelector('.genre');
  const review = overlay.querySelector('.review');
  const video = overlay.querySelector('.video');
  const videoWrapper = overlay.querySelector('.video-wrapper');

  title.innerHTML = `<em>${album.album}</em> by ${album.artist}`;
  genre.textContent = album.genre.join(', ');
  review.innerHTML = album.review;
  const src = `https://www.youtube-nocookie.com/embed/${album.youtubeId}`;
  if (src !== video.src) video.src = src;

  videoWrapper.classList.remove('show')
  video.onload = () => videoWrapper.classList.add('show');

  overlay.classList.add('show');
}

export function hideAlbumOverlay(overlay) {
  const video = overlay.querySelector('.video');
  video.onload = () => {};
  video.src = '';
  overlay.classList.remove('show');
}
