import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface NavigationProps {
  onDemoClick: () => void;
}

export const Navigation = ({ onDemoClick }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VisualFabric
            </span>
          </div>
          <Button variant="cta" onClick={onDemoClick} size="lg">
            Try the Live Demo
          </Button>
        </div>
      </div>
    </nav>
  );
};
