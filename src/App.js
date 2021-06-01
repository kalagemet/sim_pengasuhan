import 'semantic-ui-css/semantic.min.css';
import './Styles/Styles.scss';
import "react-datepicker/dist/react-datepicker.css";
import { AppLayout } from './AppLayout/AppLayout';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Consumer, Context } from './Context'
import NotFound from './Page/404';
import Dashboard from './Page/Admin/Dashboard';
import Entri from './Page/Admin/Entri/Entri';
import Pristiwa from './Page/Admin/Pristiwa/Pristiwa';
import DashboardTaruna from './Page/Taruna/Dashboard';
import TranskripTaruna from './Page/Taruna/Transkrip';
import DetailPristiwa from './Page/Admin/Pristiwa/Detail';
import RiwayatPristiwa from './Page/Admin/Pristiwa/Riwayat';
import Riwayat from './Page/Admin/Riwayat/Riwayat';
import Users from './Page/Admin/Users/Users';
import DetailUser from './Page/Admin/Users/Detail';
import TambahTaruna from './Page/Admin/Users/Tambah';

function AdminRouter(){
      return (
      <Switch>
          <Route exact path='/'>
              <Redirect to='/dashboard'/>
          </Route>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/entri-poin' component={Entri} />
          <Route exact path='/pristiwa' component={Pristiwa} />
          <Route path='/pristiwa/detail' component={DetailPristiwa} />
          <Route path='/pristiwa/riwayat' component={RiwayatPristiwa}/>
          <Route exact path='/riwayat' component={Riwayat} />
          <Route exact path='/users' component={Users} />
          <Route path='/users/detail' component={DetailUser} />
          <Route path='/users/tambah_taruna' component={TambahTaruna}/>
          <Route exact path='*' component={NotFound} />
      </Switch>
    )
}

function TarunaRouter(){
  return (
    <Switch>
      <Route exact path='/'>
          <Redirect to='/dashboard'/>
      </Route>
      <Route exact path='/dashboard' component={DashboardTaruna} />
      <Route exact path='/transkrip' component={ TranskripTaruna } />
      <Route exact path='*' component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Context>
          <AppLayout>
            <Consumer>
              {({loginAs})=>{
                if (loginAs==='admin') {
                  return <AdminRouter/>
                }else if(loginAs==='taruna'){
                  return <TarunaRouter/>
                }else{
                  return <Route exact path='*' component={NotFound} />
                }
              }}
            </Consumer>
          </AppLayout>
      </Context>
    </BrowserRouter>
  );
}

export default App;
