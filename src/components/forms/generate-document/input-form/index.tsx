'use client'

import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { Loader2, PaperclipIcon, SendHorizontalIcon } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import UploadButton from '../upload-button'

const formSchema = z.object({
  document_type: z
    .string()
    .min(1, { message: 'Please provide valid document type.' })
    .max(20, { message: 'Please select valid topic.' }),
  topic: z
    .string()
    .min(1, { message: 'Please provide valid topic.' })
    .max(100, { message: 'Message should no more than 100 characters.' }),
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
    // const res = await axios.get('api/generation')
    const response = await axios.post('api/generation', {
      document_type: values.document_type,
      topic: values.topic,
      params: values.params,
      documents: [
        {
          document_name: 'string1',
          payload: 'string1',
        },
      ],
    })
    console.log('response', response)
  }

  return (
    <div className="relative flex justify-center items-start m-8 w-full md:w-[720px] md:max-h-[700px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-6 p-6 dark:bg-black rounded-lg"
        >
          <FormField
            control={form.control}
            name="document_type"
            render={({ field }) => (
              <FormItem className="min-h-[90px]">
                <Label
                  htmlFor="type-filter"
                  className="text-black dark:text-white text-xl font-semibold uppercase px-2 md:px-6 max-w-60"
                >
                  Typ dokumentu
                </Label>
                <FormControl>
                  <div className="flex items-center mt-2">
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={form.formState.isSubmitting}
                    >
                      <SelectTrigger
                        id="type-filter"
                        className="border dark:text-black bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
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
                  className="text-black dark:text-white text-xl px-2 md:px-6 font-semibold uppercase"
                >
                  Právní téma
                </Label>
                <FormControl>
                  <div className="flex items-center p-2 md:p-6 rounded-lg border bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none">
                    <Textarea
                      className="flex h-full min-h-8 max-h-32 text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto dark:text-black"
                      placeholder="Právní téma je..."
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
                  className="text-black dark:text-white text-xl font-semibold uppercase px-2 md:px-6"
                >
                  sled událostí
                </Label>
                <FormControl>
                  <div className="flex relative items-center p-2 md:p-6 rounded-lg border bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none">
                    <Textarea
                      className="min-h-36 max-h-72 text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto dark:text-black"
                      placeholder="📎Můj sled událostí začal..."
                      id="params"
                      disabled={form.formState.isSubmitting}
                      {...field}
                      ref={paramsRef}
                    />
                    <Button
                      size="sm"
                      className="flex rounded-full items-center justify-center ml-2 bg-transparent p-0 h-8"
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

          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center md:items-start">
            <UploadButton />
            <div className="bg-white w-full h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent md:hidden" />
            <Button
              size="sm"
              className="flex w-full md:w-36 rounded-lg h-12 gap-2 items-center justify-center bg-black dark:text-white dark:hover:text-black text-white hover:bg-white hover:text-black duration-150 border-opacity-0 hover:border-opacity-100 border-2 border-black dark:border-white dark:hover:border-black"
              variant="outline"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="h-6 w-6 animate-spin" />
              )}
              Vygenerovat
              <SendHorizontalIcon className="h-6 w-6" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
