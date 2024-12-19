import Image from "next/image"

export function LogoCloud() {
  return (
    <section className="container px-4 py-16 md:py-24">
      <div className="flex flex-col items-center space-y-8">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Giving marketing superpowers to world-class companies
        </p>
        <div className="flex flex-wrap justify-center gap-8 grayscale">
          <Image
            src="/placeholder.svg?height=40&width=120"
            alt="Cal.com logo"
            width={120}
            height={40}
            className="h-8 object-contain"
          />
          <Image
            src="/placeholder.svg?height=40&width=120"
            alt="Framer logo"
            width={120}
            height={40}
            className="h-8 object-contain"
          />
          <Image
            src="/placeholder.svg?height=40&width=120"
            alt="Twilio logo"
            width={120}
            height={40}
            className="h-8 object-contain"
          />
          <Image
            src="/placeholder.svg?height=40&width=120"
            alt="Huberman Lab logo"
            width={120}
            height={40}
            className="h-8 object-contain"
          />
        </div>
      </div>
    </section>
  )
}

