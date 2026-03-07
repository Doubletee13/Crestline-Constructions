/* ═══════════════════════════════════════════════════════
   Crestline Constructions – main.js
   Features:
   1. Hero Slideshow (crossfade + dots + arrows, auto-advance)
   2. Animated Stat Counters (IntersectionObserver)
   3. Mobile Menu Toggle
   4. Back-to-Top Button
   5. Scroll Reveal Animations
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────
     1. HERO SLIDESHOW
    ───────────────────────────────────── */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');

    if (slides.length > 0) {
        let currentSlide = 0;
        let autoTimer = null;

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide]?.classList.remove('bg-gold');
            dots[currentSlide]?.classList.add('bg-transparent');

            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            dots[currentSlide]?.classList.add('bg-gold');
            dots[currentSlide]?.classList.remove('bg-transparent');
        }

        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        function startAutoPlay() {
            autoTimer = setInterval(nextSlide, 5500);
        }
        function resetAutoPlay() {
            clearInterval(autoTimer);
            startAutoPlay();
        }

        nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
        prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { goToSlide(i); resetAutoPlay(); });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
            if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
        });

        // Touch/swipe support
        let touchStartX = 0;
        const heroEl = document.getElementById('hero');
        heroEl?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        heroEl?.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
                resetAutoPlay();
            }
        });

        startAutoPlay();
    }


    /* ─────────────────────────────────────
     2. ANIMATED STAT COUNTERS
    ───────────────────────────────────── */
    const statNumbers = document.querySelectorAll('[data-target]');

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000; // ms
        const stepTime = 16;   // ~60fps
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    if (statNumbers.length > 0) {
        let countersTriggered = false;

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersTriggered) {
                    countersTriggered = true;
                    statNumbers.forEach(animateCounter);
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.getElementById('stats');
        if (statsSection) statsObserver.observe(statsSection);
    }


    /* ─────────────────────────────────────
     3. MOBILE MENU TOGGLE
    ───────────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            mobileMenu.classList.toggle('open', !isOpen);
            hamburger.setAttribute('aria-expanded', String(!isOpen));

            // Animate hamburger lines to X
            const lines = hamburger.querySelectorAll('span');
            if (!isOpen) {
                lines[0]?.classList.add('rotate-45', 'translate-y-2');
                lines[1]?.classList.add('opacity-0');
                lines[2]?.classList.add('-rotate-45', '-translate-y-2');
            } else {
                lines[0]?.classList.remove('rotate-45', 'translate-y-2');
                lines[1]?.classList.remove('opacity-0');
                lines[2]?.classList.remove('-rotate-45', '-translate-y-2');
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
                const lines = hamburger.querySelectorAll('span');
                lines[0]?.classList.remove('rotate-45', 'translate-y-2');
                lines[1]?.classList.remove('opacity-0');
                lines[2]?.classList.remove('-rotate-45', '-translate-y-2');
            }
        });
    }


    /* ─────────────────────────────────────
     4. BACK-TO-TOP BUTTON
    ───────────────────────────────────── */
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            const show = window.scrollY > 400;
            backToTop.classList.toggle('opacity-100', show);
            backToTop.classList.toggle('opacity-0', !show);
            backToTop.classList.toggle('pointer-events-auto', show);
            backToTop.classList.toggle('pointer-events-none', !show);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ─────────────────────────────────────
     5. SCROLL REVEAL ANIMATIONS
    ───────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Slight stagger for grouped elements
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => revealObserver.observe(el));
    }


    /* ─────────────────────────────────────
     6. NAVBAR SCROLL SHADOW
    ───────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('shadow-2xl', window.scrollY > 60);
        }, { passive: true });
    }

});
