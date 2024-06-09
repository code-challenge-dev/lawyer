type SectionHeadingProps = {
  children: React.ReactNode
}

const SectionHeading = ({ children }: SectionHeadingProps) => {
  return (
    <h2 className="text-4xl uppercase md:mb-4 text-center font-semibold">
      {children}
    </h2>
  )
}

export default SectionHeading
