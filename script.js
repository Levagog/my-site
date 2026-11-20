// --- Переключатель темы ---
const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

themeSwitch.addEventListener('click', () => {
    body.classList.toggle('light');
    themeSwitch.textContent = body.classList.contains('light') ? '☀️' : '🌙';
});

// --- Бургер-меню ---
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- Анимация появления при скролле ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
});

document.querySelectorAll('.card, .section h2').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
});

// --- Плавный скролл ---
document.querySelectorAll('nav a, .hero a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('active');
        }
    });
});

// --- Форма связи (имитация отправки) ---
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = '⏳ Отправка...';
    setTimeout(() => {
        status.textContent = '✅ Сообщение отправлено! Я свяжусь с вами.';
        this.reset();
    }, 1500);
});

// --- Секретный режим (Матрица) ---
const matrixBtn = document.getElementById('matrixBtn');
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let matrixInterval;
let isMatrixActive = false;

function startMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
    const columns = canvas.width / 20;
    const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = 1;

    matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = '20px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }, 33);
}

matrixBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isMatrixActive = !isMatrixActive;
    if (isMatrixActive) {
        body.classList.add('matrix-mode');
        canvas.style.opacity = '1';
        startMatrix();
    } else {
        body.classList.remove('matrix-mode');
        canvas.style.opacity = '0';
        clearInterval(matrixInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});