// --- 1. Loader ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.visibility = 'hidden', 600);
    }
});

// --- 2. Sticky Nav & Mobile Menu ---
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-xmark');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });
}

// --- 3. Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// --- 4. Animated Counters ---
const statsSection = document.querySelector('.story');
let animated = false;

const animateCounters = () => {
    if (!statsSection) return;
    const pos = statsSection.getBoundingClientRect().top;
    if (pos < window.innerHeight && !animated) {
        animated = true;
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + '+';
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    }
};
window.addEventListener('scroll', animateCounters);

// --- 5. Gallery Filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// --- 6. Lightbox Modal ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDate = document.getElementById('lightboxDate');
const lightboxLocation = document.getElementById('lightboxLocation');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;
const visibleItems = () => Array.from(galleryItems).filter(i => i.style.display !== 'none');

const updateLightbox = (index) => {
    const items = visibleItems();
    if (items.length === 0) return;

    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;

    const selected = items[currentIndex];
    lightboxImg.src = selected.querySelector('img').src;
    lightboxTitle.innerText = selected.querySelector('.gallery-overlay-title').innerText;
    lightboxDate.innerHTML = `<i class="fa-regular fa-calendar"></i> ${selected.getAttribute('data-date')}`;
    lightboxLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${selected.getAttribute('data-location')}`;
};

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const items = visibleItems();
        currentIndex = items.indexOf(item);
        updateLightbox(currentIndex);
        lightbox.classList.add('active');
    });
});

if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
if (lightboxPrev) lightboxPrev.addEventListener('click', () => updateLightbox(currentIndex - 1));
if (lightboxNext) lightboxNext.addEventListener('click', () => updateLightbox(currentIndex + 1));

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
}

// --- 7. Back To Top ---
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}