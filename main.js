(function () {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const track = document.querySelector('.events-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const modal = document.getElementById('footerModal');
  const modalTitle = document.getElementById('footerModalTitle');
  const modalBody = document.getElementById('footerModalBody');
  const closeBtn = modal?.querySelector('.footer-modal-close');
  const policyButtons = document.querySelectorAll('.footer-link-btn');

  const footerContent = {
    tnc: {
      title: 'Terms & Conditions',
      body: `
        <p>These terms govern participation in GMAC Tours and GLBXTNT-hosted events across India and Asia.</p>
        <ul>
          <li>Registration is subject to availability, confirmation, and venue capacity.</li>
          <li>Attendees are expected to maintain professional and respectful conduct throughout the programme.</li>
          <li>Participants will receive timely updates and support to help them make the most of each event experience.</li>
        </ul>
      `
    },
    terms: {
      title: 'Terms of Service',
      body: `
        <p>By engaging with GLBXTNT and GMAC Tour programmes, participants agree to use shared information responsibly.</p>
        <ul>
          <li>Provide accurate registration details and keep your contact information updated.</li>
          <li>Accept communications related to admissions events, networking opportunities, and partner updates.</li>
          <li>Use event materials for personal planning, learning, and professional development.</li>
        </ul>
      `
    },
    privacy: {
      title: 'Privacy Policy',
      body: `
        <p>We value the privacy and security of participant information shared with GLBXTNT and GMAC Tour initiatives.</p>
        <ul>
          <li>Personal data is collected only for official event registration, communication, and participant support.</li>
          <li>Information is protected with reasonable safeguards and used only for authorised academic and professional purposes.</li>
          <li>Data may be shared with trusted institutional partners only where necessary to facilitate approved events and services.</li>
        </ul>
      `
    }
  };

  if (modal && closeBtn) {
    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }

  policyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-modal');
      const content = footerContent[key];

      if (!modal || !content) return;

      modalTitle.textContent = content.title;
      modalBody.innerHTML = content.body;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  if (menuToggle && header) {
    menuToggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', open);
    });

    header.querySelectorAll('.nav a').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (track && prevBtn && nextBtn) {
    let index = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function getMaxIndex() {
      const cards = track.children.length;
      return Math.max(0, cards - getVisibleCount());
    }

    function updateCarousel() {
      const card = track.querySelector('.event-card');
      if (!card) return;

      const gap = 24;
      const offset = index * (card.offsetWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= getMaxIndex();
      prevBtn.style.opacity = index === 0 ? '0.4' : '1';
      nextBtn.style.opacity = index >= getMaxIndex() ? '0.4' : '1';
    }

    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      index = Math.min(getMaxIndex(), index + 1);
      updateCarousel();
    });

    window.addEventListener('resize', () => {
      index = Math.min(index, getMaxIndex());
      updateCarousel();
    });

    updateCarousel();
  }
})();
