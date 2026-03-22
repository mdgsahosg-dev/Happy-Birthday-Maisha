// ১. ড্রপডাউন সেট করা
const daySelect = document.getElementById('day');
daySelect.innerHTML = '<option value="" selected disabled>Date</option>'; 
for (let i = 1; i <= 31; i++) { 
    daySelect.innerHTML += `<option value="${i}">${i}</option>`; 
}

const monthSelect = document.getElementById('month');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthSelect.innerHTML = '<option value="" selected disabled>Month</option>'; 
months.forEach((m, i) => { 
    monthSelect.innerHTML += `<option value="${i + 1}">${m}</option>`; 
});

const yearSelect = document.getElementById('year');
// শুরুতে "Year" অপশনটি সেট করা
yearSelect.innerHTML = '<option value="" selected disabled>Year</option>'; 
// সালগুলো যুক্ত করার লুপ (সংশোধিত পদ্ধতি)
for (let i = 2004; i <= 2026; i++) { 
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    yearSelect.appendChild(opt);
}

// ২. লগইন লজিক
document.getElementById('login-btn').addEventListener('click', function() {
    // সঠিক তারিখ ২ মে ২০০৮
    if (daySelect.value === "2" && monthSelect.value === "5" && yearSelect.value === "2008") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('surprise-screen').style.display = 'flex';
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
});

// ৩. টাইপিং ইফেক্ট
const message = "শুভ জন্মদিন, মাইশা!\n\nপ্রিয় বেস্ট ফ্রেন্ড, ২ মে আজ তোর বিশেষ দিনে এই গরীবের পক্ষ থেকে ছোট্ট উইশ। দোয়া করি তোর জীবনের নেগেটিভ ভাইব্রেশনগুলো পজিটিভ হোক। সামনের বছরগুলো তোর জন্য সুন্দর হবে।\n\nসুস্থ থাক এবং সবসময় হাসি-খুশি থাক।\n\nইতি,\nতোর জানোয়ার";

let index = 0;
function typeWriter() {
    const textElement = document.getElementById('typewriter-text');
    if (index < message.length) {
        let char = message.charAt(index);
        textElement.innerHTML += char === "\n" ? "<br>" : char;
        index++;
        setTimeout(typeWriter, 40);
        
        const letterDiv = document.querySelector('.letter');
        letterDiv.scrollTop = letterDiv.scrollHeight;
    }
}

document.getElementById('envelope').addEventListener('click', function() {
    if (!this.classList.contains('open')) {
        this.classList.add('open');
        setTimeout(typeWriter, 1000);
    }
});

// ৪. মাকড়সা জাল এনিমেশন
const canvas = document.getElementById('spiderweb-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: null, y: null, radius: 120 };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('touchmove', (e) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; });

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.baseX = x; this.baseY = y;
        this.size = 2;
        this.density = (Math.random() * 30) + 1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            let forceX = dx / distance;
            let forceY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceX * force * 5; this.y -= forceY * force * 5;
        } else {
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
        }
    }
}

function init() {
    particles = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - (distance / 100)})`;
                ctx.lineWidth = 1; ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

init(); animate();
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });
        
