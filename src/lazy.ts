/**
 *    This script uses the intersection api and loads images and background images
 * 
 *    It will look for images with a lazy class   
 * 
 *    On intersection, it willtake the data-src put it in src
 * 
 *    For background images use class`lazy-background`
 * 
 *    It works for sections and divs with a class `lazy-background`
 * 
 *    On intersection it will take data-image-full and put it on the element as a background-image
 */
const initLazyImages = () => {
  const lazyImages: HTMLImageElement[] = [].slice.call(document.querySelectorAll('img.lazy'));

  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log('in view');
          const lazyImage = entry.target as HTMLImageElement;
          lazyImage.src = lazyImage.dataset.src;
          // lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    }));

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
};

const initLazyBackgrounds = () => {
  const lazyImages: HTMLDivElement[] = [].slice.call(document.querySelectorAll('section.lazy-background, div.lazy-background'));
  // console.log(`there are ${lazyImages.length} sections!!`);
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log('in view');
          const lazyImage = entry.target as HTMLDivElement;
          lazyImage.style.backgroundImage = `url('${lazyImage.dataset.imageFull}')`;
          lazyImage.classList.remove('lazy-background');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    }));

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.cmsLazyImagesInitialized === undefined) {
    document.body.dataset.cmsLazyImagesInitialized = 'initialized';
    initLazyImages();
    initLazyBackgrounds();
  }
});