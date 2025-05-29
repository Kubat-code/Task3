import React, { useEffect, useState } from "react";
import { CreateTodoForm } from "../components/CreateTodoForm";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoThunk,
  getTodoThunk,
  updateTodoThunk,
} from "../store/thunk/todoThunk";
import styled from "styled-components";

export const AdminLayout = () => {
  const [visible, setVisible] = useState(false);
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoThunk());
  }, [dispatch]);

  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodoThunk(id));
  };

  const handleUpdate = (item) => {
    const updated = {
      ...item,
      title: prompt("Новое название", item.title) || item.title,
      price: Number(prompt("Новая цена", item.price)) || item.price,
      description:
        prompt("Новое описание", item.description) || item.description,
    };
    dispatch(updateTodoThunk({ id: item.id, updatedData: updated }));
  };
  return (
    <div>
      <Button onClick={handleVisible} variant="contained">
        Открыть Форму
      </Button>
      {visible ? <CreateTodoForm /> : null}
      <StyledWrapper>
        {todos?.map((item) => (
          <StyledCard key={item.id}>
            <img src={item.imageUrl} alt={item.title} />
            <h1>Название: {item.title}</h1>
            <span>Цена: {item.price}$</span>
            <p>Описание: {item.description}</p>
            <button onClick={() => handleDelete(item.id)}>Удалить</button>
            <button onClick={() => handleUpdate(item)}>Изменить</button>
          </StyledCard>
        ))}
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  height: fit-content;
  display: flex;
  gap: 20px;
`;

const StyledCard = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  img {
    width: 350px;
  }
`;
