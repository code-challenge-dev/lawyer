'use client'

import React, { useState } from 'react'
import { Menu, Scale } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '../theme/mode-toggle'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'

const Navigation = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const closeSheet = () => {
    setIsSheetOpen(false)
  }
  return (
    <div className="p-3 flex items-center justify-between border-b z-10 backdrop-blur-[0.5rem] border-opacity-40 bg-opacity-80 fixed top-0 w-full uppercase">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild className="z-[100] md:!hidden flex">
          <Button variant="outline" size={'icon'}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Link
                href="#about"
                className="group flex gap-2 items-center"
                onClick={closeSheet}
              >
                <Scale className="group-hover:text-primary/80 duration-100 transition-colors" />
                <span className="text-xl font-bold">AI-Advokát</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <Command className="rounded-lg overflow-visible bg-transparent">
            <CommandList className="py-4 overflow-visible">
              <CommandGroup className="overflow-visible" heading="Navigace">
                <Link href="#about" onClick={closeSheet}>
                  <CommandItem className="md:w-[320px] w-full cursor-pointer">
                    O nás
                  </CommandItem>
                </Link>
                <Link href="#generate-document" onClick={closeSheet}>
                  <CommandItem className="md:w-[320px] w-full cursor-pointer">
                    Služby
                  </CommandItem>
                </Link>
                <Link href="#contact" onClick={closeSheet}>
                  <CommandItem className="md:w-[320px] w-full cursor-pointer">
                    Kontakt
                  </CommandItem>
                </Link>
              </CommandGroup>
            </CommandList>
          </Command>
        </SheetContent>
      </Sheet>
      <aside className="items-center gap-2 w-44 hidden md:flex">
        <Link href="/" className="group flex gap-2 items-center">
          <Scale className="group-hover:text-primary/80 duration-100 transition-colors" />
        </Link>
      </aside>
      <nav className="gap-4 justify-between font-semibold w-5/12 hidden md:flex text-primary">
        <Link
          href="#about"
          className="w-20 text-center hover:text-primary/80 duration-100 transition-colors"
        >
          O nás
        </Link>
        <Link
          href="#generate-document"
          className="w-20 text-center hover:text-primary/80 duration-100 transition-colors"
        >
          Služby
        </Link>
        <Link
          href="#contact"
          className="w-20 text-center hover:text-primary/80 duration-100 transition-colors"
        >
          Kontakt
        </Link>
      </nav>
      <aside className="flex gap-2 items-center w-44 justify-end">
        <ModeToggle />
      </aside>{' '}
    </div>
  )
}

export default Navigation
