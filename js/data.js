// Product Data
const products = [
    {
        id: 1,
        name: "Handwoven Banarasi Saree",
        price: 4999,
        originalPrice: 7999,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
        rating: 4.8,
        reviews: 156,
        description: "Authentic Banarasi silk saree with traditional zari work. Perfect for weddings and special occasions.",
        brand: "Varanasi Weavers",
        seller: "Traditional Crafts Co.",
        inStock: true
    },
    {
        id: 2,
        name: "Organic Turmeric Powder",
        price: 299,
        originalPrice: 399,
        category: "Grocery",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
        rating: 4.6,
        reviews: 89,
        description: "Pure organic turmeric powder from Kerala farms. Rich in curcumin and natural antioxidants.",
        brand: "Desi Organic",
        seller: "Kerala Spice House",
        inStock: true
    },
    {
        id: 4,
        name: "Brass Diya Set (Pack of 6)",
        price: 599,
        originalPrice: 899,
        category: "Home",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        rating: 4.7,
        reviews: 67,
        description: "Traditional brass diyas perfect for festivals and daily prayers. Handcrafted by skilled artisans.",
        brand: "Desi Decor",
        seller: "Brass Craft India",
        inStock: true
    },
    {
        id: 5,
        name: "Smartphone (Made in India)",
        price: 12999,
        originalPrice: 15999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        rating: 4.4,
        reviews: 445,
        description: "Latest smartphone with Indian manufacturing. Advanced features with affordable pricing.",
        brand: "Desi Mobile",
        seller: "Tech India Store",
        inStock: true
    },
    {
        id: 6,
        name: "Wooden Handicraft Elephant",
        price: 1299,
        originalPrice: 1899,
        category: "Handicraft",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        rating: 4.9,
        reviews: 23,
        description: "Hand-carved wooden elephant from Rajasthan artisans. Beautiful home decor piece.",
        brand: "Rajasthani Arts",
        seller: "Heritage Crafts",
        inStock: true
    },
    {
        id: 7,
        name: "Ayurvedic Face Pack",
        price: 249,
        originalPrice: 349,
        category: "Grocery",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        rating: 4.3,
        reviews: 78,
        description: "Natural ayurvedic face pack with neem and turmeric. Chemical-free skincare solution.",
        brand: "Ayur Natural",
        seller: "Herbal India",
        inStock: true
    },
    {
        id: 8,
        name: "Copper Water Bottle",
        price: 799,
        originalPrice: 1199,
        category: "Home",
        image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400",
        rating: 4.6,
        reviews: 156,
        description: "Pure copper water bottle with health benefits. Traditional ayurvedic approach to wellness.",
        brand: "Copper Craft",
        seller: "Wellness Store",
        inStock: true
    }
];

// Categories Data
const categories = [
    { name: "Fashion", icon: "👗", count: 0 },
    { name: "Grocery", icon: "🛒", count: 0 },
    { name: "Electronics", icon: "📱", count: 0 },
    { name: "Home", icon: "🏠", count: 0 },
    { name: "Handicraft", icon: "🎨", count: 0 }
];

// Update category counts
categories.forEach(category => {
    category.count = products.filter(product => product.category === category.name).length;
});

// Testimonials Data
const testimonials = [
    {
        id: 1,
        name: "Priya Sharma",
        location: "Mumbai",
        rating: 5,
        comment: "DesiMart se shopping ka experience bahut accha hai. Quality products aur fast delivery!"
    },
    {
        id: 2,
        name: "Rajesh Kumar",
        location: "Delhi",
        rating: 5,
        comment: "Authentic desi products milte hain yahan. Local sellers ko support karna accha lagta hai."
    },
    {
        id: 3,
        name: "Anita Patel",
        location: "Ahmedabad",
        rating: 4,
        comment: "Bahut sare options hain aur prices bhi reasonable. Recommended!"
    }
];