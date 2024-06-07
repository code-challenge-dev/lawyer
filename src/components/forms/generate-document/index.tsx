import Image from 'next/image'
import { InputForm } from './input-form'

function GenerateDocument() {
  return (
    <div className="flex flex-col md:flex-row-reverse gap-4 justify-center items-center mt-2 mb-4 md:mb-8 w-full">
      <Image
        src="/empty.svg"
        width={500}
        height={500}
        className="flex opacity-95 h-[300px] w-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]"
        alt="Judge illustration"
      />
      <InputForm />
    </div>
  )
}

export default GenerateDocument
