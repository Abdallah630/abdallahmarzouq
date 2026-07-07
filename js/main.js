document.addEventListener('DOMContentLoaded', () => {
    
    // ===== SCROLL ANIMATIONS (INTERSECTION OBSERVER) =====
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // ===== STICKY NAVBAR =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== THEME TOGGLE =====
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
    }

    // ===== MOBILE MENU TOGGLE (Placeholder logic) =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--nav-scrolled-bg)';
        navLinks.style.padding = '20px 0';
        navLinks.style.backdropFilter = 'blur(10px)';
    });

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if(window.innerWidth <= 768) {
               navLinks.style.display = 'none';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ===== PROJECT MODAL LOGIC =====
    const projectsData = {
        blogapp: {
            title: "Blog Content API",
            images: [
                "assets/blog-1.png",
                "assets/blog-2.png",
                "assets/blog-3.png"
            ],
            tech: ["ASP.NET Core 8", "Entity Framework Core", "SQL Server", "JWT", "Clean Architecture", "FluentValidation"],
            description: `
                <p>A scalable RESTful API built with ASP.NET Core 8 using Clean Architecture.</p>
                <h3>Features</h3>
                <ul>
                    <li><strong>Authentication & Authorization:</strong> JWT Authentication & Role-Based Authorization (Admin / User)</li>
                    <li><strong>Content Management:</strong> Full CRUD for Posts, Categories, and Comments</li>
                    <li><strong>Engagement:</strong> Comments System with user interactions</li>
                    <li><strong>Data Handling:</strong> Pagination, Filtering, and Search functionality for posts</li>
                    <li><strong>Validation:</strong> Input Validation using FluentValidation</li>
                    <li><strong>Resilience:</strong> Global Exception Handling Middleware</li>
                </ul>
                <h3>Architecture Overview</h3>
                <p>The solution is strictly divided into Domain, Application, Infrastructure, and API layers to ensure separation of concerns and maintainability.</p>
            `,
            repoLink: "https://github.com/Abdallah630/BlogApp"
        },
        talabat: {
            title: "Talabat E-Commerce API",
            images: [
                "assets/talabat-1.png",
                "assets/talabat-2.png",
                "assets/talabat-3.png"
            ],
            tech: ["ASP.NET Core", "Entity Framework Core", "SQL Server", "Redis", "Docker", "JWT", "Stripe", "AutoMapper"],
            description: `
                <p>A production-ready RESTful E-Commerce API built with ASP.NET Core using Onion Architecture.</p>
                <h3>Features</h3>
                <ul>
                    <li><strong>Authentication & Authorization:</strong> JWT Bearer Token with ASP.NET Identity</li>
                    <li><strong>Products & Categories:</strong> CRUD with Filtering, Sorting & Pagination</li>
                    <li><strong>Basket & Orders:</strong> Redis-based shopping cart and order management</li>
                    <li><strong>Payment:</strong> Stripe integration for secure checkout</li>
                    <li><strong>Data Seeding:</strong> Auto seed products and identity data on startup</li>
                    <li><strong>Error Handling:</strong> Global exception middleware with custom error responses</li>
                    <li><strong>Architecture:</strong> Separated into API, Core, Repository, and Service layers</li>
                </ul>
                <h3>Setup & Usage</h3>
                <p>To run the API locally, clone the repo, update the connection strings in <code>appsettings.json</code>, and run the project. Migrations and Data Seeding are fully automated on startup. Docker image available.</p>
            `,
            repoLink: "https://github.com/Abdallah630/Talabat"
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    if (modalOverlay) {
        const modalClose = document.getElementById('modal-close');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-description');
        const modalTech = document.getElementById('modal-tech-stack');
        const modalLinks = document.getElementById('modal-links');
        const modalSlider = document.getElementById('modal-slider');
        const modalDots = document.getElementById('modal-dots');
        
        let currentSlide = 0;
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        document.querySelectorAll('.view-project-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project-id');
                const project = projectsData[projectId];
                
                if (project) {
                    // Populate text
                    modalTitle.textContent = project.title;
                    modalDesc.innerHTML = project.description;
                    
                    // Populate tech stack
                    modalTech.innerHTML = project.tech.map(t => '<span>' + t + '</span>').join('');
                    
                    // Populate links
                    modalLinks.innerHTML = `<a href="${project.repoLink}" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> GitHub Repo</a>`;
                    
                    // Populate slider
                    modalSlider.innerHTML = project.images.map(img => 
                        `<img src="${img}" onerror="this.src='https://via.placeholder.com/800x400/0b1120/f8fafc?text=Project+Image'" alt="Project Screenshot">`
                    ).join('');
                    
                    // Populate dots
                    modalDots.innerHTML = project.images.map((_, i) => 
                        `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
                    ).join('');
                    
                    currentSlide = 0;
                    updateSliderPosition();
                    
                    // Add dot event listeners
                    document.querySelectorAll('.dot').forEach(dot => {
                        dot.addEventListener('click', () => {
                            currentSlide = parseInt(dot.getAttribute('data-index'));
                            updateSliderPosition();
                        });
                    });

                    // Show modal
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                }
            });
        });

        // Close logic
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });

        // Slider controls
        const updateSliderPosition = () => {
            modalSlider.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
            const dots = document.querySelectorAll('.dot');
            if(dots.length > 0) {
               dots.forEach(d => d.classList.remove('active'));
               dots[currentSlide].classList.add('active');
            }
        };

        prevBtn.addEventListener('click', () => {
            const slidesCount = modalSlider.children.length;
            currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
            updateSliderPosition();
        });

        nextBtn.addEventListener('click', () => {
            const slidesCount = modalSlider.children.length;
            currentSlide = (currentSlide + 1) % slidesCount;
            updateSliderPosition();
        });
    }

    // ===== CONTACT FORM AJAX & CONFETTI =====
    const contactForm = document.getElementById('contact-form');
    const formSuccessMsg = document.getElementById('form-success-msg');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent standard page redirection
            
            // Disable button and show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Show success message
                    contactForm.style.display = 'none';
                    formSuccessMsg.style.display = 'block';
                    
                    // Trigger dynamic confetti
                    if (window.confetti) {
                        const duration = 3000;
                        const end = Date.now() + duration;

                        (function frame() {
                            confetti({
                                particleCount: 5,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0 },
                                colors: ['#2563eb', '#3b82f6', '#60a5fa']
                            });
                            confetti({
                                particleCount: 5,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1 },
                                colors: ['#2563eb', '#3b82f6', '#60a5fa']
                            });

                            if (Date.now() < end) {
                                requestAnimationFrame(frame);
                            }
                        }());
                    }
                } else {
                    alert("Oops! There was a problem submitting your form.");
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            }).catch(error => {
                alert("Oops! There was a problem submitting your form.");
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // ===== VISITOR COUNTER =====
    const visitorCountSpan = document.getElementById('visitor-count');
    if (visitorCountSpan) {
        // Initialize dynamic fallback in local storage (Starting from 0)
        let localViews = parseInt(localStorage.getItem('mockViews')) || 0;
        localViews += 1; 
        localStorage.setItem('mockViews', localViews);

        // Fetching real count and adding it to our starting point (0 now)
        fetch('https://api.counterapi.dev/v1/abdallah630/portfolio_views/up')
            .then(res => res.json())
            .then(data => {
                if (data && typeof data.count === 'number') {
                    visitorCountSpan.innerText = data.count.toLocaleString();
                } else {
                    visitorCountSpan.innerText = localViews.toLocaleString(); 
                }
            })
            .catch(err => {
                visitorCountSpan.innerText = localViews.toLocaleString(); 
                console.log('Counter API blocked or running locally, using local progression.');
            });
    }

});
