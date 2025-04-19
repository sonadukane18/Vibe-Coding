document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // You can add your form submission logic here
    console.log('Form submitted:', { name, email, message });
    
    // Clear form
    this.reset();
    alert('Message sent successfully!');
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme or system preference
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply theme without transition on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Add transition class after initial load
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' 
            ? 'dark' 
            : 'light';
            
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Add scroll animation for about section
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.classList.contains('about-image-container')) {
                    target.classList.add('fade-in-left');
                } else if (target.classList.contains('about-text-container')) {
                    target.classList.add('fade-in-right');
                }
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe both containers
    const imageContainer = document.querySelector('.about-image-container');
    const textContainer = document.querySelector('.about-text-container');
    
    if (imageContainer && textContainer) {
        observer.observe(imageContainer);
        observer.observe(textContainer);
    }
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; // Adjust based on your navbar height
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Add active state to current section in navbar
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project data
const projectsData = {
    1: {
        title: 'Project 1',
        image: 'images/project1.jpg',
        description: 'Detailed description of project 1. Include the challenge, solution, and outcome.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveDemo: 'https://project1-demo.com',
        sourceCode: 'https://github.com/username/project1'
    },
    2: {
        title: 'Project 2',
        image: 'images/project2.jpg',
        description: 'E-commerce platform built with Vue.js and Firebase. Features include shopping cart functionality, user authentication, and payment integration using Stripe.',
        technologies: ['Vue.js', 'Firebase', 'Stripe', 'Tailwind CSS'],
        liveDemo: 'https://project2-demo.com',
        sourceCode: 'https://github.com/username/project2'
    },
    3: {
        title: 'Project 3',
        image: 'images/project3.jpg',
        description: 'A responsive portfolio website with dark mode toggle, smooth animations, and contact form integration. Built with modern HTML, CSS, and JavaScript.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        liveDemo: 'https://project3-demo.com',
        sourceCode: 'https://github.com/username/project3'
    }
};

// Modal functionality
const modal = document.getElementById('project-modal');
const projectCards = document.querySelectorAll('.project-card');
const closeModal = document.querySelector('.close-modal');

function openModal(projectId) {
    const project = projectsData[projectId];
    const modalContent = modal.querySelector('.modal-content');
    
    // Populate modal content
    modalContent.querySelector('h3').textContent = project.title;
    modalContent.querySelector('img').src = project.image;
    modalContent.querySelector('.project-details p').textContent = project.description;
    
    // Populate tech stack
    const techStack = modalContent.querySelector('.tech-stack');
    techStack.innerHTML = project.technologies
        .map(tech => `<li>${tech}</li>`)
        .join('');
    
    // Update links
    modalContent.querySelector('.live-demo').href = project.liveDemo;
    modalContent.querySelector('.source-code').href = project.sourceCode;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        openModal(projectId);
    });
});

closeModal.addEventListener('click', closeModalHandler);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalHandler();
    }
});