"use client"
import { useState } from "react"

export default function App() {
  const [amount, setAmount] = useState("")
  return (
    <main className="flex gap-4 flex-col items-center justify-between p-24">
      <input
        placeholder="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button disabled={!amount} className="disabled:opacity-25">
        Make payment
      </button>
    </main>
  )
}
