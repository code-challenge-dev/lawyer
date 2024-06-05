import Image from 'next/image'
import { InputForm } from './input-form'

function GenerateDocument() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mt-2 mb-4 md:mb-8">
      <InputForm />
      <Image
        src="/empty.svg"
        width={500}
        height={500}
        className="opacity-95 h-[200px] w-[200px] md:max-h-[300px] md:w-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]"
        alt="placeholder for workspace"
      />
    </div>
  )
}

export default GenerateDocument
