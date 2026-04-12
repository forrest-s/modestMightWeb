class PageFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer id="cs-footer-269">
            <div class="cs-container">
                <!-- Logo Group -->
                <div class="cs-logo-group">
                    <a aria-label="go back to home" class="cs-logo" href="#top">
                        <img class="cs-logo-img" aria-hidden="true" loading="lazy" decoding="async" src="/assets/logos/logo3.png" alt="logo" width="240" height="32">
                    </a>
                    <p class="cs-text">
                        Websites with nothing wasted. Handmade websites for hardworking businesses.
                    </p>
                </div>
                <!-- Links -->
                <ul class="cs-nav">
                    <li class="cs-nav-li">
                        <span class="cs-header">Sitemap</span>
                    </li>
                    <li class="cs-nav-li">
                        <a class="cs-nav-link" href="/index.html">Home</a>
                    </li>
                    <li class="cs-nav-li">
                        <a class="cs-nav-link" href="/about.html">About</a>
                    </li>
                    <li class="cs-nav-li">
                        <a class="cs-nav-link" href="/contact.html">Contact</a>
                    </li>
                </ul>
                <!-- Contact Info -->
                <ul class="cs-contact">
                    <li class="cs-nav-li">
                        <span class="cs-header">Contact</span>
                    </li>
                    <!-- <li class="cs-contact-li">
                        <a class="cs-contact-link" href="tel: 123-456-7890">(123) 456-7890</a>
                    </li> -->
                    <li class="cs-contact-li">
                        <a class="cs-contact-link" href="mailto:forrest@modestmightweb.com">forrest@modestmightweb.com</a>
                    </li>
                    <!-- Social Media -->
                    <li class="cs-contact-li cs-social-group">
                        <div class="cs-social">
                            <a class="cs-social-link" aria-label="visit google profile" href="">
                                <img class="cs-social-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Social/google.svg" alt="google" width="11" height="11">
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </footer>
    `;
  }
}

customElements.define('page-footer', PageFooter);

