import Image from 'next/image'

function Placeholder({ text }: { text?: string }) {
  return (
    <div className="flex flex-col gap-6 w-full items-center mt-16">
      <Image
        src="/empty.svg"
        width={300}
        height={300}
        className="opacity-95 h-[200px] w-[200px] md:max-h-[300px] md:w-[300px]"
        alt="placeholder for workspace"
      />
      <div className="text-xl md:text-2xl">{text}</div>
    </div>
  )
}

export default Placeholder
