import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Contrato from './components/pages/Contrato';
import Pago from './components/pages/Pago';
import Reporte from './components/pages/Reporte';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/pago' component={Pago}/>
        <Route exact path='/contrato' component={Contrato}/>
        <Route exact path='/reporte' component={Reporte}/>
      </Switch>
    </Router>
  );
}

export default App;
