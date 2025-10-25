import { Button } from "@/shared/components/atoms/button";
import { Card } from "@/shared/components/atoms/card";

export default function Login() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Cubos Interview Frontend</h1>
        <p className="text-muted-foreground text-lg">
          Built with React, Vite, Tailwind CSS, and shadcn/ui
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card.Root>
          <Card.Header>
            <Card.Title>React + Vite</Card.Title>
            <Card.Description>
              Modern React setup with Vite for fast development
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Button  variant="outline" className="w-full">
              Learn More
            </Button>
          </Card.Content>
        </Card.Root>

      </div>
    </div>
  )
}
