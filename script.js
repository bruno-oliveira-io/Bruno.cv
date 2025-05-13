// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Carregado e Script Iniciado.");
    // alert("Script Iniciado!"); // Descomente esta linha para um teste muito básico se o script está a ser carregado e executado

    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const contentSections = document.querySelectorAll('.main-content-area > div[id$="-section"]'); // Seleciona divs filhos diretos que terminam com -section
    const widgetCards = document.querySelectorAll('.dashboard-widgets .widget-card');

    console.log("Nav Links Encontrados:", navLinks.length);
    if (navLinks.length === 0) console.warn("Nenhum .nav-link encontrado em .sidebar-nav!");

    console.log("Content Sections Encontradas:", contentSections.length);
    if (contentSections.length === 0) console.warn("Nenhuma secção de conteúdo encontrada em .main-content-area > div[id$='-section']!");
    // contentSections.forEach(s => console.log("Secção encontrada:", s.id)); // Log detalhado das secções

    console.log("Widget Cards Encontrados:", widgetCards.length);
    if (widgetCards.length === 0) console.warn("Nenhum .widget-card encontrado em .dashboard-widgets!");


    const showSection = (sectionId) => {
        console.log("showSection chamada para:", sectionId);
        let sectionFound = false;
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block'; // Assegura que é 'block' para ser visível
                sectionFound = true;
                console.log("Mostrando secção:", section.id);
            } else {
                section.style.display = 'none';
                // console.log("Escondendo secção:", section.id);
            }
        });
        if (!sectionFound) {
            console.error("ERRO: Nenhuma secção encontrada com o ID:", sectionId); // Mudado para erro para maior destaque
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

    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // alert(`Link ${index} clicado!`); // Teste básico para ver se o evento é capturado
            const targetSectionId = link.getAttribute('data-section');
            console.log(`Nav Link #${index} ('${link.textContent.trim()}') Clicado. Target:`, targetSectionId);
            if (targetSectionId) {
                showSection(targetSectionId);
                updateActiveLink(targetSectionId);
                try {
                    history.pushState(null, '', link.getAttribute('href'));
                } catch (error) {
                    console.warn("history.pushState falhou:", error);
                }
            } else {
                console.error("Nav Link clicado não tem data-section:", link);
            }
        });
    });

    widgetCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // alert(`Widget ${index} clicado!`); // Teste básico
            const targetSectionId = card.getAttribute('data-section-target');
            console.log(`Widget Card #${index} Clicado. Target:`, targetSectionId);
            if (targetSectionId) {
                const targetElement = document.getElementById(targetSectionId);
                if (targetElement) {
                    showSection(targetSectionId);
                    updateActiveLink(targetSectionId);
                    try {
                        history.pushState(null, '', `#${targetSectionId.replace('-section', '')}`);
                    } catch (error) {
                        console.warn("history.pushState falhou:", error);
                    }
                } else {
                    console.error(`Elemento alvo do Widget Card ('${targetSectionId}') não encontrado no DOM.`);
                }
            } else {
                console.error("Widget Card clicado não tem data-section-target válido:", card);
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
        const potentialSectionIdWithSuffix = initialHash.endsWith('-section') ? initialHash : initialHash + '-section';
        let idToTest = potentialSectionIdWithSuffix;

        if (!document.getElementById(idToTest)) {
            // Tenta o id base (sem -section) e adiciona -section
            const baseId = initialHash.replace('-section', '');
            idToTest = baseId + '-section';
        }
        
        if (document.getElementById(idToTest)) {
            initialSectionId = idToTest;
        } else {
            console.warn(`Secção inicial do Hash ('${initialHash}' -> tentado '${idToTest}') não encontrada, a usar dashboard por defeito.`);
        }
    }
    console.log("Secção Inicial a ser mostrada:", initialSectionId);

    showSection(initialSectionId);
    updateActiveLink(initialSectionId);
});
