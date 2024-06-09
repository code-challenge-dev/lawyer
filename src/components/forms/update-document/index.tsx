'use client'

import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      response: '',
      instruction: '',
      paragraph: '',
    },
  })

  useEffect(() => {
    const instruction = instructionRef.current
    instruction?.addEventListener('input', resizeTextarea, false)
    form.setValue('response', data.response)
    return () => {
      instruction?.removeEventListener('input', resizeTextarea, false)
    }
  }, [data, form])

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const response = await axios.post('api/correction', {
      ...values,
      paragraph: '',
    })
    console.log(response.data)
    setData(response.data)
  }

  return (
    <>
      <SectionHeading>Opravte dokument</SectionHeading>
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
