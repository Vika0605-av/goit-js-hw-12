import { getImagesByQuery } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoader } from './js/render-functions.js';
import { hideLoader } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.js-load-more');
let query;
let page = 1;
let per_page = 15;
let totalPages = 0;


form.addEventListener('submit', handleSubmit);
async function handleSubmit(e) {
    e.preventDefault();
    query = e.target.elements.searchText.value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!'
        });
     return;
    }
    page = 1;
clearGallery();
loadMoreBtn.style.display = 'none';
    showLoader();

    try {
        const images = await getImagesByQuery(query, page, per_page);
        if (!images || images.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!'
            });
            return;
        }
        renderImages(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again later.'
        });
    } finally {
        hideLoader();
    }
}
async function handleLoadMore() {
    page += 1;
    showLoader();
    try {
        const data = await getImagesByQuery(query, page, per_page);
        const images = data.hits;
        renderImages(images);
        const totalPages = Math.ceil(data.totalPages / per_page);
        if (page >= totalPages) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({
                message: " We're sorry, but you've reached the end of search results."
            });
        }
        } catch (error) {
            console.error('Error fetching images:', error);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching images. Please try again later.'
            });
        } finally {
            hideLoader();
        }
    }
