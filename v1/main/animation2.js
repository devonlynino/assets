    function createBubble() {
        let bubble = document.createElement('div');
        bubble.classList.add('bubble');
        let size = Math.random() * 30 + 20;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 90 + 'vw';
        bubble.style.bottom = '-30px';
        bubble.style.animationDuration = (Math.random() * 5 + 5) + 's';
        bubble.style.animationDelay = '0s';
        document.body.appendChild(bubble);

        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }

    setInterval(() => {
        createBubble();
    }, Math.random() * 500 + 300);

    document.addEventListener('visibilitychange', () => {
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(b => {
            b.style.animationPlayState = (document.visibilityState === 'hidden') ? 'paused' : 'running';
        });
    });

    const messages = [
        "Xin lỗi, trang bạn tìm kiếm không tồn tại!",
        "Sorry, the page you are looking for does not exist!",
        "对不起，您访问的页面不存在！",
        "Désolé, la page que vous recherchez n'existe pas !",
        "Lo sentimos, la página que buscas no existe!",
        "Entschuldigung, die von Ihnen gesuchte Seite existiert nicht!",
        "Mi dispiace, la pagina che stai cercando non esiste!",
        "죄송합니다. 찾으시는 페이지가 존재하지 않습니다!",
        "Извините, страница, которую вы ищете, не существует!",
        "ごめんなさい。お探しのページは存在しません！"
    ];

    let index = 0;
    const messageElement = document.getElementById('message');
    setInterval(() => {
        index = (index + 1) % messages.length;
        messageElement.style.opacity = 0;
        setTimeout(() => {
            messageElement.textContent = messages[index];
            messageElement.style.opacity = 1;
        }, 500);
    }, 3000);
    
    (function() {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e){
            const now = (new Date()).getTime();
            if(now - lastTouchEnd <= 300) e.preventDefault();
            lastTouchEnd = now;
        }, false);

        document.addEventListener('gesturestart', function(e) { e.preventDefault(); });
        document.addEventListener('gesturechange', function(e) { e.preventDefault(); });
        document.addEventListener('gestureend', function(e) { e.preventDefault(); });

        document.addEventListener('wheel', function(e) {
            if (e.ctrlKey) e.preventDefault();
        }, { passive: false });

        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && ['+', '-', '=', '0'].includes(e.key)) e.preventDefault();
        });

        document.addEventListener('contextmenu', event => event.preventDefault());
    })();