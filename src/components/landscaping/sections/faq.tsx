import Section from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does LeadHive work for home owners?",
    answer:
      "LeadHive connects you with top local landscapers for free. Simply share your property details through our form, and we'll match you with experienced landscapers who specialize in your area. You'll receive multiple proposals to compare and choose from, with no obligation.",
  },
  {
    question: "Is there any cost for home owners?",
    answer:
      "No, our service is completely free for homeowners. We only charge landscapers when they receive qualified leads. You can get multiple proposals from top landscapers without any cost or commitment.",
  },
  {
    question: "How do you select landscapers?",
    answer:
      "We partner with experienced landscapers who have proven track records in their local markets. We evaluate their performance, customer satisfaction, and local market knowledge to ensure you're connected with qualified professionals.",
  },
  {
    question: "How long does it take to receive landscaper proposals?",
    answer:
      "Most homeowners receive their first proposal within 24 hours of submitting their property details. You can typically expect multiple proposals within 48 hours, allowing you to compare different landscapers and their approaches.",
  },
  {
    question: "For landscapers: How does lead pricing work?",
    answer:
      "Landscapers only pay for qualified leads that match their criteria. The cost per lead varies based on your subscription tier, ranging from $40-50 per lead. You can choose how many leads you want to receive monthly, and there are no hidden fees or long-term commitments.",
  },
  {
    question: "What information is included in each lead?",
    answer:
      "Each lead includes essential property details, seller timeline, preferred contact method, and specific requirements. Premium tiers receive additional insights and priority access to help you better serve potential clients.",
  },
];

export default function FAQ() {
  return (
    <Section>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about LeadHive
          <br />
          and how we can help you succeed.
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
        Have more questions? Email us at{" "}
        <a href="mailto:support@leadhive.tech" className="underline">
          support@leadhive.tech
        </a>
      </h4>
    </Section>
  );
}
