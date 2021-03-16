import slugify from '../utils/slugify';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    section {
      background: var(--background-light);
      padding: 2rem;
    }
    @media screen and (max-width: 700px) {
      section {
        padding: 1.5rem;
      }
    }

    section .section-header {
      margin: 1rem 0 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    section .section-header .view-all {
      text-transform: uppercase;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 0.085em;
      color: #27BBA0;
      text-decoration: none;
    }
    section h2 {
      font-size: 1.8rem;
      font-weight: bold;
      color: #FFF;
    }
    section.dark {
      background: var(--background-dark);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
      grid-gap: 2rem;
    }
    .grid > div {
      color: #000;
      background: #FFF;
      /*padding: 1.5rem;*/
      border-radius: 7px;
      min-height: 150px;
    }
  </style>
  <section>
    <div class="container">
      <div class="section-header">
        <h2>...</h2>
        <a data-use-router href="/" class="view-all">View all</a>
      </div>
      <div class="grid"></div>
    </div>
  </section>
`;

export default class VideoGrid extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$sectionHeader = this._root.querySelector('.section-header');
    this.$category = this._root.querySelector('.section-header h2');
    this.$categoryLink = this._root.querySelector('.section-header a');
    this.$background = this._root.querySelector('section');
    this.render();
  }

  static get observedAttributes() {
    return ['category', 'background'];
  }

  get category() {
    return this.getAttribute('category');
  }

  set background(value) {
    this.setAttribute('background', value);
  }

  get background() {
    return this.getAttribute('background');
  }

  set category(value) {
    this.setAttribute('category', value);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (this.category) {
      this.$sectionHeader.style.display = 'flex';
      this.$category.innerHTML = this.category;
      this.$categoryLink.href = `/category/${slugify(this.category)}`;
    } else {
      this.$sectionHeader.style.display = 'none';
    }
    this.$background.style.backgroundColor = this.background;
  }
}