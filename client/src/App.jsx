import './App.css'
import MaxWidthWrapper from "./components/MaxWidthWrapper.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
      <div className='min-h-screen font-sans antialiased grainy'>
          <Navbar />
          <MaxWidthWrapper>
              <Home/>
          </MaxWidthWrapper>
      </div>
  )
}

export default App
