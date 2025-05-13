// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Carregado e Script Iniciado.");

    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const contentSections = document.querySelectorAll('.main-content-area > div[id$="-section"]');
    const widgetCards = document.querySelectorAll('.dashboard-widgets .widget-card');

    console.log("Nav Links Encontrados:", navLinks.length);
    console.log("Content Sections Encontradas:", contentSections.length, contentSections);
    console.log("Widget Cards Encontrados:", widgetCards.length);

    const showSection = (sectionId) => {
        console.log("showSection chamada para:", sectionId);
        let sectionFound = false;
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
                sectionFound = true;
                console.log("Mostrando secção:", section.id);
            } else {
                section.style.display = 'none';
                // console.log("Escondendo secção:", section.id); // Descomentar para log mais detalhado
            }
        });
        if (!sectionFound) {
            console.warn("Nenhuma secção encontrada com o ID:", sectionId);
        }

        if (sectionId === 'dashboard-section') {
            renderCharts();
        }
    };

    const updateActiveLink = (activeSectionId) => {
        console.log("updateActiveLink chamada para:", activeSectionId);
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
            console.log("Nav Link Clicado. Target:", targetSectionId);
            if (targetSectionId) {
                showSection(targetSectionId);
                updateActiveLink(targetSectionId);
                try {
                    history.pushState(null, '', link.getAttribute('href'));
                } catch (error) {
                    console.warn("history.pushState falhou:", error);
                }
            } else {
                console.warn("Nav Link clicado não tem data-section:", link);
            }
        });
    });

    widgetCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetSectionId = card.getAttribute('data-section-target');
            console.log("Widget Card Clicado. Target:", targetSectionId);
            if (targetSectionId && document.getElementById(targetSectionId)) {
                showSection(targetSectionId);
                updateActiveLink(targetSectionId); // Atualiza o link ativo no sidebar
                 try {
                    history.pushState(null, '', `#${targetSectionId.replace('-section', '')}`);
                } catch (error) {
                    console.warn("history.pushState falhou:", error);
                }
            } else {
                console.warn("Widget Card clicado não tem data-section-target válido ou o elemento não foi encontrado:", targetSectionId, card);
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
        console.log("Tentando renderizar gráficos.");
         if (window.experienceHighlightsChartInstance) {
            window.experienceHighlightsChartInstance.destroy();
            console.log("Instância de gráfico anterior destruída.");
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
            console.log("Novo gráfico renderizado.");
        } else {
            console.warn("Canvas do gráfico 'experienceHighlightsChart' não encontrado.");
        }
    };

    const initialHash = window.location.hash.substring(1);
    let initialSectionId = 'dashboard-section';
    console.log("Hash Inicial:", initialHash);

    if (initialHash) {
        // Tenta corresponder ao ID completo com '-section' ou apenas ao nome base
        const potentialSectionIdWithSuffix = initialHash.endsWith('-section') ? initialHash : initialHash + '-section';
        const potentialSectionIdWithoutSuffix = initialHash.replace('-section', '');

        if (document.getElementById(potentialSectionIdWithSuffix)) {
            initialSectionId = potentialSectionIdWithSuffix;
        } else if (document.getElementById(potentialSectionIdWithoutSuffix + '-section')) {
            // Se o hash era, por exemplo, #profile e existe #profile-section
            initialSectionId = potentialSectionIdWithoutSuffix + '-section';
        }
    }
    console.log("Secção Inicial a ser mostrada:", initialSectionId);

    showSection(initialSectionId);
    updateActiveLink(initialSectionId);
});
