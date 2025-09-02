/* script.js - Fuji OS Website Interactive Logic */

"use strict";

// Core configuration constants
const CONFIG = {
    SCROLL_THRESHOLD: 50,  // Navigation scroll effect trigger threshold
    INTERSECTION_THRESHOLD: 0.3,  // Intersection Observer trigger threshold
    INTERSECTION_MARGIN: '0px 0px -100px 0px',  // Intersection Observer margin
    ANIMATION_DELAY: 200,  // Animation delay time (ms)
    FORM_SUBMIT_DELAY: 1500,  // Form submission delay time (ms)
    BUTTON_RESET_DELAY: 2000,   // Button state reset delay time (ms)
    LANGUAGE_SWITCH_THROTTLE: 300  // Language switch throttle time (ms)
};

// === Internationalization Language Content Data ===
// English content with selectors for DOM replacement
const languageContent = {
    en: {
        // Navigation
        nav: {
            brand: { selector: '.header__logo', value: "Fuji OS" }
        },
        
        // Hero Section (Screen 1)
        hero: {
            title: { selector: '.hero-section__title', value: "Fuji OS" },
            subtitle: { selector: '.hero-section__subtitle', value: "Toward Regional Revitalization 2.0. An OS that implements Yamanashi's infinite possibilities together." },
            description: { selector: '.hero-section__description p', value: "Responding deeply to Japan's grand vision of the \"Digital Garden City Nation Concept,\" Fuji OS is not merely a smart city solution, but a <strong>Digital Transformation Operating System</strong> specifically designed for Yamanashi Prefecture." }
        },
        
        // Preface (Screen 2)
        preface: {
            title: { selector: '.preface-section__title', value: "Preface: Responding to the Call of the Times, Unleashing Yamanashi's Potential" },
            subtitle: { selector: '.preface-section__subtitle', value: "Responding to the \"Digital Garden City Nation Concept,\" Opening Yamanashi's Future" },
            sectionTitle: { selector: '.section-content__title', value: "Era Background: Structural Opportunities within Dual Challenges" },
            description: { selector: '.section-content__description', value: "Today, Japan stands at a crossroads of history. On one hand, two national-level strategic challenges of \"Regional Revitalization\" and \"Carbon Neutrality\" press forward, requiring local governments to find new paths for sustainable development amid harsh realities of population aging and industrial hollowing." }
        },
        
        // OS Introduction (Screen 3)
        os: {
            title: { selector: '.os-section__title', value: "Chapter One: Our Answer - Fuji OS, A Completely New Digital Foundation" },
            subtitle: { selector: '.os-section__subtitle', value: "Why an \"Operating System\" Rather Than \"Applications\"?" },
            advantages: {
                lightweight: {
                    title: { selector: '.advantage-card:nth-child(1) .advantage-card__title', value: "Dramatic Capital Lightweighting" },
                    description: { selector: '.advantage-card:nth-child(1) .advantage-card__description', value: "We don't need to build massive dedicated data centers, but utilize existing distributed computing resources worldwide." }
                },
                resilient: {
                    title: { selector: '.advantage-card:nth-child(2) .advantage-card__title', value: "Extremely High Fault Tolerance" },
                    description: { selector: '.advantage-card:nth-child(2) .advantage-card__description', value: "Distributed architecture naturally possesses \"no single point of failure\" characteristics, holding special strategic value for Japan's disaster-prone geography." }
                },
                innovative: {
                    title: { selector: '.advantage-card:nth-child(3) .advantage-card__title', value: "Open Innovation Ecology" },
                    description: { selector: '.advantage-card:nth-child(3) .advantage-card__description', value: "Distributed architecture adopts open technical standards and protocols, allowing any developer to develop applications and services on the Fuji OS platform." }
                }
            }
        },
        
        // Eco-Go (Screen 4)
        ecoGo: {
            title: { selector: '.pillar-section--eco-go .pillar-title', value: "Pillar One: Eco-Go" },
            subtitle: { selector: '.pillar-section--eco-go .pillar-subtitle', value: "Converting Every Movement into Regional Economic Vitality" },
            tagline: { selector: '.pillar-section--eco-go .pillar-tagline', value: "\"Smooth traffic is the finest hospitality.\"" }
        },
        
        // Anshin (Screen 5)
        anshin: {
            title: { selector: '.pillar-section--anshin .pillar-title', value: "Pillar Two: Anshin" },
            subtitle: { selector: '.pillar-section--anshin .pillar-subtitle', value: "Toward the World's First Truly Safe Tourist Destination" },
            tagline: { selector: '.pillar-section--anshin .pillar-tagline', value: "\"With cutting-edge technology, we build unwavering peace of mind.\"" }
        },
        
        // Yama-Avatars (Screen 6)
        avatars: {
            title: { selector: '.pillar-section--avatars .pillar-title', value: "Pillar Three: Yama-Avatars" },
            subtitle: { selector: '.pillar-section--avatars .pillar-subtitle', value: "Yamanashi's Culture Becomes Your Unique Travel Companion" },
            tagline: { selector: '.pillar-section--avatars .pillar-tagline', value: "\"13 cities, as one team, welcome you.\"" },
            tableHeaders: {
                city: { selector: '.avatars-table th:nth-child(1)', value: "City" },
                character: { selector: '.avatars-table th:nth-child(2)', value: "Character" },
                culture: { selector: '.avatars-table th:nth-child(3)', value: "Core Cultural Data Points" }
            },
            mobileLabels: {
                character: { selector: '.mobile-label:contains("キャラクター")', value: "Character: " },
                culture: { selector: '.mobile-label:contains("文化要素")', value: "Cultural Elements: " }
            }
        },
        
        // Yama-Navi (Screen 7)
        navi: {
            title: { selector: '.pillar-section--navi .pillar-title', value: "Pillar Four: Yama-Navi" },
            subtitle: { selector: '.pillar-section--navi .pillar-subtitle', value: "Customizing Your Journey Based on Your \"Likes\"" },
            tagline: { selector: '.pillar-section--navi .pillar-tagline', value: "\"And every experience becomes your asset.\"" }
        },
        
        // Economic Engine (Screen 8)
        engine: {
            title: { selector: '.engine-section__title', value: "Chapter Three: Economic Engine" },
            subtitle: { selector: '.engine-section__subtitle', value: "A Perpetual Motion Machine for Regional Value Circulation" },
            description: { selector: '.engine-section__description', value: "Fuji OS's economic engine is designed as a sustainable system capable of self-value production." }
        },
        
        // Future Partnership (Screen 9)
        partnership: {
            title: { selector: '.partnership-section__title', value: "Co-creating Partnership for the Future" },
            subtitle: { selector: '.partnership-section__subtitle', value: "Walking together, creating together, connecting to the future" },
            description: { selector: '.partnership-section__paragraph', value: "Fuji OS is not merely a technical product. This is a <strong>co-creation platform</strong> that implements Yamanashi Prefecture's digital future together." },
            formTitle: { selector: '.contact-form__title', value: "Co-creation Partner Registration" },
            formDescription: { selector: '.contact-form__description', value: "If you are interested in participating in the Fuji OS project, please feel free to contact us through this form." },
            formLabels: {
                name: { selector: 'label[for="partnerName"]', value: "Name" },
                company: { selector: 'label[for="partnerCompany"]', value: "Organization" },
                email: { selector: 'label[for="partnerEmail"]', value: "Email Address" },
                phone: { selector: 'label[for="partnerPhone"]', value: "Phone Number" },
                interest: { selector: 'label[for="partnerInterest"]', value: "Collaboration Field" },
                message: { selector: 'label[for="partnerMessage"]', value: "Message" }
            },
            formButton: { selector: '.form-button__text', value: "Take the First Step Toward Co-creation" },
            visionItems: {
                government: {
                    title: { selector: '.vision-item:nth-child(1) h4', value: "Government Cooperation" },
                    description: { selector: '.vision-item:nth-child(1) p', value: "Bridging policy support and implementation verification" }
                },
                enterprise: {
                    title: { selector: '.vision-item:nth-child(2) h4', value: "Enterprise Partnership" },
                    description: { selector: '.vision-item:nth-child(2) p', value: "Realizing both commercial and social value" }
                },
                community: {
                    title: { selector: '.vision-item:nth-child(3) h4', value: "Community Coexistence" },
                    description: { selector: '.vision-item:nth-child(3) p', value: "New model of resident participation and cultural inheritance" }
                },
                technology: {
                    title: { selector: '.vision-item:nth-child(4) h4', value: "Continuous Technology Innovation" },
                    description: { selector: '.vision-item:nth-child(4) p', value: "Integrated development of AI, blockchain, and IoT" }
                }
            }
        },
        
        // Footer
        footer: {
            title: { selector: '.footer__title', value: "Fuji OS" },
            tagline: { selector: '.footer__tagline', value: "An OS that implements Yamanashi's digital future" },
            downloadTitle: { selector: '.download-button__title', value: "Download Project Whitepaper" },
            downloadSubtitle: { selector: '.download-button__subtitle', value: "Technical specifications and implementation roadmap (PDF)" },
            copyright: { selector: '.footer__copyright', value: "© 2024 Fuji OS Project. All rights reserved." },
            note: { selector: '.footer__note', value: "This project is a technical demonstration supporting Yamanashi Prefecture's sustainable development." }
        },

        // Dynamic expander button texts
        expanderText: "Learn More",
        collapseText: "Close"
    }
};

// === Smart Content Override System ===
function updateContent(language) {
    // Only perform DOM operations for non-default languages
    if (language === 'ja') {
        // For Japanese, update only dynamic expander button texts
        updateExpanderButtons('ja');
        localStorage.setItem('fujiOS_language', language);
        return;
    }
    
    // For English, perform comprehensive content replacement
    if (language === 'en' && languageContent.en) {
        applyContentOverrides(languageContent.en);
        updateExpanderButtons('en');
    }
    
    // Update form elements for English
    updateFormElements(language);
    
    // Update mobile labels for different languages
    updateMobileLabels(language);
    
    // Save current language to localStorage
    localStorage.setItem('fujiOS_language', language);
}

// Apply content overrides for non-default language
function applyContentOverrides(content) {
    traverseAndApply(content, (item) => {
        if (item.selector && item.value) {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(element => {
                if (element) {
                    element.innerHTML = item.value;
                }
            });
        }
    });
}

// Recursively traverse content object and apply function
function traverseAndApply(obj, applyFn) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const item = obj[key];
            if (typeof item === 'object' && item !== null) {
                if (item.selector && item.value) {
                    applyFn(item);
                } else {
                    traverseAndApply(item, applyFn);
                }
            }
        }
    }
}

// Update expander button texts based on current language
function updateExpanderButtons(language) {
    const expanderButtons = document.querySelectorAll('.expander-button__text');
    const expandText = language === 'ja' ? '詳しく見る' : 'Learn More';
    const collapseText = language === 'ja' ? '閉じる' : 'Close';
    
    expanderButtons.forEach(button => {
        const expanderBtn = button.closest('.expander-button');
        if (expanderBtn && expanderBtn.classList.contains('active')) {
            button.textContent = collapseText;
        } else {
            button.textContent = expandText;
        }
    });
}

// Update mobile labels for different languages
function updateMobileLabels(language) {
    const labels = document.querySelectorAll('.mobile-label');
    labels.forEach(label => {
        if (language === 'en') {
            if (label.textContent.includes('キャラクター')) {
                label.textContent = 'Character: ';
            } else if (label.textContent.includes('文化要素')) {
                label.textContent = 'Cultural Elements: ';
            }
        } else {
            if (label.textContent.includes('Character')) {
                label.textContent = 'キャラクター: ';
            } else if (label.textContent.includes('Cultural Elements')) {
                label.textContent = '文化要素: ';
            }
        }
    });
}

// Update form elements for different languages
function updateFormElements(language) {
    if (language === 'en') {
        // Update form placeholder
        const messageTextarea = document.getElementById('partnerMessage');
        if (messageTextarea) {
            messageTextarea.placeholder = 'Message';
        }
        
        // Update select options
        const interestSelect = document.getElementById('partnerInterest');
        if (interestSelect) {
            const options = interestSelect.options;
            if (options[0]) options[0].text = "Please select";
            if (options[1]) options[1].text = "Government Agencies";
            if (options[2]) options[2].text = "Enterprise Partners";
            if (options[3]) options[3].text = "Local Communities";
            if (options[4]) options[4].text = "Technology Development";
            if (options[5]) options[5].text = "Investment & Funding";
            if (options[6]) options[6].text = "Others";
        }
    } else {
        // Reset to Japanese
        const messageTextarea = document.getElementById('partnerMessage');
        if (messageTextarea) {
            messageTextarea.placeholder = 'メッセージ';
        }
        
        const interestSelect = document.getElementById('partnerInterest');
        if (interestSelect) {
            const options = interestSelect.options;
            if (options[0]) options[0].text = "選択してください";
            if (options[1]) options[1].text = "政府機関・自治体";
            if (options[2]) options[2].text = "企業パートナー";
            if (options[3]) options[3].text = "地域コミュニティ";
            if (options[4]) options[4].text = "技術開発・研究";
            if (options[5]) options[5].text = "投資・資金調達";
            if (options[6]) options[6].text = "その他";
        }
    }
}

// Language switcher with throttling
function initLanguageSwitcher() {
    let isThrottling = false;
    
    // Create language switcher button if not exists
    let langSwitcher = document.querySelector('.header__lang-switcher');
    if (!langSwitcher) {
        const nav = document.querySelector('.header__nav');
        if (nav) {
            langSwitcher = document.createElement('button');
            langSwitcher.className = 'header__lang-switcher';
            langSwitcher.textContent = 'EN';
            langSwitcher.setAttribute('aria-label', '言語切り替え');
            nav.appendChild(langSwitcher);
        }
    }
    
    if (langSwitcher) {
        let currentLang = localStorage.getItem('fujiOS_language') || 'ja';
        langSwitcher.textContent = currentLang === 'ja' ? 'EN' : '日本語';
        
        langSwitcher.addEventListener('click', () => {
            // Throttling to prevent rapid clicking
            if (isThrottling) return;
            
            isThrottling = true;
            setTimeout(() => {
                isThrottling = false;
            }, CONFIG.LANGUAGE_SWITCH_THROTTLE);
            
            // Toggle language
            currentLang = currentLang === 'ja' ? 'en' : 'ja';
            updateContent(currentLang);
            langSwitcher.textContent = currentLang === 'ja' ? 'EN' : '日本語';
        });
    }
}

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

    // --- Chart animation triggers ---
    // Use Intersection Observer API to monitor elements entering viewport and trigger animations
    // threshold: trigger when 30% of element is visible
    // rootMargin: reserve 100px trigger area at bottom of viewport for preloading animations
    const observerOptions = {
        threshold: CONFIG.INTERSECTION_THRESHOLD,
        rootMargin: CONFIG.INTERSECTION_MARGIN
    };

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    const chartElement = document.querySelector('.tourism-trend');
    if (chartElement) {
        chartObserver.observe(chartElement);
    }

    // --- OS introduction section content expander ---
    const osDetailExpander = document.getElementById('osDetailExpander');
    const osDetailContent = document.getElementById('osDetailContent');

    if (osDetailExpander && osDetailContent) {
        osDetailExpander.addEventListener('click', () => {
            const isActive = osDetailExpander.classList.contains('active');
            const currentLang = localStorage.getItem('fujiOS_language') || 'ja';
            
            if (isActive) {
                // Collapse content
                osDetailExpander.classList.remove('active');
                osDetailContent.classList.remove('active');
                const expandText = currentLang === 'ja' ? '詳しく見る' : 'Learn More';
                osDetailExpander.querySelector('.expander-button__text').textContent = expandText;
            } else {
                // Expand content
                osDetailExpander.classList.add('active');
                osDetailContent.classList.add('active');
                const collapseText = currentLang === 'ja' ? '閉じる' : 'Close';
                osDetailExpander.querySelector('.expander-button__text').textContent = collapseText;
                
                // Smooth scroll to expanded content area after 300ms delay to ensure CSS animation completion
                setTimeout(() => {
                    osDetailContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'  // Scroll to nearest visible edge
                    });
                }, CONFIG.ANIMATION_DELAY + 100);  // Use config constant + additional delay
            }
        });
    }

    // --- Advantage card animation triggers ---
    // Implement scroll-triggered animation effects for three advantage cards in OS introduction section
    // Default state is paused, animations start when cards enter viewport
    const advantageCards = document.querySelectorAll('.advantage-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.2,  // Trigger when 20% visible
        rootMargin: '0px 0px -50px 0px'  // Trigger 50px early
    });

    // Initialize all cards to paused state and add observers
    advantageCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        cardObserver.observe(card);
    });

    // --- Pillar sections slide-in animation triggers ---
    const pillarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visual = entry.target.querySelector('.pillar-section__visual');
                const content = entry.target.querySelector('.pillar-section__content');
                
                if (visual) {
                    setTimeout(() => {
                        visual.classList.add('animate');
                    }, 200);
                }
                
                if (content) {
                    setTimeout(() => {
                        content.classList.add('animate');
                    }, 400);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Generic expander handler function
    function setupExpander(expanderId, contentId) {
        const expander = document.getElementById(expanderId);
        const content = document.getElementById(contentId);

        if (expander && content) {
            expander.addEventListener('click', () => {
                const isActive = expander.classList.contains('active');
                const currentLang = localStorage.getItem('fujiOS_language') || 'ja';
                
                if (isActive) {
                    // Collapse content
                    expander.classList.remove('active');
                    content.classList.remove('active');
                    const expandText = currentLang === 'ja' ? '詳しく見る' : 'Learn More';
                    expander.querySelector('.expander-button__text').textContent = expandText;
                } else {
                    // Expand content
                    expander.classList.add('active');
                    content.classList.add('active');
                    const collapseText = currentLang === 'ja' ? '閉じる' : 'Close';
                    expander.querySelector('.expander-button__text').textContent = collapseText;
                    
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

    // Setup expanders for all pillar sections
    setupExpander('ecoGoDetailExpander', 'ecoGoDetailContent');
    setupExpander('anshinDetailExpander', 'anshinDetailContent');
    setupExpander('avatarsDetailExpander', 'avatarsDetailContent');
    setupExpander('naviDetailExpander', 'naviDetailContent');
    setupExpander('engineDetailExpander', 'engineDetailContent');

    // Observe all pillar sections
    const pillarSections = document.querySelectorAll('.pillar-section');
    pillarSections.forEach(section => {
        pillarObserver.observe(section);
    });

    // --- Economic engine section slide-in animation triggers ---
    const engineSection = document.querySelector('.engine-section');
    const engineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target.querySelector('.engine-section__container');
                if (container) {
                    setTimeout(() => {
                        container.classList.add('animate');
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    if (engineSection) {
        engineObserver.observe(engineSection);
    }

    // --- Future co-creation partnership section slide-in animation triggers ---
    const partnershipSection = document.querySelector('.partnership-section');
    const partnershipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target.querySelector('.partnership-section__container');
                if (container) {
                    setTimeout(() => {
                        container.classList.add('animate');
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    if (partnershipSection) {
        partnershipObserver.observe(partnershipSection);
    }

    // --- Partnership form submission handling ---
    const partnershipForm = document.getElementById('partnershipForm');
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(partnershipForm);
            const data = {
                name: formData.get('name'),
                company: formData.get('company'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                interest: formData.get('interest'),
                message: formData.get('message')
            };
            
            // Simulate form submission (in real project would send to server)
            const submitButton = partnershipForm.querySelector('.form-button');
            const originalText = submitButton.querySelector('.form-button__text').textContent;
            
            // Button state change
            submitButton.disabled = true;
            submitButton.querySelector('.form-button__text').textContent = '送信中...';
            
            // Simulate network delay
            setTimeout(() => {
                submitButton.querySelector('.form-button__text').textContent = '送信完了！';
                
                // Show success message
                const currentLang = localStorage.getItem('fujiOS_language') || 'ja';
                const message = currentLang === 'ja' 
                    ? 'お問い合わせありがとうございます！\n2-3営業日以内にご連絡させていただきます。'
                    : 'Thank you for your inquiry!\nWe will contact you within 2-3 business days.';
                alert(message);
                
                // Reset form
                partnershipForm.reset();
                
                // Restore button state
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.querySelector('.form-button__text').textContent = originalText;
                }, 2000);
            }, 1500);
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
                const currentLang = localStorage.getItem('fujiOS_language') || 'ja';
                const message = currentLang === 'ja'
                    ? '白書のダウンロードが開始されました。\n技術仕様と実装ロードマップをご確認ください。'
                    : 'Whitepaper download has started.\nPlease check the technical specifications and implementation roadmap.';
                alert(message);
                
                // In real project, this would trigger actual file download
                // window.open('/path/to/fuji-os-whitepaper.pdf', '_blank');
                
                // Restore button state
                downloadButton.style.opacity = '1';
                downloadButton.style.pointerEvents = 'auto';
            }, 1000);
        });
    }

    // === Internationalization initialization ===
    // Initialize language switcher
    initLanguageSwitcher();
    
    // Load default language content (only if not Japanese, since HTML already contains Japanese)
    const savedLanguage = localStorage.getItem('fujiOS_language') || 'ja';
    updateContent(savedLanguage);
});