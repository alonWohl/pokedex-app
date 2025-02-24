import React from 'react'
import { Routes, Route } from 'react-router'
import { PokemonIndex } from './pages/PokemonIndex'
import { HomePage } from './pages/HomePage.jsx'
export function RootCmp() {
  return (
    <div className="app h-screen w-screen bg-neutral-100">
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon" element={<PokemonIndex />} />
        </Routes>
      </main>
    </div>
  )
}
