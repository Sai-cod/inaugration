// Loading Animation Text
const loadingTexts = [
    'Welcome to Microsoft Student Ambassadors',
    'Where Innovation Meets Leadership'
];

// Particle Animation
const createParticles = () => {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.animationDelay = Math.random() + 's';
        particleContainer.appendChild(particle);
    }
};

// Handle Loading Screen
const handleLoadingScreen = async () => {
    const typingText = document.querySelector('.typing-text');
    const loadingScreen = document.querySelector('.loading-screen');
    const msLogo = document.querySelector('.ms-logo');

    createParticles();
    msLogo.style.animation = 'pulse 1.5s infinite, rotate3D 2s infinite';

    for (const text of loadingTexts) {
        await typeText(typingText, text);
        await sleep(1200);
        await deleteText(typingText);
        await sleep(500);
    }

    loadingScreen.style.transform = 'scale(1.1)';
    loadingScreen.style.opacity = '0';
    await sleep(800);
    loadingScreen.style.display = 'none';

    // Animate sections after loading
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animation = `slideInFromBottom 0.8s ease-out ${index * 0.2}s forwards`;
    });
};

// Typing Animation
const typeText = async (element, text) => {
    for (let char of text) {
        element.textContent += char;
        await sleep(30);
    }
};

// Delete Animation
const deleteText = async (element) => {
    const text = element.textContent;
    for (let i = text.length; i > 0; i--) {
        element.textContent = text.substring(0, i - 1);
        await sleep(20);
    }
};

// Sleep Helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.about, .team, .events, .contact, .benefit-item, .stat-item, .event-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize Scroll Reveal
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Parallax effect for hero section
// const heroContent = document.querySelector('.hero-content');
// const heroAnimation = document.querySelector('.hero-animation');

// window.addEventListener('scroll', () => {
//     const scrollY = window.scrollY;
//     if (heroContent) {
//         heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
//     }
//     if (heroAnimation) {
//         heroAnimation.style.transform = `translateY(${scrollY * 0.5}px)`;
//     }
// });

// // Scroll-triggered scaling for code block
// const codeBlock = document.querySelector('.code-block');

// window.addEventListener('scroll', () => {
//     if (!codeBlock) return;
//     const rect = codeBlock.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
//     if (rect.top < windowHeight && rect.bottom > 0) {
//         const scale = 1 + (windowHeight - rect.top) / windowHeight * 0.1;
//         codeBlock.style.transform = `scale(${scale})`;
//     } else {
//         codeBlock.style.transform = 'scale(1)';
//     }
// });

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Add loading state to button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission
            await sleep(1500);
            // Reset form
            contactForm.reset();
            alert('Message sent successfully!');
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const highlightNavOnScroll = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
};

// Event Listeners
window.addEventListener('scroll', () => {
    revealOnScroll();
    highlightNavOnScroll();
});

window.addEventListener('load', () => {
    handleLoadingScreen();
    revealOnScroll();
});


// Inauguration Screen Handling
const inaugurationScreen = document.getElementById('inauguration-screen');
const launchBtn = document.getElementById('launch-btn');

if (launchBtn) {
  launchBtn.addEventListener('click', () => {
    inaugurationScreen.style.transition = 'opacity 0.8s ease';
    inaugurationScreen.style.opacity = '0';
    setTimeout(() => {
      inaugurationScreen.style.display = 'none';
    }, 800);
  });
}


// Lightbox for Team Member Photos
const teamPhotos = document.querySelectorAll('.team-photo img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

teamPhotos.forEach(photo => {
    photo.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.alt;
    });
});

// Close on X button
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close on outside click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

