import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link2, BarChart2, CalendarDays } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="container px-4 pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Link management for
          <br />
          scaling teams
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Effortlessly manage massive campaigns, whether you're handling
          millions of links or billions of clicks — we've got you covered.
        </p>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Button size="lg" className="min-w-[140px]">
            Contact Sales
          </Button>
          <Button size="lg" variant="outline" className="min-w-[140px]">
            Try the Product
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="px-4 py-1">
            <Link2 className="mr-2 h-4 w-4" />
            Link management
          </Badge>
          <Badge variant="secondary" className="px-4 py-1">
            <BarChart2 className="mr-2 h-4 w-4" />
            Campaign analytics
          </Badge>
          <Badge variant="secondary" className="px-4 py-1">
            <CalendarDays className="mr-2 h-4 w-4" />
            Event details
          </Badge>
        </div>
      </div>
    </section>
  )
}

