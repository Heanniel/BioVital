// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const modal = document.getElementById('appointmentModal');
const appointmentForm = document.getElementById('appointmentForm');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupSpecialtyCards();
    setupForms();
    setupModal();
    setupAnimations();
    setupAccessibility();
    setupCarousel();
}

// Navigation Setup
function setupNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function setupScrollEffects() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Header shadow on scroll
        if (currentScroll > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Specialty Cards Interaction
function setupSpecialtyCards() {
    const specialtyCards = document.querySelectorAll('.specialty-card');
    
    specialtyCards.forEach(card => {
        card.addEventListener('click', function() {
            const specialty = this.dataset.specialty;
            showSpecialtyInfo(specialty);
        });
        
        // Add hover effect with sound (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// Show Specialty Information
function showSpecialtyInfo(specialty) {
    const specialtyInfo = {
        general: {
            title: 'Medicina General',
            description: 'Atención integral para adultos y niños, diagnóstico y tratamiento de enfermedades comunes.',
            services: ['Consulta general', 'Chequeos preventivos', 'Vacunación', 'Exámenes de rutina']
        },
        cardiologia: {
            title: 'Cardiología',
            description: 'Especializada en el diagnóstico y tratamiento de enfermedades del corazón y sistema circulatorio.',
            services: ['Electrocardiograma', 'Ecocardiograma', 'Prueba de esfuerzo', 'Cateterismo cardíaco']
        },
        neumonologia: {
            title: 'Neumonología',
            description: 'Tratamiento de enfermedades respiratorias y pulmonares.',
            services: ['Espirometría', 'Broncoscopía', 'Pruebas de alergia', 'Tratamiento del asma']
        },
        psicologia: {
            title: 'Psicología',
            description: 'Apoyo emocional y mental para mejorar tu bienestar.',
            services: ['Terapia individual', 'Terapia de pareja', 'Psicoterapia', 'Evaluación psicológica']
        },
        pediatria: {
            title: 'Pediatría',
            description: 'Cuidado especializado para niños desde el nacimiento hasta la adolescencia.',
            services: ['Control de crecimiento', 'Vacunación infantil', 'Chequeos pediátricos', 'Urgencias pediátricas']
        }
    };
    
    const info = specialtyInfo[specialty];
    if (info) {
        // Create modal with specialty info
        createSpecialtyModal(info);
    }
}

// Create Specialty Modal
function createSpecialtyModal(info) {
    const modalHtml = `
        <div class="modal" id="specialtyModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeSpecialtyModal()">&times;</span>
                <h3 class="modal-title">${info.title}</h3>
                <p>${info.description}</p>
                <h4>Servicios:</h4>
                <ul>
                    ${info.services.map(service => `<li>${service}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Remove existing specialty modal if any
    const existingModal = document.getElementById('specialtyModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Close Specialty Modal
function closeSpecialtyModal() {
    const modal = document.getElementById('specialtyModal');
    if (modal) {
        modal.remove();
    }
}

// Modal Functions
function setupModal() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeSpecialtyModal();
        }
    });
}

function openAppointmentModal(role) {
    // Redirect to appointment page instead of showing modal
    window.location.href = 'agendar_cita.html';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    if (appointmentForm) {
        appointmentForm.reset();
    }
}

// Form Setup
function setupForms() {
    // Appointment form
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // Form validation
    setupFormValidation();
}

// Handle Login Form Submit
function handleLoginSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando...';
    btn.disabled = true;

    const formData = new FormData(e.target);
    
    // We send an AJAX request to the PHP backend
    fetch('controlador/LoginController.php', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // El controlador de PHP devuelve la ruta como '../vista/...' 
            // pero estamos ejecutando JS desde la raíz (login.html)
            let redirectUrl = data.redirect;
            if(redirectUrl.startsWith('../')) {
                redirectUrl = redirectUrl.substring(3); // quitamos '../'
            }
            window.location.href = redirectUrl;
        } else {
            alert(data.error || 'Usuario o contraseña incorrectos.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

// Handle Register Form Submit
function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const pass = document.getElementById('pass').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    
    if(pass !== confirmPass) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
    btn.disabled = true;

    const formData = new FormData(e.target);
    const msgDiv = document.getElementById('registerMessage');
    
    fetch('controlador/RegistroPacienteController.php', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        msgDiv.style.display = 'block';
        if (data.success) {
            msgDiv.style.backgroundColor = '#d1fae5'; // success green
            msgDiv.style.color = '#065f46';
            msgDiv.style.border = '1px solid #10b981';
            msgDiv.textContent = data.message;
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            msgDiv.style.backgroundColor = '#fee2e2'; // error red
            msgDiv.style.color = '#991b1b';
            msgDiv.style.border = '1px solid #ef4444';
            msgDiv.textContent = data.message || 'Error al registrar';
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        msgDiv.style.display = 'block';
        msgDiv.style.backgroundColor = '#fee2e2';
        msgDiv.style.color = '#991b1b';
        msgDiv.style.border = '1px solid #ef4444';
        msgDiv.textContent = 'Error de conexión con el servidor.';
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

// Handle Appointment Form Submit

// Form Validation
function setupFormValidation() {
    // Phone number validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+\s-]/g, '');
        });
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateEmail(this);
        });
    });
}

function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value && !emailRegex.test(input.value)) {
        input.style.borderColor = 'var(--error-color)';
        showError(input, 'Por favor, ingresa un email válido');
    } else {
        input.style.borderColor = 'var(--border-color)';
        clearError(input);
    }
}

function showError(input, message) {
    clearError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--error-color)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    input.parentNode.appendChild(errorDiv);
}

function clearError(input) {
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Success Message
function showSuccessMessage(message) {
    successText.textContent = message;
    successMessage.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Show Map
function showMap(location) {
    const locations = {
        'caracas': 'https://maps.google.com/?q=Caracas,Venezuela',
        'caracas-este': 'https://maps.google.com/?q=Caracas+Este,Venezuela',
        'maracaibo': 'https://maps.google.com/?q=Maracaibo,Zulia,Venezuela'
    };
    
    const mapUrl = locations[location];
    if (mapUrl) {
        window.open(mapUrl, '_blank');
    }
}

// Animations on Scroll
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-container, .appointment-container, .locations-container, .contact-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Accessibility
function setupAccessibility() {
    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = 'position: absolute; top: -40px; left: 6px; background: var(--primary-color); color: white; padding: 8px; text-decoration: none; border-radius: 4px; z-index: 10000;';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Show skip link when focused
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    // Add ARIA labels to interactive elements
    document.querySelectorAll('.specialty-card').forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Ver información de ${card.querySelector('.specialty-name').textContent}`);
        
        // Keyboard navigation
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Add loading states
    setupLoadingStates();
}

// Loading States
function setupLoadingStates() {
    const buttons = document.querySelectorAll('.submit-btn, .role-btn, .location-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.disabled = true;
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
                
                // Remove loading state after 2 seconds (simulate processing)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });
}

// Theme Toggle (Bonus feature)
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: var(--primary-color); color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; box-shadow: var(--shadow-lg); z-index: 1000; transition: var(--transition);';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Carousel Setup
function setupCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    // Update carousel position
    function updateCarousel() {
        const viewportWidth = window.innerWidth;
        track.style.transform = `translateX(-${currentSlide * viewportWidth}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Auto play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left, go to next
            } else {
                prevSlide(); // Swipe right, go to previous
            }
        }
    }
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
    
    // Window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
    
    // Initialize
    updateCarousel();
    startAutoPlay();
    
    // Pause when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoPlayInterval);
        } else {
            startAutoPlay();
        }
    });
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        
        // Add error handling
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x200/f3f4f6/6b7280?text=Imagen+no+disponible';
        });
    });
}

// Initialize optimizations
optimizeImages();

// Add dark theme styles (bonus)
const darkThemeStyles = `
    .dark-theme {
        --bg-white: #1f2937;
        --bg-light: #111827;
        --text-dark: #f9fafb;
        --text-light: #d1d5db;
        --border-color: #374151;
        --primary-color: #3b82f6;
        --secondary-color: #60a5fa;
        --fog-gray: #9ca3af;
        --light-fog: #e5e7eb;
    }
    
    .dark-theme .header {
        background: rgba(31, 41, 55, 0.95);
    }
    
    .dark-theme .hero-background::after {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(96, 165, 250, 0.6));
    }
    
    .dark-theme .specialty-card {
        background: rgba(156, 163, 175, 0.1);
        border-color: rgba(156, 163, 175, 0.2);
    }
    
    .dark-theme .specialty-card:hover {
        background: rgba(156, 163, 175, 0.2);
        border-color: rgba(156, 163, 175, 0.4);
    }
    
    .dark-theme .role-btn {
        background: rgba(156, 163, 175, 0.1);
        border-color: rgba(156, 163, 175, 0.3);
    }
    
    .dark-theme .role-btn:hover {
        background: rgba(156, 163, 175, 0.2);
        border-color: rgba(156, 163, 175, 0.5);
    }
    
    .dark-theme .location-card {
        background: rgba(156, 163, 175, 0.05);
        border-color: rgba(156, 163, 175, 0.2);
    }
    
    .dark-theme .location-card:hover {
        border-color: var(--primary-color);
    }
    
    .dark-theme .modal-content {
        background: #1f2937;
        border: 1px solid rgba(156, 163, 175, 0.2);
    }
    
    .dark-theme .carousel-btn {
        background: rgba(156, 163, 175, 0.9);
        color: var(--text-dark);
    }
    
    .dark-theme .carousel-btn:hover {
        background: var(--fog-gray);
    }
    
    .dark-theme .indicator {
        background: rgba(156, 163, 175, 0.8);
        border-color: var(--primary-color);
    }
    
    .dark-theme .indicator.active {
        background: var(--primary-color);
    }
    
    .dark-theme .form-group input,
    .dark-theme .form-group textarea,
    .dark-theme .form-group select {
        background: rgba(156, 163, 175, 0.1);
        border-color: rgba(156, 163, 175, 0.3);
        color: var(--text-dark);
    }
    
    .dark-theme .form-group input:focus,
    .dark-theme .form-group textarea:focus,
    .dark-theme .form-group select:focus {
        border-color: var(--primary-color);
        background: rgba(156, 163, 175, 0.15);
    }
    
    .dark-theme .form-group input::placeholder,
    .dark-theme .form-group textarea::placeholder {
        color: var(--text-light);
    }
    
    .dark-theme .submit-btn {
        background: var(--primary-color);
        color: var(--text-dark);
    }
    
    .dark-theme .submit-btn:hover {
        background: var(--secondary-color);
    }
    
    .dark-theme .footer {
        background: #1f2937;
        border-top: 1px solid rgba(156, 163, 175, 0.2);
    }
    
    .dark-theme .footer-section h4 {
        color: var(--fog-gray);
    }
    
    .dark-theme .footer-section a {
        color: rgba(156, 163, 175, 0.8);
    }
    
    .dark-theme .footer-section a:hover {
        color: var(--accent-color);
    }
    
    .dark-theme .footer-section i {
        color: var(--fog-gray);
    }
    
    .dark-theme .footer-social h4 {
        color: var(--fog-gray);
    }
    
    .dark-theme .social-icons a {
        background: rgba(156, 163, 175, 0.1);
        color: var(--fog-gray);
    }
    
    .dark-theme .social-icons a:hover {
        background: var(--accent-color);
        color: var(--text-dark);
    }
    
    .dark-theme .footer-bottom {
        border-top: 1px solid rgba(156, 163, 175, 0.2);
        color: rgba(156, 163, 175, 0.6);
    }
`;

// Add dark theme styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = darkThemeStyles;
document.head.appendChild(styleSheet);

// Initialize theme toggle
setupThemeToggle();

// Console log for debugging
console.log('BioVital Medical Consultancy System initialized successfully!');
console.log('// Features: Responsive design, accessibility, animations, form validation, modal system, theme toggle');

// Service Worker registration (for PWA capability)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
