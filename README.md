# Pokédex Application

A modern, feature-rich Pokédex web application that allows users to explore and learn about Pokémon. Built with React and powered by a Node.js backend.

![pokemon-index](https://res.cloudinary.com/dqfhbqcwv/image/upload/v1741433727/Screenshot_2025-03-08_at_13.34.37_tt0nlo.png)
![pokemon-index](https://res.cloudinary.com/dqfhbqcwv/image/upload/v1741433369/Screenshot_2025-03-08_at_13.22.20_cd4gfe.png)
![pokemon-index](https://res.cloudinary.com/dqfhbqcwv/image/upload/v1741433369/Screenshot_2025-03-08_at_13.22.41_molxkg.png)

## 🌟 Features

- **Comprehensive Pokémon Database**: Access detailed information about all Pokémon
- **Advanced Filtering**: Filter Pokémon by type, generation, and stats
- **Detailed Pokemon Information**:
  - Base stats
  - Evolution chains
  - Moves
  - Type advantages
- **Dark/Light Mode**: Toggle between dark and light themes
- **User Authentication**: Login system with guest access
- **Responsive Design**: Fully responsive across all devices

## 🛠️ Technologies Used

### Frontend

- **React**: UI library for building the user interface
- **Redux**: State management for the application
- **React Query**: Data fetching and caching
- **React Router**: Navigation and routing
- **Tailwind CSS**: Styling and responsive design

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: Database for storing user data and Pokémon information
- **Mongoose**: MongoDB object modeling

### Additional Tools

- **Vite**: Build tool and development server
- **ESLint**: Code linting
- **Git**: Version control

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/[your-username]/pokedex-app.git
```

2. Install frontend dependencies

```bash
cd frontend
npm install
```

3. Install backend dependencies

```bash
cd backend
npm install
```

4. Create .env files

Frontend (.env):

```env
VITE_API_URL=http://localhost:3000
```

Backend (.env):

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

5. Start the development servers

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

The application should now be running on `http://localhost:5173`

## 📁 Project Structure
