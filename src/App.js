import './App.less';
import './global.less'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRouter } from './AppRouter';
export function App() {
  return (
    //rotas

   
    <div className="App">
      <AppRouter/>
    </div>
  );
}