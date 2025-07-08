"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, AlertCircle, Camera, X, Plus, Sparkles, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTheme } from "next-themes"

interface Message {
  role: "user" | "assistant"
  content: string
  image?: string
  products?: Product[]
}

interface Product {
  id: string
  name: string
  brand: string
  price: string
  image: string
  url: string
}

export default function ChatInterface() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRequestTime, setLastRequestTime] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleCategoryClick = (prompt: string) => {
    setInput(prompt)
    setTimeout(() => {
      const inputElement = document.querySelector('input[placeholder*="help"]') as HTMLInputElement
      if (inputElement) {
        inputElement.focus()
      }
    }, 100)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogoClick = () => {
    window.location.href = "https://racan-ai.vercel.app"
  }

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const response = await fetch("/api/search-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error("Failed to search products")
      }

      const data = await response.json()
      return data.products || []
    } catch (error) {
      console.error("Error searching products:", error)
      return []
    }
  }

  const shouldShowProducts = (message: string): boolean => {
    const lowerMessage = message.toLowerCase().trim()

    // Don't show products for simple greetings or short messages
    const greetings = [
      "hi",
      "hello",
      "hey",
      "sup",
      "what's up",
      "whats up",
      "how are you",
      "good morning",
      "good evening",
    ]
    if (greetings.some((greeting) => lowerMessage === greeting || lowerMessage.startsWith(greeting + " "))) {
      return false
    }

    // Don't show products for very short messages (less than 4 words)
    if (lowerMessage.split(" ").length < 4) {
      return false
    }

    // Only show products for specific fashion-related queries
    return (
      lowerMessage.includes("shop") ||
      lowerMessage.includes("buy") ||
      lowerMessage.includes("purchase") ||
      lowerMessage.includes("trouser") ||
      lowerMessage.includes("pant") ||
      lowerMessage.includes("shirt") ||
      lowerMessage.includes("t-shirt") ||
      lowerMessage.includes("tshirt") ||
      lowerMessage.includes("outfit") ||
      lowerMessage.includes("clothes") ||
      lowerMessage.includes("clothing") ||
      lowerMessage.includes("wear") ||
      lowerMessage.includes("dress") ||
      lowerMessage.includes("jeans") ||
      lowerMessage.includes("recommend") ||
      lowerMessage.includes("suggest") ||
      lowerMessage.includes("show me") ||
      lowerMessage.includes("find") ||
      lowerMessage.includes("looking for") ||
      lowerMessage.includes("need") ||
      lowerMessage.includes("want") ||
      (lowerMessage.includes("anime") && (lowerMessage.includes("shirt") || lowerMessage.includes("clothes"))) ||
      (lowerMessage.includes("formal") && (lowerMessage.includes("wear") || lowerMessage.includes("clothes"))) ||
      (lowerMessage.includes("casual") && (lowerMessage.includes("wear") || lowerMessage.includes("clothes"))) ||
      (lowerMessage.includes("gym") && (lowerMessage.includes("wear") || lowerMessage.includes("clothes"))) ||
      lowerMessage.includes("workout")
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !selectedImage) return

    const now = Date.now()
    if (now - lastRequestTime < 2000) {
      setError("Please wait a moment before sending another message.")
      return
    }

    const userMessage = input || "What do you think about this image?"
    const messageImage = selectedImage
    setInput("")
    setSelectedImage(null)
    setError(null)
    setLastRequestTime(now)

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        image: messageImage || undefined,
      },
    ])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          image: messageImage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setError("I'm getting lots of requests right now! Please wait 30 seconds and try again.")
          setMessages((prev) => prev.slice(0, -1))
          return
        }
        throw new Error(data.text || "Failed to fetch response")
      }

      // Check if we should show products based on the message content
      let searchedProducts: Product[] = []
      if (shouldShowProducts(userMessage)) {
        // Extract search query from user message
        const searchQuery = extractSearchQuery(userMessage)
        searchedProducts = await searchProducts(searchQuery)
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text,
          products: searchedProducts.length > 0 ? searchedProducts : undefined,
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      setError("Something went wrong! Let's try that again.")
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const extractSearchQuery = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    // Extract specific product mentions
    if (lowerMessage.includes("anime")) return "anime shirts"
    if (lowerMessage.includes("formal")) return "formal shirts"
    if (lowerMessage.includes("casual")) return "casual wear"
    if (lowerMessage.includes("gym") || lowerMessage.includes("workout")) return "gym wear"
    if (lowerMessage.includes("jeans")) return "jeans"
    if (lowerMessage.includes("t-shirt") || lowerMessage.includes("tshirt")) return "t-shirts"
    if (lowerMessage.includes("trouser") || lowerMessage.includes("pant")) return "trousers"
    if (lowerMessage.includes("dress")) return "dresses"
    if (lowerMessage.includes("shoes")) return "shoes"
    if (lowerMessage.includes("hoodie")) return "hoodies"

    // Default to general fashion search
    return "fashion clothing"
  }

  // Loading Animation Component
  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center h-64 space-y-6">
      <div className="relative">
        {/* Outer gradient ring */}
        <div
          className="w-24 h-24 rounded-full animate-spin"
          style={{
            background: "conic-gradient(from 0deg, #e879f9, #a855f7, #3b82f6, #06b6d4, #e879f9)",
            padding: "3px",
          }}
        >
          <div className="w-full h-full rounded-full bg-gray-50 dark:bg-gray-800"></div>
        </div>

        {/* Inner glow effect */}
        <div
          className="absolute inset-0 w-24 h-24 rounded-full opacity-60 animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)",
            filter: "blur(8px)",
          }}
        ></div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Setting up your fashion assistant...
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">This will only take a moment</p>
      </div>
    </div>
  )

  // Product Card Component
  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-[400px] w-[240px] rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Best Seller</div>
      </div>
      <div className="p-3 flex flex-col justify-between h-36">
        <div>
          <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-1">{product.brand}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 leading-relaxed">{product.name}</p>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">{"★★★★☆"}</div>
            <span className="text-xs text-gray-500">(4.2)</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{product.price}</p>
            <span className="text-xs text-gray-500 line-through">
              ₹{(Number.parseInt(product.price.replace(/[₹,]/g, "")) * 1.3).toLocaleString()}
            </span>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">23% off</span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded text-xs transition-colors duration-200"
              onClick={() => window.open(product.url, "_blank")}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  // Show initial loading screen
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header className="flex items-center justify-start p-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <button onClick={handleLogoClick} className="cursor-pointer">
              <img
                src={
                  theme === "dark"
                    ? "https://i.postimg.cc/CMnkxnGs/image-1.png"
                    : "https://i.postimg.cc/rsYBTFzm/image-41.png"
                }
                alt="Racan AI"
                className="h-6 w-auto transition-opacity hover:opacity-80"
              />
            </button>
          </div>
        </header>
        <div className="flex items-center justify-center py-32">
          <LoadingAnimation />
        </div>
      </div>
    )
  }

  // Show welcome screen if no messages
  if (messages.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <button onClick={handleLogoClick} className="cursor-pointer">
              <img
                src={
                  theme === "dark"
                    ? "https://i.postimg.cc/CMnkxnGs/image-1.png"
                    : "https://i.postimg.cc/rsYBTFzm/image-41.png"
                }
                alt="Racan AI"
                className="h-6 w-auto transition-opacity hover:opacity-80"
              />
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </Button>
        </header>

        <div className="flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full py-8 min-h-[calc(100vh-80px)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-800 dark:text-gray-200 mb-6 transition-colors duration-200">
              Welcome, User
            </h1>
          </div>

          <div className="w-full max-w-2xl mb-6">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative border border-gray-300 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about fashion, beauty, or skincare..."
                  className="w-full pl-20 pr-16 py-5 text-base border-0 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent dark:text-gray-200 dark:placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    title="Upload image"
                  >
                    <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={isLoading}
                    className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    title="AI suggestions"
                  >
                    <Sparkles className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isLoading || (!input.trim() && !selectedImage)}
                    className="rounded-full h-8 w-8 p-0 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:disabled:bg-gray-800 transition-colors"
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </form>

            {error && (
              <Alert className="mt-3 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-300 text-sm">{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {selectedImage && (
            <div className="mb-4">
              <div className="relative inline-block">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected"
                  className="max-h-24 rounded-lg object-cover shadow-md"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 rounded-full"
                  onClick={removeImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
              {[
                { icon: "✍️", label: "Style Tips", prompt: "Give me some style tips for this season" },
                { icon: "🎓", label: "Beauty Learn", prompt: "Teach me about skincare routines" },
                { icon: "💄", label: "Makeup", prompt: "Help me with makeup techniques" },
              ].map((category) => (
                <Button
                  key={category.label}
                  variant="outline"
                  onClick={() => handleCategoryClick(category.prompt)}
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 text-sm font-medium"
                  disabled={isLoading}
                >
                  <span className="text-base">{category.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300">{category.label}</span>
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              {[
                { icon: "👗", label: "Outfits", prompt: "Suggest outfit ideas for different occasions" },
                { icon: "✨", label: "Trends", prompt: "What's trending in fashion right now?" },
              ].map((category) => (
                <Button
                  key={category.label}
                  variant="outline"
                  onClick={() => handleCategoryClick(category.prompt)}
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 text-sm font-medium"
                  disabled={isLoading}
                >
                  <span className="text-base">{category.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300">{category.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show chat interface if messages exist
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <button onClick={handleLogoClick} className="cursor-pointer">
            <img
              src={
                theme === "dark"
                  ? "https://i.postimg.cc/CMnkxnGs/image-1.png"
                  : "https://i.postimg.cc/rsYBTFzm/image-41.png"
              }
              alt="Racan AI"
              className="h-6 w-auto transition-opacity hover:opacity-80"
            />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open('https://dream-x-testing.vercel.app/', '_blank')}
            className="dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors"
          >
            <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </Button>
          <Avatar className="h-8 w-8">
            <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center text-gray-700 dark:text-gray-300">
              U
            </div>
          </Avatar>
        </div>
      </header>

      {error && (
        <Alert className="mx-4 mt-4 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-900/20">
          <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-800 dark:text-orange-300">{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`${message.role === "user" ? "max-w-[80%]" : "w-full"} space-y-3`}>
                <div
                  className={`rounded-2xl px-4 py-2 inline-block ${
                    message.role === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image || "/placeholder.svg"}
                      alt="Uploaded"
                      className="max-w-full h-auto rounded-lg mb-2 max-h-48 object-cover"
                    />
                  )}
                  {message.content}
                </div>

                {message.products && (
                  <div className="mt-3 w-full overflow-hidden">
                    <div className="overflow-x-auto scrollbar-hide">
                      <div
                        className="flex pb-3 gap-4 pl-0"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {message.products.map((product) => (
                          <div key={product.id} className="flex-shrink-0 w-60">
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-800 inline-block">
                <div className="flex gap-2">
                  <Skeleton className="h-2 w-2 rounded-full animate-pulse bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-2 w-2 rounded-full animate-pulse bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-2 w-2 rounded-full animate-pulse bg-gray-300 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          {selectedImage && (
            <div className="mx-4 mt-2 relative">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Selected"
                className="max-h-32 rounded-lg object-cover"
              />
              <Button
                size="sm"
                href="#"
                className="absolute top-1 right-1 h-6 w-6 p-0"
                aria-label="Try Racan AI"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4 pt-6 flex items-center gap-2 min-h-[80px]">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 transition-colors"
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fashion, beauty, or skincare..."
              className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-colors"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className="dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 bg-gray-700 hover:bg-gray-800 transition-colors"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
