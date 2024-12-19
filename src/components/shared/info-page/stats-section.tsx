import Image from "next/image"
import { Headphones, Shield } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  return (
    <section className="container px-4 py-24">
      <div className="grid gap-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <StatsCard
            label="CLICKS TRACKED / MONTH"
            value="50,000,000+"
          />
          <StatsCard
            label="LINKS CREATED / MONTH"
            value="100,000+"
          />
          <StatsCard
            label="CUSTOMERS WORLDWIDE"
            value="70,000+"
          />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Headphones className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Enterprise-level support</h3>
                </div>
                <p className="text-muted-foreground">
                  Priority support through a dedicated Slack channel, beta access to new features, and a smooth, hassle-free migration process.
                </p>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="Slack"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <div className="font-medium"># direct-dub-support</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Account security</h3>
                </div>
                <p className="text-muted-foreground">
                  Full account control with SAML/SSO and SCIM directory sync, compatible with Okta, Azure AD, and Google.
                </p>
                <div className="flex justify-between">
                  {['loading', 'google', 'github'].map((provider) => (
                    <div key={provider} className="flex items-center justify-center rounded-lg border bg-background p-2 shadow-sm">
                      <Image
                        src={`/placeholder.svg?height=32&width=32&text=${provider}`}
                        alt={`${provider} logo`}
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function StatsCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {value}
        </div>
        <div className="mt-2 text-sm font-medium text-muted-foreground">
          {label}
        </div>
      </CardContent>
    </Card>
  )
}

