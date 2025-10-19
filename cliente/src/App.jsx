import './App.css'
import { AmigosManager } from './components/amigoManager'
function App() {
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gestión de Amigos
          </h1>
          <p className="text-muted-foreground">Administra tu lista de amigos de forma sencilla</p>
        </div>
        <AmigosManager />
      </div>
    </main>
  )
}

export default App
