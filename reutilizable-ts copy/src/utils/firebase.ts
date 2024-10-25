// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFtTrJi7Chva8rFtqNCPNPQyCE6bHVTI0",
  authDomain: "lab6-d1d21.firebaseapp.com",
  projectId: "lab6-d1d21",
  storageBucket: "lab6-d1d21.appspot.com",
  messagingSenderId: "809550774964",
  appId: "1:809550774964:web:695dd61ea0e4597fb88de1",
  measurementId: "G-H26XLM7770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);


//añadir canciones
export const addSong = async (song: any) => {
    try {
        //aqui le decimos donde va a guardar ese producto
        //siempre que le digamos db es como decirle vas a utilizar o agregar una coleccion en mi base de datos 
        const where = collection(db, 'songs')
        await addDoc(where, song);
        console.log('se añadio con exito');
    } catch (error) {
        console.error("Error adding song", error);
    }

}

//obtener las canciones
export const getSongs = async () => {
    try {
        const where = collection(db, 'songs');
        const querySnapshot = await getDocs(where);
        const data: any[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        })

        return data;
        
    } catch (error) {
        console.error('Error getting songs', error);
    }
}