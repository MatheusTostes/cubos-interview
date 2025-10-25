import { BrowserRouter as Router } from 'react-router-dom'
import { MainLayout } from '@/shared/components/organisms/MainLayout'
import { AppRoutes } from '@/AppRoutes'


function App() {
  return (
    <Router>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </Router>
  )
}

export default App
