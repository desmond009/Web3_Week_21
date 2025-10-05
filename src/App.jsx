import { useAccount, useConnect, useConnectors, useDisconnect, WagmiProvider } from 'wagmi'
import { config } from './config/config.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

const queryClient = new QueryClient()

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function ConnectWallet() {

  // useAccount hook ==> is this user connected or not
  const { address } = useAccount()
  // useConnectors hook ==> Will return me a list of connectors
  const connectors = useConnectors()
  // useDisconnect hook ==> Will disconnect the user
  const { disconnect } = useDisconnect()

  const { connect, connector } = useConnect()  

  // If the user already connected to a wallet
  if (address) {
    return (
      <div>
        <p>You are Connected to {address}</p>
        <button onClick = {() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      {connectors.map(connector_c => 
        <button key={connector_c.id} onClick={() => connect({ connector: connector_c})}>
          Connect via {connector_c.name}
        </button>
      )}
    </div>
  )
}

export default App
