'use client'

import Header from '../components/Header'
import SearchBar from '../components/SearchBar'

export default function HomePage() {
  return (
    <>
      <Header />
      <SearchBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-center">
            Coming Soon ...
          </h1>
        </div>
      </div>
    </>
  )
}
