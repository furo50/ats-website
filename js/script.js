// ========================
// NAVBAR
// ========================

const navbar = document.querySelector('.navbar');
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

// Scrolled Effekt
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Burger Menu
burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Menu schließen wenn man einen Link klickt
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ========================
// SCROLL ANIMATIONEN
// ========================

const animateElements = document.querySelectorAll('.leistung-item, .ueber-card, .kontakt-info, .kontakt-form');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Karten nacheinander einblenden mit Verzögerung
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 120);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => observer.observe(el));

// ========================
// EMAILJS INIT
// ========================

emailjs.init('3vkhAg4R-mdLZjqWz');

// ========================
// KONTAKT FORMULAR
// ========================

const form = document.querySelector('.kontakt-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-primary');
    const inputs = form.querySelectorAll('input, textarea');

    const templateParams = {
        from_name: form.querySelector('input[type="text"]').value,
        from_email: form.querySelector('input[type="email"]').value,
        subject: form.querySelectorAll('input[type="text"]')[1].value,
        message: form.querySelector('textarea').value
    };

    // Button Zustand ändern
    btn.textContent = 'Wird gesendet...';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';

    emailjs.send('service_b9li30q', 'template_9qb2m2i', templateParams)
        .then(() => {
            btn.textContent = '✓ Nachricht gesendet!';
            btn.style.opacity = '1';
            btn.style.background = '#16a34a';
            btn.style.borderColor = '#16a34a';

            inputs.forEach(input => input.value = '');

            setTimeout(() => {
                btn.textContent = 'Nachricht senden';
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.pointerEvents = '';
            }, 3000);
        })
        .catch((error) => {
            console.error('EmailJS Fehler:', error);
            btn.textContent = '✗ Fehler beim Senden';
            btn.style.opacity = '1';
            btn.style.background = '#dc2626';
            btn.style.pointerEvents = '';

            setTimeout(() => {
                btn.textContent = 'Nachricht senden';
                btn.style.background = '';
            }, 3000);
        });
});

// ========================
// LEISTUNGEN ACCORDION
// ========================

const leistungItems = document.querySelectorAll('.leistung-item');

leistungItems.forEach(item => {
    item.addEventListener('click', () => {
        leistungItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// ========================
// NAVBAR ACTIVE LINK
// ========================

const navLinks2 = document.querySelectorAll('.nav-links a');

navLinks2.forEach(link => {
    link.addEventListener('click', () => {
        navLinks2.forEach(l => l.classList.remove('nav-active'));
        link.classList.add('nav-active');
    });
});