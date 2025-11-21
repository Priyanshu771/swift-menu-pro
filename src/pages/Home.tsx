import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MenuCard from "@/components/MenuCard";
import shopData from "@/data/shopData.json";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  const featuredItems = shopData.menuItems.filter((item) => item.featured);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBanner})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-scale-in">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {shopData.shopInfo.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {shopData.shopInfo.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/menu">
                View Menu
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Opening Hours</h3>
              <p className="text-sm text-muted-foreground">
                {shopData.shopInfo.openingHours}
              </p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground">
                {shopData.shopInfo.address.split(",")[0]}
              </p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
              <Star className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Quality Food</h3>
              <p className="text-sm text-muted-foreground">
                Fresh & Delicious Always
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Best Sellers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Try our most popular dishes, loved by customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/menu">
              View Full Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
