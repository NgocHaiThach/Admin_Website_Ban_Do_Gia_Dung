import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Menu from './components/Menu';

import HomePage from './components/Employee/HomePage';
import AddEmployee from './components/Employee/AddEmployee';
import UpdateEmployee from './components/Employee/UpdateEmployee';

import HomeClassification from './components/Classification/HomeClassification';
import AddClassification from './components/Classification/AddClassification';
import UpdateClassification from './components/Classification/UpdateClassification';

import HomeCategories from './components/Categories/HomeCategories';
import AddCategories from './components/Categories/AddCategories';
import UpdateCategories from './components/Categories/UpdateCategories';

import HomeSpecification from './components/Specification/HomeSpecification';
import AddSpecification from './components/Specification/AddSpecification';
import UpdateSpecification from './components/Specification/UpdateSpecification';

import HomeStore from './components/Store/HomeStore';
import AddStore from './components/Store/AddStore';
import UpdateStore from './components/Store/UpdateStore';
import ImportStore from './components/Store/ImportStore';
import InfoStore from './components/Store/InfoStore';
import BillList from './components/BillList/BillList';
import SideBar from './components/SideBar';
import Login from './components/Login/Login';

function App() {

  const LoginContainer = (adminInfo) => (
    <>
      <Redirect exact="/" to="/login" />
      <Route path="/login" component={Login} />
    </>
  )

  const DefaultContainer = () => (
    <div style={{width: '100%'}}>
      <Menu />
      <>
          {/* <Redirect exact from="/" to="/list" /> */}
          <Route exact path="/list" component={HomePage} />
          <Route exact path="/classification" component={HomeClassification} />
          <Route exact path="/categorise" component={HomeCategories} />
          <Route exact path="/specification" component={HomeSpecification} />
          <Route exact path="/stores" component={HomeStore} />

          <Route exact path="/add-store" component={AddStore} />
          <Route exact path="/add-specification" component={AddSpecification} />
          <Route exact path="/add-classification" component={AddClassification} />
          <Route exact path="/add-categories" component={AddCategories} />
          <Route exact path="/add" component={AddEmployee} />

          <Route exact path="/update-store/:id" component={UpdateStore} />
          <Route exact path="/update-specification/:id" component={UpdateSpecification} />
          <Route exact path="/update-classification/:id" component={UpdateClassification} />
          <Route exact path="/update-category/:id" component={UpdateCategories} />
          <Route exact path="/update/:id" component={UpdateEmployee} />

          <Route exact path="/import-store/:id" component={ImportStore} />
          <Route exact path="/info-store/:id" component={InfoStore} />

          <Route exact path="/bills" component={BillList} />
      </>
    </div>
      
  )

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={LoginContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
