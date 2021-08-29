import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <aside className="sideBar menuBorder">
    <div className="menuBorder">
      <h2>MENU:</h2>
      <ul>
        <li className="menuBtn">
          <Link className="menuBtn" to="/products" data-testid="side-menu-item-products">
            Produtos
          </Link>
        </li>
        <li className="menuBtn">
          <Link to="/orders" className="menuBtn" data-testid="side-menu-item-my-orders">
            Meus pedidos
          </Link>
        </li>
        <li className="menuBtn">
          <Link to="/profile" className="menuBtn" data-testid="side-menu-item-my-profile">
            Meu Perfil
          </Link>
        </li>
        <li className="menuBtn">
          <Link to="/chat" className="menuBtn" data-testid="side-menu-chat">
            Conversar com a loja
          </Link>
        </li>
      </ul>
      <ul className="ExitBtn">
        <li className="menuBtn">
          <Link
            to="/"
            className="menuBtn"
            data-testid="side-menu-item-logout"
            onClick={ () => {
              localStorage.removeItem('token');
              localStorage.removeItem('cart');
            } }
          >
            Sair
          </Link>
        </li>
      </ul>
    </div>
  </aside>
);

export default SideBar;
