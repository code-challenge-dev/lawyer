'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleArrowRightIcon, Loader2, PaperclipIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '../../ui/textarea'
import { resizeTextarea } from '@/lib/utils'

const formSchema = z.object({
  text: z.string().min(1).max(4096),
})

export function SearchBar({
  text,
  setText,
}: {
  text: string
  setText: Dispatch<SetStateAction<string>>
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    textarea?.addEventListener('input', resizeTextarea, false)
    return () => {
      textarea?.removeEventListener('input', resizeTextarea, false)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setText(values.text)
  }

  return (
    <div className="relative flex justify-center items-center m-8 max-w-[720px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 relative items-center justify-center bg-primary rounded-full w-[720px]"
        >
          <Button
            size="sm"
            className="flex absolute left-0 rounded-full items-center justify-center ml-2 bg-transparent p-0 m-3 h-6"
            type="submit"
            disabled={true}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-8 w-8 animate-spin" />
            )}
            <PaperclipIcon className="h-8 w-8" />
          </Button>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="w-[600px] min-h-8 max-h-32 placeholder:text-gray-100 text-xl dark:placeholder:text-gray-600 pt-5 pb-2 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto text-white dark:text-black"
                    placeholder="Položit otázku..."
                    {...field}
                    ref={textareaRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="sm"
            className="flex absolute right-0 rounded-full items-center justify-center bg-transparent m-3 p-0 h-6"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-8 w-8 animate-spin" />
            )}
            <CircleArrowRightIcon className="h-8 w-8" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
