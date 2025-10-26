import React from 'react'
import { Header } from '@/shared/components/molecules/header'
import { VStack } from '@/shared/components/atoms/vstack'
import { MainContainer } from '@/shared/components/atoms/main-container'
import { Background } from '@/shared/components/molecules/background'

export interface IMainLayout {
  children?: React.ReactNode
}

export const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <>
      <VStack className="z-10 h-screen">
        <Header />

        <MainContainer>{children}</MainContainer>
      </VStack>
      <Background />
    </>
  )
}
