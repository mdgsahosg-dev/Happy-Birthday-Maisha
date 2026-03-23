// --- Firebase কনফিগারেশন ---
const firebaseConfig = {
    databaseURL: "https://maisha-birthday-default-rtdb.firebaseio.com/" 
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const bdayVideo = document.getElementById('birthday-video');

// ১. ড্রপডাউন সেট করা
const daySelect = document.getElementById('day');
daySelect.innerHTML = '<option value="" selected disabled>Date</option>'; 
for (let i = 1; i <= 31; i++) { daySelect.innerHTML += `<option value="${i}">${i}</option>`; }

const monthSelect = document.getElementById('month');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthSelect.innerHTML = '<option value="" selected disabled>Month</option>'; 
months.forEach((m, i) => { monthSelect.innerHTML += `<option value="${i + 1}">${m}</option>`; });

const yearSelect = document.getElementById('year');
yearSelect.innerHTML = '<option value="" selected disabled>Year</option>'; 
for (let i = 2004; i <= 2026; i++) { 
    let opt = document.createElement('option');
    opt.value = i; opt.innerHTML = i;
    yearSelect.appendChild(opt);
}

// --- নতুন যোগ করা কনফেটি ফাংশন ---
function celebrate() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d4d', '#00f2fe', '#f0f', '#fff', '#FFD700'], // তোমার থিমের সাথে নীল এবং সোনালী রঙ যোগ করা হয়েছে
        zIndex: 9999
    });
}

// ২. লগইন লজিক
document.getElementById('login-btn').addEventListener('click', function() {
    if (daySelect.value === "2" && monthSelect.value === "5" && yearSelect.value === "2008") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('surprise-screen').style.display = 'flex';
        if(bdayVideo) { bdayVideo.play().catch(e => console.log(e)); }
        loadComments(); 
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
});

// ৩. ভিডিও শেষ হলে অটোমেটিক স্ক্রল
if (bdayVideo) {
    bdayVideo.onended = function() {
        const envelopeWrapper = document.querySelector('.envelope-wrapper');
        if (envelopeWrapper) {
            envelopeWrapper.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

// ৪. টাইপিং এবং টগল (Toggle) ইফেক্ট + অটো-রিসেট
const message = "শুভ জন্মদিন, মাইশা!\n\nপ্রিয় বেস্টি, ২ মে মানে আজ তোর এই বিশেষ দিনে এই গরীবের পক্ষ থেকে ছোট্ট শুভেচ্ছাবার্তা+উপহার। দোয়া করি তোর জীবনের সকল দুঃখ কষ্ট আফসোস দূর হোক। দেখিস সামনের বছরগুলো তোর জন্য সুন্দর হবে।\n\nসুস্থ থাক এবং সবসময় হাসি-খুশি থাক।\n\nইতি,\nতোর জানোয়ার";

let index = 0;

function typeWriter() {
    const textElement = document.getElementById('typewriter-text');
    if (index < message.length) {
        let char = message.charAt(index);
        textElement.innerHTML += char === "\n" ? "<br>" : char;
        index++;
        setTimeout(typeWriter, 45);
        const letterDiv = document.querySelector('.letter');
        if (letterDiv) letterDiv.scrollTop = letterDiv.scrollHeight;
    }
}

// হার্টে ক্লিক করলে খাম খোলা বা বন্ধ করার লজিক (কনফেটি এখানে যোগ করা হয়েছে)
document.getElementById('envelope').addEventListener('click', function(e) {
    e.stopPropagation(); 
    
    const heart = this;
    const envelopeWrapper = this.parentElement; 
    const textElement = document.getElementById('typewriter-text');
    
    if (!envelopeWrapper.classList.contains('open')) {
        // খাম খোলা
        envelopeWrapper.classList.add('open');
        
        // --- কনফেটি ট্রিগার ---
        celebrate();
        
        // টাইপিং শুরু
        if (index === 0) {
            setTimeout(typeWriter, 1200); 
        }
        heart.style.animation = "none"; 
    } else {
        // খাম বন্ধ করা
        envelopeWrapper.classList.remove('open');
        
        // টাইপিং রিসেট
        setTimeout(() => {
            textElement.innerHTML = ""; 
            index = 0; 
        }, 700);

        heart.style.animation = "heart-beat 0.5s ease-in-out infinite"; 
        setTimeout(() => {
            heart.style.animation = "none"; 
        }, 2000);
    }
});

// ৫. রিয়েল-টাইম উইশ সিস্টেম
const sendBtn = document.getElementById('send-wish');
const commentsDiv = document.getElementById('comments-container');

if (sendBtn) {
    sendBtn.addEventListener('click', function() {
        const name = document.getElementById('guest-name').value;
        const msg = document.getElementById('guest-msg').value;
        if (name && msg) {
            database.ref('wishes').push().set({ username: name, message: msg, time: Date.now() });
            document.getElementById('guest-name').value = '';
            document.getElementById('guest-msg').value = '';
        } else {
            alert("নাম এবং উইশ দুটোই লেখো ভাই!");
        }
    });
}

function loadComments() {
    database.ref('wishes').on('value', (snapshot) => {
        if (commentsDiv) {
            commentsDiv.innerHTML = "";
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                commentsDiv.innerHTML += `
                    <div class="comment-entry" style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #0ff;">
                        <b style="color: #4facfe; font-size: 14px;">${data.username}</b>
                        <p style="margin: 5px 0 0; color: #ddd; font-size: 13px;">${data.message}</p>
                    </div>`;
            });
            commentsDiv.scrollTop = commentsDiv.scrollHeight;
        }
    });
}

// ৬. মাকড়সা জাল এনিমেশন (Spiderweb)
const canvas = document.getElementById('spiderweb-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: null, y: null, radius: 120 };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.baseX = x; this.baseY = y;
        this.size = 2; this.density = (Math.random() * 30) + 1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 5; this.y -= (dy / distance) * force * 5;
        } else {
            this.x -= (this.x - this.baseX) / 10;
            this.y -= (this.y - this.baseY) / 10;
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
        particles[i].draw(); particles[i].update();
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - (distance / 100)})`;
                ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
init(); animate();
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });
