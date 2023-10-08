'use client'
import { Button } from 'antd'
import React from 'react'

function Filters({
  filters,
  setFilters,
  getData,
}: {
  filters: any
  setFilters: any
  getData: any
}) {
  return (
    <div className='flex  gap-3 my-3 items-end'>
      <div>
        <span>Vrsta objekta</span>
        <input
          type='text'
          value={filters.searchText}
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
          placeholder='Izaberi objekat'
        />
      </div>

      <div>
        <span>Grad</span>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value=''>Izaberi lokaciju</option>
          <option value='Budva'>Budva</option>
          <option value='Kotor'>Kotor</option>
          <option value='Podgorica'>Podgorica</option>
          <option value='Tivat'>Tivat</option>
        </select>
      </div>

      <Button type='primary' onClick={getData}>
        Filter
      </Button>
    </div>
  )
}

export default Filters
