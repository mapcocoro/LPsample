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

// タブ切り替え
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // タブボタンのアクティブ状態を切り替え
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // スケジュールの表示を切り替え
        const day = this.getAttribute('data-day');
        document.querySelectorAll('.day-schedule').forEach(schedule => {
            schedule.classList.remove('active');
        });
        document.getElementById(day).classList.add('active');
    });
});

// チケット購入ボタン
document.querySelectorAll('.ticket-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('チケット購入ページへ移動します！（デモ版）\nたくさんのご参加お待ちしています！');
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
document.querySelectorAll('.about-card, .activity-card, .schedule-item, .ticket-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});

// 風船の動きにランダム性を追加
document.querySelectorAll('.balloon, .star').forEach(el => {
    const randomDelay = Math.random() * 3;
    const randomDuration = 2 + Math.random() * 2;
    el.style.animationDelay = `${randomDelay}s`;
    el.style.animationDuration = `${randomDuration}s`;
});
