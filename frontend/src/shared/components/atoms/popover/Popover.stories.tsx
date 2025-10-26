import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, PopoverContent, PopoverTrigger } from './index'
import { Button } from '@/shared/components/atoms/button'
import { Typography } from '@/shared/components/atoms/typography'
import { Input } from '@/shared/components/atoms/input'
import { SearchIcon } from '@/shared/icons/SearchIcon'

const meta: Meta<typeof Popover> = {
  title: 'Components/Atoms/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Typography
          variant="h4"
          font="montserrat"
          className="mb-2 font-semibold"
        >
          Popover Title
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          This is the content of the popover. You can add any content here.
        </Typography>
      </PopoverContent>
    </Popover>
  ),
}

export const WithSearchInput: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <SearchIcon className="mr-2 h-4 w-4" />
          Search
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Typography
          variant="h4"
          font="montserrat"
          className="mb-4 font-semibold"
        >
          Search
        </Typography>
        <Input.Root>
          <Input.Label>Search for movies</Input.Label>
          <Input.Field placeholder="Enter search term..." />
        </Input.Root>
      </PopoverContent>
    </Popover>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>More Options</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <Typography
          variant="h4"
          font="montserrat"
          className="mb-4 font-semibold"
        >
          Options
        </Typography>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Typography variant="p" font="roboto">
              Edit
            </Typography>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Typography variant="p" font="roboto">
              Share
            </Typography>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Typography variant="p" font="roboto">
              Delete
            </Typography>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const Notifications: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Typography variant="p" font="roboto">
            Notifications
          </Typography>
          <Typography
            variant="span"
            className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"
          >
            3
          </Typography>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Typography
          variant="h4"
          font="montserrat"
          className="mb-4 font-semibold"
        >
          Notifications
        </Typography>
        <div className="space-y-2">
          <div className="rounded-md bg-muted p-3">
            <Typography variant="p" className="font-semibold">
              New message
            </Typography>
            <Typography variant="small" className="text-muted-foreground">
              You have a new message from John Doe
            </Typography>
          </div>
          <div className="rounded-md bg-muted p-3">
            <Typography variant="p" className="font-semibold">
              Task completed
            </Typography>
            <Typography variant="small" className="text-muted-foreground">
              Your task has been completed
            </Typography>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <Typography variant="p" font="roboto">
            John Doe
          </Typography>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div>
            <Typography
              variant="h4"
              font="montserrat"
              className="font-semibold"
            >
              John Doe
            </Typography>
            <Typography variant="small" className="text-muted-foreground">
              john.doe@example.com
            </Typography>
          </div>
          <div className="space-y-2 border-t pt-4">
            <Button variant="ghost" className="w-full justify-start">
              <Typography variant="p" font="roboto">
                Profile
              </Typography>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Typography variant="p" font="roboto">
                Settings
              </Typography>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Typography variant="p" font="roboto">
                Logout
              </Typography>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
