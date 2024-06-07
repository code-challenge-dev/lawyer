import GenerateDocument from '@/components/forms/generate-document'
import HeroPage from '@/components/hero'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full p-4 gap-16">
      <HeroPage />
      <GenerateDocument />
    </main>
  )
}
