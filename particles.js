
// Starfield/constellation and floating icons animation for hero section
// No emojis, only relevant icons (email, call, people, network, etc.)


document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero');
    const heroAnimation = document.querySelector('.hero-animation');
    if (!heroAnimation || !heroSection) return;

    // --- Starfield/Constellation ---
    const starCount = 36; // Reduce for faster load
    const stars = [];
    const canvas = document.createElement('canvas');
    canvas.className = 'starfield-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 1;
    heroAnimation.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
    }
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.2 + 0.6,
            twinkle: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.08 + 0.02
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Move and draw stars
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            // Twinkle
            const tw = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 * s.speed + s.twinkle);
            const alpha = 0.5 * tw + 0.2;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();
        }
        // Draw constellation lines
        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                const dx = (stars[i].x - stars[j].x) * canvas.width;
                const dy = (stars[i].y - stars[j].y) * canvas.height;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 110) {
                    ctx.save();
                    ctx.globalAlpha = 0.10 * (1 - dist/110);
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x * canvas.width, stars[i].y * canvas.height);
                    ctx.lineTo(stars[j].x * canvas.width, stars[j].y * canvas.height);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        requestAnimationFrame(animateStars);
    }
    animateStars();

    // --- Floating Icons ---
    // FontAwesome icon classes for relevant icons
    const iconList = [
        'fas fa-envelope', // email
        'fas fa-phone',    // call
        'fas fa-users',    // people
        'fas fa-comments', // chat
        'fas fa-bullhorn', // announcement
    ];
    const iconCount = 15; // Reduce for faster load
    // Animate icons in random directions using custom keyframes
    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('i');
        const iconClass = iconList[Math.floor(Math.random() * iconList.length)];
        icon.className = iconClass + ' floating-hero-icon';
        // Random size
        const size = Math.random() * 24 + 28; // 28px to 52px
        icon.style.fontSize = size + 'px';
        // Fully random position within the viewport (5% to 90% to avoid edges)
        const top = Math.random() * 85 + 5; // 5% to 90%
        const left = Math.random() * 85 + 5; // 5% to 90%
        icon.style.position = 'fixed';
        icon.style.top = `${top}vh`;
        icon.style.left = `${left}vw`;
        icon.style.opacity = '0.33';
        icon.style.zIndex = 3;
        // Animation: generate random direction keyframes
        const dx = Math.random() * 60 - 30; // -30vw to +30vw
        const dy = Math.random() * 60 - 30; // -30vh to +30vh
        const animName = `floatRand${i}`;
        const styleSheet = document.styleSheets[0];
        const keyframes = `@keyframes ${animName} {0%{transform:translate(0,0);} 50%{transform:translate(${dx}vw,${dy}vh);} 100%{transform:translate(0,0);}}`;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        const duration = Math.random() * 5 + 6; // 6s to 11s
        const delay = Math.random() * 6;
        icon.style.animation = `${animName} ${duration}s ease-in-out ${delay}s infinite alternate`;
        heroAnimation.appendChild(icon);
    }
});
