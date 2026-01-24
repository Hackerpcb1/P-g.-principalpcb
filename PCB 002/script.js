// ===== NAVIGATION MENU TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== HEADER SHADOW ON SCROLL =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== TALLER CARDS ANIMATION =====
const tallerCards = document.querySelectorAll('.taller__card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

tallerCards.forEach(card => {
    cardObserver.observe(card);
});

// ===== TESTIMONIOS ANIMATION =====
const testimonioCards = document.querySelectorAll('.testimonio__card');

const testimonioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 100);
            testimonioObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

testimonioCards.forEach(card => {
    testimonioObserver.observe(card);
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (you can customize this)
        showNotification('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showNotification('¡Mensaje enviado exitosamente!', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showNotification('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        // });
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <p>${message}</p>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification__content p {
        margin: 0;
    }
`;
document.head.appendChild(style);

// ===== TALLER CARDS MORE INFO BUTTONS =====
const tallerButtons = document.querySelectorAll('.taller__card .btn--outline');

tallerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.taller__card');
        const tallerName = card.querySelector('.taller__title').textContent;
        
        showNotification(`Para más información sobre ${tallerName}, por favor contáctanos usando el formulario abajo.`, 'info');
        
        // Scroll to contact section
        const contactSection = document.getElementById('contacto');
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Pre-select the taller in the form
        const tallerSelect = document.querySelector('.contact__form select');
        if (tallerSelect) {
            const tallerValue = card.getAttribute('data-taller');
            tallerSelect.value = tallerValue;
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.about__content, .about__features, .contact__info, .contact__form');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ===== COUNTER ANIMATION FOR STATS =====
const stats = document.querySelectorAll('.stat__number');

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const number = parseInt(target.replace(/\D/g, ''));
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ===== LOGIN MODAL =====
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const loginClose = document.querySelector('.modal__close');
const loginForm = document.getElementById('login-form');

// Open modal
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
}

// Close modal
if (loginClose) {
    loginClose.addEventListener('click', () => {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!username || !password) {
            showNotification('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Simulate login (in a real app, this would be an API call)
        showNotification('¡Inicio de sesión exitoso! Bienvenido.', 'success');

        // Close modal and reset form
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginForm.reset();
    });
}

// ===== CALENDARIO FUNCTIONALITY =====
class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.events = this.getSchoolEvents();
        this.init();
    }

    init() {
        this.renderCalendar();
        this.attachEventListeners();
    }

    getSchoolEvents() {
        // School events for 2024-2025
        return {
            // August 2024
            '2024-08-08': [
                {
                    title: 'Inicio del Curso Escolar',
                    type: 'activity',
                    description: 'Inicio del curso escolar. Mes de la Historia Deportiva Puertorriqueña (Ley 173-2019)',
                    time: '8:00 AM',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-08-11': [
                {
                    title: 'Preparación y Ambientación de Salones',
                    type: 'activity',
                    description: 'Preparación y ambientación de salones para el inicio del año escolar',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-08-12': [
                {
                    title: 'Casa Abierta',
                    type: 'activity',
                    description: 'Casa Abierta – Conectando con la comunidad',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-08-13': [
                {
                    title: 'Comienzo de Clases',
                    type: 'activity',
                    description: 'Comienzo de clases para estudiantes. Día de la Historia Deportiva Puertorriqueña',
                    time: '8:00 AM',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-08-18': [
                {
                    title: 'Día de Roberto Clemente Walker',
                    type: 'activity',
                    description: 'Día de Roberto Clemente Walker (Ley 36-2022)',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-08-29': [
                {
                    title: 'Fecha para Fijar Matrícula',
                    type: 'activity',
                    description: 'Fecha para fijar matrícula (M-1)',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],

            // September 2024
            '2024-09-01': [
                {
                    title: 'Día del Trabajo',
                    type: 'holiday',
                    description: 'Día del Trabajo (feriado)',
                    time: 'Todo el día',
                    location: 'Todo Puerto Rico'
                }
            ],
            '2024-09-06': [
                {
                    title: 'Concienciación del Daltonismo',
                    type: 'activity',
                    description: 'Concienciación del Daltonismo (Ley 9-2023)',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-09-17': [
                {
                    title: 'Conmemoración de la Constitución de EE.UU.',
                    type: 'activity',
                    description: 'Conmemoración de la Constitución de EE.UU.',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-09-24': [
                {
                    title: 'Simulacro de Tsunami',
                    type: 'activity',
                    description: 'Simulacro de tsunami',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-09-29': [
                {
                    title: 'Concienciación sobre Desperdicio de Alimentos',
                    type: 'activity',
                    description: 'Concienciación sobre desperdicio de alimentos y aniversario del hit 3,000 de Roberto Clemente',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-09-30': [
                {
                    title: 'Aniversario Hit 3,000 de Roberto Clemente',
                    type: 'activity',
                    description: 'Aniversario del hit 3,000 de Roberto Clemente',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],

            // October 2024
            '2024-10-01': [
                {
                    title: 'Día Internacional de la Música',
                    type: 'activity',
                    description: 'Día Internacional de la Música',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-06': [
                {
                    title: 'Semana del Programa de Ciencias',
                    type: 'activity',
                    description: 'Inicio de la Semana del Programa de Ciencias',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-07': [
                {
                    title: 'Días Dedicados al Adulto Mayor',
                    type: 'activity',
                    description: 'Días dedicados al adulto mayor, educación física y salud mental',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-08': [
                {
                    title: 'Días Dedicados al Adulto Mayor',
                    type: 'activity',
                    description: 'Días dedicados al adulto mayor, educación física y salud mental',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-09': [
                {
                    title: 'Días Dedicados al Adulto Mayor',
                    type: 'activity',
                    description: 'Días dedicados al adulto mayor, educación física y salud mental',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-10': [
                {
                    title: 'Días Dedicados al Adulto Mayor',
                    type: 'activity',
                    description: 'Días dedicados al adulto mayor, educación física y salud mental',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-13': [
                {
                    title: 'Día de la Raza',
                    type: 'holiday',
                    description: 'Día de la Raza (feriado)',
                    time: 'Todo el día',
                    location: 'Todo Puerto Rico'
                }
            ],
            '2024-10-15': [
                {
                    title: 'Cooperativismo Juvenil y Día de los Estadísticos',
                    type: 'activity',
                    description: 'Cooperativismo Juvenil y Día de los Estadísticos',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-20': [
                {
                    title: 'Semana del Trabajador Social Escolar',
                    type: 'activity',
                    description: 'Inicio de la Semana del Trabajador Social Escolar',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-27': [
                {
                    title: 'Semana Bilingüe',
                    type: 'activity',
                    description: 'Inicio de la Semana Bilingüe',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-10-29': [
                {
                    title: 'Simulacro de Emanaciones de Gas',
                    type: 'activity',
                    description: 'Simulacro de emanaciones de gas',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],

            // November 2024
            '2024-11-01': [
                {
                    title: 'Mes de la Educación Especial',
                    type: 'activity',
                    description: 'Mes de la Educación Especial, Lectura y Participación Familiar',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-11-03': [
                {
                    title: 'Semana Nacional de Psicología Escolar',
                    type: 'activity',
                    description: 'Inicio de la Semana Nacional de Psicología Escolar',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-11-11': [
                {
                    title: 'Día del Veterano',
                    type: 'holiday',
                    description: 'Día del Veterano (feriado)',
                    time: 'Todo el día',
                    location: 'Todo Puerto Rico'
                }
            ],
            '2024-11-12': [
                {
                    title: 'Días del Escritor Puertorriqueño',
                    type: 'activity',
                    description: 'Días del Escritor Puertorriqueño y de los Puertorriqueños en las Ciencias',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-11-13': [
                {
                    title: 'Días del Escritor Puertorriqueño',
                    type: 'activity',
                    description: 'Días del Escritor Puertorriqueño y de los Puertorriqueños en las Ciencias',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-11-14': [
                {
                    title: 'Días del Escritor Puertorriqueño',
                    type: 'activity',
                    description: 'Días del Escritor Puertorriqueño y de los Puertorriqueños en las Ciencias',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-11-17': [
                {
                    title: 'Fiesta de la Puertorriqueñidad',
                    type: 'activity',
                    description: 'Inicio de la Fiesta de la Puertorriqueñidad',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-11-19': [
                {
                    title: 'Descubrimiento de Puerto Rico',
                    type: 'holiday',
                    description: 'Descubrimiento de Puerto Rico (feriado)',
                    time: 'Todo el día',
                    location: 'Todo Puerto Rico'
                }
            ],
            '2024-11-20': [
                {
                    title: 'Simulacro de Tirador Activo',
                    type: 'activity',
                    description: 'Simulacro de tirador activo',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-11-27': [
                {
                    title: 'Día de Acción de Gracias',
                    type: 'holiday',
                    description: 'Día de Acción de Gracias y receso académico',
                    time: 'Todo el día',
                    location: 'Todo Puerto Rico'
                }
            ],
            '2024-11-28': [
                {
                    title: 'Receso Académico',
                    type: 'activity',
                    description: 'Receso académico por Día de Acción de Gracias',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-11-30': [
                {
                    title: 'Día contra los Trastornos Alimentarios',
                    type: 'activity',
                    description: 'Día contra los Trastornos Alimentarios',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],

            // December 2024
            '2024-12-01': [
                {
                    title: 'Semana de Tecnología Educativa',
                    type: 'activity',
                    description: 'Inicio de la Semana de Tecnología Educativa',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-12-11': [
                {
                    title: 'Semana del Pintor Puertorriqueño',
                    type: 'activity',
                    description: 'Inicio de la Semana del Pintor Puertorriqueño',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-12-12': [
                {
                    title: 'Concurso Puertorriqueño de Deletreo',
                    type: 'activity',
                    description: 'Concurso Puertorriqueño de Deletreo',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-12-17': [
                {
                    title: 'Evaluaciones Finales',
                    type: 'exam',
                    description: 'Evaluaciones finales',
                    time: '8:00 AM - 2:30 PM',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-12-18': [
                {
                    title: 'Evaluaciones Finales',
                    type: 'exam',
                    description: 'Evaluaciones finales',
                    time: '8:00 AM - 2:30 PM',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-12-19': [
                {
                    title: 'Certamen Alas para un Escritor',
                    type: 'activity',
                    description: 'Certamen Alas para un Escritor',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-12-22': [
                {
                    title: 'Finalizan Cursos de 0.5 Créditos',
                    type: 'activity',
                    description: 'Finalizan cursos de .5 créditos',
                    time: 'Todo el día',
                    location: 'Escuela Pablo Colón Berdecía'
                }
            ],
            '2024-12-25': [
                {
                    title: 'Navidad',
                    type: 'holiday',
                    description: 'Navidad (feriado)',
                    time: 'Todo el día',
                    location: 'Todo Puerto Rico'
                }
            ]
        };

    renderCalendar() {
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const monthYearElement = document.getElementById('current-month-year');
        if (monthYearElement) {
            monthYearElement.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        }

        const calendarGrid = document.querySelector('.calendario__grid');
        if (!calendarGrid) return;

        // Clear existing days (keep headers)
        const existingDays = calendarGrid.querySelectorAll('.calendario__day');
        existingDays.forEach(day => day.remove());

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendario__day';

            if (currentDate.getMonth() !== month) {
                dayElement.classList.add('calendario__day--other-month');
            }

            if (currentDate.getTime() === today.getTime()) {
                dayElement.classList.add('calendario__day--today');
            }

            const dayNumber = document.createElement('span');
            dayNumber.className = 'calendario__day-number';
            dayNumber.textContent = currentDate.getDate();
            dayElement.appendChild(dayNumber);

            // Add events for this day
            const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
            const dayEvents = this.events[dateKey];

            if (dayEvents) {
                dayEvents.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = `calendario__event calendario__event--${event.type}`;
                    eventElement.textContent = event.title;
                    eventElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.showEventDetails(event, currentDate);
                    });
                    dayElement.appendChild(eventElement);
                });
            }

            calendarGrid.appendChild(dayElement);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    attachEventListeners() 
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');
        const eventModal = document.getElementById('event-modal');
        const eventModalClose = document.querySelector('.event-modal__close');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
                this.clearPanel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
                this.clearPanel();
            });
        }

        if (eventModalClose) {
            eventModalClose.addEventListener('click', () => {
                eventModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                eventModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Add click listeners to calendar days
        this.attachDayClickListeners();
    }

    attachDayClickListeners() {
        const calendarGrid = document.querySelector('.calendario__grid');
        if (calendarGrid) {
            calendarGrid.addEventListener('click', (e) => {
                const dayElement = e.target.closest('.calendario__day');
                if (dayElement && !e.target.classList.contains('calendario__event')) {
                    const dayNumber = dayElement.querySelector('.calendario__day-number');
                    if (dayNumber) {
                        const day = parseInt(dayNumber.textContent);
                        const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
                        this.showDayEvents(date);
                    }
                }
            });
        }
    }

    clearPanel() {
        const panelDate = document.getElementById('panel-date');
        const panelContent = document.getElementById('panel-content');

        if (panelDate) {
            panelDate.textContent = 'Selecciona un día';
        }

        if (panelContent) {
            panelContent.innerHTML = `
                <div class="calendario__panel-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <p>Haz clic en un día del calendario para ver los eventos</p>
                </div>
            `;
        }
    }

    showDayEvents(date) {
        const panelDate = document.getElementById('panel-date');
        const panelContent = document.getElementById('panel-content');

        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const dayEvents = this.events[dateKey];

        if (panelDate) {
            panelDate.textContent = `${date.getDate()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
        }

        if (panelContent) {
            if (dayEvents && dayEvents.length > 0) {
                const eventsHtml = dayEvents.map(event => `
                    <div class="calendario__panel-event calendario__panel-event--${event.type}" onclick="window.calendar.showEventDetails(${JSON.stringify(event).replace(/"/g, '"')}, new Date(${date.getTime()}))">
                        <div class="calendario__panel-event-title">${event.title}</div>
                        <div class="calendario__panel-event-time">${event.time}</div>
                        <div class="calendario__panel-event-description">${event.description}</div>
                        <div class="calendario__panel-event-location">${event.location}</div>
                    </div>
                `).join('');

                panelContent.innerHTML = `<div class="calendario__day-events">${eventsHtml}</div>`;
            } else {
                panelContent.innerHTML = `
                    <div class="calendario__panel-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <p>No hay eventos programados para este día</p>
                    </div>
                `;
            }
        }
    }

    showEventDetails(event, date) {
        const eventModal = document.getElementById('event-modal');
        const eventTitle = document.getElementById('event-title');
        const eventDate = document.getElementById('event-date');
        const eventTime = document.getElementById('event-time');
        const eventDescription = document.getElementById('event-description');
        const eventLocation = document.getElementById('event-location');

        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        eventTitle.textContent = event.title;
        eventDate.textContent = `${date.getDate()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
        eventTime.textContent = event.time;
        eventDescription.textContent = event.description;
        eventLocation.textContent = event.location;

        eventModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Initialize calendar if on calendar page
if (document.querySelector('.calendario')) {
    window.calendar = new Calendar();
}

// ===== INITIALIZE =====
console.log('Escuela Pablo Colón Berdecía - Website loaded successfully!');
