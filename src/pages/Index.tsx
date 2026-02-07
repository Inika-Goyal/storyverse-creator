import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ShowRow from "@/components/ShowRow";
import { shows } from "@/data/mockData";

const Index = () => {
  const featuredShow = shows[0]; // The Last Kingdom as featured
  
  // Organize shows into rows
  const yourStories = shows;
  const trendingNow = [...shows].sort((a, b) => b.views - a.views);
  const byGenre = {
    fantasy: shows.filter(s => s.genre === "Fantasy" || s.genre === "Adventure"),
    drama: shows.filter(s => s.genre === "Romance" || s.genre === "Crime"),
    thriller: shows.filter(s => s.genre === "Sci-Fi" || s.genre === "Mystery"),
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroBanner show={featuredShow} />
      
      {/* Content Rows */}
      <div className="-mt-32 relative z-10 pb-20">
        <ShowRow title="Your Stories" shows={yourStories} />
        <ShowRow title="Trending Now" shows={trendingNow} />
        <ShowRow title="Fantasy & Adventure" shows={byGenre.fantasy} />
        <ShowRow title="Drama & Romance" shows={byGenre.drama} />
        <ShowRow title="Sci-Fi & Mystery" shows={byGenre.thriller} />
      </div>
    </div>
  );
};

export default Index;
