document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission (via Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            const formData = new FormData(contactForm);

            btn.textContent = 'Sending...';
            btn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully to my Gmail.');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                }
            } catch (error) {
                alert("Oops! There was a problem submitting your form");
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // ScrollSpy: Highlight active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Reveal on Scroll Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Skill Bar Grow Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
                skillObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 1 });

    skillBars.forEach(bar => {
        // Store the target width from inline style and then clear it
        const currentStyle = bar.getAttribute('style');
        const match = currentStyle.match(/width:\s*(\d+%);/);
        if (match) {
            bar.setAttribute('data-width', match[1]);
            bar.style.width = '0'; // Start at 0
        }
        skillObserver.observe(bar);
    });

    // Typing Effect for Hero Title
    const title = document.querySelector('.hero-text .title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        type();
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinksList = document.querySelector('.nav-links');

    if (menuBtn && navLinksList) {
        menuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinksList.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu when a link is clicked
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // Project Carousel Auto-scroll
    const slider = document.getElementById('projectSlider');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (slider && dots.length > 0) {
        const descTrack = document.getElementById('descTrack');
        let currentIndex = 0;
        let interval;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (descTrack) {
                descTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % dots.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + dots.length) % dots.length;
            updateSlider();
        }

        function startAutoScroll() {
            interval = setInterval(nextSlide, 3000); // 3 seconds
        }

        function stopAutoScroll() {
            clearInterval(interval);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoScroll();
            startAutoScroll();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoScroll();
            startAutoScroll();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateSlider();
                stopAutoScroll();
                startAutoScroll();
            });
        });

        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();
    }

    // Upcoming Project Carousel Auto-scroll
    const upcomingSlider = document.getElementById('upcomingSlider');
    const upcomingDots = document.querySelectorAll('#upcomingDots .dot');
    const upcomingPrevBtn = document.getElementById('upcomingPrevBtn');
    const upcomingNextBtn = document.getElementById('upcomingNextBtn');

    if (upcomingSlider && upcomingDots.length > 0) {
        const upcomingDescTrack = document.getElementById('upcomingDescTrack');
        let currentIndex = 0;
        let interval;

        function updateSlider() {
            upcomingSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (upcomingDescTrack) {
                upcomingDescTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            upcomingDots.forEach(dot => dot.classList.remove('active'));
            upcomingDots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % upcomingDots.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + upcomingDots.length) % upcomingDots.length;
            updateSlider();
        }

        function startAutoScroll() {
            interval = setInterval(nextSlide, 3000); // 3 seconds
        }

        function stopAutoScroll() {
            clearInterval(interval);
        }

        upcomingNextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoScroll();
            startAutoScroll();
        });

        upcomingPrevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoScroll();
            startAutoScroll();
        });

        upcomingDots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateSlider();
                stopAutoScroll();
                startAutoScroll();
            });
        });

        upcomingSlider.addEventListener('mouseenter', stopAutoScroll);
        upcomingSlider.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();
    }
});

// Fade In Animation CSS (dynamic injection)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
