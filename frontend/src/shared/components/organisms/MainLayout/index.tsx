import React from 'react'
import { Header } from '@/shared/components/molecules/Header'
import { VStack } from '@/shared/components/atoms/vstack'
import { MainContainer } from '@/shared/components/atoms/main-container'
import { Footer } from '@/shared/components/molecules/Footer'

export interface IMainLayout {
  children?: React.ReactNode
}

export const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <VStack className="min-h-screen gap-4">
      <Header />
      
      <MainContainer>
        {children}
      </MainContainer>
      
      <Footer />
    </VStack>
  )
}

