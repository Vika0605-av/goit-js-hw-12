import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImagesByQuery } from "./pixabay-api";

let lightbox = new SimpleLightbox('.gallery-item', { captionDelay: 250 });
const gallery = document.querySelector('#gallery');
const loadMoreBtn = document.querySelector('.load-more');

export function renderImages(images) {
  const markup = images.map(img => `
  <a href="${img.largeImageURL}" class="gallery-item">
    <img src="${img.webformatURL}" alt="${img.tags}" />
    <div class="info">
      <p><b>Likes:</b> ${img.likes}</p>
      <p><b>Views:</b> ${img.views}</p>
      <p><b>Comments:</b> ${img.comments}</p>
      <p><b>Downloads:</b> ${img.downloads}</p>
    </div>
  </a>
`).join('');

  gallery.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('hidden');
}
export function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}
export function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}