/* ====================================
   隙光設計 Space Between Healing
   Main JavaScript v2.0
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // Mobile Navigation Toggle
    // ====================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle aria-expanded
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // ====================================
    // Navbar Scroll Effect
    // ====================================
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    function handleNavScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    // Throttle scroll event
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            handleNavScroll();
            scrollTimeout = null;
        }, 10);
    });
    
    // ====================================
    // Smooth Scroll for Anchor Links
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====================================
    // Intersection Observer for Animations
    // ====================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.pain-card, .solution-item, .service-card, .service-detail-card, ' +
        '.process-step, .why-card, .faq-item, .work-card, .portfolio-item, ' +
        '.service-tag-item, .contact-highlight, .contact-step'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ====================================
    // Contact Form Handling
    // ====================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalHTML = button.innerHTML;
            
            // Show loading state
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                發送中...
            `;
            button.disabled = true;
            
            // Add spin animation
            const spinStyle = document.createElement('style');
            spinStyle.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinStyle);
            
            // Simulate form submission
            setTimeout(() => {
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    已發送！我們會盡快回覆你。
                `;
                button.style.background = 'linear-gradient(135deg, #4A7C59 0%, #5a9c6a 100%)';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.background = '';
                    button.disabled = false;
                    this.reset();
                }, 3000);
            }, 1500);
        });
    }
    
    // ====================================
    // Active Navigation State
    // ====================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ====================================
    // Parallax Effect for Floating Shapes
    // ====================================
    const shapes = document.querySelectorAll('.floating-shape');
    if (shapes.length > 0 && window.matchMedia('(min-width: 768px)').matches) {
        let rafId = null;
        
        window.addEventListener('mousemove', (e) => {
            if (rafId) return;
            
            rafId = requestAnimationFrame(() => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 8;
                    const xOffset = (x - 0.5) * speed;
                    const yOffset = (y - 0.5) * speed;
                    shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                });
                
                rafId = null;
            });
        });
    }
    
    // ====================================
    // Button Hover Effects
    // ====================================
    const buttons = document.querySelectorAll('.btn-primary, .btn-accent');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.02)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // ====================================
    // Logo Icon Box Animation
    // ====================================
    const logoIconBox = document.querySelector('.logo-icon-box');
    if (logoIconBox) {
        const navLogo = document.querySelector('.nav-logo');
        
        navLogo.addEventListener('mouseenter', () => {
            logoIconBox.style.transform = 'scale(1.1) rotate(10deg)';
            logoIconBox.style.boxShadow = '0 4px 16px rgba(184, 147, 90, 0.4)';
        });
        
        navLogo.addEventListener('mouseleave', () => {
            logoIconBox.style.transform = '';
            logoIconBox.style.boxShadow = '';
        });
    }
    
    // ====================================
    // Service Card Hover Enhancement
    // ====================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const iconBox = card.querySelector('.service-icon-box');
        
        card.addEventListener('mouseenter', () => {
            if (iconBox) {
                iconBox.style.transform = 'scale(1.15) rotate(-5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (iconBox) {
                iconBox.style.transform = '';
            }
        });
    });
    
    // ====================================
    // Process Step Hover
    // ====================================
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        const iconBox = step.querySelector('.step-icon-box');
        
        step.addEventListener('mouseenter', () => {
            if (iconBox) {
                iconBox.style.transform = 'scale(1.1)';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            if (iconBox) {
                iconBox.style.transform = '';
            }
        });
    });
    
    // ====================================
    // Lazy Load Images (if any)
    // ====================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ====================================
    // Console Branding
    // ====================================
    console.log(
        '%c 隙光設計 Space Between Healing ',
        'background: linear-gradient(135deg, #B8935A 0%, #D4B17A 100%); color: #2C2826; padding: 10px 20px; font-size: 14px; font-weight: bold; border-radius: 4px;'
    );
    console.log(
        '%c讓你的品牌，一眼被記住',
        'color: #4D4843; font-size: 12px;'
    );
    
});
