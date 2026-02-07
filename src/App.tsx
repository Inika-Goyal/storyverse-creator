import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ProfileSelection from "./pages/ProfileSelection";
import Index from "./pages/Index";
import ShowDetail from "./pages/ShowDetail";
import EpisodeDetail from "./pages/EpisodeDetail";
import StoryChoice from "./pages/StoryChoice";
import CreatorStats from "./pages/CreatorStats";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/profiles" element={<ProfileSelection />} />
          <Route path="/browse" element={<Index />} />
          <Route path="/show/:id" element={<ShowDetail />} />
          <Route path="/episode/:id" element={<EpisodeDetail />} />
          <Route path="/episode/:id/choice" element={<StoryChoice />} />
          <Route path="/stats" element={<CreatorStats />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
