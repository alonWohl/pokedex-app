import { Routes, Route } from 'react-router'
import { PokemonIndex } from './pages/PokemonIndex'
import { HomePage } from './pages/HomePage.jsx'
import { PokemonFilter } from './cmps/PokemonFilter.jsx'
import { PokemonAbout, PokemonBaseStats, PokemonDetails, PokemonEvolution, PokemonMoves } from './pages/PokemonDetails.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { userService } from './services/user/user.service.remote.js'
import { useEffect } from 'react'
import { signup } from './store/user.actions'
export function RootCmp() {
  useEffect(() => {
    const loggedInUser = userService.getLoggedinUser()
    if (!loggedInUser) {
      signup({ username: 'guest', password: 'guest123', fullname: 'Guest' })
    }
  }, [])

  return (
    <div className="app h-screen w-screen overflow-hidden">
      <main className="h-full w-full bg-neutral-100 dark:bg-neutral-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pokemon" element={<PokemonIndex />} />
          <Route path="/pokemon/filter" element={<PokemonFilter />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />}>
            <Route path="about" element={<PokemonAbout />} />
            <Route path="base-stats" element={<PokemonBaseStats />} />
            <Route path="evolution" element={<PokemonEvolution />} />
            <Route path="moves" element={<PokemonMoves />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}
