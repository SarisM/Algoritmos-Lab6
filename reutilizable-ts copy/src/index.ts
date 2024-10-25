import { addSong, getSongs } from "./utils/firebase";
import "./components/song/song"; // Asegúrate de importar el componente SongItem

// Estado inicial de la canción
const song = {
    name: "",
    author: "",
    album: "",
    duration: "",
    img: "",
    date: Date.now() // Puedes añadir la fecha actual o cambiarla según tus requisitos
};

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    changeName = (e: Event) => {
        const target = e.target as HTMLInputElement;
        song.name = target.value;
    }

    changeAuthor = (e: Event) => {
        const target = e.target as HTMLInputElement;
        song.author = target.value;
    }

    changeAlbum = (e: Event) => {
        const target = e.target as HTMLInputElement;
        song.album = target.value;
    }

    changeDuration = (e: Event) => {
        const target = e.target as HTMLInputElement;
        song.duration = target.value;
    }

    changeImg = (e: Event) => {
        const target = e.target as HTMLInputElement;
        song.img = target.value;
    }

    submitForm = async (e: Event) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        // Validación manual
        if (!song.name || !song.author || !song.album || !song.duration || !song.img) {
            alert('Por favor, completa todos los campos.');
            return; // Salir si falta algún campo
        }

        await addSong(song);  // Añadir canción a Firebase
        await this.loadSongs();  // Recargar las canciones después de añadir
    }

    async loadSongs() {
        const songs = await getSongs();
        const songListContainer = this.shadowRoot?.querySelector("#song-list");
        songListContainer!.innerHTML = ""; // Limpiar lista antes de renderizar
        
        songs?.forEach((songData) => {
            const songItem = document.createElement("song-item");
            songItem.setAttribute("name", songData.name);
            songItem.setAttribute("author", songData.author);
            songItem.setAttribute("album", songData.album);
            songItem.setAttribute("duration", songData.duration);
            songItem.setAttribute("img", songData.img);
            songItem.setAttribute("date", String(songData.date)); // Aseguramos que la fecha esté en el formato adecuado
            songListContainer!.appendChild(songItem);
        });
    }

    async render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <h1>Formulario para agregar canciones</h1>
                <form id="song-form">
                    <input id="name" placeholder="Nombre de la canción" required />
                    <input id="author" placeholder="Autor" required />
                    <input id="album" placeholder="Álbum" required />
                    <input id="duration" type="number" placeholder="Duración" required />
                    <input id="img" placeholder="Añadir enlace" required />
                    <button type="submit" id="save">Agregar canción</button>
                </form>
                <section id="song-list"></section>
            `;

            // Añadir eventos a los inputs
            this.shadowRoot.getElementById("name")?.addEventListener("change", this.changeName);
            this.shadowRoot.getElementById("author")?.addEventListener("change", this.changeAuthor);
            this.shadowRoot.getElementById("album")?.addEventListener("change", this.changeAlbum);
            this.shadowRoot.getElementById("duration")?.addEventListener("change", this.changeDuration);
            this.shadowRoot.getElementById("img")?.addEventListener("change", this.changeImg);
            this.shadowRoot.getElementById("song-form")?.addEventListener("submit", this.submitForm);

            await this.loadSongs(); // Cargar y mostrar canciones existentes al renderizar
        }
    }
}

customElements.define('app-container', AppContainer);
