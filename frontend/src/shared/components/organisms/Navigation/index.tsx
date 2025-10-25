import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, ROUTE_METADATA } from '@/shared/constants'
import { cn } from '@/shared/utils/utils'

export interface NavigationProps {
  className?: string
}

export const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const location = useLocation()

  const navigationItems = [
    {
      path: ROUTES.HOME,
      label: 'Home',
      icon: '🏠',
    },
    {
      path: ROUTES.DASHBOARD,
      label: 'Dashboard',
      icon: '📊',
    },
    {
      path: ROUTES.USERS.LIST,
      label: 'Users',
      icon: '👥',
    },
    {
      path: ROUTES.PROJECTS.LIST,
      label: 'Projects',
      icon: '📁',
    },
    {
      path: ROUTES.SETTINGS,
      label: 'Settings',
      icon: '⚙️',
    },
  ]

  return (
    <nav className={cn('flex space-x-1', className)}>
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path
        const metadata = ROUTE_METADATA[item.path as keyof typeof ROUTE_METADATA]

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
            title={metadata?.description}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default Navigation
