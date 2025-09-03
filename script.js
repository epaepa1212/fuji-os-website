/* script.js - Fuji OS Website Interactive Logic */

"use strict";

// Core configuration constants
const CONFIG = {
    SCROLL_THRESHOLD: 50,  // Navigation scroll effect trigger threshold
    INTERSECTION_THRESHOLD: 0.3,  // Intersection Observer trigger threshold
    INTERSECTION_MARGIN: '0px 0px -100px 0px',  // Intersection Observer margin
    ANIMATION_DELAY: 200,  // Animation delay time (ms)
    FORM_SUBMIT_DELAY: 1500,  // Form submission delay time (ms)
    BUTTON_RESET_DELAY: 2000   // Button state reset delay time (ms)
};

document.addEventListener('DOMContentLoaded', () => {

    // --- Global navigation scroll effect ---
    // Add scrolled style to navigation bar when scrolling down past threshold
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // --- Scroll progress bar ---
    // Calculate and update top progress bar width based on page scroll position
    // Algorithm: current scroll distance / total scrollable distance * 100%
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
        // Update progress bar ARIA attributes for improved accessibility
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
    });
    
    // --- Hamburger menu interaction ---
    // Toggle side navigation menu display/hide state and update button ARIA attributes
    const menuToggle = document.getElementById('menuToggle');
    const sideNav = document.getElementById('sideNav');
    if (menuToggle && sideNav) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('active');
            sideNav.classList.toggle('active');
            
            // Update ARIA attributes for improved accessibility
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            sideNav.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });
    }

    // --- Hero section scroll indicator ---
    // Add click event to down arrow at bottom of hero section for smooth scroll to next section
    const scrollIndicator = document.querySelector('.hero-section__scroll-indicator');
    if (scrollIndicator) {
        // Mouse click event
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.preface-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        // Keyboard access support - enhanced accessibility
        scrollIndicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.querySelector('.preface-section').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Universal Scroll-Triggered Animation System ---
    // Comprehensive animation observer that handles all animated sections
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const direction = section.dataset.animationDirection || 'left';
                
                // Add the in-view class to trigger animations
                section.classList.add('in-view');
                
                // Handle different section types with staggered animations
                if (section.classList.contains('preface-section')) {
                    // Tourism chart animation
                    const chartElement = section.querySelector('.tourism-trend');
                    if (chartElement) {
                        setTimeout(() => chartElement.classList.add('animate'), 300);
                    }
                } else if (section.classList.contains('os-section')) {
                    // Advantage cards staggered animation
                    const advantageCards = section.querySelectorAll('.advantage-card');
                    advantageCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationPlayState = 'running';
                        }, 200 + (index * 100));
                    });
                } else if (section.classList.contains('pillar-section')) {
                    // Pillar visual and content staggered animation
                    const visual = section.querySelector('.pillar-section__visual');
                    const content = section.querySelector('.pillar-section__content');
                    
                    if (direction === 'left') {
                        // Visual first, then content
                        if (visual) setTimeout(() => visual.classList.add('animate'), 200);
                        if (content) setTimeout(() => content.classList.add('animate'), 400);
                    } else {
                        // Content first, then visual
                        if (content) setTimeout(() => content.classList.add('animate'), 200);
                        if (visual) setTimeout(() => visual.classList.add('animate'), 400);
                    }
                } else if (section.classList.contains('engine-section')) {
                    // Engine section container animation
                    const container = section.querySelector('.engine-section__container');
                    if (container) {
                        setTimeout(() => container.classList.add('animate'), 200);
                    }
                } else if (section.classList.contains('partnership-section')) {
                    // Partnership section container animation
                    const container = section.querySelector('.partnership-section__container');
                    if (container) {
                        setTimeout(() => container.classList.add('animate'), 200);
                    }
                }
            }
        });
    }, {
        threshold: CONFIG.INTERSECTION_THRESHOLD,
        rootMargin: CONFIG.INTERSECTION_MARGIN
    });

    // Observe all animated sections
    const animatedSections = document.querySelectorAll('.animated-section');
    animatedSections.forEach(section => {
        animationObserver.observe(section);
    });

    // Initialize advantage cards to paused state for OS section
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.style.animationPlayState = 'paused';
    });

    // Enhanced expander handler function with proper text management
    function setupExpander(expanderId, contentId) {
        const expander = document.getElementById(expanderId);
        const content = document.getElementById(contentId);

        if (expander && content) {
            expander.addEventListener('click', () => {
                const isActive = expander.classList.contains('active');
                const textElement = expander.querySelector('.expander-button__text');
                
                if (isActive) {
                    // Collapse content
                    expander.classList.remove('active');
                    content.classList.remove('active');
                    if (textElement) {
                        textElement.textContent = '詳しく見る';
                    }
                } else {
                    // Expand content
                    expander.classList.add('active');
                    content.classList.add('active');
                    if (textElement) {
                        textElement.textContent = '閉じる';
                    }
                    
                    // Smooth scroll to expanded content
                    setTimeout(() => {
                        content.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 300);
                }
            });
        }
    }

    // Setup expanders for all sections
    setupExpander('osDetailExpander', 'osDetailContent');
    setupExpander('ecoGoDetailExpander', 'ecoGoDetailContent');
    setupExpander('anshinDetailExpander', 'anshinDetailContent');
    setupExpander('avatarsDetailExpander', 'avatarsDetailContent');
    setupExpander('naviDetailExpander', 'naviDetailContent');
    setupExpander('engineDetailExpander', 'engineDetailContent');

    // --- Contact form submission handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Simulate form submission (in real project would send to server/backend)
            const submitButton = contactForm.querySelector('.form-button');
            const originalText = submitButton.querySelector('.form-button__text').textContent;
            
            // Button state change
            submitButton.disabled = true;
            submitButton.querySelector('.form-button__text').textContent = '送信中...';
            
            // Simulate network delay
            setTimeout(() => {
                submitButton.querySelector('.form-button__text').textContent = '送信完了！';
                
                // Show success message
                const message = 'お問い合わせありがとうございます！\nメッセージを受信いたしました。お返事をお待ちください。';
                alert(message);
                
                // Reset form
                contactForm.reset();
                
                // Restore button state
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.querySelector('.form-button__text').textContent = originalText;
                }, CONFIG.BUTTON_RESET_DELAY);
            }, CONFIG.FORM_SUBMIT_DELAY);
        });
    }

    // --- PDF download button handling ---
    const downloadButton = document.getElementById('downloadWhitepaper');
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Button state change
            downloadButton.style.opacity = '0.7';
            downloadButton.style.pointerEvents = 'none';
            
            setTimeout(() => {
                const message = 'プロジェクト資料の準備中です。\n詳細な資料については、上記のメールアドレスまでお問い合わせください。';
                alert(message);
                
                // Restore button state
                downloadButton.style.opacity = '1';
                downloadButton.style.pointerEvents = 'auto';
            }, 1000);
        });
    }
});