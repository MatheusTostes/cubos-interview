import { BrowserRouter as Router } from 'react-router-dom'
import { MainLayout } from '@/shared/components/organisms/main-layout'
import { AppRoutes } from '@/app-routes'
import { ThemeProvider } from '@/shared/contexts/theme-context'
import { AuthProvider } from '@/shared/contexts/auth-context'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
