const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
<div class="title has-text-light ml-3 pt-3"></div>
`;

class WebCptTitle extends HTMLElement{
    constructor(){
      super();
        // attach shadow DOM tree to instance - creates .shadowroot
      this.attachShadow({mode: "open"});
        // Clone 'template' and append it
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {      
        this.render();
    }

    disconnectedCallback(){
      this.render();
    }

    // helper method to display values
    render() {
        // grab values / assign a default if needed
       let title = this.shadowRoot.querySelector(".title");
       let titleText = this.getAttribute("data-text") ? this.getAttribute("data-text") : "NO TITLE FOUND";
       title.innerHTML = `${titleText}`;
    }

    static get observedAttributes(){
        return ["data-text"];
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
}

customElements.define('webcpt-title', WebCptTitle);