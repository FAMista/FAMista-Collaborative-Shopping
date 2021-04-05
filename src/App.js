import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterHeader from './components/authentication/RegisterHeader.js';
import Register from './components/authentication/Register.js';
import LoginHeader from './components/authentication/LoginHeader.js';
import Login from './components/authentication/Login.js';
import Dashboard from './components/authentication/Dashboard.js';
import PrivateRoute from './PrivateRoute.js';
import ForgotPassword from './components/authentication/ForgotPassword.js';
import UpdateProfile from './components/authentication/UpdateProfile.js';
import Sidebar from './components/chat/Sidebar';
import Chat from './components/chat/Chat';
import { AuthProvider } from './contexts/AuthContext.js';
import Home from './components/ecommerce/Home.js';
import Checkout from './components/ecommerce/Checkout.js';
import Header from './components/ecommerce/Header';
import MyFeed from './components/social/MyFeed';

function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component= {Home} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/login">
            <LoginHeader />
            <Login />
          </Route>
          <Route path="/register">
            <RegisterHeader />
            <Register />
          </Route>
          <Route path="/forgot-password">
          <ForgotPassword />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/chat">
            <div className="app">
              <div className="app_body">
                <Sidebar/>
                <Route path="/rooms/:roomId">
                  <Chat/>
                </Route>             
              </div>
            </div>
          </Route>
          <PrivateRoute path="/social" component={MyFeed} />
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;