import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormItem, FormLabel } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { fileTypes } from '@/lib/utils'

const FileUpload = ({
  onUpload,
}: {
  onUpload: (file: { document_name: string; payload: string }) => void
}) => {
  const [file, setFile] = useState<File | null>(null)
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile && fileTypes.some((type) => type === selectedFile.type)) {
      setFile(selectedFile)
    } else {
      setFile(null)
      toast({
        variant: 'destructive',
        title: 'Tento typ souboru není povolen!',
        description: 'Prosím, nahrajte platný textový soubor.',
      })
    }
  }

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1] || ''
        onUpload({ document_name: file.name, payload: base64String })
        setIsFileDialogOpen(false)
        setFile(null)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => setIsFileDialogOpen(isOpen)}
    >
      <DialogTrigger asChild>
        <Button className="md:w-48 h-12 border border-opacity-0 hover:border-opacity-100 hover:border-primary w-full">
          Přidat důkazní dokumenty
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">
            Zde nahrajte svůj dokument.
          </DialogTitle>
          <DialogDescription>
            <div className="space-y-8">
              <FormItem>
                <FormLabel>Soubor</FormLabel>
                <Input
                  type="file"
                  accept="application/pdf, text/plain"
                  className="cursor-pointer"
                  onChange={handleFileChange}
                />
              </FormItem>
              <Button
                className="flex gap-1"
                onClick={handleUpload}
                disabled={!file}
              >
                Nahrát
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default FileUpload
