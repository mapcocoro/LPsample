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
document.querySelectorAll('.feature-card, .timeline-item, .voice-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});

// カウントアップアニメーション
const animateNumber = (element, target, suffix = '') => {
    let current = 0;
    const targetNum = parseInt(target.replace(/[^\d]/g, ''));
    const increment = targetNum / 50;
    const hasPercent = target.includes('%');
    const hasPlus = target.includes('+');

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
            current = targetNum;
            clearInterval(timer);
        }
        let displayValue = Math.floor(current).toLocaleString();
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';
        element.textContent = displayValue;
    }, 30);
};

// 統計数値のカウントアップ
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const originalText = element.getAttribute('data-original');
            animateNumber(element, originalText);
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    const originalText = stat.textContent;
    stat.setAttribute('data-original', originalText);
    stat.textContent = '0';
    statsObserver.observe(stat);
});
