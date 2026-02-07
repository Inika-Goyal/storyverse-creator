import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
  color: string;
  isKids?: boolean;
}

const profiles: Profile[] = [
  { id: "2", name: "Adventurer", color: "hsl(320, 80%, 55%)" },
  { id: "3", name: "Writer", color: "hsl(45, 90%, 55%)" },
  { id: "4", name: "Add Account", color: "hsl(0, 75%, 55%)" },
];

const ProfileSelection = () => {
  const navigate = useNavigate();

  const handleSelectProfile = (profile: Profile) => {
    navigate("/browse");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <h1 className="font-display text-3xl md:text-4xl text-primary tracking-wider absolute top-6 left-6 md:left-12">
        STORYVERSE
      </h1>

      {/* Main Content */}
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl text-foreground font-medium mb-10">
          Who's watching?
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelectProfile(profile)}
              className="group flex flex-col items-center gap-3 focus:outline-none"
            >
              {/* Avatar */}
              <div
                className="w-20 h-20 md:w-32 md:h-32 rounded-md relative overflow-hidden transition-all duration-200 group-hover:ring-2 ring-foreground"
                style={{ backgroundColor: profile.color }}
              >
                {/* Simple face icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Eyes */}
                    <div className="absolute top-1/3 left-1/4 w-2 md:w-3 h-2 md:h-3 bg-white rounded-full" />
                    <div className="absolute top-1/3 right-1/4 w-2 md:w-3 h-2 md:h-3 bg-white rounded-full" />
                    {/* Smile */}
                    <div 
                      className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-8 md:w-14 h-4 md:h-6 border-b-4 border-white rounded-b-full"
                    />
                  </div>
                </div>
                
                {/* Kids badge */}
                {profile.isKids && (
                  <span className="absolute bottom-2 right-2 text-xs font-bold text-primary">
                    Make an Account
                  </span>
                )}
              </div>

              {/* Name */}
              <span className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                {profile.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;
