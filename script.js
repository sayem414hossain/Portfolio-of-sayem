/*const menuToggle = document.getElementById("menu-toggle");
const navBar = document.querySelector(".nav-bar");

menuToggle.addEventListener("click", () => {
    navBar.classList.toggle("active");
});
*/


const menuToggle = document.getElementById('menu-toggle');
const navBar     = document.querySelector('.nav-bar');
 
menuToggle.addEventListener('click', () => {
    navBar.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});
 
// Close menu when a nav link is clicked
document.querySelectorAll('.nav-bar a').forEach(link => {
    link.addEventListener('click', () => {
        navBar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});
 
// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navBar.contains(e.target)) {
        navBar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    }
});
 
 
// ── 2. NAVBAR SCROLL EFFECT ────────────────────────────────
const navbar = document.querySelector('.navbar');
 
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background   = 'rgb(15, 73, 131)';
        navbar.style.boxShadow    = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background   = 'rgba(15, 73, 131, 0.596)';
        navbar.style.boxShadow    = '0 2px 10px rgba(73,65,65,0.05)';
    }
});
 
 
// ── 3. ACTIVE NAV LINK ON SCROLL ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-bar a');
 
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            const id   = entry.target.getAttribute('id');
            const active = document.querySelector(`.nav-bar a[href="#${id}"]`);
            if (active) active.classList.add('active-link');
        }
    });
}, { threshold: 0.4 });
 
sections.forEach(section => sectionObserver.observe(section));
 
/* Add this to your CSS:
   .nav-bar a.active-link { color: #3b82fc; border-bottom: 2px solid #3b82fc; }
*/
 
 
// ── 4. SCROLL REVEAL ANIMATIONS ───────────────────────────
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);
 
// Add .reveal to all major sections/cards
document.querySelectorAll(
    'section, .service-card, .skills-card, .project-card, .about-content, .hero-text, .hero-image'
).forEach(el => el.classList.add('reveal'));
 
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
 
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
 
// ── 5. CV DOWNLOAD BUTTON ─────────────────────────────────
const cvBtn = document.querySelector('.cv-btn');
if (cvBtn) {
    cvBtn.addEventListener('click', () => {
        const link  = document.createElement('a');
        link.href     = 'cv/sayem-cv.pdf';   // ← put your CV file here
        link.download = 'Sayem_Hossain_CV.pdf';
        link.click();
    });
}
 
 
// ── 6. VIEW PROJECTS SMOOTH SCROLL ────────────────────────
const viewBtn = document.querySelector('.view-btn');
if (viewBtn) {
    viewBtn.addEventListener('click', () => {
        document.querySelector('.projects-section')
            ?.scrollIntoView({ behavior: 'smooth' });
    });
}
 
 
// ── 7. SEND MESSAGE → GMAIL ───────────────────────────────
const sendBtn = document.querySelector('.send-btn');
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const email   = 'mdsayemhossain416@gmail.com';
        const subject = encodeURIComponent('Hello Sayem — Portfolio Inquiry');
        const body    = encodeURIComponent('Hi Sayem,\n\nI visited your portfolio and wanted to get in touch.\n\n');
        window.open(`https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`, '_blank');
    });
}
 
 
// ── 8. SOCIAL MEDIA LINKS ─────────────────────────────────
const socialMap = {
    '.icon-portfolio' : 'https://yourportfolio.com',           // ← replace
    '.icon-linkedin'  : 'https://linkedin.com/in/yourprofile', // ← replace
    '.icon-github'    : 'https://github.com/yourusername',     // ← replace
};
 
Object.entries(socialMap).forEach(([selector, url]) => {
    const el = document.querySelector(selector);
    if (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => window.open(url, '_blank'));
    }
});
 
 
// ── 9. PROJECT CARD MODAL ─────────────────────────────────
// Inject modal HTML
const modalHTML = `
<div id="project-modal" style="
    display:none; position:fixed; inset:0; background:rgba(0,0,0,0.75);
    z-index:9999; align-items:center; justify-content:center;">
    <div style="
        background:#1e3a5f; color:#e2e8f0; border-radius:16px;
        padding:30px; max-width:480px; width:90%; position:relative;
        box-shadow:0 20px 60px rgba(0,0,0,0.5);">
        <button id="modal-close" style="
            position:absolute; top:12px; right:16px; background:none;
            border:none; color:#94a3b8; font-size:24px; cursor:pointer;">✕</button>
        <h3 id="modal-title" style="margin:0 0 12px; color:#60a5fa;"></h3>
        <p  id="modal-desc"  style="margin:0; line-height:1.7; color:#cbd5e1;"></p>
    </div>
</div>`;
document.body.insertAdjacentHTML('beforeend', modalHTML);
 
const modal      = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc  = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');
 
document.querySelectorAll('.project-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        modalTitle.textContent = card.querySelector('h3').textContent;
        modalDesc.textContent  = card.querySelector('.project-description').textContent;
        modal.style.display    = 'flex';
    });
});
 
modalClose.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
 
 
// ── 10. BACK TO TOP BUTTON ────────────────────────────────
const topBtn = document.createElement('button');
topBtn.innerHTML   = '<i class="fa-solid fa-arrow-up"></i>';
topBtn.title       = 'Back to top';
topBtn.style.cssText = `
    position:fixed; bottom:28px; right:28px;
    width:46px; height:46px; border-radius:50%;
    background:#3b82f6; color:#fff; border:none;
    font-size:18px; cursor:pointer; display:none;
    align-items:center; justify-content:center;
    box-shadow:0 4px 15px rgba(59,130,246,0.5);
    transition:opacity 0.3s, transform 0.3s; z-index:999;`;
document.body.appendChild(topBtn);
 
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topBtn.style.display    = 'flex';
        topBtn.style.opacity    = '1';
        topBtn.style.transform  = 'translateY(0)';
    } else {
        topBtn.style.opacity   = '0';
        topBtn.style.transform = 'translateY(20px)';
        setTimeout(() => { if (window.scrollY <= 300) topBtn.style.display = 'none'; }, 300);
    }
});
 
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));