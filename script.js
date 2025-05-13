   // JavaScript to handle navigation, display sections, and render charts
        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-link');
            const contentSections = document.querySelectorAll('.content-section');
            const widgetCards = document.querySelectorAll('.widget-card'); // Get widget cards

            // Function to show a specific section and hide others
            const showSection = (sectionId) => {
                contentSections.forEach(section => {
                    if (section.id === sectionId) {
                        section.style.display = 'block'; // Show the target section
                    } else {
                        section.style.display = 'none'; // Hide other sections
                    }
                });
            };

            // Function to update active link class
            const updateActiveLink = (activeSectionId) => {
                navLinks.forEach(link => {
                    if (link.getAttribute('data-section') === activeSectionId) {
                         link.classList.add('active');
                    } else {
                         link.classList.remove('active');
                    }
                });
            };

            // Add click event listeners to navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default anchor link behavior
                    const targetSectionId = link.getAttribute('data-section');
                    showSection(targetSectionId);
                    updateActiveLink(targetSectionId);

                    // Optional: Update URL hash without page reload
                    history.pushState(null, '', link.getAttribute('href'));
                });
            });

            // Add click event listeners to widget cards
            widgetCards.forEach(card => {
                card.addEventListener('click', () => {
                    const targetSectionId = card.getAttribute('data-section-target');
                    showSection(targetSectionId);
                    updateActiveLink(targetSectionId); // Update active nav link when widget is clicked

                    // Optional: Update URL hash
                     history.pushState(null, '', `#${targetSectionId.replace('-section', '')}`);
                });
            });


            // --- Chart Rendering ---
            // Data for Experience Highlights Pie Chart - REPLACE WITH YOUR ACTUAL DATA
            const experienceHighlightsData = {
                labels: ['Software Development', 'Project Management', 'Product Management'], // Labels from your CV
                datasets: [{
                    label: 'Years of Experience',
                    data: [7, 9, 6], // Corresponding years from your CV
                    backgroundColor: [
                        'rgba(0, 123, 255, 0.8)', // Blue
                        'rgba(40, 167, 69, 0.8)', // Green
                        'rgba(255, 193, 7, 0.8)' // Yellow
                    ],
                    borderColor: '#ffffff', // White border for slices
                    borderWidth: 2
                }]
            };


            // Render charts when the dashboard section is shown
            const renderCharts = () => {
                 // Destroy existing chart if it exists to prevent duplicates
                 if (window.experienceHighlightsChartInstance) window.experienceHighlightsChartInstance.destroy();


                // Experience Highlights Chart (Pie Chart)
                const experienceHighlightsCtx = document.getElementById('experienceHighlightsChart').getContext('2d');
                window.experienceHighlightsChartInstance = new Chart(experienceHighlightsCtx, {
                    type: 'pie', // Changed to pie chart
                    data: experienceHighlightsData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false, // Allow aspect ratio to be controlled by container
                         plugins: {
                            legend: {
                                position: 'bottom', // Position legend below the chart
                            },
                            title: {
                                display: true,
                                text: 'Experience Breakdown by Role' // Chart title
                            }
                         }
                    }
                });
            };

            // Handle initial load based on URL hash or default to dashboard
            const initialHash = window.location.hash.substring(1); // Get hash without '#'
            const initialSectionId = initialHash ? initialHash + '-section' : 'dashboard-section'; // Default to dashboard

            showSection(initialSectionId);
            updateActiveLink(initialSectionId);

            // Render charts if the initial section is the dashboard
            if (initialSectionId === 'dashboard-section') {
                renderCharts();
            }

            // Add an observer to re-render charts when the dashboard section becomes visible
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const dashboardSection = document.getElementById('dashboard-section');
                        if (dashboardSection.style.display !== 'none') {
                            renderCharts();
                        }
                    }
                });
            });

            const dashboardSectionElement = document.getElementById('dashboard-section');
            if (dashboardSectionElement) {
                 observer.observe(dashboardSectionElement, { attributes: true });
            }


        });
