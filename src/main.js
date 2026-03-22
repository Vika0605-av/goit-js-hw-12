import { getImagesByQuery } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoader } from './js/render-functions.js';
import { hideLoader } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', handleSubmit);
async function handleSubmit(e) {
    e.preventDefault();

    const query = e.target.elements.searchText.value.trim();
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!'
        });
     return;
    }
clearGallery();
    showLoader();

    try {
        const images = await getImagesByQuery(query);
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
