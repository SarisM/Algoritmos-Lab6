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
                <link rel="stylesheet" href="../src/index.css">

                <h1 class="title1">My playlist</h1>
                <form id="song-form">
                    <input id="name" placeholder="Name of the song" required />
                    <input id="author" placeholder="Author" required />
                    <input id="album" placeholder="Album" required />
                    <input id="duration" type="number" placeholder="Duration" required />
                    <input id="img" placeholder="Add image link" required />
                    <button type="submit" id="save">Add song</button>
                </form>
                <div class="song-titles">
                    <h3>Title</h3>
                    <h3>Album</h3>
                    <h3>Date</h3>
                    <h3>Duration</h3>
                </div>
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
