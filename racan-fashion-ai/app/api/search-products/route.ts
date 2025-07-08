export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Search for real products using web scraping simulation
    const searchResults = await searchRealProducts(query)

    return new Response(JSON.stringify({ products: searchResults }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error searching products:", error)
    return new Response(JSON.stringify({ error: "Failed to search products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

async function searchRealProducts(query: string) {
  try {
    // Add randomization to ensure different results each time
    const timestamp = Date.now() + Math.floor(Math.random() * 1000)
    const queryHash = query.toLowerCase().replace(/\s+/g, "-")

    // Generate unique products based on the search query
    const products = []

    // Real fashion product data simulation with enhanced variety
    const fashionProducts = await generateFashionProducts(query, timestamp)
    products.push(...fashionProducts)

    // Additional randomization to prevent repetition
    const shuffledProducts = products.sort(() => Math.random() - 0.5)

    return shuffledProducts.slice(0, 6) // Return top 6 unique results
  } catch (error) {
    console.error("Error in searchRealProducts:", error)
    return []
  }
}

async function generateFashionProducts(query: string, timestamp: number) {
  const lowerQuery = query.toLowerCase()

  // Expanded product database with more variety
  const productDatabase = {
    anime: [
      {
        name: "Naruto Hokage Cloak Hoodie",
        brand: "Anime Store",
        basePrice: 1299,
        category: "hoodie",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
      },
      {
        name: "Attack on Titan Survey Corps T-Shirt",
        brand: "Manga World",
        basePrice: 899,
        category: "tshirt",
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=300&h=400&fit=crop",
      },
      {
        name: "Dragon Ball Z Goku Ultra Instinct Tee",
        brand: "DBZ Official",
        basePrice: 999,
        category: "tshirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      },
      {
        name: "One Piece Straw Hat Pirates Hoodie",
        brand: "Pirate King",
        basePrice: 1599,
        category: "hoodie",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      },
      {
        name: "Demon Slayer Tanjiro Kamado Jacket",
        brand: "Demon Slayer Co",
        basePrice: 1899,
        category: "jacket",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
      },
      {
        name: "My Hero Academia All Might T-Shirt",
        brand: "Hero Academia",
        basePrice: 799,
        category: "tshirt",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop",
      },
      {
        name: "Tokyo Ghoul Kaneki Ken Mask Hoodie",
        brand: "Tokyo Ghoul Store",
        basePrice: 1399,
        category: "hoodie",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
      },
      {
        name: "Jujutsu Kaisen Sukuna Fingers T-Shirt",
        brand: "JJK Official",
        basePrice: 849,
        category: "tshirt",
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=300&h=400&fit=crop",
      },
    ],
    formal: [
      {
        name: "Premium Cotton Formal Shirt - White",
        brand: "Van Heusen",
        basePrice: 1599,
        category: "shirt",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
      },
      {
        name: "Slim Fit Formal Blazer - Navy",
        brand: "Peter England",
        basePrice: 2999,
        category: "blazer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      },
      {
        name: "Classic Formal Trousers - Black",
        brand: "Arrow",
        basePrice: 1799,
        category: "trousers",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
      },
      {
        name: "Executive Formal Suit - Charcoal",
        brand: "Blackberrys",
        basePrice: 4999,
        category: "suit",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      },
      {
        name: "Formal Leather Shoes - Brown",
        brand: "Clarks",
        basePrice: 3499,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      },
      {
        name: "Silk Formal Tie - Burgundy",
        brand: "Louis Philippe",
        basePrice: 699,
        category: "tie",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
      },
      {
        name: "Formal Shirt - Light Blue",
        brand: "Raymond",
        basePrice: 1399,
        category: "shirt",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
      },
      {
        name: "Formal Waistcoat - Grey",
        brand: "Park Avenue",
        basePrice: 1899,
        category: "waistcoat",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      },
    ],
    casual: [
      {
        name: "Comfort Cotton T-Shirt - Navy",
        brand: "H&M",
        basePrice: 699,
        category: "tshirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      },
      {
        name: "Relaxed Fit Jeans - Light Blue",
        brand: "Levi's",
        basePrice: 2299,
        category: "jeans",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop",
      },
      {
        name: "Casual Polo Shirt - Green",
        brand: "Tommy Hilfiger",
        basePrice: 1799,
        category: "polo",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop",
      },
      {
        name: "Casual Sneakers - White",
        brand: "Adidas",
        basePrice: 2999,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      },
      {
        name: "Casual Chino Shorts - Khaki",
        brand: "Uniqlo",
        basePrice: 999,
        category: "shorts",
        image: "https://images.unsplash.com/photo-1506629805968-8d36aac35561?w=300&h=400&fit=crop",
      },
      {
        name: "Casual Hoodie - Grey",
        brand: "Zara",
        basePrice: 1499,
        category: "hoodie",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
      },
      {
        name: "Denim Jacket - Blue",
        brand: "Wrangler",
        basePrice: 1999,
        category: "jacket",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
      },
      {
        name: "Casual Cargo Pants - Olive",
        brand: "Roadster",
        basePrice: 1299,
        category: "pants",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop",
      },
    ],
    gym: [
      {
        name: "Performance Workout T-Shirt - Black",
        brand: "Nike",
        basePrice: 1299,
        category: "tshirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      },
      {
        name: "Athletic Training Shorts - Grey",
        brand: "Adidas",
        basePrice: 899,
        category: "shorts",
        image: "https://images.unsplash.com/photo-1506629805968-8d36aac35561?w=300&h=400&fit=crop",
      },
      {
        name: "Compression Leggings - Black",
        brand: "Under Armour",
        basePrice: 1599,
        category: "leggings",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
      },
      {
        name: "Sports Hoodie - Navy",
        brand: "Puma",
        basePrice: 1999,
        category: "hoodie",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
      },
      {
        name: "Running Shoes - Black/Red",
        brand: "Asics",
        basePrice: 3999,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      },
      {
        name: "Gym Tank Top - White",
        brand: "Reebok",
        basePrice: 799,
        category: "tank",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop",
      },
      {
        name: "Sports Track Pants - Black",
        brand: "Nike",
        basePrice: 1799,
        category: "pants",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop",
      },
      {
        name: "Gym Sweatshirt - Grey",
        brand: "Puma",
        basePrice: 1599,
        category: "sweatshirt",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      },
    ],
  }

  // Determine category and get relevant products
  let relevantProducts = []
  const searchCategories = []

  // Multi-category search logic
  if (lowerQuery.includes("anime")) searchCategories.push("anime")
  if (lowerQuery.includes("formal") || lowerQuery.includes("office")) searchCategories.push("formal")
  if (lowerQuery.includes("casual") || lowerQuery.includes("everyday")) searchCategories.push("casual")
  if (lowerQuery.includes("gym") || lowerQuery.includes("workout")) searchCategories.push("gym")

  // If specific categories found, use them
  if (searchCategories.length > 0) {
    searchCategories.forEach((category) => {
      const categoryProducts = productDatabase[category] || []
      relevantProducts.push(...categoryProducts)
    })
  } else {
    // For general searches, mix from all categories
    relevantProducts = [
      ...productDatabase.casual.slice(0, 2),
      ...productDatabase.formal.slice(0, 2),
      ...productDatabase.anime.slice(0, 1),
      ...productDatabase.gym.slice(0, 1),
    ]
  }

  // Shuffle products to ensure variety
  const shuffledProducts = relevantProducts.sort(() => Math.random() - 0.5)

  // Generate unique products with timestamp-based variation
  return shuffledProducts.slice(0, 6).map((product, index) => {
    const priceVariation = Math.floor(Math.random() * 300) - 150 // ±150 price variation
    const finalPrice = Math.max(product.basePrice + priceVariation, 299) // Minimum price ₹299
    const uniqueId = `${timestamp}_${index}_${Math.random().toString(36).substr(2, 9)}`

    // Generate real shopping URLs with specific product search
    const searchQuery = encodeURIComponent(`${product.name} ${product.brand}`)
    const shoppingUrls = [
      `https://www.amazon.in/s?k=${searchQuery}&ref=nb_sb_noss`,
      `https://www.myntra.com/search?q=${searchQuery}`,
      `https://www.flipkart.com/search?q=${searchQuery}`,
      `https://www.ajio.com/search/?text=${searchQuery}`,
      `https://www.nykaa.com/search/result/?q=${searchQuery}`,
    ]

    const randomUrl = shoppingUrls[Math.floor(Math.random() * shoppingUrls.length)]

    return {
      id: uniqueId,
      name: product.name,
      brand: product.brand,
      price: `₹${finalPrice.toLocaleString()}`,
      image: product.image,
      url: randomUrl,
      category: product.category,
    }
  })
}
