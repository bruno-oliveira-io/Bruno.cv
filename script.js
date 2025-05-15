// script.js

// Dados do CV (conteúdo em Inglês)
const cvData = {
    name: "Bruno Oliveira",
    title: "Product Manager",
    contact: {
        phone: "+351 963 623 430",
        email: "bruno.oliveira.io@outlook.com",
        linkedin: "linkedin.com/in/brunuoliveira/",
        linkedinUrl: "https://www.linkedin.com/in/brunuoliveira/"
    },
    experienceSummary: "For several years, I've immersed myself in the world of Product. It's here I discovered my true passion: to deeply understand user needs—the 'why' and 'what'—and to craft solutions for real-world challenges. I thrive in the dynamic environments of Startups and Scaleups, innovative and mission-driven companies where I genuinely love to contribute and make an impact. My journey has equipped me with a versatile skill set, enabling me to navigate complex product landscapes and deliver tangible results. I am constantly seeking to refine my approach, leveraging data and user feedback to drive impactful product decisions.",
    profile: [ // Textos encurtados para o widget "At a Glance"
        "7+ yrs Agile (9+ Waterfall)",
        "4+ yrs Startups/Scaleups",
        "6+ yrs Product Manager (5+ PO)",
        "9+ yrs Project Manager",
        "7+ yrs Software Engineer"
    ],
    productsAreas: "Expertise spans across Fintech, robust Platforms, secure Payments systems, complex Finance applications, insightful Advice tools, streamlined Onboarding processes, seamless Integrations, comprehensive Risk Assessment & Compliance (AML/ID&V), Document Management, E-signatures, Secure Messaging, efficient Workflows, innovative Crowdsourcing models, and Authorization frameworks.",
    skillsList: [
        "Product Management & Strategy", "Roadmap Development", "Requirements Definition", "Prioritization Frameworks",
        "Stakeholder Engagement", "Market Analysis", "Customer Research", "UX/UI & Research",
        "Cross-functional Collaboration", "Agile Methodologies", "Tools Administration (Atlassian Suite)"
    ],
    languages: [
        { lang: "Portuguese", level: "Native" },
        { lang: "English", level: "Professional" },
        { lang: "Spanish", level: "Intermediate" }
    ],
    professionalExperience: [
        {
            company: "FNZ",
            role: "Senior Product Manager",
            period: "August 2023 - Present",
            description: "Currently spearheading the development of a new world-class global solution for Advice and Wealth within the dynamic Fintech sector. Focused on delivering cutting-edge, user-centric products that redefine industry standards and enhance client engagement. Driving innovation from concept to launch, and ensuring alignment with overarching business objectives for maximum market impact.",
            areas: "Client Portal, Client App, Cross-platform features (Documents, E-Signatures, Notifications and Alerts), Fact-Find and Fees Builder, Income Management (Fees and Commissions), MI Widgets and Reports.",
            responsibilities: [
                "Driving the complete product lifecycle from ideation, through design, to strategic planning and execution.",
                "Conducting in-depth market research and fostering continuous user engagement to inform product direction.",
                "Defining and meticulously articulating detailed requirements and comprehensive product specifications.",
                "Collaborating effectively and building strong relationships with diverse stakeholders, SMEs, and end-users.",
                "Working in close, agile partnership with dedicated Design (UX/UI) and Technology teams to ensure quality delivery."
            ]
        },
        {
            company: "Advicefront (Acquired by FNZ)",
            role: "Senior Product Manager",
            period: "May 2022 - August 2023",
            description: "Pivotal in shaping an innovative Advice and Wealth Platform in the Fintech space, contributing to its successful acquisition and integration. Focused on enhancing user experience and platform capabilities, leading to measurable improvements in user satisfaction, operational efficiency, and overall product performance prior to the FNZ transition.",
            areas: "Onboarding, Documents, E-signatures, Integrations and Client portal for Advice Firms.",
            responsibilities: [
                "Successfully boosted overall delivery efficiency by a significant 25%.", 
                "Instrumental in achieving a 15% growth in the active user base.", 
                "Led strategic roadmap planning and conducted vital market research initiatives.", 
                "Expertly managed stakeholder expectations and ensured transparent communication.",
                "Championed Agile/PDLC best practices and served as Atlassian Administrator."
            ]
        },
         {
            company: "Axiomatics",
            role: "Senior Product Owner",
            period: "June 2021 - May 2022",
            description: "Contributed to advanced Authorization and Authentication solutions, enhancing platform security and user experience for enterprise clients. Focused on delivering robust and scalable security products that meet stringent industry requirements.",
            areas: "AuthZ, AuthN, Platform, Observability, UX/UI.",
            responsibilities: [
                "Led a key product area, maintaining close collaboration with the CPO and Engineering Lead.", 
                "Successfully introduced innovative new features and enhancements in Authentication services.", 
                "Facilitated the ideation, design, and execution of pivotal product features, ensuring alignment with strategic goals."
            ]
        },
    ],
    education: [
        {
            degree: "Information Systems Management",
            institution: "College of Business Administration (Setúbal)"
        },
        {
            degree: "Diverse Training & Certifications",
            institution: "Continuous learning in Business, Technology, Product Management, SLDC/PDLC Agile, Modern Tools, Data Analytics, Design Thinking, User Research, and Risk Management."
        }
    ]
};

// Elementos do DOM
const pageContentElement = document.getElementById('pageContent');
const navLinks = document.querySelectorAll('.nav-link');
const sidebarElement = document.getElementById('sidebar');
const mobileMenuButton = document.getElementById('mobileMenuButton');
const overlayElement = document.getElementById('overlay');
let skillsChart = null; // Variável para guardar a instância do gráfico

// Função para forçar o reinício das animações CSS
function reinitializeAnimationsForContent() {
    const animatedElements = pageContentElement.querySelectorAll('.section-title, .card');
    animatedElements.forEach(el => {
        el.style.animation = 'none'; // Remove a animação atual
        // Força o browser a "repintar" o elemento, para que a re-aplicação da animação funcione
        // eslint-disable-next-line no-unused-expressions
        void el.offsetWidth; 
        el.style.animation = ''; // Re-aplica a animação definida no CSS
    });
}

// Função para renderizar o gráfico de competências
function renderSkillsChart() {
    const chartCanvas = document.getElementById('skillsChart');
    if (!chartCanvas) return; // Sai se o canvas não existir

    const ctx = chartCanvas.getContext('2d');
    if (skillsChart) { // Destrói instância anterior do gráfico para evitar sobreposição
        skillsChart.destroy();
    }

    const skillsData = {
        labels: ['Product Strategy', 'Roadmapping', 'Agile', 'UX/UI', 'Stakeholder Mgt.', 'Market Analysis'],
        datasets: [{
            label: 'Proficiency', // Não visível devido a legend: false
            data: [90, 85, 95, 75, 88, 80], // Níveis de exemplo (0-100)
            backgroundColor: 'rgba(223, 255, 0, 0.25)', 
            borderColor: 'var(--accent-glow)', 
            pointBackgroundColor: 'var(--accent-glow)',
            pointBorderColor: 'var(--bg-card)', 
            pointHoverBackgroundColor: 'var(--bg-card)',
            pointHoverBorderColor: 'var(--accent-glow)',
            borderWidth: 1.5, 
            pointRadius: 2.5, 
            pointHoverRadius: 4.5
        }]
    };

    skillsChart = new Chart(ctx, {
        type: 'radar',
        data: skillsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(223, 255, 0, 0.15)' }, 
                    grid: { color: 'rgba(223, 255, 0, 0.15)' }, 
                    pointLabels: { 
                        color: 'var(--text-primary)', // Cor do texto das labels dos eixos (ex: 'Market Analysis')
                        font: { size: 8, weight: '400' } 
                    },
                    ticks: { 
                        backdropColor: 'transparent', 
                        color: 'var(--text-primary)', // Cor do texto dos números dos eixos (0, 20, 40, etc.)
                        font: { size: 7 }, 
                        stepSize: 20,
                        min: 0, // Garante que a escala começa em 0
                        max: 100 // Garante que a escala vai até 100
                    }
                }
            },
            plugins: {
                legend: { 
                    display: false // Oculta a legenda padrão do Chart.js
                },
                tooltip: { // Estilização da tooltip ao pairar sobre os pontos
                    backgroundColor: 'var(--bg-secondary)',
                    titleColor: 'var(--accent-glow)',
                    bodyColor: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                    borderWidth: 1,
                    padding: 7, // Padding interno da tooltip
                    cornerRadius: 3, // Raio da borda da tooltip
                    bodyFont: { size: 8 }, // Tamanho da fonte do corpo da tooltip
                    titleFont: { size: 9, weight: 'bold'} // Tamanho da fonte do título da tooltip
                }
            }
        }
    });
}

// Função para renderizar o conteúdo do Dashboard
function renderDashboard() {
    let widgetIndex = 0; // Para o delay escalonado da animação
    pageContentElement.innerHTML = `
        <h2 class="section-title">Dashboard Overview</h2>
        <div class="widget-grid">
            <div class="widget card" data-section="about" style="--widget-index: ${widgetIndex++}; cursor: pointer;">
                <h3>Experience Snapshot</h3>
                <p>${cvData.experienceSummary.substring(0, 300)}...</p>
                <a href="#" class="widget-details-link" aria-label="View details about experience snapshot">details <i data-lucide="arrow-right" class="inline-block"></i></a>
            </div>
            <div class="widget card" data-section="about" style="--widget-index: ${widgetIndex++}; cursor: pointer;">
                <h3>At a Glance</h3>
                <ul class="space-y-1">
                    ${cvData.profile.map(item => `<li><i data-lucide="zap" class="inline-block w-3 h-3 mr-1.5 text-accent-glow"></i>${item}</li>`).join('')}
                </ul>
                <a href="#" class="widget-details-link" aria-label="View more details about profile">details <i data-lucide="arrow-right" class="inline-block"></i></a>
            </div>
            <div class="widget card" data-section="skills" style="--widget-index: ${widgetIndex++}; cursor: pointer; min-height: 240px;">
                <h3>Skills Radar</h3>
                <div class="w-full h-36 md:h-40">
                   <canvas id="skillsChart"></canvas>
                </div>
                <a href="#" class="widget-details-link" aria-label="View details about skills">details <i data-lucide="arrow-right" class="inline-block"></i></a>
            </div>
            <div class="widget card" data-section="experience" style="--widget-index: ${widgetIndex++}; cursor: pointer;">
                <h3>Current Focus: ${cvData.professionalExperience[0].company}</h3>
                <p class="font-medium text-xs">${cvData.professionalExperience[0].role}</p>
                <p class="text-xs text-gray-500 mb-1">${cvData.professionalExperience[0].period}</p>
                <p>${cvData.professionalExperience[0].description.substring(0,220)}...</p>
                <a href="#" class="widget-details-link" aria-label="View details about current experience">details <i data-lucide="arrow-right" class="inline-block"></i></a>
            </div>
            <div class="widget card" data-section="skills" style="--widget-index: ${widgetIndex++}; cursor: pointer;">
                <h3>Core Competencies</h3>
                <div class="flex flex-wrap gap-1.5 mt-2">
                    ${cvData.skillsList.slice(0, 8).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <a href="#" class="widget-details-link" aria-label="View all skills">details <i data-lucide="arrow-right" class="inline-block"></i></a>
            </div>
            <div class="widget card" data-section="education" style="--widget-index: ${widgetIndex++}; cursor: pointer;">
                <h3>Educational Background</h3>
                <p class="font-medium text-xs">${cvData.education[0].degree}</p>
                <p class="text-xs">${cvData.education[0].institution}</p>
                <a href="#" class="widget-details-link" aria-label="View education details">details <i data-lucide="arrow-right" class="inline-block"></i></a>
            </div>
        </div>
    `;
    lucide.createIcons(); // Renderiza ícones Lucide
    renderSkillsChart(); // Renderiza o gráfico
    addWidgetEventListeners(); // Adiciona listeners aos widgets
}

// Função para renderizar o conteúdo das secções detalhadas
function renderSection(sectionId) {
    let contentHTML = ''; 
    switch (sectionId) {
        case 'about':
            contentHTML = `
                <div class="content-section card">
                    <h2 class="section-title">About Me</h2>
                    <div class="space-y-6">
                        <div>
                            <h3>Professional Summary</h3>
                            <p>${cvData.experienceSummary}</p>
                        </div>
                        <div>
                            <h3>Profile Highlights</h3>
                            <ul class="list-disc space-y-1 pl-3.5">
                                ${cvData.profile.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                         <div>
                            <h3>Product & Domain Expertise</h3>
                            <p>${cvData.productsAreas}</p>
                        </div>
                        <div>
                            <h3>Languages</h3>
                            <ul class="space-y-0.5">
                                ${cvData.languages.map(item => `<li><strong>${item.lang}:</strong> ${item.level}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>`;
            break;
        case 'experience':
            contentHTML = `
                <div class="content-section card">
                    <h2 class="section-title">Professional Journey</h2>
                    <div class="space-y-6">
                        ${cvData.professionalExperience.map(exp => `
                            <div class="pb-5 border-b border-dashed border-border-color last:border-b-0 last:pb-0">
                                <h3>${exp.role}</h3>
                                <p class="text-sm font-medium text-text-primary">${exp.company}</p>
                                <p class="text-xs text-text-secondary mb-1.5">${exp.period}</p>
                                <p class="mb-2">${exp.description}</p>
                                ${exp.areas ? `<p class="text-xs text-text-secondary mb-2"><strong>Key Areas:</strong> ${exp.areas}</p>` : ''}
                                <h4 class="text-text-primary mt-1 mb-0.5 text-xs font-semibold">Achievements & Responsibilities:</h4>
                                <ul class="list-disc space-y-0.5 text-xs pl-3.5">
                                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            break;
        case 'education':
            contentHTML = `
                <div class="content-section card">
                    <h2 class="section-title">Education & Certifications</h2>
                    <div class="space-y-5">
                        ${cvData.education.map(edu => `
                            <div>
                                <h3>${edu.degree}</h3>
                                <p class="text-sm text-text-primary">${edu.institution}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            break;
        case 'skills':
            contentHTML = `
                <div class="content-section card">
                    <h2 class="section-title">Core Skills & Expertise</h2>
                    <div class="flex flex-wrap gap-2.5">
                        ${cvData.skillsList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>`;
            break;
        case 'contact':
            contentHTML = `
                <div class="content-section card">
                    <h2 class="section-title">Let's Connect</h2>
                    <div class="space-y-5">
                        <p class="text-sm">I'm always open to discussing new opportunities, projects, or innovative ideas. Feel free to reach out!</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                            <div class="space-y-1">
                                <h4 class="font-semibold text-accent-glow text-sm">Bruno Oliveira</h4>
                                <p><a href="tel:${cvData.contact.phone.replace(/\s/g, '')}" class="hover:text-accent-glow transition-colors flex items-center text-xs"><i data-lucide="phone" class="w-3 h-3 mr-1"></i>${cvData.contact.phone}</a></p>
                                <p><a href="mailto:${cvData.contact.email}" class="hover:text-accent-glow transition-colors flex items-center text-xs"><i data-lucide="at-sign" class="w-3 h-3 mr-1"></i>${cvData.contact.email}</a></p>
                                <p><a href="${cvData.contact.linkedinUrl}" target="_blank" class="hover:text-accent-glow transition-colors flex items-center text-xs"><i data-lucide="linkedin" class="w-3 h-3 mr-1"></i>${cvData.contact.linkedin}</a></p>
                            </div>
                            <div class="flex flex-col md:flex-row items-center md:justify-end space-y-2 md:space-y-0 md:space-x-2.5">
                                <a href="mailto:${cvData.contact.email}?subject=Contact%20via%20CV%20Website" 
                                   class="w-full md:w-auto inline-flex items-center justify-center bg-accent-glow hover:bg-accent-darker text-bg-secondary font-semibold py-2 px-4 rounded-md transition-all duration-300 text-xs shadow-md hover:shadow-[0_0_12px_var(--accent-glow)]">
                                    <i data-lucide="send" class="w-3 h-3 mr-1"></i>Send Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;
            break;
        case 'logout': 
             contentHTML = `
                <div class="content-section card">
                    <h2 class="section-title">Log Off</h2>
                    <p>This is a placeholder for the Log Off action. In a real application, this would sign the user out.</p>
                </div>`;
            break;
        default:
            if (!['notifications', 'messages', 'settings'].includes(sectionId)) {
                contentHTML = `<p class="text-red-500">Section not found.</p>`;
            } else {
                return; 
            }
    }
    pageContentElement.innerHTML = contentHTML;
    lucide.createIcons(); 
    pageContentElement.scrollTop = 0;
}

// Listeners para os links de navegação da sidebar
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        const isMainCvSection = ['dashboard', 'about', 'experience', 'education', 'skills', 'contact'].includes(sectionId);

        if (isMainCvSection) {
            navLinks.forEach(navLink => {
                if (['dashboard', 'about', 'experience', 'education', 'skills', 'contact'].includes(navLink.dataset.section)) {
                     navLink.classList.remove('active');
                }
            });
            link.classList.add('active');
        }
        
        reinitializeAnimationsForContent(); 

        if (sectionId === 'dashboard') {
            renderDashboard();
        } else {
            renderSection(sectionId);
        }

        if (window.innerWidth <= 767) { 
            sidebarElement.classList.remove('open');
            overlayElement.classList.remove('active');
        }
    });
});

// Listeners para os widgets do dashboard
function addWidgetEventListeners() {
    const widgets = document.querySelectorAll('.widget.card');
    widgets.forEach(widget => {
        const detailsLink = widget.querySelector('.widget-details-link');
        if (detailsLink) {
            detailsLink.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation(); 
                const sectionId = widget.dataset.section;
                const correspondingNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                if (correspondingNavLink) correspondingNavLink.click();
            });
        }
        widget.addEventListener('click', () => {
            const sectionId = widget.dataset.section;
            const correspondingNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
            if (correspondingNavLink) correspondingNavLink.click();
        });
    });
}

// Controlo do menu mobile
mobileMenuButton.addEventListener('click', () => {
    sidebarElement.classList.toggle('open');
    overlayElement.classList.toggle('active');
});
overlayElement.addEventListener('click', () => { 
    sidebarElement.classList.remove('open');
    overlayElement.classList.remove('active');
});

// Função de inicialização do layout
function initializeLayout() {
    renderDashboard(); 
    
    if (window.innerWidth > 767) {
        const mainContentArea = document.querySelector('.main-content-area');
        mainContentArea.style.marginLeft = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width-desktop').trim();
    } else {
        const mainContentArea = document.querySelector('.main-content-area');
        mainContentArea.style.marginLeft = '0';
    }
    lucide.createIcons(); 
}

// Event listener para garantir que o DOM está carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); 
    initializeLayout();
});

</script>
</body>
</html>
