import * as React from 'react'
import { cn } from '@/shared/utils/utils'
import { Typography } from '@/shared/components/atoms/typography'

const InputRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { error?: string }
>(({ className, error, ...props }, ref) => (
  <div ref={ref} className={cn('relative space-y-2', className)} {...props}>
    {props.children}
    {error && (
      <Typography
        variant="small"
        color="destructive"
        className="absolute -bottom-4 right-1 ml-auto text-xs"
        font="roboto"
      >
        {error}
      </Typography>
    )}
  </div>
))
InputRoot.displayName = 'InputRoot'

const InputLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, required, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  >
    <Typography
      font="roboto"
      variant="label"
      weight="bold"
      className="text-[12.8px] leading-none"
    >
      {props.children}
      {required && <span className="text-destructive"> *</span>}
    </Typography>
  </label>
))
InputLabel.displayName = 'InputLabel'

const InputField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'text-md flex w-full rounded-sm border border-mauve-600 bg-background px-4 py-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
InputField.displayName = 'InputField'

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Field: InputField,
}
