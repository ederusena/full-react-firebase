import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Login,
  Profile,
  Checkout,
  Chat,
  Orders,
  Products,
  Register,
  AdminOrderDetail,
  AdminChats,
  AdminChatDetail,
} from './pages';
import OrderDetails from './pages/orderDetails';
import AdminOrders from './pages/AdminOrders';
import AdminProfile from './pages/AdminProfile';

const Rotas = () => (
  <Switch>
    <Route exact path="/admin/orders/:id" component={ AdminOrderDetail } />
    <Route exact path="/admin/orders" component={ AdminOrders } />
    <Route exact path="/login" component={ Login } />
    <Route path="/profile" component={ Profile } />
    <Route path="/admin/profile" component={ AdminProfile } />
    <Route path="/products" component={ Products } />
    <Route exact path="/register" component={ Register } />
    <Route path="/checkout" component={ Checkout } />
    <Route exact path="/orders" component={ Orders } />
    <Route exact path="/orders/:id" component={ OrderDetails } />
    <Route exact path="/" component={ () => <Redirect to="/login" /> } />
    <Route exact path="/chat" component={ Chat } />
    <Route exact path="/admin/chats" component={ AdminChats } />
    <Route exact path="/admin/chat/:email" component={ AdminChatDetail } />
  </Switch>
);

export default Rotas;
