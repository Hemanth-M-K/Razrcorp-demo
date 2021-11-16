import ScrollPagination from './components/ScrollPagination';
import AutocorrectTextarea from './components/AutocorrectTextarea';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Routes>
         <Route path="/" element={<ScrollPagination/>} />
          <Route path="autocorrector" element={<AutocorrectTextarea />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
