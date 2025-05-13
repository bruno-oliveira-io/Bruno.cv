// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const contentSections = document.querySelectorAll('.main-content-area > div[id$="-section"]'); // Seleciona divs filhos diretos que terminam com -section
    const widgetCards = document.querySelectorAll('.dashboard-widgets .widget-card');

    const showSection = (sectionId) => {
        contentSections.forEach(section => {
            // A secção do dashboard é um contentor, não um cartão, então não a escondemos da mesma forma
            if (section.id === 'dashboard-section' && sectionId === 'dashboard-section') {
                section.style.display = 'block'; // Ou 'flex' ou 'grid' dependendo do layout interno
            } else if (section.id === 'dashboard-section' && sectionId !== 'dashboard-section') {
                section.style.display = 'none';
            } else { // Para todas as outras secções que são cartões
                 section.style.display = (section.id === sectionId) ? 'block' : 'none';
            }
        });
        // Renderiza gráficos apenas quando a secção do dashboard é mostrada
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
                // Em alguns ambientes (ex: snippets de código), pushState pode não funcionar
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

    // --- Chart Rendering ---
    // Dados do gráfico (mantidos do seu script original)
    const experienceHighlightsData = {
        labels: ['Software Development', 'Project Management', 'Product Management'],
        datasets: [{
            label: 'Years of Experience',
            data: [7, 9, 6],
            backgroundColor: [ // Cores para o gráfico de pizza
                '#5DA5DA', // Azul
                '#60BDA8', // Verde-água
                '#F1A861'  // Laranja/Pêssego
            ],
            borderColor: '#FFFFFF', // Borda branca entre segmentos
            borderWidth: 2
        }]
    };

    // Variável global para a instância do gráfico para poder destruí-la
    window.experienceHighlightsChartInstance = null;

    const renderCharts = () => {
         if (window.experienceHighlightsChartInstance) {
            window.experienceHighlightsChartInstance.destroy();
         }
        const experienceHighlightsCanvas = document.getElementById('experienceHighlightsChart');
        if (experienceHighlightsCanvas) {
            const experienceHighlightsCtx = experienceHighlightsCanvas.getContext('2d');
            window.experienceHighlightsChartInstance = new Chart(experienceHighlightsCtx, {
                type: 'pie', // Tipo de gráfico
                data: experienceHighlightsData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                     plugins: {
                        legend: {
                            position: 'bottom', // Posição da legenda
                            labels: {
                                color: '#495057', // Cor do texto da legenda
                                font: { size: 11 },
                                boxWidth: 15,
                                padding: 15
                            }
                        },
                        title: { // Título do gráfico (opcional)
                            display: false, // Desabilitado para um look mais limpo
                            // text: 'Experience Breakdown'
                        }
                     },
                     cutout: '0%', // '0%' para gráfico de pizza, >0% para doughnut
                }
            });
        }
    };

    // Lógica para mostrar a secção inicial baseada no URL hash
    const initialHash = window.location.hash.substring(1);
    let initialSectionId = 'dashboard-section'; // Secção padrão

    if (initialHash) {
        const potentialSectionId = initialHash.endsWith('-section') ? initialHash : initialHash + '-section';
        if (document.getElementById(potentialSectionId)) {
            initialSectionId = potentialSectionId;
        }
    }

    showSection(initialSectionId);
    updateActiveLink(initialSectionId);

});
