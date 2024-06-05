'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  file: z
    .custom<FileList>(
      (val) => val instanceof FileList,
      'This field is required'
    )
    .refine((files) => files.length > 0, 'This field is required'),
})

export default function UploadButton() {
  const { toast } = useToast()
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  })

  const fileRef = form.register('file')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values)
      setIsFileDialogOpen(false)
      form.reset()

      toast({
        variant: 'default',
        title: 'File was successfully uploaded!',
        description: 'Now you can manage your file in your workspace.',
      })
    } catch (err) {
      setIsFileDialogOpen(false)
      toast({
        variant: 'destructive',
        title: 'Oops, something went wrong!',
        description:
          'Your file could not be uploaded. Please, try again later.',
      })
    }
  }

  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen)
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => {}}>Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Upload your file here.</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input type="file" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="flex gap-1"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {form.formState.isSubmitting ? 'Uploading...' : 'Upload'}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
