// ১. ড্রপডাউন ডেটা সেট করা (ইংরেজি অপশন)
const daySelect = document.getElementById('day');
for (let i = 1; i <= 31; i++) { daySelect.innerHTML += `<option value="${i}">${i}</option>`; }

const monthSelect = document.getElementById('month');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
months.forEach((m, i) => { monthSelect.innerHTML += `<option value="${i + 1}">${m}</option>`; });

const yearSelect = document.getElementById('year');
for (let i = 2004; i <= 2026; i++) { 
    let selected = i === 2008 ? "selected" : "";
    yearSelect.innerHTML += `<option value="${i}" ${selected}>${i}</option>`; 
}

// ২. লগইন লজিক
document.getElementById('login-btn').addEventListener('click', function() {
    // শর্ত: ২ মে ২০০৮ (Day=2, Month=5, Year=2008)
    if (daySelect.value === "2" && monthSelect.value === "5" && yearSelect.value === "2008") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('surprise-screen').style.display = 'flex';
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
});

// ৩. টাইপিং ইফেক্ট
const message = "শুভ জন্মদিন, মাইশা!\n\nপ্রিয় বেস্ট ফ্রেন্ড,\n\n২ মে মানে আজ তোর বিশেষ দিনে এই গরীবের পক্ষ থেকে ছোট্ট একটা উইশ+উপহার। দোয়া করি যেন তুই তোর জীবনের নেগেটিভ ভাইব্রেশনগুলো কে পজিটিভ ভাইব্রেশনে রূপান্তর করতে পারিস। আশা করি, সামনের বছরগুলো তোর জন্য আরও সুন্দর হবে।\n\nভালো থাক, সুস্থ থাক এবং সবসময় হাসি-খুশি থাক। এটুকুই চাই সবসময়;\n\nঅনেক ভালোবাসা রইলো।\n\nইতি,\nতোর জানোয়ার";

let index = 0;
function typeWriter() {
    if (index < message.length) {
        let char = message.charAt(index);
        document.getElementById('typewriter-text').innerHTML += char === "\n" ? "<br>" : char;
        index++;
        setTimeout(typeWriter, 50);
    }
}

document.getElementById('envelope').addEventListener('click', function() {
    if (!this.classList.contains('open')) {
        this.classList.add('open');
        setTimeout(typeWriter, 1000);
    }
});

// ৪. মাকড়সা জাল এনিমেশন (Interactive Spiderweb)
const canvas = document.getElementById('spiderweb-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: null, y: null, radius: 150 };

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
    

// টাইপিং ইফেক্টের জন্য ভেরিয়েবল
const textToType = [
    "শুভ জন্মদিন, মাইশা!",
    "প্রিয় বেস্ট ফ্রেন্ড,",
    "২ মে মানে আজ তোর বিশেষ দিনে এই গরীবের পক্ষ থেকে ছোট্ট একটা উইশ+উপহার। দোয়া করি যেন তুই তোর জীবনের নেগেটিভ ভাইব্রেশনগুলো কে পজিটিভ ভাইব্রেশনে রূপান্তর করতে পারিস। আশা করি, সামনের বছরগুলো তোর জন্য আরও সুন্দর হবে।",
    "ভালো থাক, সুস্থ থাক এবং সবসময় হাসি-খুশি থাক। এটুকুই চাই সবসময়;",
    "অনেক ভালোবাসা রইলো।",
    "ইতি,",
    "তোর জানোয়ার"
];

let lineIndex = 0;
let charIndex = 0;
const typingSpeed = 50; // টাইপিং গতি (মিলি-সেকেন্ডে)

function typeWriter() {
    if (lineIndex < textToType.length) {
        let currentLine = textToType[lineIndex];
        if (charIndex < currentLine.length) {
            // চিঠি অংশে লেখাগুলো একে একে যোগ করা
            document.querySelector('.letter .text').innerHTML += currentLine[charIndex];
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // একটি লাইন শেষ হলে নতুন লাইনে যাওয়া
            document.querySelector('.letter .text').innerHTML += "<br>";
            lineIndex++;
            charIndex = 0;
            setTimeout(typeWriter, typingSpeed + 500); // লাইনের মাঝে বিরতি
        }
    }
}

// চিঠি খোলার লজিক
document.getElementById('envelope').addEventListener('click', function() {
    this.classList.toggle('open');
});
            
