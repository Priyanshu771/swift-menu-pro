import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OrderModal from "./OrderModal";

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
}

const MenuCard = ({ name, description, price, image, category, featured }: MenuCardProps) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getImageSrc = async () => {
    try {
      const imageModule = await import(`@/assets/${image}.jpg`);
      return imageModule.default;
    } catch (error) {
      console.error("Image not found:", image);
      return "";
    }
  };

  const [imageSrc, setImageSrc] = useState<string>("");

  useState(() => {
    getImageSrc().then(setImageSrc);
  });

  return (
    <>
      <Card className="overflow-hidden group hover-scale transition-all duration-300 hover:shadow-[var(--shadow-hover)]">
        <div className="relative overflow-hidden aspect-square">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={imageSrc}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {featured && (
            <Badge className="absolute top-3 right-3 bg-accent">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold">{name}</h3>
            <Badge variant="secondary" className="text-base font-semibold">
              ₹{price}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            variant="hero"
            className="w-full"
            onClick={() => setIsOrderModalOpen(true)}
          >
            <ShoppingBag className="w-4 h-4" />
            Order Now
          </Button>
        </CardFooter>
      </Card>
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        itemName={name}
      />
    </>
  );
};

export default MenuCard;
