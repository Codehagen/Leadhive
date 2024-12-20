import Section from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does LeadHive work?",
    answer:
      "LeadHive connects you with verified professionals for free. Simply share your requirements through our form, and we'll match you with experienced experts who specialize in your needs. You'll receive multiple proposals to compare and choose from, with no obligation.",
  },
  {
    question: "Is there any cost to use LeadHive?",
    answer:
      "No, our service is completely free for customers. We only charge service providers when they receive qualified leads. You can get multiple proposals from top professionals without any cost or commitment.",
  },
  {
    question: "How do you select service providers?",
    answer:
      "We carefully vet all professionals on our platform. Each provider undergoes a thorough screening process where we verify their credentials, experience, and track record. We continuously monitor their performance and customer satisfaction to maintain high service standards.",
  },
  {
    question: "How long does it take to receive proposals?",
    answer:
      "Most customers receive their first proposal within 24 hours of submitting their requirements. You can typically expect multiple proposals within 48 hours, allowing you to compare different providers and their approaches.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We currently operate across major Australian cities and regions, connecting customers with local professionals in real estate, landscaping, construction, healthcare, electrical services, and financial services.",
  },
  {
    question: "Can I compare multiple proposals?",
    answer:
      "Yes! You'll receive multiple proposals from different service providers, making it easy to compare their experience, pricing, and approach. This helps you make an informed decision without any pressure.",
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
