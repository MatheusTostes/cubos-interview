import React from 'react'
import { Typography } from '@/shared/components/atoms/typography'

export const Footer: React.FC = () => {
  return (
    <footer className="z-10 mt-auto flex w-full justify-center border-t p-6 ">
      <Typography
        font="montserrat"
        variant="p"
        className="text-center text-sm md:text-base"
      >
        2025 &copy; Todos os direitos reservados à{' '}
        <b className="font-bold">Cubos Movies</b>
      </Typography>
    </footer>
  )
}
