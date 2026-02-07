import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Show } from "@/data/mockData";
import { Button } from "./ui/button";

interface HeroBannerProps {
  show: Show;
}

const HeroBanner = ({ show }: HeroBannerProps) => {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient - Netflix style left-to-right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)"
        }} />
      </div>

      {/* Content */}
      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-xl z-10">
        <p className="text-xs md:text-sm text-muted-foreground font-semibold mb-2 tracking-wide">
          NEW EPISODES AVAILABLE
        </p>

        <h1 style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: "64px",
          letterSpacing: "-1px",
          lineHeight: "1.05"
        }} className="mb-4">
          {show.title}
        </h1>
        <p className="text-sm md:text-base mb-6 line-clamp-3 text-foreground/90">
          {show.description}
        </p>

        <div className="flex gap-3">
          <Link to={`/show/${show.id}`}>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 font-semibold gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Read
            </Button>
          </Link>
          <Link to={`/show/${show.id}`}>
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold gap-2"
            >
              <Info className="w-5 h-5" />
              More Info
            </Button>
          </Link>
        </div>
      </div>

      {/* Rating Badge */}
      <div className="absolute bottom-[20%] right-4 md:right-12 flex items-center gap-2">
        <div className="h-10 w-1 bg-muted-foreground" />
        <span className="text-lg font-medium">{show.genre}</span>
      </div>
    </div>
  );
};

export default HeroBanner;
