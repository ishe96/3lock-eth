import {
  Welcome, Footer, Navbar, Transcations, Services
} from './components'

function App() {

    return (
        <div className="min-h-screen">
          <div className="gradient-bg-welcome">
            <Navbar/>
            <Welcome/>
          </div>
          <Services/>
          <Transcations/>
          <Footer/>
        </div>
    );
}

export default App;
