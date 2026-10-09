/**
 * SANJANA V - PORTFOLIO INTERACTIVE JAVASCRIPT
 * Features:
 * 1. Neural Network / Data Particles Canvas
 * 2. Dynamic Typing Text Effect
 * 3. Sticky Navigation & ScrollSpy
 * 4. Mobile Navigation Drawer
 * 5. Interactive Skills Categorization Filter
 * 6. Custom Video Player for Resume Video
 * 7. Project Detail Modals
 * 8. PDF Modals (Resume & Certificate)
 * 9. Toast Notifications & 1-Click Clipboard Copy
 * 10. Contact Form Validation & Submission
 * 11. Floating Back-to-Top Button
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NEURAL NETWORK / PARTICLES CANVAS
    // ==========================================
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.55;
                this.vy = (Math.random() - 0.5) * 0.55;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(99, 102, 241, ';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + '0.7)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            // Draw connecting lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        const alpha = (1 - dist / 130) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // ==========================================
    // 2. DYNAMIC TYPING TEXT EFFECT
    // ==========================================
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = [
            "Computer Science (Data Science) Student",
            "Machine Learning Enthusiast",
            "Python & SQL Developer",
            "FinTech & Backend Explorer",
            "IoT & Embedded Safety Innovator"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 80;
        const eraseSpeed = 40;
        const pauseDelay = 1800;

        function typeLoop() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let nextSpeed = isDeleting ? eraseSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                nextSpeed = pauseDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                nextSpeed = 350;
            }

            setTimeout(typeLoop, nextSpeed);
        }

        setTimeout(typeLoop, 500);
    }

    // ==========================================
    // 3. STICKY NAVBAR & SCROLLSPY
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const backToTopBtn = document.getElementById('back-to-top');

    function handleScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Sticky Navbar styling
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to Top button visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // ScrollSpy
        let currentSectionId = 'home';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 120;
            const sectionHeight = sec.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        drawerLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 4. MOBILE NAVIGATION DRAWER
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const drawerClose = document.getElementById('drawer-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');

    function openDrawer() {
        mobileDrawer.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileToggle.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileToggle.setAttribute('aria-expanded', 'false');
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // ==========================================
    // 5. SKILLS FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // ==========================================
    // 6. CUSTOM VIDEO PLAYER (RESUME VIDEO)
    // ==========================================
    const video = document.getElementById('resume-video');
    const videoOverlay = document.getElementById('video-overlay');
    const bigPlayBtn = document.getElementById('big-play-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const videoProgressContainer = document.getElementById('video-progress-container');
    const videoProgress = document.getElementById('video-progress');
    const timeDisplay = document.getElementById('time-display');
    const muteBtn = document.getElementById('mute-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (video) {
        function togglePlay() {
            if (video.paused || video.ended) {
                video.play();
                videoOverlay.classList.add('hidden');
                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                video.pause();
                videoOverlay.classList.remove('hidden');
                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }

        if (bigPlayBtn) bigPlayBtn.addEventListener('click', togglePlay);
        if (videoOverlay) videoOverlay.addEventListener('click', togglePlay);
        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);

        video.addEventListener('click', togglePlay);

        video.addEventListener('timeupdate', () => {
            if (!isNaN(video.duration)) {
                const current = video.currentTime;
                const total = video.duration;
                const percentage = (current / total) * 100;
                if (videoProgress) videoProgress.style.width = `${percentage}%`;

                if (timeDisplay) {
                    const curM = Math.floor(current / 60);
                    const curS = Math.floor(current % 60);
                    const totM = Math.floor(total / 60);
                    const totS = Math.floor(total % 60);
                    timeDisplay.textContent = `${curM}:${curS < 10 ? '0' : ''}${curS} / ${totM}:${totS < 10 ? '0' : ''}${totS}`;
                }
            }
        });

        video.addEventListener('ended', () => {
            videoOverlay.classList.remove('hidden');
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        });

        if (videoProgressContainer) {
            videoProgressContainer.addEventListener('click', (e) => {
                const rect = videoProgressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                if (!isNaN(video.duration)) {
                    video.currentTime = pos * video.duration;
                }
            });
        }

        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                muteBtn.innerHTML = video.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
            });
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });
        }
    }

    // ==========================================
    // 7. TOAST NOTIFICATIONS & COPY-TO-CLIPBOARD
    // ==========================================
    const toast = document.getElementById('toast-notification');
    let toastTimeout;

    function showToast(message, iconClass = 'fa-solid fa-circle-check') {
        if (!toast) return;
        const msgEl = toast.querySelector('.toast-message');
        const iconEl = toast.querySelector('.toast-icon');

        if (msgEl) msgEl.textContent = message;
        if (iconEl) iconEl.className = `toast-icon ${iconClass}`;

        toast.classList.add('active');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('active');
        }, 3200);
    }

    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard && textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied to clipboard: ${textToCopy}`);
                }).catch(() => {
                    showToast('Failed to copy text', 'fa-solid fa-triangle-exclamation');
                });
            } else if (textToCopy) {
                // Fallback
                const tempInput = document.createElement('input');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`Copied: ${textToCopy}`);
            }
        });
    });

    // ==========================================
    // 8. MODALS (RESUME, CERTIFICATE, PROJECTS)
    // ==========================================
    const resumeModal = document.getElementById('resume-modal');
    const certModal = document.getElementById('cert-modal');
    const projectModal = document.getElementById('project-modal');

    const openResumeModalBtn = document.getElementById('btn-preview-resume-modal');
    const resumeModalClose = document.getElementById('resume-modal-close');

    const previewCertBtn = document.querySelector('.preview-cert-btn');
    const certModalClose = document.getElementById('cert-modal-close');

    const projectModalClose = document.getElementById('project-modal-close');
    const projectModalBody = document.getElementById('project-modal-body');
    const projectModalTitle = document.getElementById('project-modal-title');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (openResumeModalBtn) openResumeModalBtn.addEventListener('click', () => openModal(resumeModal));
    if (resumeModalClose) resumeModalClose.addEventListener('click', () => closeModal(resumeModal));

    if (previewCertBtn) previewCertBtn.addEventListener('click', () => openModal(certModal));
    if (certModalClose) certModalClose.addEventListener('click', () => closeModal(certModal));

    if (projectModalClose) projectModalClose.addEventListener('click', () => closeModal(projectModal));

    // Close on backdrop click
    [resumeModal, certModal, projectModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(resumeModal);
            closeModal(certModal);
            closeModal(projectModal);
            closeDrawer();
        }
    });

    // Project Details Data
    const projectDetails = {
        fintech: {
            title: "Digital Money Transaction System",
            content: `
                <div class="modal-project-wrap">
                    <p class="modal-project-desc">
                        A secure financial engineering system designed to transition conventional physical cash payment processes into a resilient, tamper-evident digital workflow.
                    </p>
                    <h4 class="modal-section-title">Key Architectural Features</h4>
                    <ul class="modal-features-list">
                        <li><strong>ACID Transaction Compliance:</strong> Designed database interactions preventing debit/credit discrepancies during concurrent requests.</li>
                        <li><strong>Multi-Factor Authentication:</strong> Integrated verification protocols ensuring that only verified wallet users can initiate transfers.</li>
                        <li><strong>Audit Logging & Ledger:</strong> Implemented comprehensive transaction history and balance reconciliation modules.</li>
                        <li><strong>Modular Backend:</strong> Built with clean OOP architecture in Java and Python for maintainability and scalability.</li>
                    </ul>
                    <h4 class="modal-section-title">Technologies Used</h4>
                    <div class="skill-tags">
                        <span class="mini-tag">Python</span>
                        <span class="mini-tag">Java</span>
                        <span class="mini-tag">SQL</span>
                        <span class="mini-tag">Relational Database</span>
                        <span class="mini-tag">Security & Encryption</span>
                    </div>
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                        <a href="https://github.com/sanjanavaradarj" target="_blank" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View GitHub Repository
                        </a>
                    </div>
                </div>
            `
        },
        drowsiness: {
            title: "Driver Drowsiness Detection System",
            content: `
                <div class="modal-project-wrap">
                    <p class="modal-project-desc">
                        An intelligent vehicle safety system combining sensor telemetry and Arduino microcontrollers to detect driver fatigue and prevent accidents in real-time.
                    </p>
                    <h4 class="modal-section-title">Key Architectural Features</h4>
                    <ul class="modal-features-list">
                        <li><strong>Real-Time Fatigue Sensing:</strong> Monitored eye blink frequency, closure duration, and head tilt telemetry.</li>
                        <li><strong>Arduino Microcontroller Integration:</strong> Programmed embedded edge controllers to process hardware sensor signals with minimal latency.</li>
                        <li><strong>Instant Acoustic & Visual Alert:</strong> Automatically activated buzzer alerts and warning indicators when fatigue thresholds were breached.</li>
                        <li><strong>Road Safety Impact:</strong> Aimed at long-haul commercial drivers and night commuters to substantially reduce sleep-related vehicular crashes.</li>
                    </ul>
                    <h4 class="modal-section-title">Technologies Used</h4>
                    <div class="skill-tags">
                        <span class="mini-tag">Arduino</span>
                        <span class="mini-tag">Embedded Systems</span>
                        <span class="mini-tag">Python</span>
                        <span class="mini-tag">Microcontrollers</span>
                        <span class="mini-tag">Hardware Sensors</span>
                    </div>
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                        <a href="https://github.com/sanjanavaradarj" target="_blank" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View GitHub Repository
                        </a>
                    </div>
                </div>
            `
        }
    };

    const projectModalBtns = document.querySelectorAll('.open-project-modal');
    projectModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectDetails[projectKey];
            if (data && projectModalTitle && projectModalBody) {
                projectModalTitle.textContent = data.title;
                projectModalBody.innerHTML = data.content;
                openModal(projectModal);
            }
        });
    });

    // ==========================================
    // 9. CONTACT FORM HANDLING
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const messageInput = document.getElementById('contact-message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const subjectError = document.getElementById('subject-error');
            const messageError = document.getElementById('message-error');

            let isValid = true;

            // Reset errors
            [nameError, emailError, subjectError, messageError].forEach(el => {
                if (el) el.style.display = 'none';
            });

            // Validate Name
            if (!nameInput.value.trim()) {
                nameError.style.display = 'block';
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.style.display = 'block';
                isValid = false;
            }

            // Validate Subject
            if (!subjectInput.value.trim()) {
                subjectError.style.display = 'block';
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim().length < 10) {
                messageError.style.display = 'block';
                isValid = false;
            }

            if (!isValid) return;

            // Show sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>';

                // Display success
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    formStatus.innerHTML = `
                        <i class="fa-solid fa-circle-check"></i> 
                        Thank you, <strong>${nameInput.value.trim()}</strong>! Your message has been prepared. Opening your mail client or feel free to email directly at <a href="mailto:sanjanavaradarj@gmail.com" style="color:#ffffff; text-decoration:underline;">sanjanavaradarj@gmail.com</a>.
                    `;
                }

                showToast('Message submitted successfully!');

                // Direct mailto fallback
                const mailtoUrl = `mailto:sanjanavaradarj@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent("Name: " + nameInput.value.trim() + "\nEmail: " + emailInput.value.trim() + "\n\n" + messageInput.value.trim())}`;
                window.location.href = mailtoUrl;

                contactForm.reset();
            }, 900);
        });
    }

});
