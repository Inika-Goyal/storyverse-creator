import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Movie } from "@/data/mockData";
import { Button } from "./ui/button";

interface HeroBannerProps {
  show: Movie;
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
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-xl z-10">
        <div className="flex items-center gap-2 mb-4">
          {/* <img src="/logo.png" alt="Logo" className="h-8 md:h-12 w-auto object-contain" /> */}
          {/* <p className="text-primary font-semibold tracking-widest text-xs md:text-sm">
            ORIGINAL
          </p> */}
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide mb-4">
          {show.title.toUpperCase()}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-2">
          New Episodes Available
        </p>
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
      <div className="absolute right-20 top-1/2 -translate-y-1/2 flex items-center gap-22 origin-right pr-8">
        <div className="w-12 h-[5px] bg-red-600" /> 
        <span className="text-white uppercase tracking-[0.3em] text-sm font-bold whitespace-nowrap">
          {show.genre}
        </span>
      </div>
    </div>
  );
};

export default HeroBanner;
