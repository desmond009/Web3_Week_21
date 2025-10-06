import { useAccount, useConnect, useConnectors, useDisconnect, useReadContract, WagmiProvider } from 'wagmi'
import { config } from './config/config.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { AllowUSDT } from './Allow_USDT/AllowUSDT.jsx'

const queryClient = new QueryClient()

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
        <TotalSupply />
        <AllowUSDT />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function TotalSupply() {
  const { data, isLoading, error } = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: [
        {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
    ],
    functionName: 'totalSupply',
  })

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Total Supply: {data?.toString()}</p>}
    </div>
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
