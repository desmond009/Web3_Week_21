import { WagmiProvider } from 'wagmi'
import { config } from './config/config.js'
import './App.css'

function App() {

  return (
    <WagmiProvider config={config}>
      HI There
    </WagmiProvider>
  )
}

export default App
