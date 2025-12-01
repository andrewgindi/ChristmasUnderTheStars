document.addEventListener('DOMContentLoaded', function() {
    // Make video stop on the last frame
    const video = document.querySelector('.nativity-background video');
    if (video) {
        video.addEventListener('ended', function() {
            // When video ends, pause on the last frame
            this.pause();
        });
    }
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Parallax Effect for Stars
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for stars layers
        document.querySelector('.stars-small').style.transform = `translateY(${scrollPosition * 0.1}px)`;
        document.querySelector('.stars-medium').style.transform = `translateY(${scrollPosition * 0.2}px)`;
        document.querySelector('.stars-large').style.transform = `translateY(${scrollPosition * 0.3}px)`;
        
        // Header transparency based on scroll
        const header = document.querySelector('header');
        if (scrollPosition > 100) {
            header.style.backgroundColor = 'rgba(0, 18, 88, 0.3)';
        } else {
            header.style.backgroundColor = 'transparent';
        }
    });
    
    // Form Submission
    const qaForm = document.getElementById('qa-form');
    if (qaForm) {
        qaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const question = document.getElementById('question').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you, ${name}!</h3>
                <p>Your question has been submitted successfully. We'll get back to you soon at ${email}.</p>
            `;
            
            // Replace form with success message
            qaForm.innerHTML = '';
            qaForm.appendChild(successMessage);
            
            // Style the success message
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '20px';
            successMessage.style.animation = 'fadeIn 0.5s ease-in-out';
            
            // Log to console (for demonstration)
            console.log('Form submitted:', { name, email, question });
        });
    }
    
    // Create animated stars in the background
    createAnimatedStars();
});

// Function to create animated stars
function createAnimatedStars() {
    const starsContainer = document.querySelector('.stars-container');
    
    // Create 50 random stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'animated-star';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3 + 1;
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        
        // Set star styles
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        
        // Add star to container
        starsContainer.appendChild(star);
    }
}

// Add CSS for animated stars
const starStyles = document.createElement('style');
starStyles.innerHTML = `
    .animated-star {
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        animation: twinkle ease-in-out infinite;
    }
    
    @keyframes twinkle {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(starStyles);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});