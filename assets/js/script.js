AOS.init({
    duration: 1000,
    offset: 50,
    mirror: true, 
    once: false
});

var typed = new Typed('.typing-text', {
    strings: ["Software Engineer", "ICT Mentor", "GenAI Enthusiast"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const particleColor = 'rgba(59, 130, 246, 1)'; 

const mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
        for (let i = 0; i < 2; i++) {
        particlesArray.push(new Particle());
    }
});

window.addEventListener('mousedown', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
        for (let i = 0; i < 15; i++) {
        particlesArray.push(new Particle());
    }
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = particleColor;
        this.opacity = 1;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1; 
        this.opacity -= 0.02; 
    }
    draw(){
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; 
    }
}

function animateParticles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        
        if (particlesArray[i].size <= 0.3 || particlesArray[i].opacity <= 0){
            particlesArray.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

animateParticles();

const statCards = document.querySelectorAll('.stat-card');

function createExplosion(card) {
    const particleCount = 30; 
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const colors = [primaryColor, '#ffffff', '#94a3b8']; 

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('confetti-particle');
        card.appendChild(particle);

        const startX = card.offsetWidth / 2 + (Math.random() * 20 - 10);
        const startY = card.offsetHeight / 2 + (Math.random() * 20 - 10);
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        const angle = Math.random() * Math.PI * 2; 
        const distance = 50 + Math.random() * 80; 
        const destinationX = Math.cos(angle) * distance;
        const destinationY = Math.sin(angle) * distance;

        const animation = particle.animate([
            {
                transform: `translate(0, 0) scale(1) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(${destinationX}px, ${destinationY}px) scale(0) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 800 + Math.random() * 400, 
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)', 
            fill: 'forwards'
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }
}

statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        createExplosion(card);
    });
});