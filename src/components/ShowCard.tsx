import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import { Movie } from "@/data/mockData";

interface ShowCardProps {
  show: Movie;
}

const ShowCard = ({ show }: ShowCardProps) => {
  return (
    <Link
      to={`/show/${show.id}`}
      className="relative group flex-shrink-0 w-[200px] md:w-[240px] rounded overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10"
    >
      <div className="aspect-video relative">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge */}
        {show.badge && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded">
            {show.badge}
          </div>
        )}
        
        {/* Hover Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1">{show.title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{show.genre}</p>
          
          <div className="flex gap-2">
            <button className="p-1.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors">
              <Play className="w-3 h-3 fill-current" />
            </button>
            <button className="p-1.5 rounded-full border border-muted-foreground hover:border-foreground transition-colors">
              <Info className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar (for continue watching) */}
      <div className="h-1 bg-muted">
        <div className="h-full bg-primary w-1/3" />
      </div>
    </Link>
  );
};

export default ShowCard;
