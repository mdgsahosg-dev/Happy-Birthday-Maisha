// ১ থেকে ৩১ দিন যোগ করা
const daySelect = document.getElementById('day');
for (let i = 1; i <= 31; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    daySelect.appendChild(opt);
}

// ১২টি মাসের নাম যোগ করা
const monthSelect = document.getElementById('month');
const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
monthSelect.innerHTML = '<option value="">মাস</option>'; 
months.forEach((month, index) => {
    let opt = document.createElement('option');
    opt.value = index + 1; // মে মাসের মান হবে ৫
    opt.innerHTML = month;
    monthSelect.appendChild(opt);
});

// ২০০৫ থেকে ২০২৫ পর্যন্ত সাল যোগ করা
const yearSelect = document.getElementById('year');
yearSelect.innerHTML = '<option value="">সাল</option>';
for (let i = 2005; i <= 2025; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    yearSelect.appendChild(opt);
}

// লগইন লজিক
document.getElementById('login-btn').addEventListener('click', function() {
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // শর্ত: ২ মে ২০০৮
    if (day === "2" && month === "5" && year === "2008") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('surprise-screen').style.display = 'flex';
    } else {
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('error-msg').innerText = "ভুল তথ্য! সঠিক জন্মতারিখ দাও।";
    }
});

// খাম খোলার লজিক
document.getElementById('envelope').addEventListener('click', function() {
    this.classList.toggle('open');
});
