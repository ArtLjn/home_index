// 控制台欢迎信息
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');

// 禁用右键菜单
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// 项目卡片交互效果
function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

// 为项目卡片添加交互事件
var projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(function (card) {
    card.addEventListener('mousedown', handlePress);
    card.addEventListener('mouseup', handleRelease);
    card.addEventListener('mouseleave', handleCancel);
    card.addEventListener('touchstart', handlePress);
    card.addEventListener('touchend', handleRelease);
    card.addEventListener('touchcancel', handleCancel);
});

// 弹窗功能
function pop(imageURL) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalImage = modalOverlay.querySelector('.modal-image');
    
    if (imageURL) {
        modalImage.src = imageURL;
    }
    
    modalOverlay.classList.add('active');
}

// 关闭弹窗
document.getElementById('modal-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.remove('active');
    }
});

// Cookie 操作函数
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// 主题切换功能
document.addEventListener('DOMContentLoaded', function () {
    const html = document.querySelector('html');
    const themeSwitch = document.getElementById('theme-switch');
    const tanChiShe = document.getElementById("tanChiShe");
    
    let themeState = getCookie("themeState") || "Light";

    function changeTheme(theme) {
        tanChiShe.src = "./static/svg/snake-" + theme + ".svg";
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }

    // 主题切换事件监听
    themeSwitch.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else if (themeState == "Light") {
            changeTheme("Dark");
        } else {
            changeTheme("Dark");
        }
    });

    // 初始化主题状态
    if (themeState == "Dark") {
        themeSwitch.checked = false;
    } else {
        themeSwitch.checked = true;
    }

    changeTheme(themeState);
});

// 页面加载动画
var pageLoading = document.querySelector("#zyyo-loading");
window.addEventListener('load', function() {
    setTimeout(function () {
        pageLoading.style.opacity = '0';
        setTimeout(() => {
            pageLoading.style.display = 'none';
        }, 500);
    }, 100);
});

// 打字机效果
function typeWriter(element, text, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    element.innerHTML = ''; // 清空现有文本
    type();
}

// 粒子背景效果
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-background';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50; // 减少粒子数量以提高性能

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // 窗口大小改变时重新调整画布
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 贪吃蛇游戏交互
function enhanceSnakeGame() {
    const snake = document.getElementById('tanChiShe');
    if (!snake) return;
    
    // 移除旋转动画，只保留简单的悬停效果
    snake.addEventListener('mouseenter', () => {
        snake.style.transform = 'scale(1.05)';
    });

    snake.addEventListener('mouseleave', () => {
        snake.style.transform = 'scale(1)';
    });
}

// 技能可视化
function animateSkills() {
    const skillPc = document.getElementById('skillPc');
    const skillWap = document.getElementById('skillWap');

    if (skillPc) {
        skillPc.addEventListener('mouseenter', () => {
            skillPc.style.transform = 'scale(1.05)';
        });

        skillPc.addEventListener('mouseleave', () => {
            skillPc.style.transform = 'scale(1)';
        });
    }

    if (skillWap) {
        skillWap.addEventListener('mouseenter', () => {
            skillWap.style.transform = 'scale(1.05)';
        });

        skillWap.addEventListener('mouseleave', () => {
            skillWap.style.transform = 'scale(1)';
        });
    }
}

// 页脚功能
function initFooter() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    // 每日一句诗
    const poems = [
        "海内存知己，天涯若比邻。 - 李白",
        "衣带渐宽终不悔，为伊消得人憔悴。 - 柳永",
        "长风破浪会有时，直挂云帆济沧海。 - 李白",
        "山高水长，路远人稀。 - 苏轼",
        "采菊东篱下，悠然见南山。 - 陶渊明",
        "我们必须相信，最美好的总在未来。 - 泰戈尔",
        "生如逆旅，我亦是行人。 - 苏轼",
        "纸上得来终觉浅，绝知此事要躬行。 - 陆游",
        "沧海桑田，风云变幻。 - 老子",
        "不以物喜，不以己悲。 - 庄子"
    ];

    function displayDailyPoem() {
        const today = new Date();
        const poemIndex = today.getDate() % poems.length;
        
        const poemEl = document.createElement('div');
        poemEl.className = 'footer-poem';
        poemEl.innerHTML = `
            <span>📜 今日诗句</span>
            <p>${poems[poemIndex]}</p>
        `;
        
        footer.appendChild(poemEl);
    }

    // 访问计数器
    function updateVisitCounter() {
        let visits = localStorage.getItem('siteVisits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('siteVisits', visits);

        const counterEl = document.createElement('div');
        counterEl.className = 'footer-counter';
        counterEl.innerHTML = `🚀 访问次数: ${visits}`;
        footer.appendChild(counterEl);
    }

    // 执行页脚功能
    displayDailyPoem();
    updateVisitCounter();
}

// 侧边栏功能
function initSidebar() {
    const leftSidebar = document.querySelector('.zyyo-left');
    if (!leftSidebar) return;

    // 时间和日期显示
    function updateSidebarDateTime() {
        const dateTimeEl = document.createElement('div');
        dateTimeEl.className = 'sidebar-datetime';
        
        function updateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            dateTimeEl.innerHTML = `
                <div class="date">${now.toLocaleDateString('zh-CN', options)}</div>
                <div class="time">${now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
            `;
        }
        
        updateTime();
        setInterval(updateTime, 1000);
        
        leftSidebar.insertBefore(dateTimeEl, leftSidebar.children[1]);
    }

    updateSidebarDateTime();
}

// 社交链接工具提示
function initSocialTooltips() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const tooltip = link.querySelector('.tooltip');
        if (tooltip) {
            link.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            
            link.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
        }
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
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

    // 观察所有区块
    const sections = document.querySelectorAll('.section-block');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function () {
    // 基础功能初始化
    createParticleBackground();
    enhanceSnakeGame();
    animateSkills();
    initFooter();
    initSidebar();
    initSocialTooltips();
    initScrollAnimations();

    // 欢迎文本打字机效果
    const welcomeText = document.querySelector('.welcome-text .gradient-text');
    if (welcomeText) {
        const originalText = welcomeText.textContent;
        setTimeout(() => {
            typeWriter(welcomeText, originalText, 100);
        }, 1000);
    }

    // 技能图片响应式切换
    function handleSkillImageSwitch() {
        const skillPc = document.getElementById('skillPc');
        const skillWap = document.getElementById('skillWap');
        
        if (window.innerWidth <= 768) {
            if (skillPc) skillPc.style.display = 'none';
            if (skillWap) skillWap.style.display = 'block';
        } else {
            if (skillPc) skillPc.style.display = 'block';
            if (skillWap) skillWap.style.display = 'none';
        }
    }

    handleSkillImageSwitch();
    window.addEventListener('resize', handleSkillImageSwitch);
});

// 性能优化：减少重绘和回流
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化窗口大小改变事件
window.addEventListener('resize', debounce(() => {
    // 重新计算布局
}, 250));

// 初始化左侧边栏新功能
function initSidebarFeatures() {
    // 访问计数器
    function updateVisitCounter() {
        let visitCount = localStorage.getItem('visitCount') || 0;
        visitCount = parseInt(visitCount) + 1;
        localStorage.setItem('visitCount', visitCount);
        
        const visitElement = document.getElementById('visit-count');
        if (visitElement) {
            visitElement.textContent = visitCount;
        }
    }

    // 在线时长计时器
    function updateOnlineTime() {
        let onlineTime = localStorage.getItem('onlineTime') || 0;
        onlineTime = parseInt(onlineTime) + 1;
        localStorage.setItem('onlineTime', onlineTime);
        
        const onlineElement = document.getElementById('online-time');
        if (onlineElement) {
            onlineElement.textContent = Math.floor(onlineTime / 60);
        }
    }

    // 状态更新
    function updateStatus() {
        const statusElement = document.getElementById('current-status');
        if (!statusElement) return;

        const statuses = [
            '正在摸鱼...',
            '写代码中...',
            '学习新技术...',
            '喝咖啡中...',
            '思考人生...',
            '调试bug中...',
            '看文档中...',
            '开会中...',
            '摸鱼摸鱼...',
            '划水中...'
        ];

        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        statusElement.textContent = randomStatus;
    }

    // 每日一句
    function updateDailyQuote() {
        const quoteElement = document.getElementById('daily-quote-text');
        const authorElement = document.querySelector('.quote-author');
        
        if (!quoteElement) return;

        const quotes = [
            { text: '代码改变世界，但首先改变自己。', author: '— 程序员语录' },
            { text: '编程是一种艺术，调试是一种科学。', author: '— 编程哲学' },
            { text: '最好的代码是没有代码。', author: '— 极简主义' },
            { text: '学习编程最好的时间是十年前，其次是现在。', author: '— 时间哲学' },
            { text: '代码如诗，简洁优雅。', author: '— 编程美学' },
            { text: 'Bug是程序员的日常，修复是程序员的使命。', author: '— 调试哲学' },
            { text: '技术改变生活，代码连接世界。', author: '— 技术愿景' },
            { text: '每一次编译都是对完美的追求。', author: '— 编程精神' }
        ];

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote.text;
        if (authorElement) {
            authorElement.textContent = randomQuote.author;
        }
    }

    // 初始化功能
    updateVisitCounter();
    updateOnlineTime();
    updateStatus();
    updateDailyQuote();

    // 设置定时器
    setInterval(updateOnlineTime, 60000); // 每分钟更新在线时长
    setInterval(updateStatus, 30000); // 每30秒更新状态
    setInterval(updateDailyQuote, 300000); // 每5分钟更新每日一句
}

// 在DOM加载完成后初始化新功能
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，确保所有元素都已加载
    setTimeout(initSidebarFeatures, 100);
});

