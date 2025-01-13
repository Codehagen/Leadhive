import Section from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Hvordan fungerer LeadHive for boligselgere?",
    answer:
      "LeadHive kobler deg med de beste lokale eiendomsmeglerne gratis. Del enkelt dine eiendomsdetaljer gjennom vårt skjema, og vi matcher deg med erfarne meglere som spesialiserer seg på ditt område. Du vil motta flere tilbud å sammenligne og velge mellom, uten forpliktelser.",
  },
  {
    question: "Er det noen kostnad for boligeiere?",
    answer:
      "Nei, vår tjeneste er helt gratis for boligeiere. Vi tar kun betalt fra eiendomsmeglere når de mottar kvalifiserte leads. Du kan få flere tilbud fra toppmeglere uten kostnad eller forpliktelse.",
  },
  {
    question: "Hvordan velger dere eiendomsmeglere?",
    answer:
      "Vi samarbeider med erfarne meglere som har bevist resultater i sine lokale markeder. Vi evaluerer deres ytelse, kundetilfredshet og lokalkunnskap for å sikre at du blir koblet med kvalifiserte fagfolk.",
  },
  {
    question: "Hvor lang tid tar det å motta meglertilbud?",
    answer:
      "De fleste boligeiere mottar sitt første tilbud innen 24 timer etter å ha sendt inn eiendomsdetaljene. Du kan vanligvis forvente flere tilbud innen 48 timer, slik at du kan sammenligne ulike meglere og deres tilnærminger.",
  },
  {
    question: "For meglere: Hvordan fungerer lead-prising?",
    answer:
      "Meglere betaler kun for kvalifiserte leads som matcher deres kriterier. Kostnaden per lead varierer basert på ditt abonnementsnivå, fra 40-50 kr per lead. Du kan velge hvor mange leads du vil motta månedlig, og det er ingen skjulte gebyrer eller langsiktige forpliktelser.",
  },
  {
    question: "Hvilken informasjon er inkludert i hver lead?",
    answer:
      "Hver lead inkluderer essensielle eiendomsdetaljer, selgers tidsplan, foretrukket kontaktmetode og spesifikke krav. Premium-nivåer mottar ytterligere innsikt og prioritert tilgang for å hjelpe deg å betjene potensielle kunder bedre.",
  },
];

export default function FAQ() {
  return (
    <Section>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Ofte Stilte Spørsmål
        </h2>
        <p className="text-muted-foreground text-lg">
          Alt du trenger å vite om LeadHive
          <br />
          og hvordan vi kan hjelpe deg å lykkes.
        </p>
      </div>
      <div className="mx-auto my-12 md:max-w-[800px]">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col items-center justify-center space-y-2"
        >
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="w-full border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <h4 className="mb-12 text-center text-sm font-medium tracking-tight text-foreground/80">
        Har du flere spørsmål? Send e-post til{" "}
        <a href="mailto:support@leadhive.tech" className="underline">
          support@leadhive.tech
        </a>
      </h4>
    </Section>
  );
}
