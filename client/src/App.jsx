import './App.css'
import {BrowserRouter} from 'react-router-dom';
import Routing from './components/routing/Routing';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='main'>
          <Routing />
          {/* <ScrollToTopButton /> */}
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
