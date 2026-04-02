/* ─── MINT PLAYBOOK — script.js ─────────────────── */

/* ── NAV SCROLL STATE ─────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── MOBILE BURGER ────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  // Animate burger to X
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.cssText = 'transform: translateY(6.5px) rotate(45deg)';
    spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
    spans[2].style.cssText = 'transform: translateY(-6.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});
// Close on nav link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});

/* ── HERO FADE-UP (delayed by data-delay attr) ────── */
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

/* ── SCROLL REVEAL ────────────────────────────────── */
const revealEls = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── TERMINAL TYPEWRITER ──────────────────────────── */
const terminalBody = document.getElementById('terminal-body');

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
let currentP = null;
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

  // Blank separator line
  if (line.type === 'sep') {
    terminalBody.insertBefore(document.createElement('br'), cursor || null);
    lineIdx++;
    setTimeout(nextStep, 200);
    return;
  }

  // Inline "ok" lines (append to previous line)
  if (line.type === 'ok' && isPairedOk) {
    const span = document.createElement('span');
    span.className = 't-ok';
    span.textContent = line.text;
    // insert before cursor
    if (cursor) terminalBody.insertBefore(span, cursor);
    else terminalBody.appendChild(span);
    lineIdx++;
    isPairedOk = false;
    setTimeout(nextStep, 160);
    return;
  }

  // Start a new paragraph
  currentP = document.createElement('p');
  terminalBody.insertBefore(currentP, cursor || null);

  // Add prompt for cmd lines
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
  const delay = line.type === 'cmd' ? 32 : 14;
  const txt = line.text;

  function typeChar() {
    if (charIdx < txt.length) {
      textSpan.textContent += txt[charIdx++];
      terminalBody.scrollTop = terminalBody.scrollHeight;
      setTimeout(typeChar, delay);
    } else {
      lineIdx++;
      isPairedOk = (line.type === 'out');
      const pause = isPairedOk ? 0 : 250;
      setTimeout(nextStep, pause);
    }
  }
  typeChar();
}

// Kick off terminal after hero fades in
setTimeout(() => {
  terminalBody.innerHTML = '';
  appendCursor();
  nextStep();
}, 700);
