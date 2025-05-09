import './App.css'
import { IsRegisteringProvider } from './context/IsRegistringContext'
import useAuth from './hooks/useAuth'
import Auth from './pages/auth/Auth'
import Router from './routes/Router'

function App() {
  const { isAuthorized } = useAuth()
  
  return (
    <>
      {isAuthorized == false ?
        <IsRegisteringProvider>
          <Auth />
        </IsRegisteringProvider>
        : <Router />}
    </>
  )
}

export default App