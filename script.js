// দিন ও সাল সেট করা
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
    if(i === 2008) opt.selected = true;
    yearSelect.appendChild(opt);
}

// লগইন বাটন ক্লিক ইভেন্ট
document.getElementById('login-btn').addEventListener('click', function() {
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    if (day === "2" && month === "5" && year === "2008") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('surprise-screen').style.display = 'flex';
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
});

// চিঠি খোলার ক্লিক ইভেন্ট
document.getElementById('envelope').addEventListener('click', function() {
    this.classList.toggle('open');
});
          
