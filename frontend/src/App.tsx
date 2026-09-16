import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { ObjectDetail } from './pages/ObjectDetail'
import { Objects } from './pages/Objects'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/objects" element={<Objects />} />
          <Route path="/object/:id" element={<ObjectDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
