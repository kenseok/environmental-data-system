'use client'
import { useState } from 'react'

export default function CreateData() {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState('kWh')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newData = {
        id: Date.now(),
        name,
        value: parseFloat(value),
        unit,
        createAt: new Date().toLocaleDateString()
    }

    const existingData = localStorage.getItem('environmentalData')
    const dataArray = existingData ? JSON.parse(existingData) : []

    dataArray.push(newData)

    localStorage.setItem('environmentalData', JSON.stringify(dataArray))

    console.log('Data saved:', newData)
    setMessage('Data registered successfully!')
    
    // Clear form
    setName('')
    setValue('')
    setUnit('kWh')

    setTimeout(() => {
        setMessage('')
    }, 3000)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Environmental Data Registration</h1>
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{message}</span>
            <button onClick={() => setMessage('')} className="font-bold">×</button>
        </div>
    )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Data Name */}
        <div>
          <label className="block text-sm font-bold mb-2">
            Data Name
          </label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => {
                setName(e.target.value)
                setMessage('')
            }}
            
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="e.g. Power Consumption"
            required
          />
        </div>

        {/* Value */}
        <div>
          <label className="block text-sm font-bold mb-2">
            Measured Value
          </label>
          <input 
            type="number" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="e.g. 120.5"
            required
          />
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-bold mb-2">
            Unit
          </label>
          <select 
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option>kWh</option>
            <option>CO2 (kg)</option>
            <option>Temperature (°C)</option>
            <option>Humidity (%)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
        >
          Register Data
        </button>
      </form>
    </div>
  )
}