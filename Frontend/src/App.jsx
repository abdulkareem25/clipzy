import { BrowserRouter as Router, Routes, Route } from "react-router"
import SignUp from "./features/auth/pages/SignUp"
import SignIn from "./features/auth/pages/SignIn"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
