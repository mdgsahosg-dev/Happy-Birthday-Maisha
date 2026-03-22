// দিন ও সাল ড্রপডাউন তৈরি করা
const daySelect = document.getElementById('day');
for (let i = 1; i <= 31; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    daySelect.appendChild(opt);
}

const yearSelect = document.getElementById('year');
for (let i = 2000; i <= 2026; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    if(i === 2008) opt.selected = true; // ২০০৮ ডিফল্ট সিলেক্ট থাকবে
    yearSelect.appendChild(opt);
}

// লগইন লজিক এবং টাইপিং ইফেক্ট
document.getElementById('login-btn').addEventListener('click', function() {
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // শর্ত যাচাই: ২ মে ২০০৮
    if (day === "2" && month === "5" && year === "2008") {
        // লগইন বক্স লুকিয়ে সারপ্রাইজ স্ক্রিন দেখানো
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('surprise-screen').style.display = 'flex';
        
        // টাইপিং ইফেক্ট শুরু করা
        typeWriter();
    } else {
        // ভুল হলে এরর মেসেজ দেখানো
        document.getElementById('error-msg').style.display = 'block';
    }
});

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
            
