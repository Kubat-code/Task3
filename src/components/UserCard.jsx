import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodoThunk } from "../store/thunk/todoThunk";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/slice/cartSlice";
import { toggleFavorite } from "../store/slice/favoritesSlice";

export const UserCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todo.todos);
  const role = useSelector((state) => state.auth.role);
  const cartItems = useSelector((state) => state.cart.items);
  const favoritesItems = useSelector((state) => state.favorites.items);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("favorites", JSON.stringify(favoritesItems));
    dispatch(getTodoThunk());
  }, [dispatch, cartItems, favoritesItems]);

  const handleCardClick = (id) => {
    const basePath =
      role === "USER" ? "/user" : role === "GUEST" ? "/guest" : "/admin";
    navigate(`${basePath}/${id}`);
  };

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <StyledWrapper>
      {todos?.map((item) => (
        <StyledCard key={item.id}>
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{ cursor: "pointer" }}
          />
          <h1>{item.title}</h1>
          <span>Цена: {item.price}$</span>
          <ButtonsWrapper>
            <button onClick={() => handleCardClick(item.id)}>Подробнее</button>
            <button onClick={() => handleAddToCart(item.id)}>
              {cartItems.includes(item.id) ? "В корзине" : "Добавить в корзину"}
            </button>

            <button onClick={() => handleToggleFavorite(item.id)}>
              {favoritesItems.includes(item.id)
                ? "Убрать из избранного"
                : "В избранное"}
            </button>
          </ButtonsWrapper>
        </StyledCard>
      ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const StyledCard = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  text-align: center;
  flex-wrap: wrap;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  border: 1px solid gray;
  border-radius: 8px;
  img {
    border-radius: 8px;
    width: 400px;
    height: 250px;
  }
  transition: 0.5s ease;
  &:hover {
    box-shadow: 6px 6px 8px 3px rgba(34, 60, 80, 0.2);
    transform: scale(1.05);
  }
`;

const ButtonsWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  button {
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
    border: 1px solid #333;
    background-color: #fff;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #eee;
    }
  }
`;
