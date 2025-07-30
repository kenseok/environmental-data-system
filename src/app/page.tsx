'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface EnvironmentalData {
  id: number
  name: string
  value: number
  unit: string
  createdAt: string
}

export default function Home() {
  const [dataList, setDataList] = useState<EnvironmentalData[]>([])

  useEffect(() => {
    const savedData = localStorage.getItem('environmentalData')
    if (savedData) {
      setDataList(JSON.parse(savedData))
    }
  }, [])

  const totalCount = dataList.length
  const latestData = dataList.length > 0 ? dataList[dataList.length - 1] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Environmental Data Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Track, analyze, and manage your environmental data efficiently
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/data/create" 
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all"
            >
              Add New Data
            </Link>
            <Link 
              href="/data" 
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all"
            >
              View All Data
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            System Overview
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Total Records</h3>
              <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Latest Entry</h3>
              <p className="text-lg text-gray-600">
                {latestData ? latestData.name : 'No data yet'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Data Types</h3>
              <p className="text-lg text-gray-600">Power, CO2, Temperature, Humidity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">➕</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Data Entry</h3>
              <p className="text-gray-600">Simple form to add environmental data</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Data Management</h3>
              <p className="text-gray-600">View, edit, and delete records easily</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Search & Filter</h3>
              <p className="text-gray-600">Find specific data quickly</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Dashboard</h3>
              <p className="text-gray-600">View statistics and analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Data Preview */}
      {dataList.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Recent Data</h2>
              <Link 
                href="/data" 
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                View All →
              </Link>
            </div>
            
            <div className="grid gap-4">
              {dataList.slice(-3).map((data) => (
                <div key={data.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{data.name}</h3>
                      <p className="text-gray-600">Value: {data.value} {data.unit}</p>
                    </div>
                    <p className="text-gray-500 text-sm">{data.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}