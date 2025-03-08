import { useState } from 'react'

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col items-center justify-center max-w-sm w-full space-y-4">
        {isLogin ? (
          <>
            <input type="text" placeholder="Username" className="w-full p-2 rounded-md bg-zinc-50 dark:bg-zinc-900" />
            <input type="password" placeholder="Password" className="w-full p-2 rounded-md bg-zinc-50 dark:bg-zinc-900" />
            <button type="submit" className="w-full p-2 rounded-md bg-blue-500 text-white">
              Login
            </button>
            <button
              type="button"
              className="w-full p-2 rounded-md bg-blue-500 text-white"
              onClick={(ev) => {
                ev.preventDefault()
                setIsLogin(false)
              }}>
              Signup
            </button>
          </>
        ) : (
          <>
            <input type="text" placeholder="Full Name" className="w-full p-2 rounded-md bg-zinc-50 dark:bg-zinc-900" />
            <input type="text" placeholder="Username" className="w-full p-2 rounded-md bg-zinc-50 dark:bg-zinc-900" />
            <input type="password" placeholder="Password" className="w-full p-2 rounded-md bg-zinc-50 dark:bg-zinc-900" />
            <button type="submit" className="w-full p-2 rounded-md bg-blue-500 text-white">
              Signup
            </button>
          </>
        )}
      </form>
    </div>
  )
}
