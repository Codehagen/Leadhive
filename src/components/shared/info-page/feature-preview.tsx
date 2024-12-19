import Image from "next/image"

export function FeaturePreview() {
  return (
    <section className="container px-4 py-8">
      <div className="overflow-hidden rounded-lg border bg-background shadow-xl">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Link management dashboard preview"
          width={1200}
          height={600}
          className="w-full"
          priority
        />
      </div>
    </section>
  )
}

