# How to Edit Your Restaurant Website

Your website is now ready! All the content is easily editable through a single JSON file.

## Editing Shop Information & Menu Items

All your shop data, menu items, and contact information are stored in:
```
src/data/shopData.json
```

### What You Can Edit:

#### Shop Information
- **name**: Your restaurant name
- **tagline**: Your catchy slogan
- **address**: Full shop address
- **phone**: Phone number (used for calls and SMS)
- **whatsapp**: WhatsApp number
- **email**: Contact email
- **openingHours**: Your business hours
- **mapEmbedUrl**: Google Maps embed URL (see instructions below)
- **socialMedia**: Facebook, Instagram, and Twitter links

#### Menu Items
Each menu item has:
- **id**: Unique identifier
- **name**: Item name
- **description**: Short description
- **price**: Price in your currency
- **image**: Image filename (without extension)
- **category**: "Appetizer" or "Main Course"
- **featured**: true/false (shows on home page if true)

### How to Add a New Menu Item:

1. Generate or add your food image to `src/assets/` folder (name it like: `new-item.jpg`)
2. Open `src/data/shopData.json`
3. Add a new entry in the `menuItems` array:

```json
{
  "id": "6",
  "name": "New Dish Name",
  "description": "Delicious description here",
  "price": 200,
  "image": "new-item",
  "category": "Main Course",
  "featured": false
}
```

### How to Update Google Maps Location:

1. Go to [Google Maps](https://maps.google.com)
2. Search for your shop location
3. Click "Share" → "Embed a map"
4. Copy the iframe src URL
5. Replace the `mapEmbedUrl` value in `shopData.json`

### How to Change Colors & Design:

The design system is defined in `src/index.css`. You can customize:
- Colors (primary, accent, etc.)
- Shadows
- Gradients
- Animations

## Order Options

When customers click "Order Now", they get 3 options:
1. **WhatsApp**: Opens WhatsApp with pre-filled message
2. **SMS**: Opens SMS app with pre-filled message
3. **Call**: Direct phone call

All use the phone/WhatsApp numbers from `shopData.json`.

## Need Help?

If you need to add more features or make changes, just ask!
