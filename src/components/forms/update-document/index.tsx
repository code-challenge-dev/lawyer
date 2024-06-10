'use client'

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import axios from 'axios'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import DOMPurify from 'isomorphic-dompurify'
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
import {
  convertFromHtml,
  convertToHtml,
  errorUtils,
  resizeTextarea,
} from '@/lib/utils'
import { IGenerateDocumentData } from '@/lib/types'
import SectionHeading from '@/components/section-heading'
import SubmitButton from '../submit-button'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

type TUpdateDocumentProps = {
  data: IGenerateDocumentData
  setData: Dispatch<SetStateAction<IGenerateDocumentData>>
}

const formSchema = z.object({
  generated_text: z
    .string({ message: 'Uveďte prosím platnou odpověď.' })
    .min(50, { message: 'Odpověď by měla mít alespoň 50 znaků.' }),
  instruction: z
    .string()
    .min(1, { message: 'Uveďte prosím platný pokyn.' })
    .max(2096, { message: 'Odpověď by měla mít alespoň 2096 znaků.' }),
  paragraph: z.string(),
})

const UpdateDocument = ({ data, setData }: TUpdateDocumentProps) => {
  const instructionRef = useRef<HTMLTextAreaElement | null>(null)
  const [selection, setSelection] = useState<string>()
  const [position, setPosition] = useState<Record<string, number>>()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      generated_text: '',
      instruction: '',
      paragraph: '',
    },
  })

  const responseTextHTML = useMemo(
    () => DOMPurify.sanitize(convertToHtml(data.response)),
    [data.response]
  )

  const onSelectEnd = useCallback(() => {
    const activeSelection = document.getSelection()
    const text = activeSelection?.toString()

    if (!activeSelection || !text) {
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
    form.setValue('generated_text', data.response)
    document.addEventListener('mouseup', onSelectEnd)
    return () => {
      instruction?.removeEventListener('input', resizeTextarea, false)

      document.removeEventListener('mouseup', onSelectEnd)
    }
  }, [data, form, onSelectEnd])

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      const responseTextMarkdown = convertFromHtml(selection)
      const response = await axios.post('api/correction', {
        ...values,
        paragraph: responseTextMarkdown,
      })
      toast({
        variant: 'default',
        title: 'Dokument byl úspěšně aktualizován!',
        description: 'Nyní můžete dávat další pokyny.',
      })
      setData(response.data)
    } catch (error) {
      errorUtils.getError(error)
      toast({
        variant: 'destructive',
        title: 'Jejda! Něco se pokazilo!',
        description:
          'Při aktualizaci vašeho dokumentu došlo k chybě, zkuste to prosím znovu později.',
      })
    }
  }

  return (
    <>
      <SectionHeading>Opravte dokument</SectionHeading>
      <div role="dialog" aria-labelledby="share">
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
            <Button
              className="flex w-full h-full justify-between items-center px-2"
              onClick={() => setPosition(undefined)}
            >
              <span id="share" className="text-xs">
                <Check />
              </span>
            </Button>
          </p>
        )}
      </div>
      <section
        id="update-document"
        className="flex flex-col-reverse gap-4 justify-end lg:justify-center items-center mb-4 md:mb-8 w-full min-h-screen scroll-mt-56"
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
                  name="generated_text"
                  render={({ field }) => (
                    <FormItem className="min-h-[140px] w-full">
                      <Label
                        htmlFor="generated_text"
                        className="text-black dark:text-white text-xl font-semibold uppercase px-2 md:px-6"
                      >
                        Vygenerovaný dokument
                      </Label>
                      <FormControl>
                        <div
                          id="generated_text"
                          {...field}
                          className="p-2 md:p-6 rounded-lg border bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none w-full select-text"
                          dangerouslySetInnerHTML={{ __html: responseTextHTML }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 items-center lg:items-start lg:w-7/12 xl:w-5/12 w-full">
                <FormField
                  control={form.control}
                  name="paragraph"
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
                            className="min-h-36 h-[720px] w-[700px] text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto dark:text-black "
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
                            id="instruction"
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
