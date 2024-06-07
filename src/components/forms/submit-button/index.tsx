import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { Loader2, SendHorizontalIcon } from 'lucide-react'
import React from 'react'

type SubmitButtonProps = {
  isSubmitting: boolean
  classNames?: string
}

const SubmitButton = ({ isSubmitting, classNames }: SubmitButtonProps) => {
  return (
    <Button
      size="sm"
      className={clsx(
        'flex w-full rounded-lg h-12 gap-2 items-center justify-center uppercase bg-black dark:text-white dark:hover:text-black text-white hover:bg-white hover:text-black duration-150 border-opacity-0 hover:border-opacity-100 border-2 border-black dark:border-white dark:hover:border-black',
        classNames
      )}
      variant="outline"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
      Vygenerovat
      <SendHorizontalIcon className="h-4 w-4" />
    </Button>
  )
}

export default SubmitButton
