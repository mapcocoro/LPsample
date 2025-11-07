// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象
document.querySelectorAll('.stat-item, .vision-card, .culture-card, .voice-card, .job-card, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});

// 数字カウントアップアニメーション
const statNumbers = document.querySelectorAll('.stat-number');
const animateNumber = (element) => {
    const target = element.textContent;
    const isPlus = target.includes('+');
    const isPercent = target.includes('%');
    const numMatch = target.match(/\d+/);

    if (numMatch) {
        const targetNum = parseInt(numMatch[0]);
        let current = 0;
        const increment = targetNum / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (isPlus ? '+' : '') + (isPercent ? '%' : '');
        }, 50);
    }
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumber(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    const originalText = stat.textContent;
    stat.setAttribute('data-original', originalText);
    statsObserver.observe(stat);
});
