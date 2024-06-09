import React from 'react'
import SectionDivider from '../section-divider'
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const HeroPage = () => {
  return (
    <>
      <section
        className="flex flex-col gap-8 md:gap-4 sm:items-center sm:justify-center font-semibold w-full min-h-screen mx-8 scroll-mt-12"
        id="about"
      >
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 w-full mt-24">
          <div className="flex flex-col gap-4 max-w-[480px]">
            <h2 className="text-3xl md:text-4xl mb-12 md:mb-4">
              Máte{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500 tracking-wide">
                právní problémy
              </span>
              , které potřebujete vyřešit?
            </h2>
            <h3 className="text-2xl md:text-3xl brightness-50 font-normal">
              Zde je jeden z nejlepších asistentů AI pro právní záležitosti!
              Naše služby vám pomohou vyřešit problémy se stížnostmi, odvoláním
              před soudním řízením a smlouvami!
            </h3>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-10/12 sm:w-8/12 md:w-3/12"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Co je AI-Advokát?</AccordionTrigger>
              <AccordionContent>
                AI-Advokát je služba, která generuje dokumenty na základě
                uživatelských vstupů a poskytuje právní poradenství. Je zcela
                zdarma a rychlá.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Jak AI-Advokát funguje?</AccordionTrigger>
              <AccordionContent>
                AI-Advokát využívá umělou inteligenci k analýze vašich vstupních
                dat a generuje právní dokumenty podle vašich potřeb. Navíc
                poskytuje právní poradenství založené na aktuálních zákonech a
                regulacích.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Je AI-Advokát zdarma?</AccordionTrigger>
              <AccordionContent>
                Ano, AI-Advokát je zcela zdarma. Naším cílem je poskytovat
                rychlé a dostupné právní služby pro všechny.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Jaké typy dokumentů mohu generovat?
              </AccordionTrigger>
              <AccordionContent>
                Můžete generovat dva typy právních dokumentů: Žaloby a
                Předsoudní odvolání.{' '}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Jaká je přesnost právních rad AI-Advokáta?
              </AccordionTrigger>
              <AccordionContent>
                AI-Advokát se snaží poskytovat co nejpřesnější právní rady.
                Nicméně doporučujeme konzultovat se skutečným právníkem pro
                specifické a složité právní záležitosti.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Image
          src="/chatbot.svg"
          width={500}
          height={500}
          className="opacity-95 h-[300px] w-[300px] lg:w-[400px] lg:h-[400px]"
          alt="Judge illustration"
        />
      </section>
      <SectionDivider />
    </>
  )
}

export default HeroPage
