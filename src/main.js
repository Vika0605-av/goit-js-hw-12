import { getImagesByQuery } from './js/pixabay-api.js';
import { renderImages, clearGallery} from './js/render-functions.js';
import { hideLoader, showLoader } from './js/render-functions.js';
import { showLoadMoreBtn, hideLoadMoreBtn } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query;
let page = 1;
let per_page = 15;
let totalPages = 0;

function disableLoadMoreBtn() {
    loadMoreBtn.disabled = true;
}
function enableLoadMoreBtn() {
    loadMoreBtn.disabled = false;
}
form.addEventListener('submit', async e => {
    e.preventDefault();
    query = e.target.elements.searchText.value.trim();
    if (!query)  return ;
        page = 1;
        hideLoadMoreBtn();
        showLoader();
     clearGallery();
    try {
        const data = await getImagesByQuery(query, page, per_page);
        const { hits, totalHits } = data;
        if (!hits || hits.length === 0) {
            iziToast.error({
                message: 'No images found. Please try a different search query.',
                CaretPosition: 'topRight',
            });
            return;
        }
        totalPages = Math.ceil(totalHits / per_page);
        renderImages(hits);
        if (page < totalPages) {
            showLoadMoreBtn();
        } else {
            hideLoadMoreBtn();
            iziToast.error({
                message: 'Youve reached the end of search results.',
                CaretPosition: 'topRight',
            });
        }
    } catch (error) {
        iziToast.error({ 
        message: 'Something went wrong. Pleasevtry again',
                CaretPosition: 'topRight',
            });
    } finally {
        hideLoader();
    }
});
   loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    hideLoadMoreBtn();
    showLoader();
try {
    const { hits } = await getImagesByQuery(query,page, per_page);
    renderImages(hits);
    if (page < totalPages) {
        showLoadMoreBtn();
        } else { 
        hideLoadMoreBtn();
        iziToast.info({
           message: 'Were sorry, but youve reached the end of search results.',
           CaretPosition: 'topRight',
        });
    }
const { height: cardHeight } = document.querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();
window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
        } catch (error) {
        iziToast.info({
                message: "error",
                CaretPosition: 'topRight',
            });
    } finally {
        enableLoadMoreBtn();
        hideLoader();
    }
});
   
