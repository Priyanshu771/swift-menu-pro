import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MenuCard from "@/components/MenuCard";
import { useShopData } from "@/context/ShopDataContext";

const Menu = () => {
  const { shopData } = useShopData();
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Menu</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious selection of freshly prepared dishes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shopData.menuItems.map((item) => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
