import React from 'react'
import { cn } from '@/shared/utils/utils'

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'div'
    | 'label'
    | 'small'
    | 'blockquote'
    | 'code'
  color?:
    | 'default'
    | 'muted'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'accent'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  align?: 'left' | 'center' | 'right' | 'justify'
  font?: 'inter' | 'montserrat' | 'roboto'
  as?: keyof JSX.IntrinsicElements
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  color = 'default',
  weight = 'normal',
  align = 'left',
  font = 'inter',
  as,
  className,
  children,
  ...props
}) => {
  const Component = as || variant

  const fontClasses = {
    inter: 'font-inter',
    montserrat: 'font-montserrat',
    roboto: 'font-roboto',
  }

  const baseClasses = 'leading-relaxed'

  const variantClasses = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold tracking-tight',
    h4: 'text-xl font-semibold tracking-tight',
    h5: 'text-lg font-semibold tracking-tight',
    h6: 'text-base font-semibold tracking-tight',
    p: 'text-base',
    span: 'text-base',
    div: 'text-base',
    label: 'text-sm font-medium',
    small: 'text-sm',
    blockquote: 'text-lg italic border-l-4 border-muted pl-4',
    code: 'text-sm font-mono bg-muted px-1.5 py-0.5 rounded',
  }

  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    destructive: 'text-destructive',
    accent: 'text-accent-foreground',
  }

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }

  const classes = cn(
    baseClasses,
    fontClasses[font],
    variantClasses[variant],
    colorClasses[color],
    weightClasses[weight],
    alignClasses[align],
    className
  )

  return React.createElement(
    Component,
    { className: classes, ...props },
    children
  )
}

export { Typography }
