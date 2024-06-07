'use client'

import GenerateDocument from '@/components/forms/generate-document'
import UpdateDocument from '@/components/forms/update-document'
import HeroPage from '@/components/hero'
import { IGenerateDocumentData } from '@/lib/types'
import { useState } from 'react'

export default function Home() {
  const [data, setData] = useState<IGenerateDocumentData>(
    {} as IGenerateDocumentData
  )
  return (
    <main className="flex min-h-screen flex-col items-center w-full p-4 gap-4 md:gap-10 lg:gap-12">
      <HeroPage />
      <GenerateDocument setData={setData} />
      <UpdateDocument data={data} setData={setData} />
    </main>
  )
}
