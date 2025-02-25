import React from 'react'
import { Routes, Route } from 'react-router'
import { PokemonIndex } from './pages/PokemonIndex'
import { HomePage } from './pages/HomePage.jsx'
import { PokemonFilter } from './cmps/PokemonFilter.jsx'
export function RootCmp() {
  return (
    <div className="app h-screen max-w-screen bg-neutral-100 overflow-hidden">
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon" element={<PokemonIndex />} />
          <Route path="/pokemon/filter" element={<PokemonFilter />} />
        </Routes>
      </main>
    </div>
  )
}
