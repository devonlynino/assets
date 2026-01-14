(function() {
    function animateLink(el, delay) {
        el.style.opacity = 0;
        el.style.position = 'relative';
        el.style.top = '-20px';
        el.style.transition = 'all 0.5s ease';

        setTimeout(function() {
            el.style.opacity = 1;
            el.style.top = '0';
        }, delay);
    }

    function animateAllLinks() {
        var links = document.querySelectorAll('.link-item');
        for (var i = 0; i < links.length; i++) {
            animateLink(links[i], i * 150);
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(animateAllLinks, 50);
    } else {
        window.onload = animateAllLinks;
    }

    var observer = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    if (node.nodeType === 1 && node.classList.contains('link-item')) {
                        animateLink(node, 0);
                    }
                }
            }
        }
    });

    var container = document.querySelector('.link-list');
    if (container) {
        observer.observe(container, { childList: true });
    }
})();

(function() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e){
        const now = (new Date()).getTime();
        if(now - lastTouchEnd <= 300) e.preventDefault();
        lastTouchEnd = now;
    }, false);	
	
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('gesturestart', function(e) { e.preventDefault(); });
    document.addEventListener('gesturechange', function(e) { e.preventDefault(); });
    document.addEventListener('gestureend', function(e) { e.preventDefault(); });

    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) e.preventDefault();
    }, { passive: false });

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && ['+', '-', '=', '0'].includes(e.key)) e.preventDefault();
    });
})();

function updateScroll() {
    const html = document.documentElement;
    const body = document.body;
    const contentHeight = body.scrollHeight;
    if(contentHeight <= window.innerHeight) {
        html.style.overflowY = 'hidden';
        body.style.overflowY = 'hidden';
    } else {
        html.style.overflowY = 'auto';
        body.style.overflowY = 'auto';
    }
}

window.addEventListener('load', updateScroll);
window.addEventListener('resize', updateScroll);