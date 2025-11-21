import { MessageCircle, MessageSquare, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useShopData } from "@/context/ShopDataContext";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
}

const OrderModal = ({ isOpen, onClose, itemName }: OrderModalProps) => {
  const { shopData } = useShopData();
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(`Hi! I'd like to order ${itemName}`);
    window.open(`https://wa.me/${shopData.shopInfo.whatsapp}?text=${message}`, "_blank");
  };

  const handleSMSOrder = () => {
    const message = encodeURIComponent(`Hi! I'd like to order ${itemName}`);
    window.open(`sms:${shopData.shopInfo.phone}?body=${message}`, "_blank");
  };

  const handleCallOrder = () => {
    window.open(`tel:${shopData.shopInfo.phone}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Order {itemName}</DialogTitle>
          <DialogDescription>
            Choose your preferred way to place your order
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            variant="hero"
            size="lg"
            className="w-full justify-start gap-3"
            onClick={handleWhatsAppOrder}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="flex-1 text-left">Order on WhatsApp</span>
          </Button>
          <Button
            variant="default"
            size="lg"
            className="w-full justify-start gap-3"
            onClick={handleSMSOrder}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="flex-1 text-left">Order via SMS</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-start gap-3"
            onClick={handleCallOrder}
          >
            <Phone className="w-5 h-5" />
            <span className="flex-1 text-left">Call Now</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
