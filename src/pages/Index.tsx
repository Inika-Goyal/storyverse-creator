// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import HeroBanner from "@/components/HeroBanner";
// import ShowRow from "@/components/ShowRow";

// import { getMovies, Movie } from "@/lib/movieService"; 

// const Index = () => {
//   const [shows, setShows] = useState<Movie[]>([]); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadFirebaseData = async () => {
//       const data = await getMovies();
//       setShows(data);
//       setLoading(false);
//     };
//     loadFirebaseData();
//   }, []);

//   if (loading) {
//     return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Storyverse...</div>;
//   }

//   const featuredShow = shows.length > 0 ? shows[0] : null;
  
//   const yourStories = shows;
//   const trendingNow = [...shows]; 

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       {/* Hero Section */}
//       {featuredShow && <HeroBanner show={featuredShow} />}
      
//       <div className="-mt-32 relative z-10 pb-20">
//         <ShowRow title="Your Stories" shows={yourStories} />
//         <ShowRow title="Trending Now" shows={trendingNow} />
//         <ShowRow title="All Stories" shows={shows} />
//       </div>
//     </div>
//   );
// };

// export default Index;

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ShowRow from "@/components/ShowRow";
import { getMovies, seedDatabase } from "@/lib/movieService"; 
import { Movie, shows as mockShows } from "@/data/mockData";

const Index = () => {
  const [shows, setShows] = useState<Movie[]>([]); 
  const [loading, setLoading] = useState(true);

  const [selectedShow, setSelectedShow] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowClick = (show: Movie) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const data = await getMovies();
        setShows(data.length > 0 ? data : mockShows);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleSeed = async () => {
    const success = await seedDatabase();
    if (success) {
      alert("Database Seeded Successfully!");
      window.location.reload();
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      {shows.length === 0 || shows === mockShows ? (
        <button 
          onClick={handleSeed}
          className="fixed bottom-10 right-10 z-[100] bg-red-600 text-white p-4 rounded-full font-bold shadow-2xl transition-all hover:scale-105"
        >
          Seed Database
        </button>
      ) : null}

      {shows[0] && <HeroBanner show={shows[0]} />}
      
      <div className="-mt-32 relative z-10 pb-20 px-4">
        <ShowRow title="Your Stories" shows={shows} />
      </div>
    </div>
  );
};

export default Index;