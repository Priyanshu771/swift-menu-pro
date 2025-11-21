import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import shopData from "@/data/shopData.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {shopData.shopInfo.name}
            </h3>
            <p className="text-muted-foreground mb-4">
              {shopData.shopInfo.tagline}
            </p>
            <div className="flex gap-4">
              <a
                href={shopData.shopInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={shopData.shopInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={shopData.shopInfo.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {shopData.shopInfo.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${shopData.shopInfo.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {shopData.shopInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${shopData.shopInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {shopData.shopInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <p className="text-sm text-muted-foreground">
              {shopData.shopInfo.openingHours}
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {shopData.shopInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
