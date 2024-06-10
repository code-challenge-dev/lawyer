'use client'

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import axios from 'axios'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { resizeTextarea } from '@/lib/utils'
import { IGenerateDocumentData } from '@/lib/types'
import SectionHeading from '@/components/section-heading'
import SubmitButton from '../submit-button'
import { Check } from 'lucide-react'
import { Toaster } from 'sonner'
import { Button } from '@/components/ui/button'

type TUpdateDocumentProps = {
  data: IGenerateDocumentData
  setData: Dispatch<SetStateAction<IGenerateDocumentData>>
}

const formSchema = z.object({
  response: z.string({ message: 'Please provide valid response.' }),
  instruction: z
    .string()
    .min(1, { message: 'Please provide valid instructions.' })
    .max(2096, { message: 'Message should no more than 2096 characters.' }),
  paragraph: z.string(),
})

const UpdateDocument = ({ data, setData }: TUpdateDocumentProps) => {
  const instructionRef = useRef<HTMLTextAreaElement | null>(null)
  const [selection, setSelection] = useState<string>()
  const [position, setPosition] = useState<Record<string, number>>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      response: '',
      instruction: '',
      paragraph: '',
    },
  })

  console.log('state', selection, position)

  const onSelectStart = useCallback(() => {
    setSelection(undefined)
  }, [])

  const onSelectEnd = useCallback(() => {
    const activeSelection = document.getSelection()
    const text = activeSelection?.toString()

    if (!activeSelection || !text) {
      setSelection(undefined)
      return
    }

    setSelection(text)

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect()

    setPosition({
      x: rect.left + rect.width / 2 - 80 / 2,
      y: rect.top + window.scrollY - 30,
      width: rect.width,
      height: rect.height,
    })
  }, [])

  useEffect(() => {
    const instruction = instructionRef.current
    instruction?.addEventListener('input', resizeTextarea, false)
    form.setValue('response', data.response)
    document.addEventListener('selectstart', onSelectStart)
    document.addEventListener('mouseup', onSelectEnd)
    return () => {
      instruction?.removeEventListener('input', resizeTextarea, false)

      document.removeEventListener('selectstart', onSelectStart)
      document.removeEventListener('mouseup', onSelectEnd)
    }
  }, [data, form, onSelectStart, onSelectEnd])

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // const response = await axios.post('api/correction', {
    //   ...values,
    //   paragraph: 'Právní důvody žaloby',
    // })
    // console.log(response.data)
    // setData(response.data)
  }

  return (
    <>
      <SectionHeading>Opravte dokument</SectionHeading>
      <div role="dialog" aria-labelledby="share">
        <Toaster position="bottom-center" />
        {selection && position && (
          <p
            className="
            absolute -top-2 left-0 w-[40px] h-[30px] bg-black text-white rounded m-0 z-[999]
            after:absolute after:top-full after:left-1/2 after:-translate-x-2 after:h-0 after:w-0 after:border-x-[6px] after:border-x-transparent after:border-b-[8px] after:border-b-black after:rotate-180
          "
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
          >
            <Button className="flex w-full h-full justify-between items-center px-2 cursor-default">
              <span id="share" className="text-xs">
                <Check />
              </span>
            </Button>
          </p>
        )}
      </div>
      <section
        id="update-document"
        className="flex flex-col-reverse gap-4 justify-end lg:justify-center items-center mb-4 md:mb-8 w-full min-h-screen scroll-mt-48"
      >
        <div className="relative flex m-8 w-full md:w-[720px] lg:w-[1040px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex w-full gap-6 p-6 dark:bg-black rounded-lg flex-col items-center xl:flex-row xl:items-start"
            >
              <div className="w-full lg:w-7/12">
                <FormField
                  control={form.control}
                  name="response"
                  render={({ field }) => (
                    <FormItem className="min-h-[140px] w-full">
                      <Label
                        htmlFor="response"
                        className="text-black dark:text-white text-xl font-semibold uppercase px-2 md:px-6"
                      >
                        Vygenerovaný dokument
                      </Label>
                      <FormControl>
                        <div className="flex relative items-center p-2 md:p-6 rounded-lg border bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none w-full">
                          <Textarea
                            className="h-[1400px] w-[700px] text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto dark:text-black"
                            placeholder="Vygenerovaný dokument..."
                            id="response"
                            disabled
                            defaultValue={data.response}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 items-center lg:items-start lg:w-7/12 xl:w-5/12 w-full">
                <FormField
                  control={form.control}
                  name="instruction"
                  render={({ field }) => (
                    <FormItem className="min-h-[140px] w-full">
                      <Label
                        htmlFor="paragraph"
                        className="text-black dark:text-white text-xl font-semibold uppercase px-2 md:px-6"
                      >
                        Pomocí myši vyberte část, kterou chcete změnit
                      </Label>
                      <FormControl>
                        <div className="flex relative items-center p-2 md:p-6 rounded-lg border w-full bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none">
                          <Textarea
                            className="min-h-36 max-h-[440px] w-[700px] text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto dark:text-black"
                            placeholder="Všechno"
                            id="paragraph"
                            disabled={form.formState.isSubmitting}
                            {...field}
                            value={selection || ''}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instruction"
                  render={({ field }) => (
                    <FormItem className="min-h-[140px] w-full">
                      <Label
                        htmlFor="instruction"
                        className="text-black dark:text-white text-xl font-semibold uppercase px-2 md:px-6"
                      >
                        co chcete změnit?
                      </Label>
                      <FormControl>
                        <div className="flex relative items-center p-2 md:p-6 rounded-lg border w-full bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none">
                          <Textarea
                            className="min-h-36 max-h-[440px] w-[700px] text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto dark:text-black"
                            placeholder="Moje instrukce jsou další..."
                            id="instructions"
                            disabled={form.formState.isSubmitting}
                            {...field}
                            ref={instructionRef}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <SubmitButton isSubmitting={form.formState.isSubmitting} />
              </div>
            </form>
          </Form>
        </div>
        <Image
          src="/text-field.svg"
          width={400}
          height={400}
          className="flex opacity-95 h-[300px] w-[300px]"
          alt="Judge illustration"
        />
      </section>
    </>
  )
}

export default UpdateDocument
