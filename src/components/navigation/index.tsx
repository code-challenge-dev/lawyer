import React from 'react'
import ClientNavItems from './cleint-navigation'
import { Scale } from 'lucide-react'

const Navigation = () => {
  return (
    <div className="p-4 flex items-center justify-between relative border-b z-10">
      <aside className="flex items-center gap-2">
        <Scale />
        <span className="text-xl font-bold">AI-Advokát</span>
      </aside>
      <ClientNavItems />
    </div>
  )
}

export default Navigation
