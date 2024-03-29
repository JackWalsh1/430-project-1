// creates button
// functionName = function that button calls when pressed

/* eslint-env global */

export default class Button {
  constructor(idName, className, width, height, backgroundColor, text, onclick) {
    this.idName = idName;
    this.className = className;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.text = text;
    this.onclick = onclick;
    this.div = '';
  }

  // creates button
  createButton() {
    // if not already made
    if (!this.div) {
      // set up container
      const button = document.createElement('div');

      // input elements
      if (this.idName) {
        button.setAttribute('id', this.idName);
      }
      if (this.className) {
        button.setAttribute('class', this.className);
      }
      if (this.onclick) {
        button.addEventListener('click', (evt) => {
          this.onclick(evt);
        });
      }

      // set dimensions / color
      button.style.width = this.width;
      button.style.height = this.height;
      button.style.backgroundColor = this.backgroundColor;

      // create text
      const textnode = document.createTextNode(this.text);
      button.appendChild(textnode);

      // log button
      this.div = button;
    }

    // return button - also works as getter
    return this.div;
  }
}
