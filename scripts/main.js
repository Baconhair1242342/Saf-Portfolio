// scripts/main.js - SAF 3D Modeler Portfolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('SAF 3D Modeler Portfolio loaded!');
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                const icon = document.querySelector('.menu-toggle i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Generate 32 gallery items
    const galleryGrid = document.getElementById('portfolio-gallery');
    if (galleryGrid) {
        // Categories for filtering
        const categories = ['weapons', 'creatures', 'accessories', 'weapons', 'creatures', 'accessories'];
        const categoryNames = {
            'weapons': 'Weapon',
            'creatures': 'Creature',
            'accessories': 'Accessory'
        };
        
        for (let i = 1; i <= 32; i++) {
            const category = categories[i % categories.length];
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', category);
            
            galleryItem.innerHTML = `
                <div class="image-container">
                    <div class="image-placeholder">
                        <i class="fas fa-image"></i>
                        <div class="placeholder-text">Portfolio Image ${i}</div>
                        <div class="placeholder-text">${categoryNames[category]} Design</div>
                    </div>
                    <img src="" alt="SAF 3D Model ${i}" style="display: none;">
                </div>
                <span class="gallery-category">${categoryNames[category]}</span>
            `;
            
            galleryGrid.appendChild(galleryItem);
        }
    }
    
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    const allImages = Array.from(galleryItems);
    
    // Open lightbox when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const categoryName = categoryNames[category] || '3D Model';
            
            // Create image for lightbox
            lightboxImage.innerHTML = `
                <div class="image-placeholder" style="width: 100%; height: 100%;">
                    <i class="fas fa-cube" style="font-size: 3rem;"></i>
                    <div class="placeholder-text" style="font-size: 1.2rem; margin-top: 15px;">Portfolio Image ${index + 1}</div>
                    <div class="placeholder-text">${categoryName} Design by SAF</div>
                    <div class="placeholder-text" style="font-size: 0.9rem; margin-top: 10px;">In a real implementation, this would be your actual 3D model image</div>
                </div>
            `;
            
            lightboxTitle.textContent = `${categoryName} Design ${index + 1}`;
            lightboxDesc.textContent = `Professional 3D ${categoryName.toLowerCase()} model created by SAF`;
            
            currentImageIndex = index;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Click on lightbox background to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Lightbox navigation
    function showImage(index) {
        if (index < 0) index = allImages.length - 1;
        if (index >= allImages.length) index = 0;
        
        currentImageIndex = index;
        const item = allImages[currentImageIndex];
        const category = item.getAttribute('data-category');
        const categoryName = categoryNames[category] || '3D Model';
        
        // Update lightbox
        lightboxImage.innerHTML = `
            <div class="image-placeholder" style="width: 100%; height: 100%;">
                <i class="fas fa-cube" style="font-size: 3rem;"></i>
                <div class="placeholder-text" style="font-size: 1.2rem; margin-top: 15px;">Portfolio Image ${index + 1}</div>
                <div class="placeholder-text">${categoryName} Design by SAF</div>
            </div>
        `;
        
        lightboxTitle.textContent = `${categoryName} Design ${index + 1}`;
        lightboxDesc.textContent = `Professional 3D ${categoryName.toLowerCase()} model created by SAF`;
    }
    
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });
    
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                showImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentImageIndex + 1);
            }
        }
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Animate features and gallery items
    document.querySelectorAll('.feature, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add CSS for animations
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .feature.animate-in, 
            .gallery-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Highlight active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Log gallery info for debugging
    console.log(`Gallery created with ${allImages.length} items`);
    console.log('Twitter link: https://x.com/safwatdj19');
});