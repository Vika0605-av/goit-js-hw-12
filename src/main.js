import { getImagesByQuery } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoader } from './js/render-functions.js';
import { hideLoader } from './js/render-functions.js';
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

function hideLoadMoreBtn() {
    loadMoreBtn.classList.add('hidden');
}
function disableLoadMoreBtn() {
    loadMoreBtn.disabled = true;
}
function enableLoadMoreBtn() {
    loadMoreBtn.disabled = false;
}
form.addEventListener('submit', async e => {
    e.preventDefault();
    query = e.target.elements.searchText.value.trim();
    if (!query) {
        page = 1;
        clearGallery();
        hideLoadMoreBtn();
        return;
    }
    showLoader();
    try {
        const data = await getImagesByQuery(query, page, per_page);
        const { hits, totalHits } = data;
        if (!hits || hits.length === 0) {
            alert('No images found. Please try a different search query.');
            return;
        }
        totalPages = Math.ceil(totalHits / per_page);
        renderImages(hits);
        if (page < totalPages) {
            showLoadMoreBtn();
        } else {
            alert("You've reached the end of search results.");
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    } finally {
        hideLoader();
    }
});
     
   loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();
    try {
        const data = await getImagesByQuery(query, page, per_page);
        renderImages(data.hits || data);
        if (page >= totalPages) {
            hideLoadMoreBtn();
        }
    } catch (error) {
        console.error(error);
    } finally {
        hideLoader();
    }
});
   
