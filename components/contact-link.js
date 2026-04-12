class ContactLink extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="cta-51">
            <div class="cs-container">
                <div class="cs-content">
                    <span class="cs-topper">Contact Us</span>
                    <h2 class="cs-title">Get Your Central Oregon Business Online Today</h2>
                    <p class="cs-text">
                        Mobile friendly websites that load blazingly fast. Let's create an effective online presence that works for you.
                        Fast, mobile-friendly websites that load instantly and show up on Google. Let's build something that works for your Central Oregon business.
                    </p>
                    <a href="/contact.html" class="cs-button-solid">Get A Free Quote</a>
                </div>
            </div>
            <!-- Background Image-->
            <picture class="cs-picture">
                <source media="(max-width: 600px)" srcset="assets/images/main_5.webp">
                <source media="(min-width: 601px)" srcset="assets/images/main_5.webp">
                <img loading="lazy" decoding="async" src="assets/images/main_5.webp" alt="cabinets" width="1920" height="1280" aria-hidden="true">
            </picture>
        </section>  
    `;
  }
}

customElements.define('contact-link', ContactLink);