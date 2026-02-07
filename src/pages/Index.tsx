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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroBanner show={featuredShow} />
      
      {/* Content Rows */}
      <div className="-mt-32 relative z-10 pb-20">
        <ShowRow title="Your Stories" shows={yourStories} />
        <ShowRow title="New On StoryVerse" shows={trendingNow} />
        <ShowRow title={`Trending in ${userNiche}`} shows={trendingInNiche.length > 0 ? trendingInNiche : yourStories} />
      </div>
    </div>
  );
};

export default Index;
