import React from 'react'
import { Routes, Route } from 'react-router'
import { PokemonIndex } from './pages/PokemonIndex'

export function RootCmp() {
  return (
    <div className="app h-screen w-screen bg-stone-100">
      <main className="container mx-auto">
        <Routes>
          <Route path="/pokemon" element={<PokemonIndex />} />
        </Routes>
      </main>
    </div>
  )
}
