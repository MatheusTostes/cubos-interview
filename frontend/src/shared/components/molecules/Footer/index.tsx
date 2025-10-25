import React from 'react'
import { Container } from '@/shared/components/atoms/container'
import { Typography } from '@/shared/components/atoms/typography'


export const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-auto w-full">
      <Container className="text-center w-full">
        <Typography font='display'>2025 &copy; Todos os direitos reservados a <b className='font-semibold'>Cubos Movies</b></Typography>
      </Container>
    </footer>
  )
}
