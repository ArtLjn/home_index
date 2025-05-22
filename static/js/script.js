console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

var buttons = document.querySelectorAll('.projectItem');
buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function pop(imageURL) {
    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}

var tc = document.getElementsByClassName('tc');
var tc_main = document.getElementsByClassName('tc-main');
tc[0].addEventListener('click', function (event) {
    pop();
});
tc_main[0].addEventListener('click', function (event) {
    event.stopPropagation();
});



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















document.addEventListener('DOMContentLoaded', function () {






    var html = document.querySelector('html');
    var themeState = getCookie("themeState") || "Light";
    var tanChiShe = document.getElementById("tanChiShe");






    function changeTheme(theme) {
        tanChiShe.src = "./static/svg/snake-" + theme + ".svg";
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }







    var Checkbox = document.getElementById('myonoffswitch')
    Checkbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else if (themeState == "Light") {
            changeTheme("Dark");
        } else {
            changeTheme("Dark");
        }
    });



    if (themeState == "Dark") {
        Checkbox.checked = false;
    }

    changeTheme(themeState);

















   

    // var fpsElement = document.createElement('div');
    // fpsElement.id = 'fps';
    // fpsElement.style.zIndex = '10000';
    // fpsElement.style.position = 'fixed';
    // fpsElement.style.left = '0';
    // document.body.insertBefore(fpsElement, document.body.firstChild);

    var showFPS = (function () {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        var fps = 0,
            last = Date.now(),
            offset, step, appendFps;

        step = function () {
            offset = Date.now() - last;
            fps += 1;

            if (offset >= 1000) {
                last += offset;
                appendFps(fps);
                fps = 0;
            }

            requestAnimationFrame(step);
        };

        appendFps = function (fpsValue) {
            fpsElement.textContent = 'FPS: ' + fpsValue;
        };

        step();
    })();
    
    
    
    //pop('./static/img/tz.jpg')
    
    
    
});




var pageLoading = document.querySelector("#zyyo-loading");
window.addEventListener('load', function() {
    setTimeout(function () {
        pageLoading.style.opacity = '0';
    }, 100);
});

// Typing Effect for Welcome Message
function typeWriter(element, text, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    element.innerHTML = ''; // Clear existing text
    type();
}

// Particle Background Effect
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-background';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
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

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Snake Game Interaction
function enhanceSnakeGame() {
    const snake = document.getElementById('tanChiShe');
    let isHovering = false;
    let rotation = 0;

    snake.addEventListener('mouseenter', () => {
        isHovering = true;
        rotateSnake();
    });

    snake.addEventListener('mouseleave', () => {
        isHovering = false;
    });

    function rotateSnake() {
        if (!isHovering) return;
        rotation += 45;
        snake.style.transform = `rotate(${rotation}deg)`;
        setTimeout(rotateSnake, 200);
    }
}

// Skills Visualization
function animateSkills() {
    const skillPc = document.getElementById('skillPc');
    const skillWap = document.getElementById('skillWap');

    skillPc.addEventListener('mouseenter', () => {
        skillPc.style.transform = 'scale(1.1)';
        skillPc.style.transition = 'transform 0.3s ease';
    });

    skillPc.addEventListener('mouseleave', () => {
        skillPc.style.transform = 'scale(1)';
    });

    skillWap.addEventListener('mouseenter', () => {
        skillWap.style.transform = 'scale(1.1)';
        skillWap.style.transition = 'transform 0.3s ease';
    });

    skillWap.addEventListener('mouseleave', () => {
        skillWap.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Existing theme and other initialization code...

    // New feature initializations
    const welcomeText = document.querySelector('.welcome span');
    if (welcomeText) {
        typeWriter(welcomeText, welcomeText.textContent);
    }

    createParticleBackground();
    // enhanceSnakeGame();
    animateSkills();
});

// 页脚功能集合
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');

    // 延迟显示页脚
    setTimeout(() => {
        footer.classList.add('visible');
    }, 1000);

    // 每日一句诗功能
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
        const poemEl = document.createElement('div');
        poemEl.className = 'footer-poem';
        
        // 根据日期选择诗句，保证每天显示不同的诗
        const today = new Date();
        const poemIndex = today.getDate() % poems.length;
        
        poemEl.innerHTML = `
            <span>📜 今日诗句</span>
            <p>${poems[poemIndex]}</p>
        `;
        
        document.querySelector('footer').appendChild(poemEl);

        // 延迟添加可见类
        setTimeout(() => {
            poemEl.classList.add('visible');
        }, 1500);
    }

    // 访问计数器（使用localStorage模拟）
    function updateVisitCounter() {
        let visits = localStorage.getItem('siteVisits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('siteVisits', visits);

        const counterEl = document.createElement('div');
        counterEl.className = 'footer-counter';
        counterEl.innerHTML = `🚀 访问次数: ${visits}`;
        document.querySelector('footer').appendChild(counterEl);

        // 延迟添加可见类
        setTimeout(() => {
            counterEl.classList.add('visible');
        }, 2000);
    }

    // 动态背景效果
    function createFooterParticles() {
        const footer = document.querySelector('footer');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'footer-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
            particle.style.opacity = 0;
            footer.appendChild(particle);

            // 延迟添加活跃类
            setTimeout(() => {
                particle.classList.add('active');
            }, 2500);
        }
    }

    // 执行功能
    displayDailyPoem();
    updateVisitCounter();
    createFooterParticles();
});

// 侧边栏动态功能
document.addEventListener('DOMContentLoaded', function() {
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
        
        const leftDiv = document.querySelector('.zyyo-left');
        leftDiv.insertBefore(dateTimeEl, leftDiv.children[2]);
    }



    // 执行功能
    updateSidebarDateTime();
});

