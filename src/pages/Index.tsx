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
import { shows, nicheTopics, creatorStats } from "@/data/mockData";

const Index = () => {
  const featuredShow = shows[0]; // The Last Kingdom as featured
  
  // Organize shows into rows
  const yourStories = shows;
  const trendingNow = [...shows].sort((a, b) => b.views - a.views);
  
  // Create "Trending in your niche" based on user's primary niche
  const userNiche = creatorStats.primaryNiche;
  const trendingInNiche = shows.filter(s => s.genre === userNiche);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      {/* Hero Section */}
      <HeroBanner show={featuredShow} />
      
      {/* Content Rows */}
      <div className="-mt-32 relative z-10 pb-20">
        <ShowRow title="Your Stories" shows={yourStories} />
        <ShowRow title="Trending Now" shows={trendingNow} />
        <ShowRow title={`Trending in ${userNiche}`} shows={trendingInNiche.length > 0 ? trendingInNiche : yourStories} />
      </div>
    </div>
  );
};

export default Index;