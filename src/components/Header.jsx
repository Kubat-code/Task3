import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slice/authSlice";
import { ModalContext } from "../context/ModalContext";
import { removeFromCart } from "../store/slice/cartSlice";

export const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const favoritesItems = useSelector((state) => state.favorites.items);
  const role = useSelector((state) => state.auth.role);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { openModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(logout());
    navigate("/sign-in");
  };

  const handleLogin = () => {
    navigate("/sign-in");
  };

  const handleOpenCart = () => {
    openModal("Корзина", <CartModalContent items={cartItems} role={role} />);
  };

  const handleOpenFavorites = () => {
    openModal("Избранное", <FavoritesModalContent items={favoritesItems} />);
  };

  return (
    <HeaderWrapper>
      <Logo onClick={() => navigate("/")}>MyStore</Logo>
      <Nav>
        <NavItem onClick={handleOpenCart}>
          Корзина <Badge>{cartItems.length}</Badge>
        </NavItem>
        <NavItem onClick={handleOpenFavorites}>
          Избранное <Badge>{favoritesItems.length}</Badge>
        </NavItem>

        <AccountWrapper>
          <AccountButton onClick={toggleDropdown}>
            Личный кабинет ⌄
          </AccountButton>
          {isDropdownOpen && (
            <DropdownMenu>
              {role !== "GUEST" ? (
                <DropdownItem onClick={handleLogout}>
                  Выйти из аккаунта
                </DropdownItem>
              ) : (
                <DropdownItem onClick={handleLogin}>Войти</DropdownItem>
              )}
            </DropdownMenu>
          )}
        </AccountWrapper>
      </Nav>
    </HeaderWrapper>
  );
};

const CartModalContent = ({ items, role }) => {
  const { openModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  const handleBuy = () => {
    if (role === "GUEST") {
      openModal(
        "Требуется авторизация",
        <p>
          Пожалуйста, войдите или зарегистрируйтесь, чтобы совершить покупку.
        </p>
      );
    } else {
      alert("Покупка успешно оформлена!");
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return <p>В корзине пока нет товаров.</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id}>
          <img src={item.imageUrl} alt={item.title} />
          <div>
            <p>{item.title}</p>
            <p>Цена: {item.price}$</p>
          </div>
          <RemoveButton onClick={() => handleRemove(item.id)}>
            Удалить
          </RemoveButton>
        </CartItem>
      ))}
      <BuyButton onClick={handleBuy}>Купить</BuyButton>
    </div>
  );
};

const FavoritesModalContent = ({ items }) => {
  if (items.length === 0) {
    return <p>Избранных товаров нет.</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id}>
          <img src={item.imageUrl} alt={item.title} />
          <div>
            <p>{item.title}</p>
            <p>Цена: {item.price}$</p>
          </div>
        </CartItem>
      ))}
    </div>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 16px 40px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #007bff;
  letter-spacing: 1px;
  user-select: none;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  position: relative;
`;

const NavItem = styled.div`
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
  &:hover {
    color: #007bff;
  }
`;

const Badge = styled.span`
  background-color: #007bff;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 6px;
`;

const AccountWrapper = styled.div`
  position: relative;
`;

const AccountButton = styled.button`
  font-size: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 600;
  padding: 8px;
  transition: color 0.3s ease;
  &:hover {
    color: #007bff;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CartItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }
  div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const BuyButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const RemoveButton = styled.button`
  padding: 6px 10px;
  background-color: #dc3545;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #a71d2a;
  }
`;
