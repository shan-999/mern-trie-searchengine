"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSearchResult, initializeTrie, getSuggestions } from "./services/search"
import type { GoogleSearchItem } from "./type/type"


export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestion, setSuggestion] = useState<string[]>([])
  const [searchResult, setsearchResult] = useState<GoogleSearchItem[]>([])
  const inp = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    const data: string[] = (await getSuggestions(value)).data.suggestions
    setSuggestion(data)
    setShowSuggestions(data.length > 0)
  }

  const handleSearch = async () => {
    setShowSuggestions(false)
    const data = await getSearchResult(searchQuery)

    setsearchResult(data.data.data.items || []);
  }

  const handleReset = () => {
    setsearchResult([])
    setSearchQuery('')
  }


  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      await initializeTrie()
    };

    inp.current?.focus();

    fetchData();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Sticky Search Bar Container */}
      <div
        className={`${searchResult.length > 0 ? "sticky top-0 z-50 border-b border-gray-700/50 backdrop-blur-sm" : "flex flex-col items-center justify-center min-h-screen"} p-4`}
      >
        <div className="w-full max-w-2xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full shadow-2xl">
              {/* Reset Icon - Only show when search results exist */}
              {searchResult.length > 0 && (
                <Button
                  className="bg-transparent hover:bg-gray-700/50 text-gray-400 hover:text-white px-3 py-4 border-none"
                  size="sm"
                  onClick={handleReset}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleEnterClick}
                className="flex-1 bg-transparent border-none text-white placeholder-gray-400 text-lg px-6 py-4 focus:outline-none focus:ring-0 rounded-l-full"
              />
              <Button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-r-full border-none"
                size="lg"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Suggestions Container with fixed height and ref */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-0 h-64 overflow-y-auto animate-in fade-in-0 slide-in-from-top-2 duration-200"
            >
              <div className="sticky top-0 bg-gray-800 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
                <h3 className="text-gray-300 text-sm font-medium">People also ask</h3>
              </div>
              <div className="space-y-2 p-4">
                {suggestion.slice(0, 8).map((suggestion, index) => (
                  <div
                    key={index}
                    className="text-gray-200 hover:text-white hover:bg-gray-700/50 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 text-sm"
                    onClick={() => {
                      setSearchQuery(suggestion)
                      setShowSuggestions(false)
                      handleSearch()
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
                {suggestion.length === 0 && (
                  <div className="text-gray-400 px-4 py-3 text-sm">No suggestions found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results Section */}
      {searchResult.length > 0 && (
        <div className="w-full max-w-4xl mx-auto px-4 pb-8">
          {searchResult.map((r, i) => (
            <div
              key={i}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6 hover:bg-gray-800/60 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex gap-4">
                {/* Thumbnail Image Section */}
                {r.thumbnail ? (
                  <div className="flex-shrink-0">
                    <img
                      src={r.thumbnail || "/placeholder.svg"}
                      alt={r.title}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                ) : null}

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 block mb-2 line-clamp-2"
                  >
                    {r.title}
                  </a>

                  {/* URL */}
                  <div className="flex items-center mb-3">
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-400 hover:text-green-300 transition-colors duration-200 truncate"
                    >
                      {r.link}
                    </a>
                  </div>

                  {/* Snippet */}
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{r.snippet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Optional: Search Engine Branding - Only show when no results */}
      {searchResult.length === 0 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            NexFind
          </h1>
          <p className="text-gray-400 text-sm">
            Created by:{" "}
            <a
              href="https://github.com/shan-999"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-400"
            >
              Muhammed Shan M
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
