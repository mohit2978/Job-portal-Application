import { useState } from 'react'

import './App.css'
import {Button} from "@/components/ui/button.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500"></h1>
        <Button className=" h-40 w-80 text-5xl font-black backdrop-blur-3xl">Hello</Button>
    </>
  )
}

export default App
