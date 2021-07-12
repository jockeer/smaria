import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Contrato from './components/pages/Contrato';
import Pagos from './components/pages/Pagos';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/pago' component={Pagos}/>
        <Route exact path='/contrato' component={Contrato}/>
      </Switch>
    </Router>
  );
}

export default App;
