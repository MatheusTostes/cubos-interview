import React from 'react'
import { Header } from '@/shared/components/molecules/header'
import { VStack } from '@/shared/components/atoms/vstack'
import { MainContainer } from '@/shared/components/atoms/main-container'
import { Footer } from '@/shared/components/molecules/footer'
import { Background } from '@/shared/components/molecules/background'

export interface IMainLayout {
  children?: React.ReactNode
}

export const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      <VStack className="z-10 min-h-screen">
        <Header />

        <MainContainer>{children}</MainContainer>

        <Footer />
      </VStack>
      <Background />
    </>
  )
}
