
export enum Attribute {
    'uid' = 'uid',
    'name' = 'name',
    'date' = 'date',
    'author' = 'author',
    'duration' = 'duration',
    'img' = 'img'
}
class SongItem extends HTMLElement {
    uid?: number;
    name?: string;
    author?: string;
    date?: number;
    duration?: number;
    img?: string;

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        // console.log(this.img)
    }

    attributeChangedCallback(propName: Attribute, _: string | undefined, newValue: string | undefined) {
        if (propName === Attribute.date || propName === Attribute.duration ||  propName === Attribute.uid) {
            this[propName] = newValue ? Number(newValue) : undefined;
        } else {
            this[propName] = newValue;
        }
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/song/song.css">

                <div class="song-item">
                    <div class="image-name">
                        <img src="${this.img || "not found"}" >
                        <h3>${this.name || "Nombre"}</h3>
                    </div>
                    <div>
                        <h3>${this.author || "Autor"}</h3>
                    </div>
                    <div>
                        <h3>${this.date ? new Date(this.date).toLocaleDateString() : "Fecha"}</h3>
                    </div>
                    <div>
                        <h3>${this.duration || "Duración"}</h3>
                    </div>
                    
                
                </div>
            `;
        }
    }
}

customElements.define('song-item', SongItem);
export default SongItem;
