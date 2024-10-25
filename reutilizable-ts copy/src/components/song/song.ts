export enum Attribute {
    'uid' = 'uid',
    'name' = 'name',
    'date' = 'date',
    'author' = 'author',
    'duration' = 'duration',
    'album' = 'album',
    'img' = 'img'
}

class SongItem extends HTMLElement {
    uid?: number;
    name?: string;
    author?: string;
    date?: number;
    duration?: number;
    album?: string;
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
    }

    attributeChangedCallback(propName: Attribute, _: string | undefined, newValue: string | undefined) {
        if (propName === Attribute.date || propName === Attribute.duration || propName === Attribute.uid) {
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
                    <div class="titulo">
                        <div class="image">
                            <img src="${this.img || "not found"}" alt="">
                        </div>
                        <div class="image-info">
                            <h3>${this.name || "Nombre"}</h3>
                            <p>${this.author || "Autor"}</p>
                        </div>
                    </div>

                    <div class="album">
                        <h3>${this.album || "Álbum"}</h3>
                    </div>
                    <div class="date added">
                        <h3>${this.date ? new Date(this.date).toLocaleDateString() : "Fecha"}</h3>
                    </div>
                    <div class="song-duration"> <!-- Cambiado para usar la clase .song-duration -->
                        <h3>${this.duration || "Duración"}min</h3>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('song-item', SongItem);
export default SongItem;
