import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getTodoThunk } from "../store/thunk/todoThunk";

export const InnerPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos, isLoading } = useSelector((state) => state.todo);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(getTodoThunk());
    }
  }, [dispatch, todos.length]);

  if (isLoading) return <StyledMessage>Загрузка...</StyledMessage>;

  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) return <StyledMessage>Тур не найден</StyledMessage>;

  return (
    <Container>
      <Image src={todo.imageUrl} alt={todo.title} />
      <Content>
        <Title>{todo.title}</Title>
        <Price>Цена: {todo.price}$</Price>
        <Description>{todo.description}</Description>
        <BackButton onClick={() => navigate(-1)}>← Назад к картам</BackButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  margin: 40px auto;
  padding: 20px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 15px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: green;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ffffff;
  border: 2px solid #007bff;
  color: #007bff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }
`;

const StyledMessage = styled.h2`
  text-align: center;
  margin-top: 100px;
  font-size: 24px;
`;
