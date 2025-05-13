// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const contentSections = document.querySelectorAll('.main-content-area > div[id$="-section"]');
    const widgetCards = document.querySelectorAll('.dashboard-widgets .widget-card');

    const showSection = (sectionId) => {
        contentSections.forEach(section => {
            if (section.id === 'dashboard-section' && sectionId === 'dashboard-section') {
                section.style.display = 'block';
            } else if (section.id === 'dashboard-section' && sectionId !== 'dashboard-section') {
                section.style.display = 'none';
            } else {
                 section.style.display = (section.id === sectionId) ? 'block' : 'none';
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
            try {
                history.pushState(null, '', link.getAttribute('href'));
            } catch (error)
                {
                console.warn("history.pushState is not available or failed:", error);
            }
        });
    });

    widgetCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetSectionId = card.getAttribute('data-section-target');
            if (targetSectionId && document.getElementById(targetSectionId)) {
                showSection(targetSectionId);
                updateActiveLink(targetSectionId);
                 try {
                    history.pushState(null, '', `#${targetSectionId.replace('-section', '')}`);
                } catch (error) {
                    console.warn("history.pushState is not available or failed:", error);
                }
            }
        });
    });

    const experienceHighlightsData = {
        labels: ['Software Development', 'Project Management', 'Product Management'],
        datasets: [{
            label: 'Years of Experience',
            data: [7, 9, 6],
            backgroundColor: [
                '#5DA5DA',
                '#60BDA8',
                '#F1A861'
            ],
            borderColor: '#FFFFFF',
            borderWidth: 2
        }]
    };

    window.experienceHighlightsChartInstance = null;

    const renderCharts = () => {
         if (window.experienceHighlightsChartInstance) {
            window.experienceHighlightsChartInstance.destroy();
         }
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
                            labels: {
                                color: '#495057',
                                font: { size: 11 },
                                boxWidth: 15,
                                padding: 15
                            }
                        },
                        title: {
                            display: false,
                        }
                     },
                     cutout: '0%',
                }
            });
        }
    };

    const initialHash = window.location.hash.substring(1);
    let initialSectionId = 'dashboard-section';

    if (initialHash) {
        const potentialSectionId = initialHash.endsWith('-section') ? initialHash : initialHash + '-section';
        if (document.getElementById(potentialSectionId)) {
            initialSectionId = potentialSectionId;
        }
    }

    showSection(initialSectionId);
    updateActiveLink(initialSectionId);

});
