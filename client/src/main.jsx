import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
createRoot(document.getElementById('root')).render(
    <AppContextProvider>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
    </AppContextProvider>
)
