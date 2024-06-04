import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-col gap-6 items-center">
        <h2 className="font-semibold mx-auto text-2xl">404 | Not Found</h2>
        <p className="text-xl ">We were unable to find requested resource</p>
        <Link href={'/'}>
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  )
}
