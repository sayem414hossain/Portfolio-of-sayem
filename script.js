// ── MOBILE MENU ────────────────────────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');
 
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});
document.addEventListener('click', e => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  }
});
 
// ── NAVBAR SCROLL ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
 
// ── ACTIVE NAV LINK ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active-link'));
      const id = e.target.getAttribute('id');
      const a = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (a) a.classList.add('active-link');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));
 
// ── SCROLL REVEAL ──────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
 
// ── CV DOWNLOAD ────────────────────────────────────────────
document.querySelector('.cv-btn')?.addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = 'cv/sayem-cv.pdf';
  a.download = 'Sayem_Hossain_CV.pdf';
  a.click();
});
 
// ── VIEW PROJECTS ──────────────────────────────────────────
document.querySelector('.view-btn')?.addEventListener('click', () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});
 
// ── CONTACT FORM ───────────────────────────────────────────
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const subject = document.getElementById('subject').value || 'Portfolio Inquiry';
  const message = document.getElementById('message').value;
  const body    = encodeURIComponent(`Hi Sayem,\n\nMy name is ${name} (${email}).\n\n${message}`);
  window.open(
    `https://mail.google.com/mail/?view=cm&to=mdsayemhossain416@gmail.com&su=${encodeURIComponent(subject)}&body=${body}`,
    '_blank'
  );
});
 
// ── PROJECT BUTTONS ────────────────────────────────────────
// Update these URLs with your real GitHub/live links
const projectData = [
  { demo: '#', code: 'https://github.com/yourusername/calculator' },
  { demo: '#', code: 'https://github.com/yourusername/password-generator' },
  { demo: '#', code: 'https://github.com/yourusername/notes-app' },
  { demo: '#', code: 'https://github.com/yourusername/todo-list' },
  { demo: '#', code: 'https://github.com/yourusername/age-calculator' },
  { demo: '#', code: 'https://github.com/yourusername/calendar' },
];
document.querySelectorAll('.project-card').forEach((card, i) => {
  const data = projectData[i];
  if (!data) return;
  card.querySelector('.link-demo')?.addEventListener('click', () => window.open(data.demo, '_blank'));
  card.querySelector('.link-code')?.addEventListener('click', () => window.open(data.code, '_blank'));
});
 
// ── BACK TO TOP ────────────────────────────────────────────
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { backTop.style.display = 'flex'; }
  else { backTop.style.display = 'none'; }
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));