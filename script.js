document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const contentSections = document.querySelectorAll('.main-content-area .content-card-style');
    const widgetCards = document.querySelectorAll('.dashboard-widgets .widget-card');

    const showSection = (sectionId) => {
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
        if (sectionId === 'dashboard-section') {
            renderCharts();
        }
    };

    const updateActiveLink = (activeSectionId) => {
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === activeSectionId) {
                 link.classList.add('active');
            } else {
                 link.classList.remove('active');
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = link.getAttribute('data-section');
            showSection(targetSectionId);
            updateActiveLink(targetSectionId);
            history.pushState(null, '', link.getAttribute('href'));
        });
    });

    widgetCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetSectionId = card.getAttribute('data-section-target');
            showSection(targetSectionId);
            updateActiveLink(targetSectionId);
            history.pushState(null, '', `#${targetSectionId.replace('-section', '')}`);
        });
    });

    // --- Chart Rendering ---
    const experienceHighlightsData = {
        labels: ['Software Development', 'Project Management', 'Product Management'],
        datasets: [{
            label: 'Years of Experience',
            data: [7, 9, 6],
            backgroundColor: [
                'rgba(0, 123, 255, 0.8)',
                'rgba(40, 167, 69, 0.8)',
                'rgba(255, 193, 7, 0.8)'
            ],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    };

    const renderCharts = () => {
         if (window.experienceHighlightsChartInstance) window.experienceHighlightsChartInstance.destroy();

        const experienceHighlightsCanvas = document.getElementById('experienceHighlightsChart');
        if (experienceHighlightsCanvas) {
            const experienceHighlightsCtx = experienceHighlightsCanvas.getContext('2d');
            window.experienceHighlightsChartInstance = new Chart(experienceHighlightsCtx, {
                type: 'pie',
                data: experienceHighlightsData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                     plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Experience Breakdown by Role'
                        }
                     }
                }
            });
        }
    };

    const initialHash = window.location.hash.substring(1);
    const initialSectionId = initialHash ? initialHash + '-section' : 'dashboard-section';

    showSection(initialSectionId);
    updateActiveLink(initialSectionId);

    if (initialSectionId === 'dashboard-section') {
        renderCharts();
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const dashboardSection = document.getElementById('dashboard-section');
                if (dashboardSection && dashboardSection.style.display !== 'none') {
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
