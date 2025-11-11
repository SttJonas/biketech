
// BikeTech JS
// Menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
	menuToggle.addEventListener('click', () => {
		mainNav.classList.toggle('open');
		menuToggle.classList.toggle('open');
	});
	mainNav.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', () => {
			mainNav.classList.remove('open');
			menuToggle.classList.remove('open');
		});
	});
}

// Slider testimonios
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentTestimonial = 0;
function showTestimonial(idx) {
	testimonials.forEach((t, i) => t.classList.toggle('active', i === idx));
}
if (testimonials.length) {
	if (prevBtn) prevBtn.addEventListener('click', () => {
		currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
		showTestimonial(currentTestimonial);
		// Filtros tiendas
		const shopCards = document.querySelectorAll('.shop-card');
		const filterBtns = document.querySelectorAll('.filter-btn');
		if (filterBtns.length && shopCards.length) {
			filterBtns.forEach(btn => {
				btn.addEventListener('click', () => {
					filterBtns.forEach(b => b.classList.remove('active'));
					btn.classList.add('active');
					const filter = btn.dataset.filter;
					shopCards.forEach(card => {
						if (filter === 'all') card.style.display = '';
						else if (filter === 'sabados') card.style.display = card.dataset.sabados === 'true' ? '' : 'none';
						else if (filter === 'tarde') card.style.display = card.dataset.tarde === 'true' ? '' : 'none';
					});
				});
			});
		}

		// Tabs competencias
		const tabBtns = document.querySelectorAll('.tab-btn');
		const competitionCards = document.querySelectorAll('.competition-card');
		if (tabBtns.length && competitionCards.length) {
			tabBtns.forEach(btn => {
				btn.addEventListener('click', () => {
					tabBtns.forEach(b => b.classList.remove('active'));
					btn.classList.add('active');
					const tab = btn.dataset.tab;
					competitionCards.forEach(card => {
						if (tab === 'all') card.style.display = '';
						else card.style.display = card.dataset.level === tab ? '' : 'none';
					});
				});
			});
		}

					// Modal competencia
					const moreInfoBtns = document.querySelectorAll('.more-info-btn');
					const competitionModal = document.getElementById('competition-modal');
					const modalContent = document.getElementById('modal-content');
					const modalCloseBtns = document.querySelectorAll('.modal-close');
					if (moreInfoBtns.length && competitionModal && modalContent) {
						moreInfoBtns.forEach(btn => {
							btn.addEventListener('click', () => {
								let html = '';
								if (btn.dataset.competition === 'entrenamientos') {
									html = `<h2>Entrenamientos Controlados</h2><p>Domingos 16:00 (jul–nov 2025)<br>Av. Dr. Roldán, Paysandú<br>Circuito urbano supervisado para principiantes.</p>`;
								} else if (btn.dataset.competition === 'xco') {
									html = `<h2>Campeonato Nacional XCO</h2><p>20 jul 2025<br>Cross-Country Olímpico, categorías élite y amateur.<br><a href='https://www.federacionciclista.com.uy' target='_blank'>federacionciclista.com.uy</a></p>`;
								} else if (btn.dataset.competition === 'molinos') {
									html = `<h2>Desafío de los Molinos MTB</h2><p>17 sep 2025<br>Sierra de los Caracoles, Maldonado<br>40 km y 60 km en terreno montañoso.<br><a href='https://www.encarrera.uy' target='_blank'>encarrera.uy</a></p>`;
								} else if (btn.dataset.competition === 'uci') {
									html = `<h2>UCI Road World Championships</h2><p>21-28 sep 2025<br>Kigali, Rwanda<br>Primer Mundial de Ruta en África.<br><a href='https://www.ucikigali2025.rw' target='_blank'>ucikigali2025.rw</a></p>`;
								}
								modalContent.innerHTML = html;
								openModal(competitionModal);
							});
						});
					}
					function openModal(modal) {
						modal.setAttribute('aria-hidden', 'false');
						modal.classList.add('open');
						document.body.classList.add('modal-open');
						setTimeout(() => {
							const closeBtn = modal.querySelector('.modal-close');
							if (closeBtn) closeBtn.focus();
						}, 100);
					}
					function closeModal(modal) {
						modal.setAttribute('aria-hidden', 'true');
						modal.classList.remove('open');
						document.body.classList.remove('modal-open');
					}
					if (modalCloseBtns.length) {
						modalCloseBtns.forEach(btn => {
							btn.addEventListener('click', () => {
								closeModal(btn.closest('.modal'));
							});
						});
					}
					document.addEventListener('keydown', e => {
						if (e.key === 'Escape') {
							document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
						}
					});

					// Modal suscripción
					const subscribeNavBtns = document.querySelectorAll('#subscribe-nav');
					const subscribeModal = document.getElementById('subscribe-modal');
					if (subscribeNavBtns.length && subscribeModal) {
						subscribeNavBtns.forEach(btn => {
							btn.addEventListener('click', () => openModal(subscribeModal));
						});
					}

					// Validación de formularios
					function validateEmail(email) {
						return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
					}
					function showError(input, message) {
						const error = input.parentElement.querySelector('.error-message');
						if (error) error.textContent = message;
						input.classList.add('error');
					}
					function clearError(input) {
						const error = input.parentElement.querySelector('.error-message');
						if (error) error.textContent = '';
						input.classList.remove('error');
					}
					// Contacto
					const contactForm = document.getElementById('contact-form');
					if (contactForm) {
						contactForm.addEventListener('submit', function(e) {
							e.preventDefault();
							let valid = true;
							const name = contactForm.name;
							const email = contactForm.email;
							const subject = contactForm.subject;
							const message = contactForm.message;
							if (!name.value.trim()) { showError(name, 'Ingrese su nombre'); valid = false; } else { clearError(name); }
							if (!validateEmail(email.value)) { showError(email, 'Correo inválido'); valid = false; } else { clearError(email); }
							if (!subject.value.trim()) { showError(subject, 'Ingrese asunto'); valid = false; } else { clearError(subject); }
							if (!message.value.trim()) { showError(message, 'Ingrese mensaje'); valid = false; } else { clearError(message); }
							if (valid) {
								contactForm.reset();
								const toast = document.getElementById('toast');
								if (toast) {
									toast.classList.add('show');
									setTimeout(() => toast.classList.remove('show'), 3500);
								}
							}
						});
					}
					// Newsletter y suscripción
					const newsletterForms = document.querySelectorAll('.newsletter-form, .subscribe-form');
					if (newsletterForms.length) {
						newsletterForms.forEach(form => {
							form.addEventListener('submit', function(e) {
								e.preventDefault();
								const emailInput = form.querySelector('input[type="email"]');
								if (!validateEmail(emailInput.value)) {
									emailInput.classList.add('error');
									emailInput.focus();
									return;
								}
								emailInput.classList.remove('error');
								form.reset();
								if (subscribeModal) closeModal(subscribeModal);
								const toast = document.getElementById('toast');
								if (toast) {
									toast.classList.add('show');
									setTimeout(() => toast.classList.remove('show'), 3500);
								}
							});
						});
					}

					// Navegación suave
					const internalLinks = document.querySelectorAll('a[href^="#"]');
					if (internalLinks.length) {
						internalLinks.forEach(link => {
							link.addEventListener('click', function(e) {
								const target = document.querySelector(this.getAttribute('href'));
								if (target) {
									e.preventDefault();
									target.scrollIntoView({ behavior: 'smooth' });
								}
							});
						});
					}

						// Accesibilidad: focus visible
						window.addEventListener('keydown', function(e) {
							if (e.key === 'Tab') {
								document.body.classList.add('user-is-tabbing');
							}
						});
						window.addEventListener('mousedown', function() {
							document.body.classList.remove('user-is-tabbing');
						});

						// Animaciones de entrada (scroll reveal)
						function revealOnScroll() {
							document.querySelectorAll('.fade-in').forEach(el => {
								const rect = el.getBoundingClientRect();
								if (rect.top < window.innerHeight - 40) {
									el.style.opacity = 1;
									el.style.transform = 'none';
								}
							});
						}
						window.addEventListener('scroll', revealOnScroll);
						window.addEventListener('DOMContentLoaded', revealOnScroll);

						// Tooltips
						document.querySelectorAll('[data-tooltip]').forEach(el => {
							let tooltip;
							el.addEventListener('mouseenter', e => {
								tooltip = document.createElement('div');
								tooltip.className = 'tooltip';
								tooltip.textContent = el.getAttribute('data-tooltip');
								document.body.appendChild(tooltip);
								const rect = el.getBoundingClientRect();
								tooltip.style.left = rect.left + window.scrollX + 'px';
								tooltip.style.top = (rect.bottom + window.scrollY + 8) + 'px';
								setTimeout(() => tooltip.classList.add('show'), 10);
							});
							el.addEventListener('mouseleave', () => {
								if (tooltip) {
									tooltip.classList.remove('show');
									setTimeout(() => tooltip.remove(), 200);
								}
							});
						});

						// Microinteracciones en cards y botones
						document.querySelectorAll('.card, .featured-card').forEach(card => {
							card.addEventListener('mouseenter', () => {
								card.classList.add('hovered');
							});
							card.addEventListener('mouseleave', () => {
								card.classList.remove('hovered');
							});
						});

						// Feedback visual en formularios
						document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
							input.addEventListener('input', () => {
								if (input.classList.contains('error')) {
									input.classList.remove('error');
									const error = input.parentElement.querySelector('.error-message');
									if (error) error.textContent = '';
								}
							});
						});

						// Accesibilidad: cerrar modales con click en overlay
						document.querySelectorAll('.modal').forEach(modal => {
							modal.addEventListener('click', function(e) {
								if (e.target === modal) closeModal(modal);
							});
						});
	});
	if (nextBtn) nextBtn.addEventListener('click', () => {
		currentTestimonial = (currentTestimonial + 1) % testimonials.length;
		showTestimonial(currentTestimonial);
	});
	showTestimonial(currentTestimonial);
}
