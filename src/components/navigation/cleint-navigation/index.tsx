'use client'

import React from 'react'
import { ModeToggle } from '@/components/theme/mode-toggle'

const ClientNavItems = () => {
  return (
    <aside className="flex gap-2 items-center">
      <ModeToggle />
    </aside>
  )
}

export default ClientNavItems
