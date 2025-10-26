import { BrowserRouter as Router } from 'react-router-dom'
import { MainLayout } from '@/shared/components/organisms/main-layout'
import { AppRoutes } from '@/app-routes'
import { ThemeProvider } from '@/shared/contexts/theme-context'

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
