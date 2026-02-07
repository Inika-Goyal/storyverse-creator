// import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";
// import { Movie, shows as mockShows } from "@/data/mockData";
// const COLLECTION_NAME = "stories";

// export interface Movie {
//   id: string;
//   title: string;
//   author: string;
//   genre: string;
//   description: string;
//   image: string;
//   views: number;
//   episodes?: number;
// }

// export const getMovies = async (): Promise<Movie[]> => {
//   try {
//     const moviesCol = collection(db, COLLECTION_NAME);
//     const snapshot = await getDocs(moviesCol);
    
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     })) as Movie[];
//   } catch (error) {
//     return [];
//   }
// };


// export const seedDatabase = async () => {
//   try {
//     const colRef = collection(db, COLLECTION_NAME);
//     for (const show of mockShows) {
//       const { id, ...dataWithoutId } = show;
//       await addDoc(colRef, dataWithoutId);
//     }
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// src/lib/movieService.ts
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import { db } from "./firebase";
import { Movie, shows as mockShows } from "@/data/mockData"; 

const COLLECTION_NAME = "stories";

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const moviesCol = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(moviesCol);
    console.log("🔥 Connection Success! Number of stories found:", snapshot.size);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Movie[];
  } catch (error) {
    console.error("❌ Firebase Connection Error:", error);
    return [];
  }
};

export const seedDatabase = async () => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    for (const show of mockShows) {
      
      const { id, ...dataWithoutId } = show; 
      await addDoc(colRef, dataWithoutId);
    }
    return true;
  } catch (error) {
    console.error("Seeding failed:", error);
    return false;
  }
};