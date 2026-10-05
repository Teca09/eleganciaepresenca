const products = [
  {
    name: 'Relógio clássico',
    category: 'Relógios Masculinos',
    description: 'Um detalhe marcante para completar o seu visual com personalidade. Consulte as opções disponíveis.',
    image: 'assets/relogio_classico.jpg',
    width: 736,
    height: 736,
  },
  {
    name: 'Óculos de sol',
    category: 'Óculos Masculinos',
    description: 'Encontre o modelo que combina com o seu estilo. Fale connosco para conhecer as opções.',
    image: 'assets/Oculos_Masculinos.jpg',
    width: 735,
    height: 832,
  },
  {
    name: 'Sapato, mocassim ou sneaker',
    category: 'Calçados Masculinos',
    description: 'Do clássico ao casual, escolha o par ideal para a sua ocasião. Consulte modelos e disponibilidade.',
    image: 'assets/sapato.jpg',
    width: 736,
    height: 920,
  },
  {
    name: 'Bolsa estruturada',
    category: 'Bolsas Femininas',
    description: 'Um acessório elegante que acompanha diferentes momentos. Peça informações sobre cores e modelos.',
    image: 'assets/bolsa.jpg',
    width: 500,
    height: 500,
  },
  {
    name: 'Colar + brincos + pulseira',
    category: 'Joias & Acessórios',
    description: 'Complete a produção com detalhes que fazem a diferença. Consulte as combinações disponíveis.',
    image: 'assets/joias.jpg',
    width: 736,
    height: 1104,
  },
  {
    name: 'Scarpin, sandália ou sapatilha',
    category: 'Calçados Femininos',
    description: 'Encontre o calçado certo para expressar o seu estilo. Fale connosco e consulte as opções.',
    image: 'assets/nice.jpg',
    width: 736,
    height: 736,
  }
];

const productGrid = document.getElementById('product-grid');

if (productGrid) {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card reveal">
          <img src="${product.image}" alt="${product.name} - ${product.category}" width="${product.width}" height="${product.height}" loading="lazy" />
          <div class="product-content">
            <div class="product-meta">
              <span class="product-badge">${product.category}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-actions">
              <button class="btn btn-secondary product-interest" data-product="${product.name}">Consultar pelo WhatsApp</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function openWhatsApp(message, phone = '244952667289') {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('.product-interest');
  if (target) {
    const productName = target.dataset.product;
    openWhatsApp(`Olá, Elegância & Presença! Tenho interesse em ${productName}. Podem informar as opções, valores e disponibilidade?`);
  }
});

const header = document.querySelector('.site-header');
const nav = document.querySelector('.main-nav');
const toggle = document.querySelector('.menu-toggle');

const handleHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};

handleHeaderState();
window.addEventListener('scroll', handleHeaderState, { passive: true });

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const positioningSection = document.querySelector('.positioning');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (positioningSection && !reducedMotion.matches && window.innerWidth > 700) {
  let targetOffset = 0;
  let currentOffset = 0;
  let animationFrame = null;

  const updateParallaxTarget = () => {
    const bounds = positioningSection.getBoundingClientRect();
    const sectionCenter = bounds.top + bounds.height / 2;
    const maxOffset = bounds.height * 0.1;
    targetOffset = Math.max(
      -maxOffset,
      Math.min((window.innerHeight / 2 - sectionCenter) * 0.12, maxOffset)
    );

    if (animationFrame === null) {
      animationFrame = window.requestAnimationFrame(animateParallax);
    }
  };

  const animateParallax = () => {
    currentOffset += (targetOffset - currentOffset) * 0.12;

    if (Math.abs(targetOffset - currentOffset) < 0.1) {
      currentOffset = targetOffset;
      animationFrame = null;
    } else {
      animationFrame = window.requestAnimationFrame(animateParallax);
    }

    positioningSection.style.setProperty('--parallax-offset', `${currentOffset}px`);
  };

  window.addEventListener('scroll', updateParallaxTarget, { passive: true });
  window.addEventListener('resize', updateParallaxTarget);
  updateParallaxTarget();
}