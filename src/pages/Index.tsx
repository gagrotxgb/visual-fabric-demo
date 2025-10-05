import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { DemoModal } from "@/components/DemoModal";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  TrendingUp, 
  Sparkles, 
  ImageOff, 
  ShoppingCart, 
  Zap 
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const painPoints = [
    {
      icon: ImageOff,
      title: "The Imagination Gap",
      description: "Customers struggle to picture how a flat piece of fabric will drape and look as a finished garment."
    },
    {
      icon: ShoppingCart,
      title: "Purchase Hesitation",
      description: "Uncertainty leads to decision paralysis, resulting in lost sales and abandoned fabric choices."
    },
    {
      icon: Zap,
      title: "A Static Experience",
      description: "The traditional 'fabric on a roll' display is uninspiring and fails to connect with the modern, visual shopper."
    }
  ];

  const benefits = [
    {
      icon: Eye,
      title: "Visualize Instantly",
      description: "Allow customers to see any fabric from your store as a beautiful, finished outfit on a model in seconds."
    },
    {
      icon: TrendingUp,
      title: "Sales Accelerator",
      description: "By eliminating guesswork, you give customers the confidence to buy, dramatically increasing your sales and revenue."
    },
    {
      icon: Sparkles,
      title: "Offer a Unique Service",
      description: "Differentiate your store from the competition with a cutting-edge, personalized shopping experience that customers will love."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)]">
      <Navigation onDemoClick={() => setIsDemoOpen(true)} />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 top-0 h-[600px] sm:h-[700px] bg-cover bg-center opacity-5 z-0"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Stop Guessing.
              </span>
              <br />
              <span className="text-foreground">Start Selling.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Empower your customers to visualize the perfect outfit with our AI-powered fabric previewer. 
              Turn hesitation into confident purchases and transform your in-store experience.
            </p>
            <div className="pt-4">
              <Button 
                variant="cta" 
                size="lg" 
                onClick={() => setIsDemoOpen(true)}
                className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8"
              >
                Try the Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                The Challenge
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Traditional fabric displays leave customers guessing
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {painPoints.map((point, index) => (
                <FeatureCard key={index} {...point} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Revolutionize Your Sales Floor
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform uncertainty into confident purchases
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <FeatureCard key={index} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--gradient-hero)]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Ready to Transform Your Store?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              See VisualFabric in action and discover how it can revolutionize your customer experience
            </p>
            <Button 
              variant="cta" 
              size="lg" 
              onClick={() => setIsDemoOpen(true)}
              className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8"
            >
              Try the Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="container mx-auto">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 VisualFabric. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <DemoModal open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </div>
  );
};

export default Index;
