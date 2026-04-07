// ===========================
// UTILITIES
// ===========================
const config = {
  GITHUB_USERNAME: 'Bressanvt',
  FEATURED_PROJECT: 'Loja.Mvc',
  API_BASE: 'https://api.github.com/users'
};

// ===========================
// LOADER
// ===========================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 800);
  }
});

// ===========================
// MODAL - FALE COMIGO
// ===========================
const modal = document.getElementById('contact-modal');
const navContactBtn = document.getElementById('nav-contact-btn');
const modalClose = document.getElementById('modal-close');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (navContactBtn) {
  navContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Handle form submission
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    try {
      // Enviar via mailto com corpo pré-preenchido
      const mailtoLink = `mailto:vitorbressanvieira@outlook.com?subject=Contato de ${encodeURIComponent(name)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;
      
      // Abrir cliente de email
      window.location.href = mailtoLink;
      
      // Mostrar mensagem de sucesso
      formStatus.textContent = '✓ Abrindo seu cliente de email...';
      formStatus.classList.add('success');
      formStatus.classList.remove('error');
      
      setTimeout(() => {
        modal.classList.remove('active');
        contactForm.reset();
        formStatus.textContent = '';
        formStatus.classList.remove('success');
      }, 2000);
      
    } catch (error) {
      formStatus.textContent = '✗ Erro ao abrir email. Tente novamente.';
      formStatus.classList.add('error');
      formStatus.classList.remove('success');
    }
  });
}

// ===========================
// TYPING EFFECT
// ===========================
const typeText = [
  'Desenvolvedor Full Stack',
  'PHP • Python • JavaScript',
  'Web Designer & Developer'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById('typing');
  if (!element) return;

  const currentText = typeText[textIndex];
  
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  element.textContent = currentText.substring(0, charIndex);

  let speed = isDeleting ? 50 : 70;
  
  if (!isDeleting && charIndex === currentText.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typeText.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('header') && navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
}

// ===========================
// SCROLL REVEAL
// ===========================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.card, .skill-item, .featured-content');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
  });
}

// ===========================
// GITHUB API - FETCH REPOS
// ===========================
async function fetchRepos() {
  try {
    const response = await fetch(`${config.API_BASE}/${config.GITHUB_USERNAME}/repos`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repos:', error);
    showReposError();
    return [];
  }
}

// ===========================
// GENERATE CUSTOM PROJECT IMAGE
// ===========================
function generateProjectImage(repoName, language) {
  const colors = {
    'JavaScript': ['#F7DF1E', '#FFD700'],
    'Python': ['#3776AB', '#00A8E8'],
    'PHP': ['#777BB4', '#9B9DDE'],
    'TypeScript': ['#3178C6', '#60A5FA'],
    'HTML': ['#E34C26', '#FF6B3D'],
    'CSS': ['#563D7C', '#9B6AC5'],
    'Java': ['#007396', '#0099CC'],
    'C#': ['#239120', '#68A063'],
  };

  const [color1, color2] = colors[language] || ['#00d4ff', '#0099cc'];
  
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" fill="#0d0d0d"/>
    <rect width="400" height="200" fill="url(#grad)"/>
    
    <circle cx="350" cy="30" r="40" fill="rgba(255,255,255,0.1)"/>
    <circle cx="50" cy="150" r="60" fill="rgba(255,255,255,0.08)"/>
    
    <text x="200" y="85" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
      ${repoName.substring(0, 20)}
    </text>
    <text x="200" y="130" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="middle">
      ${language}
    </text>
  </svg>`;
  
  return 'data:image/svg+xml;base64,' + btoa(svgString);
}

// ===========================
// RENDER PROJECTS
// ===========================
function showRepos(repos) {
  const container = document.getElementById('repo-container');
  const loadingMessage = document.querySelector('.loading-message');
  
  if (!container) return;

  container.innerHTML = '';
  
  if (loadingMessage) {
    loadingMessage.style.display = 'none';
  }

  if (repos.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; color: #a1a1a1;">Nenhum projeto encontrado</p>';
    return;
  }

  repos.forEach((repo, index) => {
    const card = createProjectCard(repo, index);
    container.appendChild(card);
  });

  // Trigger scroll reveal animation
  initScrollReveal();
}

function createProjectCard(repo, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.animationDelay = `${index * 0.1}s`;

  const image = generateProjectImage(repo.name, repo.language || 'Projeto');
  const language = repo.language || 'Diversos';
  const stars = repo.stargazers_count || 0;

  card.innerHTML = `
    <img src="${image}" alt="${repo.name}" loading="lazy">
    <div class="card-content">
      <h3>${escapeHtml(repo.name)}</h3>
      <p style="font-size: 0.85rem; color: #888; margin: 0.5rem 0;">${escapeHtml(repo.description || 'Sem descrição')}</p>
      <div style="display: flex; gap: 0.5rem; justify-content: space-between; margin-top: 0.5rem;">
        <span>${language}</span>
        <span>${stars > 0 ? '⭐ ' + stars : ''}</span>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    window.open(repo.html_url, '_blank', 'noopener,noreferrer');
  });

  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.open(repo.html_url, '_blank', 'noopener,noreferrer');
    }
  });

  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');

  return card;
}

// ===========================
// RENDER FEATURED PROJECT
// ===========================
function renderFeatured(repo) {
  const container = document.getElementById('featured-project');
  if (!container) return;

  const image = generateProjectImage(repo.name, repo.language || 'Projeto');

  container.innerHTML = `
    <img src="${image}" alt="${repo.name}" loading="lazy">
    <div class="featured-info">
      <h2>${escapeHtml(repo.name)}</h2>
      <p>${escapeHtml(repo.description || 'Projeto em destaque do portfólio.')}</p>
      <div class="featured-buttons">
        <a href="${repo.html_url}" target="_blank" rel="noopener,noreferrer" class="btn btn-primary">Ver no GitHub</a>
      </div>
    </div>
  `;
}

function showReposError() {
  const container = document.getElementById('repo-container');
  if (container) {
    container.innerHTML = '<p style="grid-column: 1/-1; color: #a1a1a1;">Erro ao carregar projetos do GitHub. Tente novamente mais tarde.</p>';
  }
}

// ===========================
// UTILITY: ESCAPE HTML
// ===========================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===========================
// MAIN INIT
// ===========================
async function init() {
  // Fetch and display projects
  const repos = await fetchRepos();
  
  if (repos.length > 0) {
    // Filter and sort repos
    const filtered = repos
      .filter(repo =>
        !repo.fork &&
        repo.description &&
        repo.name !== 'Bressanvt'
      )
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    showRepos(filtered);

    // Find and display featured project
    const featured = repos.find(repo => repo.name === config.FEATURED_PROJECT);
    if (featured) {
      renderFeatured(featured);
    }
  }

  // Initialize scroll reveal
  initScrollReveal();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}