import { BrowserRouter as Router } from 'react-router-dom'
import { MainLayout } from '@/shared/components/organisms/MainLayout'
import { AppRoutes } from '@/AppRoutes'
import { ThemeProvider } from '@/shared/contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </ThemeProvider>
  )
}

export default App
