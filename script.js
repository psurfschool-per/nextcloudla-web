// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileCta = document.querySelector('.mobile-cta');
    let isMenuOpen = false;

    // Scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile menu functions
    function openMenu() {
        isMenuOpen = true;
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        navOverlay.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Toggle menu
    navToggle.addEventListener('click', function() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on overlay click
    navOverlay.addEventListener('click', closeMenu);

    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    if (mobileCta) {
        mobileCta.addEventListener('click', closeMenu);
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && isMenuOpen) {
            closeMenu();
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active');
        });
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });

    startSlider();

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }

    // Intersection Observer for stats
    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Portfolio filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonials slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const prev = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
            showTestimonial(prev);
        });

        nextBtn.addEventListener('click', () => {
            const next = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
            showTestimonial(next);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-rotate testimonials
    setInterval(() => {
        const next = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
        showTestimonial(next);
    }, 6000);

    // Back to top button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor ingresa un correo válido', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Enviando...</span><i class="bi bi-arrow-repeat"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 16px 24px;
            border-radius: 12px;
            background: white;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 10000;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification.success {
            border-left: 4px solid #10b981;
        }
        .notification.error {
            border-left: 4px solid #ef4444;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .notification.success i {
            color: #10b981;
            font-size: 20px;
        }
        .notification.error i {
            color: #ef4444;
            font-size: 20px;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            const slides = document.querySelectorAll('.hero-slide');
            slides.forEach(slide => {
                slide.style.transform = `translateY(${scrolled * 0.3}px)`;
            });
        }
    });

    // Add loading animation
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
    `;
    document.body.appendChild(loader);

    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader {
            position: fixed;
            inset: 0;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .loader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #e5e7eb;
            border-top-color: #03b0de;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyle);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
});