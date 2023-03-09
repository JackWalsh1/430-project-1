const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
<script src="https://kit.fontawesome.com/0fbd73455f.js" crossorigin="anonymous"></script>

<nav class="navbar is-white has-shadow">
<div class="navbar-brand">
  <a class="navbar-item" href="home.html">
  <span>🤦</span>
  </a>
  <a class="navbar-burger" id="burger">
    <span></span>
    <span></span>
    <span></span>
  </a>
</div>
</nav>

<div class="navbar-menu" id="nav-links">   
<div class="navbar-start">
  <a class="navbar-item is-hoverable" id="app" href="app.html">
    App
  </a>

  <a class="navbar-item is-hoverable" id="documentation" href="documentation.html">
    Documentation
  </a>
</div>
</div>
`;

const pageNames = ['app', 'documentation'];

class WebCptNavbar extends HTMLElement {
  constructor() {
    super();
    // attach shadow DOM tree to instance - creates .shadowroot
    this.attachShadow({ mode: 'open' });
    // Clone 'navbarTemplate' and append it
    this.shadowRoot.appendChild(navbarTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    // This line of code will create an property named `span` for us, so that we don't have to keep calling this.shadowRoot.querySelector("span");
    this.a = this.shadowRoot.querySelector('a');
    this.span = this.shadowRoot.querySelector('span');
    this.navbar = this.shadowRoot.querySelector('#nav-links');
    this.burgerToggle = this.shadowRoot.querySelector('#burger');

    this.burgerToggle.onclick = () => {
      this.navbar.classList.toggle('is-active');
    };

    this.render();
  }

  disconnectedCallback() {
    this.burgerToggle.onclick = () => { null; };
    this.render();
  }

  // helper method to display values
  render() {
    // grab values / assign a default if needed
    const currentPageData = this.getAttribute('data-current-page') ? this.getAttribute('data-current-page') : 'Home';

    const currentPage = this.shadowRoot.querySelector(`#${currentPageData}`);
    currentPage.classList.replace('is-hoverable', 'has-text-weight-bold');
    currentPage.href = '';
  }

  static get observedAttributes() {
    return ['data-current-page'];
  }

  attributeChangedCallback(attributeName, oldVal, newVal) {
    console.log(attributeName, oldVal, newVal);
    this.render();
  }
}

customElements.define('webcpt-navbar', WebCptNavbar);
