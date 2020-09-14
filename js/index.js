"use strict";

import gallery from "./gallery-items.js";

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightBox: document.querySelector('.js-lightbox'),
    lightBoxImage: document.querySelector('.lightbox__image'),
    closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
    lightBoxContent: document.querySelector('.lightbox__content'),
};

refs.galleryList.addEventListener('click', onGalleryClick);
refs.galleryList.addEventListener('click', changeImageSrc);
refs.closeBtn.addEventListener('click', closeModal);
refs.lightBoxContent.addEventListener('click', onOverlayClick);

function createGalleryItem(gallery) {

    const listItemRef = document.createElement('li');
    listItemRef.classList.add('gallery__item');

    const linkItemRef = document.createElement('a');
    linkItemRef.classList.add('gallery__link');
    linkItemRef.setAttribute("href", gallery.original);

    const imageItemRef = document.createElement('img');
    imageItemRef.classList.add('gallery__image');
    imageItemRef.setAttribute("src", gallery.preview);
    imageItemRef.setAttribute("data-source", gallery.original);
    imageItemRef.setAttribute("alt", gallery.description);

    listItemRef.appendChild(linkItemRef);
    linkItemRef.appendChild(imageItemRef);

    return listItemRef;
};

function createGallery() {
    const imagesGallery = gallery.map(createGalleryItem);
    refs.galleryList.append(...imagesGallery);
};

function onGalleryClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    refs.lightBox.classList.add('is-open');
    window.addEventListener('keydown', onKeypress);
};


function changeImageSrc(event) {
    const imageRef = event.target;
    const largeImageUrl = imageRef.dataset.source;
    const largeImageAlt = imageRef.alt;

    refs.lightBoxImage.src = largeImageUrl;
    refs.lightBoxImage.alt = largeImageAlt;
}

function closeModal() {
    refs.lightBox.classList.remove('is-open');
    window.removeEventListener('keydown', onKeypress);
    clearImageAttribute();
};


function clearImageAttribute() {
    refs.lightBoxImage.src = '';
    refs.lightBoxImage.alt = '';
}

function onOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    };
};

function nextImage() {
    const currentIndex = gallery.findIndex(
        element => element.original === refs.lightBoxImage.src,
    );
    refs.lightBoxImage.src =
        currentIndex < gallery.length - 1
            ? gallery[currentIndex + 1].original
            : gallery[0].original;
}

function prevImage() {
    const currentIndex = gallery.findIndex(
        element => element.original === refs.lightBoxImage.src,
    );
    refs.lightBoxImage.src =
        currentIndex === 0
            ? gallery[gallery.length - 1].original
            : gallery[currentIndex - 1].original;
}

function onKeypress(event) {
    if (event.code === 'Escape') closeModal();
    if (event.code === 'ArrowRight') nextImage();
    if (event.code === 'ArrowLeft') prevImage();

};

createGallery();








