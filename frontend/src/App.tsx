import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import Preview from './components/Preview'
import TodoList from './pages/TodoList'
import Notes from './pages/Note'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<Preview />} />
          <Route path="todo" element={<TodoList />} />
          <Route path="note" element={<Notes />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App

