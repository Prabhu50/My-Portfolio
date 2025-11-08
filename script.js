// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
if (navToggle && siteNav) {
	navToggle.addEventListener('click', () => {
		const open = siteNav.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', String(open));
	});
	// Close on link click (mobile)
	siteNav.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
		siteNav.classList.remove('open');
		navToggle.setAttribute('aria-expanded', 'false');
	}));
}

// Smooth scroll handled below with offset

// Scrollspy: highlight active section link
const navLinks = Array.from(document.querySelectorAll('#site-nav a[href^="#"]'));
const sections = navLinks
	.map(l => document.querySelector(l.getAttribute('href')))
	.filter(Boolean);

if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			if (entry.isIntersecting) {
				navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
			}
		});
	}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

	sections.forEach(section => observer.observe(section));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
	contactForm.addEventListener('submit', function(e) {
		const name = this.querySelector('[name="name"]').value;
		const email = this.querySelector('[name="email"]').value;
		const body = this.querySelector('[name="body"]').value;
		
		// Format email body
		const subject = encodeURIComponent('Portfolio Contact Form');
		const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${body}`);
		
		// Update form action with formatted data
		this.action = `mailto:prabhurpsit@gmail.com?subject=${subject}&body=${emailBody}`;
	});
}

// Smooth scroll with offset for sticky header (respects reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		const href = this.getAttribute('href');
		if (href === '#' || href === '#content') return;
		
		const target = document.querySelector(href);
		if (target) {
			e.preventDefault();
			const headerOffset = 80;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
			
			window.scrollTo({
				top: offsetPosition,
				behavior: prefersReducedMotion ? 'auto' : 'smooth'
			});
		}
	});
});



