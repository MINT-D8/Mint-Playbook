/* ─── MINT PLAYBOOK — script.js ── */

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── MOBILE BURGER ── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.cssText = 'transform: translateY(6px) rotate(45deg)';
      spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
      spans[2].style.cssText = 'transform: translateY(-6px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });
}

/* ── HERO FADE-UP ── */
const fadeEls = document.querySelectorAll('.fade-up');
function triggerHero() {
  fadeEls.forEach(el => {
    const delay = parseInt(el.dataset.delay || 0, 10);
    setTimeout(() => el.classList.add('visible'), delay + 80);
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', triggerHero);
} else {
  triggerHero();
}

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── PRESET METERS ── */
document.querySelectorAll('.preset-meter').forEach(meter => {
  const level = parseInt(meter.dataset.level || 0, 10);
  const total = 5;
  meter.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const pip = document.createElement('span');
    pip.className = `meter-pip ${i < level ? 'pip-on' : 'pip-off'}`;
    meter.appendChild(pip);
  }
});

/* ── TERMINAL TYPEWRITER ── */
const terminalBody = document.getElementById('terminal-body');
if (terminalBody) {
  const lines = [
    { type: 'cmd',  text: 'Initializing Mint Playbook...' },
    { type: 'out',  text: '» Stripping telemetry services...   ' },
    { type: 'ok',   text: '✓ done' },
    { type: 'out',  text: '» Removing Edge, OneDrive, Teams..  ' },
    { type: 'ok',   text: '✓ done' },
    { type: 'out',  text: '» Applying ASR + exploit rules...   ' },
    { type: 'ok',   text: '✓ done' },
    { type: 'out',  text: '» Configuring taskbar (minimal)...  ' },
    { type: 'ok',   text: '✓ done' },
    { type: 'out',  text: '» Converting to Enterprise LTSC...  ' },
    { type: 'ok',   text: '✓ done' },
    { type: 'out',  text: '» Loading preset: Gaming Focused... ' },
    { type: 'ok',   text: '✓ done' },
    { type: 'sep',  text: '' },
    { type: 'ok',   text: '✓ Mint applied. Restart when ready.' },
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let cursor = null;
  let isPairedOk = false;

  function appendCursor() {
    if (cursor) cursor.remove();
    cursor = document.createElement('span');
    cursor.className = 't-cursor';
    terminalBody.appendChild(cursor);
  }

  function nextStep() {
    if (lineIdx >= lines.length) {
      if (cursor) cursor.remove();
      return;
    }
    const line = lines[lineIdx];
    if (line.type === 'sep') {
      terminalBody.insertBefore(document.createElement('br'), cursor || null);
      lineIdx++;
      setTimeout(nextStep, 180);
      return;
    }
    if (line.type === 'ok' && isPairedOk) {
      const span = document.createElement('span');
      span.className = 't-ok';
      span.textContent = line.text;
      if (cursor) terminalBody.insertBefore(span, cursor);
      else terminalBody.appendChild(span);
      lineIdx++;
      isPairedOk = false;
      setTimeout(nextStep, 140);
      return;
    }
    const currentP = document.createElement('p');
    terminalBody.insertBefore(currentP, cursor || null);
    if (line.type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 't-prompt';
      prompt.textContent = '$ ';
      currentP.appendChild(prompt);
    }
    const textSpan = document.createElement('span');
    textSpan.className = line.type === 'cmd' ? 't-cmd' :
                         line.type === 'ok'  ? 't-ok'  :
                         line.type === 'warn'? 't-warn' : 't-out';
    currentP.appendChild(textSpan);
    charIdx = 0;
    const delay = line.type === 'cmd' ? 28 : 12;
    const txt = line.text;
    function typeChar() {
      if (charIdx < txt.length) {
        textSpan.textContent += txt[charIdx++];
        terminalBody.scrollTop = terminalBody.scrollHeight;
        setTimeout(typeChar, delay);
      } else {
        lineIdx++;
        isPairedOk = (line.type === 'out');
        setTimeout(nextStep, isPairedOk ? 0 : 220);
      }
    }
    typeChar();
  }

  setTimeout(() => {
    terminalBody.innerHTML = '';
    appendCursor();
    nextStep();
  }, 650);
}

/* ── DOCS SIDEBAR ACTIVE LINK ── */
const docsSections = document.querySelectorAll('.doc-section');
if (docsSections.length > 0) {
  const sidebarLinks = document.querySelectorAll('.sidebar-links a');
  const docsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sidebarLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });
  docsSections.forEach(s => docsObserver.observe(s));
}
