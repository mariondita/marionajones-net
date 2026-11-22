document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const logo = document.querySelector('.logo-img');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.nav-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.nav-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add hover effect for logo if it exists
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'rotate(10deg)';
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'rotate(0deg)';
        });
    }
    
    // Add hover effect for section icons
    const sectionIcons = document.querySelectorAll('.section-icon');
    sectionIcons.forEach(icon => {
        console.log('Setting up icon:', icon);
        // Set initial state
        icon.style.transform = 'rotate(0deg)';
        icon.style.transition = 'transform 0.3s ease';

        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(10deg)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0deg)';
        });
    });
});

// Work page: client logos, moved with the arrow buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.logo-carousel').forEach(carousel => {
        const list = carousel.querySelector('.logo-list');
        const prev = carousel.querySelector('.logo-prev');
        const next = carousel.querySelector('.logo-next');
        const atStart = () => list.scrollLeft <= 10;
        const atEnd = () => list.scrollLeft + list.clientWidth >= list.scrollWidth - 10;
        // Space the logos so a whole number of them fills the strip, none cut off
        const MIN_GAP = 32, MAX_GAP = 96;
        const fitGap = () => {
            const items = [...list.children];
            const widths = items.map(li => li.getBoundingClientRect().width);
            const room = list.clientWidth;
            let n = 0, sum = 0;
            while (n < widths.length && sum + widths[n] + n * MIN_GAP <= room) { sum += widths[n]; n++; }
            const gap = n > 1 ? Math.min(MAX_GAP, (room - sum) / (n - 1)) : MIN_GAP;
            list.style.gap = gap + 'px';
        };
        const update = () => {
            fitGap();
            const fits = list.scrollWidth <= list.clientWidth + 10;
            prev.disabled = fits;
            next.disabled = fits;
        };
        const step = () => list.clientWidth + parseFloat(getComputedStyle(list).columnGap || 0);
        // At the end, › goes back to the first logo; at the start, ‹ goes to the last
        prev.addEventListener('click', () => atStart()
            ? list.scrollTo({ left: list.scrollWidth })
            : list.scrollBy({ left: -step() }));
        next.addEventListener('click', () => atEnd()
            ? list.scrollTo({ left: 0 })
            : list.scrollBy({ left: step() }));
        list.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        window.addEventListener('load', update);
        list.querySelectorAll('img').forEach(img => img.addEventListener('load', update));
        if ('ResizeObserver' in window) new ResizeObserver(update).observe(list);
        update();
    });
});


// Lightbox: click a screenshot to see it bigger
(function () {
    const groups = document.querySelectorAll('[data-lightbox]');
    if (!groups.length || typeof HTMLDialogElement === 'undefined') return;
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', 'Enlarged image');
    dlg.innerHTML = '<img alt=""><p></p><button type="button" class="lightbox-close" aria-label="Close">&times;</button>';
    document.body.appendChild(dlg);
    const big = dlg.querySelector('img'), cap = dlg.querySelector('p');
    dlg.querySelector('.lightbox-close').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    groups.forEach((g) => g.addEventListener('click', (e) => {
        const btn = e.target.closest('.lightbox-trigger');
        if (!btn) return;
        const img = btn.querySelector('img');
        const title = btn.closest('.event-card')?.querySelector('h3')?.textContent || '';
        big.src = img.currentSrc || img.src; big.alt = img.alt; cap.textContent = title;
        dlg.showModal();
    }));
})();
