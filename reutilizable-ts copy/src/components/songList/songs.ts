import { getSongs } from "../../utils/firebase";


class Songs extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    connectedCallback () {
        this.render()

    }

    async render(){
        if (this.shadowRoot) {
            const songs = await getSongs();
            songs?.forEach((song) => {
                const container = this.ownerDocument.createElement('section');

                const name = this.ownerDocument.createElement('h3');
                name.innerText = song.name;
                container.appendChild(name);

                const author = this.ownerDocument.createElement('h3');
                author.innerText = song.author;
                container.appendChild(author);

                const album = this.ownerDocument.createElement('h3');
                album.innerText = song.album;
                container.appendChild(album);

                const duration = this.ownerDocument.createElement('h3');
                duration.innerText = song.duration;
                container.appendChild(duration);

                this.shadowRoot?.appendChild(container)
            })

        }


    }
}

customElements.define('song', Songs);
export default Songs