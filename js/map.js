document.addEventListener('DOMContentLoaded', function() {
    // Get all map locations
    const mapLocations = document.querySelectorAll('.map-location');
    const locationInfo = document.getElementById('location-info');
    
    // Add click event to each location
    mapLocations.forEach(location => {
        location.addEventListener('click', function() {
            // Get location data
            const name = this.getAttribute('data-name');
            const description = this.getAttribute('data-desc');
            
            // Update info box
            locationInfo.innerHTML = `
                <h4>${name}</h4>
                <p>${description}</p>
            `;
            
            // Highlight selected location
            mapLocations.forEach(loc => {
                loc.style.fill = loc === this ? 'rgba(233, 196, 106, 0.5)' : '';
            });
            
            // Add animation to info box
            locationInfo.style.animation = 'none';
            setTimeout(() => {
                locationInfo.style.animation = 'fadeIn 0.5s ease-in-out';
            }, 10);
        });
        
        // Add hover effect
        location.addEventListener('mouseenter', function() {
            this.style.fill = 'rgba(233, 196, 106, 0.3)';
        });
        
        location.addEventListener('mouseleave', function() {
            // Only reset if not the selected one
            if (!this.classList.contains('selected')) {
                this.style.fill = '';
            }
        });
    });
    
    // Make the map responsive
    const eventMap = document.getElementById('event-map');
    if (eventMap) {
        // Ensure the SVG is responsive
        eventMap.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
    
    // Add zoom functionality (simple implementation)
    let currentZoom = 1;
    const zoomStep = 0.1;
    const maxZoom = 2;
    const minZoom = 0.5;
    
    // Create zoom controls
    const mapContainer = document.querySelector('.map-image');
    if (mapContainer) {
        const zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';
        zoomControls.innerHTML = `
            <button id="zoom-in" title="Zoom In"><i class="fas fa-plus"></i></button>
            <button id="zoom-out" title="Zoom Out"><i class="fas fa-minus"></i></button>
            <button id="zoom-reset" title="Reset Zoom"><i class="fas fa-sync-alt"></i></button>
        `;
        mapContainer.appendChild(zoomControls);
        
        // Add zoom control styles
        const style = document.createElement('style');
        style.textContent = `
            .zoom-controls {
                position: absolute;
                bottom: 20px;
                right: 20px;
                display: flex;
                gap: 10px;
                z-index: 10;
            }
            
            .zoom-controls button {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .zoom-controls button:hover {
                background-color: rgba(233, 196, 106, 0.5);
                transform: translateY(-3px);
            }
            
            .map-image {
                position: relative;
                overflow: hidden;
            }
            
            #event-map {
                transition: transform 0.3s ease;
                transform-origin: center;
            }
        `;
        document.head.appendChild(style);
        
        // Add zoom functionality
        const zoomIn = document.getElementById('zoom-in');
        const zoomOut = document.getElementById('zoom-out');
        const zoomReset = document.getElementById('zoom-reset');
        
        zoomIn.addEventListener('click', function() {
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateZoom();
            }
        });
        
        zoomOut.addEventListener('click', function() {
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateZoom();
            }
        });
        
        zoomReset.addEventListener('click', function() {
            currentZoom = 1;
            updateZoom();
        });
        
        function updateZoom() {
            eventMap.style.transform = `scale(${currentZoom})`;
        }
    }
    
    // Add tooltip for map locations
    mapLocations.forEach(location => {
        const name = location.getAttribute('data-name');
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        tooltip.textContent = name;
        document.body.appendChild(tooltip);
        
        // Add tooltip styles
        const tooltipStyle = document.createElement('style');
        tooltipStyle.textContent = `
            .map-tooltip {
                position: absolute;
                background-color: rgba(0, 38, 66, 0.9);
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 14px;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                border: 1px solid var(--accent-color);
            }
        `;
        document.head.appendChild(tooltipStyle);
        
        // Show tooltip on hover
        location.addEventListener('mouseenter', function(e) {
            tooltip.style.opacity = '1';
            updateTooltipPosition(e);
        });
        
        location.addEventListener('mousemove', function(e) {
            updateTooltipPosition(e);
        });
        
        location.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
        
        function updateTooltipPosition(e) {
            const rect = eventMap.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            
            tooltip.style.left = `${x + 15}px`;
            tooltip.style.top = `${y - 25}px`;
        }
    });
});