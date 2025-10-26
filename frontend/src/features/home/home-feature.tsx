import { Button } from '@/shared/components/atoms/button'
import { Card } from '@/shared/components/atoms/card'
import { ColorPalette } from '@/shared/components/design-system/ColorPalette'
import { Icons } from '@/shared/components/design-system/Icons'
import { useNavigation } from '@/shared/hooks'

export default function HomeFeature() {
  const { goToLogin, goToDashboard, goToUsers, goToProjects } = useNavigation()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Cubos Interview Frontend</h1>
        <p className="text-lg text-muted-foreground">
          Built with React, Vite, Tailwind CSS, and shadcn/ui
        </p>
      </div>

      <div className="mb-8 space-y-8">
        <ColorPalette />
        <Icons />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card.Root>
          <Card.Header>
            <Card.Title>React + Vite</Card.Title>
            <Card.Description>
              Modern React setup with Vite for fast development
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Button variant="outline" className="w-full">
              Learn More
            </Button>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Centralized Routes</Card.Title>
            <Card.Description>
              Type-safe navigation with centralized route management
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-2">
            <Button variant="outline" className="w-full" onClick={goToLogin}>
              Go to Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={goToDashboard}
            >
              Go to Dashboard
            </Button>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Navigation Examples</Card.Title>
            <Card.Description>
              Examples of programmatic navigation
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-2">
            <Button variant="outline" className="w-full" onClick={goToUsers}>
              Go to Users
            </Button>
            <Button variant="outline" className="w-full" onClick={goToProjects}>
              Go to Projects
            </Button>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  )
}
