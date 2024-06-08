import React from 'react'
import SectionDivider from '../section-divider'
import Image from 'next/image'

const HeroPage = () => {
  return (
    <>
      <section className="flex flex-col gap-8 md:gap-16 items-center font-semibold max-w-[680px] min-h-screen mx-8">
        <div className="mt-24 gap-4 sm:text-center">
          <h2 className="text-3xl md:text-4xl mb-12 md:mb-4">
            Máte{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500 tracking-wide">
              právní problémy
            </span>
            , které potřebujete vyřešit?
          </h2>
          <h3 className="text-2xl md:text-3xl brightness-50 font-normal md:text-center">
            Zde je jeden z nejlepších asistentů AI pro právní záležitosti! Naše
            služby vám pomohou vyřešit problémy se stížnostmi, odvoláním před
            soudním řízením a smlouvami!
          </h3>
        </div>
        <Image
          src="/chatbot.svg"
          width={500}
          height={500}
          className="flex opacity-95 h-[300px] w-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]"
          alt="Judge illustration"
        />
      </section>
      <SectionDivider />
    </>
  )
}

export default HeroPage
