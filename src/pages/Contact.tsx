import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import shopData from "@/data/shopData.json";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Reach out to us anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Cards */}
          <div className="space-y-6">
            <Card className="hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>Give us a call to place your order</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="hero" className="w-full" asChild>
                  <a href={`tel:${shopData.shopInfo.phone}`}>
                    <Phone className="w-4 h-4" />
                    {shopData.shopInfo.phone}
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>WhatsApp</CardTitle>
                <CardDescription>Chat with us on WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="hero" className="w-full" asChild>
                  <a
                    href={`https://wa.me/${shopData.shopInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Email</CardTitle>
                <CardDescription>Send us an email</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${shopData.shopInfo.email}`}>
                    <Mail className="w-4 h-4" />
                    {shopData.shopInfo.email}
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Visit Us</CardTitle>
                <CardDescription>Come visit our restaurant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{shopData.shopInfo.address}</p>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{shopData.shopInfo.openingHours}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
                <CardDescription>Find us on the map</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[500px]">
                  <iframe
                    src={shopData.shopInfo.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Shop Location"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
