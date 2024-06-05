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
import { useEffect, useRef } from 'react'
import {
  CircleArrowRightIcon,
  Loader2,
  PaperclipIcon,
  SendHorizontalIcon,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '../../../ui/textarea'
import { resizeTextarea } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import UploadButton from '../upload-button'

const formSchema = z.object({
  document_type: z
    .string()
    .min(1, { message: 'Please provide valid document type.' })
    .max(20, { message: 'Message should no more than 20 characters.' }),
  topic: z
    .string()
    .min(1, { message: 'Please provide valid topic.' })
    .max(20, { message: 'Message should no more than 20 characters.' }),
  params: z
    .string()
    .min(1, { message: 'Please provide valid description of the issue.' })
    .max(4096, { message: 'Message should no more than 4096 characters.' }),
})

export function InputForm() {
  const paramsRef = useRef<HTMLTextAreaElement | null>(null)
  const topicRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const params = paramsRef.current
    const topic = topicRef.current
    params?.addEventListener('input', resizeTextarea, false)
    topic?.addEventListener('input', resizeTextarea, false)
    return () => {
      params?.removeEventListener('input', resizeTextarea, false)
      topic?.removeEventListener('input', resizeTextarea, false)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document_type: '',
      topic: '',
      params: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="relative flex justify-center items-start m-8 max-w-[720px] h-[700px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="document_type"
            render={({ field }) => (
              <FormItem className="min-h-[90px]">
                <Label
                  htmlFor="type-filter"
                  className="text-black dark:text-white text-xl font-semibold uppercase px-6 w-60"
                >
                  Typ dokumentu
                </Label>
                <FormControl>
                  <div className="flex items-center flex-col md:flex-row mt-2">
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={form.formState.isSubmitting}
                    >
                      <SelectTrigger
                        id="type-filter"
                        className="w-60 border-0 bg-primary text-white dark:text-black"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="žaloba">Žaloba</SelectItem>
                        <SelectItem value="předžalobní výzva">
                          Předžalobní Výzva
                        </SelectItem>
                        <SelectItem value="kontrakt">Kontrakt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem className="min-h-[140px]">
                <Label
                  htmlFor="topic"
                  className="text-black dark:text-white text-xl px-6 font-semibold uppercase"
                >
                  Právní téma
                </Label>
                <FormControl>
                  <div className="flex relative items-center px-6 bg-primary w-[720px] rounded-lg">
                    <Textarea
                      className="w-[620px] min-h-8 max-h-32 placeholder:text-gray-100 text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto text-white dark:text-black"
                      placeholder="Téma..."
                      id="topic"
                      disabled={form.formState.isSubmitting}
                      {...field}
                      ref={topicRef}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="params"
            render={({ field }) => (
              <FormItem className="min-h-[140px]">
                <Label
                  htmlFor="params"
                  className="text-black dark:text-white text-xl font-semibold uppercase px-6"
                >
                  sled událostí
                </Label>
                <FormControl>
                  <div className="flex relative items-center px-6 bg-primary max-w-[720px] rounded-lg">
                    <Textarea
                      className="w-[620px] min-h-36 max-h-72 placeholder:text-gray-100 text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto text-white dark:text-black"
                      placeholder="Vysvětlit sled událostí..."
                      id="params"
                      disabled={form.formState.isSubmitting}
                      {...field}
                      ref={paramsRef}
                    />
                    <Button
                      size="sm"
                      className="flex absolute right-0 rounded-full items-center justify-center ml-2 bg-transparent p-0 m-3 h-8"
                      type="submit"
                      disabled={true}
                    >
                      {form.formState.isSubmitting && (
                        <Loader2 className="h-8 w-8 animate-spin" />
                      )}
                      <PaperclipIcon className="h-8 w-8" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full justify-between">
            <UploadButton />
            <Button
              size="sm"
              className="flex rounded-lg w-32 h-12 gap-2 items-center justify-center bg-black dark:text-white dark:hover:text-black text-white hover:bg-white hover:text-black duration-150"
              variant="outline"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="h-8 w-8 animate-spin" />
              )}
              Vygenerovat
              <SendHorizontalIcon className="h-8 w-8" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
