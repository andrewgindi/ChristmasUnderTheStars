document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    
                    // Add animation
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    let currentImageIndex = 0;
    
    // Open lightbox when clicking on gallery image
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgTitle = this.querySelector('.overlay-content h3').textContent;
            const imgDesc = this.querySelector('.overlay-content p').textContent;
            
            // Set lightbox content
            lightboxImg.src = imgSrc;
            lightboxCaption.innerHTML = `<h3>${imgTitle}</h3><p>${imgDesc}</p>`;
            
            // Show lightbox
            lightbox.classList.add('active');
            
            // Set current image index
            currentImageIndex = index;
            
            // Disable scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Previous image
    lightboxPrev.addEventListener('click', function() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }
        updateLightboxImage();
    });
    
    // Next image
    lightboxNext.addEventListener('click', function() {
        currentImageIndex++;
        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        updateLightboxImage();
    });
    
    // Update lightbox image
    function updateLightboxImage() {
        const currentImage = galleryImages[currentImageIndex];
        const imgSrc = currentImage.querySelector('img').src;
        const imgTitle = currentImage.querySelector('.overlay-content h3').textContent;
        const imgDesc = currentImage.querySelector('.overlay-content p').textContent;
        
        // Add fade out animation
        lightboxImg.style.opacity = '0';
        lightboxCaption.style.opacity = '0';
        
        // Change image after fade out
        setTimeout(() => {
            lightboxImg.src = imgSrc;
            lightboxCaption.innerHTML = `<h3>${imgTitle}</h3><p>${imgDesc}</p>`;
            
            // Add fade in animation
            lightboxImg.style.opacity = '1';
            lightboxCaption.style.opacity = '1';
        }, 300);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex--;
            if (currentImageIndex < 0) {
                currentImageIndex = galleryImages.length - 1;
            }
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex++;
            if (currentImageIndex >= galleryImages.length) {
                currentImageIndex = 0;
            }
            updateLightboxImage();
        }
    });
    
    // Add CSS for lightbox transitions
    const style = document.createElement('style');
    style.textContent = `
        #lightbox-img, .lightbox-caption {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Photo upload form
    const uploadForm = document.getElementById('photo-upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const photo = document.getElementById('photo').files[0];
            const description = document.getElementById('description').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you, ${name}!</h3>
                <p>Your photo has been submitted successfully. After review, it will be added to our gallery.</p>
            `;
            
            // Replace form with success message
            uploadForm.innerHTML = '';
            uploadForm.appendChild(successMessage);
            
            // Style the success message
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '20px';
            successMessage.style.animation = 'fadeIn 0.5s ease-in-out';
            
            // Log to console (for demonstration)
            console.log('Photo submitted:', { name, email, photo: photo.name, description });
        });
    }
    
    // Add placeholder images if real images are not available
    document.querySelectorAll('.gallery-image img').forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder image if the image fails to load
            this.src = 'https://via.placeholder.com/400x300?text=Christmas+Under+The+Stars';
        });
    });
});