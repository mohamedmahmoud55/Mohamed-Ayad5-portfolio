/* ============================================
   Advanced Animations - Interactive Effects
   ============================================ */

// === TYPEWRITER EFFECT ===
function initializeTypewriter(elementId, text, speed = 50) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.innerHTML = '';
  let index = 0;
  
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// === PARALLAX EFFECT ===
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const scrollPosition = window.scrollY;
      const speed = element.getAttribute('data-parallax') || 0.5;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });
}

// === REVEAL ON SCROLL ===
function initializeReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }
}

// === HOVER TILT EFFECT ===
function initializeHoverTilt() {
  const tiltElements = document.querySelectorAll('[data-tilt]');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

// === ANIMATED PROGRESS BARS ===
function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  if ('IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const value = bar.getAttribute('data-value') || 0;
          animateProgressBar(bar, value);
          progressObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
  }
}

function animateProgressBar(bar, targetValue) {
  let currentValue = 0;
  const increment = targetValue / 50;
  
  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(timer);
    }
    bar.style.width = currentValue + '%';
  }, 20);
}

// === GLITCH EFFECT ===
function addGlitchEffect(element) {
  element.classList.add('glitch');
  element.setAttribute('data-text', element.textContent);
}

// === MORPH ANIMATION ===
function morphElement(fromElement, toElement, duration = 300) {
  const fromRect = fromElement.getBoundingClientRect();
  const toRect = toElement.getBoundingClientRect();
  
  const clone = fromElement.cloneNode(true);
  document.body.appendChild(clone);
  
  clone.style.position = 'fixed';
  clone.style.pointerEvents = 'none';
  clone.style.zIndex = '9999';
  clone.style.left = fromRect.left + 'px';
  clone.style.top = fromRect.top + 'px';
  clone.style.width = fromRect.width + 'px';
  clone.style.height = fromRect.height + 'px';
  
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentLeft = fromRect.left + (toRect.left - fromRect.left) * progress;
    const currentTop = fromRect.top + (toRect.top - fromRect.top) * progress;
    const currentWidth = fromRect.width + (toRect.width - fromRect.width) * progress;
    const currentHeight = fromRect.height + (toRect.height - fromRect.height) * progress;
    
    clone.style.left = currentLeft + 'px';
    clone.style.top = currentTop + 'px';
    clone.style.width = currentWidth + 'px';
    clone.style.height = currentHeight + 'px';
    clone.style.opacity = 1 - progress;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      clone.remove();
    }
  }
  
  requestAnimationFrame(animate);
}

// === CONFETTI ANIMATION ===
function triggerConfetti(duration = 2000) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9998';
  document.body.appendChild(canvas);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  // Create particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      opacity: 1
    });
  }
  
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = elapsed / duration;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.1; // gravity
      particle.opacity = Math.max(0, 1 - progress);
      
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  
  requestAnimationFrame(animate);
}

// === INITIALIZE ALL ANIMATIONS ===
document.addEventListener('DOMContentLoaded', function() {
  initializeParallax();
  initializeReveal();
  initializeHoverTilt();
  initializeProgressBars();
});
