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
        const update = () => {
            prev.disabled = list.scrollLeft <= 10;
            next.disabled = list.scrollLeft + list.clientWidth >= list.scrollWidth - 10;
        };
        const step = () => Math.max(list.clientWidth * 0.8, 200);
        prev.addEventListener('click', () => list.scrollBy({ left: -step() }));
        next.addEventListener('click', () => list.scrollBy({ left: step() }));
        list.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        window.addEventListener('load', update);
        list.querySelectorAll('img').forEach(img => img.addEventListener('load', update));
        if ('ResizeObserver' in window) new ResizeObserver(update).observe(list);
        update();
    });
});

