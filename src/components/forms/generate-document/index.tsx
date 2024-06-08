'use client'

import axios from 'axios'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { resizeTextarea } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import FormDivider from '../form-divider'
import SectionDivider from '@/components/section-divider'
import SubmitButton from '../submit-button'
import SectionHeading from '@/components/section-heading'
import { useToast } from '@/components/ui/use-toast'
import FileUpload from './file-upload'

const formSchema = z.object({
  document_type: z
    .string()
    .min(1, { message: 'Uveďte prosím platný typ dokumentu.' })
    .max(20, { message: 'Vyberte prosím platné téma.' }),
  topic: z
    .string()
    .min(1, { message: 'Zadejte prosím platné téma.' })
    .max(512, { message: 'Zpráva by neměla mít více než 512 znaků.' }),
  params: z
    .string()
    .min(1, { message: 'Uveďte prosím platný popis problému.' })
    .max(5120, { message: 'Zpráva by neměla mít více než 5120 znaků.' }),
  documents: z
    .array(
      z.object({
        document_name: z
          .string()
          .min(1, { message: 'Název dokumentu je povinný.' }),
        payload: z.string(),
      })
    )
    .min(1, { message: 'Je vyžadován alespoň jeden textový dokument.' }),
})

function GenerateDocument({ setData }: { setData: any }) {
  const paramsRef = useRef<HTMLTextAreaElement | null>(null)
  const topicRef = useRef<HTMLTextAreaElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  const { toast } = useToast()

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
      documents: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log('values', values)
      const response = await axios.post('api/generation', values)
      console.log('response', response.data)
      setData(response.data)

      toast({
        variant: 'default',
        title: 'Dokument byl úspěšně vygenerován!',
        description: 'Nyní můžete spravovat svůj dokument zadáním pokynů.',
      })

      form.reset()
      sectionRef.current?.scrollIntoView()
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Jejda! Něco se pokazilo!',
        description:
          'Při generování vašeho dokumentu došlo k chybě, zkuste to prosím později.',
      })
    }
  }

  const handleFileUpload = (file: {
    document_name: string
    payload: string
  }) => {
    form.setValue('documents', [...form.getValues('documents'), file])
  }

  return (
    <>
      <SectionHeading>Vygenerovat dokument</SectionHeading>
      <section
        className="flex flex-col lg:flex-row-reverse gap-4 justify-center lg:items-start items-center mt-12 mb-4 md:mb-8 w-full min-h-screen scroll-mt-[-1400px] lg:scroll-mt-[-1350px]"
        ref={sectionRef}
      >
        <Image
          src="/empty.svg"
          width={500}
          height={500}
          className="flex opacity-95 h-[300px] w-[300px] lg:w-[400px] lg:h-[400px]"
          alt="Judge illustration"
        />
        <div className="relative flex justify-center items-start m-8 w-full md:w-[720px] lg:w-[840px]">
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
                            <SelectItem value="odvolání">Odvolání</SelectItem>
                            <SelectItem value="projednání">
                              Projednání
                            </SelectItem>
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
                      <div className="flex items-center p-2 md:p-4 rounded-lg border bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none">
                        <Textarea
                          id="topic"
                          className="flex h-full min-h-8 max-h-32 text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto dark:text-black"
                          placeholder="Stručně popište, o čem váš dokument je."
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
                      <div className="flex items-center p-2 md:p-4 rounded-lg border bg-gray-100 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none">
                        <Textarea
                          className="flex h-full min-h-8 max-h-80 text-xl dark:placeholder:text-gray-600 px-0 py-8 bg-transparent resize-none focus:outline-none focus:border-none focus-visible:outline-none overflow-y-auto dark:text-black"
                          placeholder="Uveďte podrobnosti o vašem dokumentu."
                          id="params"
                          disabled={form.formState.isSubmitting}
                          {...field}
                          ref={paramsRef}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8">
                <FormField
                  control={form.control}
                  name="documents"
                  render={({ field }) => (
                    <FormItem className="min-h-[80px] w-full">
                      <FileUpload onUpload={handleFileUpload} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormDivider />
                <SubmitButton
                  isSubmitting={form.formState.isSubmitting}
                  classNames="md:w-64"
                />
              </div>
            </form>
          </Form>
        </div>
      </section>
      <SectionDivider />
    </>
  )
}

export default GenerateDocument
