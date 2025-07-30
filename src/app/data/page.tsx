'use client'
import { useState, useEffect } from 'react'

interface EnvironmentalData {
  id: number
  name: string
  value: number
  unit: string
  createdAt: string
}

export default function DataList() {
  const [dataList, setDataList] = useState<EnvironmentalData[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ name: '', value: '', unit: '' })
  
  // 검색/필터 상태
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUnit, setFilterUnit] = useState('all')

  useEffect(() => {
    const savedData = localStorage.getItem('environmentalData')
    if (savedData) {
      setDataList(JSON.parse(savedData))
    }
  }, [])

  // 필터링된 데이터
  const filteredData = dataList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUnit = filterUnit === 'all' || item.unit === filterUnit
    return matchesSearch && matchesUnit
  })

  // 삭제 함수
  const handleDelete = (id: number) => {
    const updatedList = dataList.filter(item => item.id !== id)
    setDataList(updatedList)
    localStorage.setItem('environmentalData', JSON.stringify(updatedList))
  }

  // 수정 시작
  const handleEditStart = (data: EnvironmentalData) => {
    setEditingId(data.id)
    setEditForm({
      name: data.name,
      value: data.value.toString(),
      unit: data.unit
    })
  }

  // 수정 저장
  const handleEditSave = (id: number) => {
    const updatedList = dataList.map(item => 
      item.id === id 
        ? {
            ...item,
            name: editForm.name,
            value: parseFloat(editForm.value),
            unit: editForm.unit
          }
        : item
    )
    setDataList(updatedList)
    localStorage.setItem('environmentalData', JSON.stringify(updatedList))
    setEditingId(null)
  }

  // 수정 취소
  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm({ name: '', value: '', unit: '' })
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Environmental Data List</h1>
      
      {/* 검색/필터 영역 */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search data name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div>
          <select
            value={filterUnit}
            onChange={(e) => setFilterUnit(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Units</option>
            <option value="kWh">kWh</option>
            <option value="CO2 (kg)">CO2 (kg)</option>
            <option value="Temperature (°C)">Temperature (°C)</option>
            <option value="Humidity (%)">Humidity (%)</option>
          </select>
        </div>
      </div>

      {/* 결과 개수 표시 */}
      <p className="text-gray-600 mb-4">
        Showing {filteredData.length} of {dataList.length} items
      </p>
      
      <div className="grid gap-4">
        {filteredData.map((data) => (
          <div key={data.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow">
            {editingId === data.id ? (
              // 수정 모드
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  value={editForm.value}
                  onChange={(e) => setEditForm({...editForm, value: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <select
                  value={editForm.unit}
                  onChange={(e) => setEditForm({...editForm, unit: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option>kWh</option>
                  <option>CO2 (kg)</option>
                  <option>Temperature (°C)</option>
                  <option>Humidity (%)</option>
                </select>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditSave(data.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleEditCancel}
                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // 일반 모드
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{data.name}</h3>
                  <p className="text-gray-600">Value: {data.value} {data.unit}</p>
                  <p className="text-gray-500 text-sm">Registered: {data.createdAt}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditStart(data)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(data.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 검색 결과 없을 때 */}
      {filteredData.length === 0 && dataList.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No data found matching your search criteria.
        </div>
      )}
    </div>
  )
}