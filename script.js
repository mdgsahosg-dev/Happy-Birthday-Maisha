// ১. ড্রপডাউন সেট করা
const daySelect = document.getElementById('day');
daySelect.innerHTML = '<option value="">Date</option>'; // শুরুতে Date লেখা থাকবে
for (let i = 1; i <= 31; i++) { daySelect.innerHTML += `<option value="${i}">${i}</option>`; }

const monthSelect = document.getElementById('month');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthSelect.innerHTML = '<option value="">Month</option>'; // শুরুতে Month লেখা থাকবে
months.forEach((m, i) => { monthSelect.innerHTML += `<option value="${i + 1}">${m}</option>`; });

const yearSelect = document.getElementById('year');
yearSelect.innerHTML = '<option value="">Year</option>'; // তোমার চাহিদা অনুযায়ী এখানে Year যোগ করা হলো
for (let i = 2004; i <= 2026; i++) { 
    yearSelect.innerHTML += `<option value="${i}">${i}</option>`; 
}

// ২. লগইন লজিক (২ মে ২০০৮)
document.getElementById('login-btn').addEventListener('click', function() {
    if (daySelect.value === "2" && monthSelect.value === "5" && yearSelect.value === "2008") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('surprise-screen').style.display = 'flex';
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
});

// ৩. টাইপিং ইফেক্ট (মোবাইলের জন্য সাজানো মেসেজ)
const message = "শুভ জন্মদিন, মাইশা!\n\nপ্রিয় বেস্ট ফ্রেন্ড, ২ মে আজ তোর বিশেষ দিনে এই গরীবের পক্ষ থেকে ছোট্ট উইশ। দোয়া করি তোর জীবনের নেগেটিভ ভাইব্রেশনগুলো পজিটিভ হোক। সামনের বছরগুলো তোর জন্য সুন্দর হবে।\n\nসুস্থ থাক এবং সবসময় হাসি-খুশি থাক।\n\nইতি,\nতোর জানোয়ার";

let index = 0;
function typeWriter() {
    const textElement = document.getElementById('typewriter-text');
    if (index < message.length) {
        let char = message.charAt(index);
        textElement.innerHTML += char === "\n" ? "<br>" : char;
        index++;
        setTimeout(typeWriter, 40);
        
        // অটো স্ক্রল ডাউন (যাতে নতুন লেখা দেখা যায়)
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

// ৪. মাকড়সা জাল এনিমেশন (Interactive Spiderweb)
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
        ctx.fillStyle = 'rgba(0
    
