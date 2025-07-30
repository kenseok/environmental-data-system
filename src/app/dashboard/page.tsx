'use client'
import { useState, useEffect } from 'react'

interface EnvironmentalData {
  id: number
  name: string
  value: number
  unit: string
  createdAt: string
}

export default function Dashboard() {
  const [dataList, setDataList] = useState<EnvironmentalData[]>([])

  useEffect(() => {
    const savedData = localStorage.getItem('environmentalData')
    if (savedData) {
      setDataList(JSON.parse(savedData))
    }
  }, [])

  // 통계 계산
  const totalCount = dataList.length
  const averageValue = dataList.length > 0 
    ? (dataList.reduce((sum, item) => sum + item.value, 0) / dataList.length).toFixed(2)
    : 0

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* 통계 카드들 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-800">Total Data</h3>
          <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
        </div>
        
        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-green-800">Average Value</h3>
          <p className="text-3xl font-bold text-green-600">{averageValue}</p>
        </div>
        
        <div className="bg-purple-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-purple-800">Last Updated</h3>
          <p className="text-lg font-bold text-purple-600">
            {dataList.length > 0 ? dataList[dataList.length - 1].createdAt : 'No data'}
          </p>
        </div>
      </div>

      {/* 최근 데이터 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Data</h2>
        <div className="space-y-2">
          {dataList.slice(-5).map((data) => (
            <div key={data.id} className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">{data.name}</span>
              <span className="text-gray-600">{data.value} {data.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}