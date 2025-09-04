"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 核心动画逻辑 (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.advantage-card, .pillar-section, .engine-section, .partnership-section').forEach(el => {
        animateObserver.observe(el);
    });

    // --- 2. 移动端菜单交互 ---
    const menuToggle = document.getElementById('menuToggle');
    const sideNav = document.getElementById('sideNav');

    if (menuToggle && sideNav) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('active');
            sideNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // 点击菜单链接后自动关闭
        sideNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                sideNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- 3. 自动更新版权年份 ---
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }
});