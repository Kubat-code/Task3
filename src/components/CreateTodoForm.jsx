import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateTodo } from "../store/thunk/todoThunk";
import { TextField, Button, Paper, Typography } from "@mui/material";
import styled from "styled-components";

export const CreateTodoForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newTodo = {
      title: data.title,
      price: Number(data.price),
      description: data.description,
      imageUrl: data.imageUrl,
    };
    dispatch(CreateTodo(newTodo));
    reset();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "500px",
        margin: "0 auto",
        mt: 5,
        p: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Добавить новый Todo
      </Typography>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <TextField
            label="Название"
            fullWidth
            {...register("title", { required: "Укажите название" })}
          />
          <Error>{errors.title?.message}</Error>
        </InputWrapper>
        <InputWrapper>
          <TextField
            label="Цена"
            type="number"
            fullWidth
            {...register("price", { required: "Укажите цену" })}
          />
          <Error>{errors.price?.message}</Error>
        </InputWrapper>
        <InputWrapper>
          <TextField
            label="Описание"
            fullWidth
            multiline
            rows={4}
            {...register("description", { required: "Укажите описание" })}
          />
          <Error>{errors.description?.message}</Error>
        </InputWrapper>
        <InputWrapper>
          <TextField
            label="URL фото"
            fullWidth
            {...register("imageUrl", {
              required: "Укажите ссылку на фото",
              pattern: {
                message: "Некорректный URL изображения",
              },
            })}
          />
          <Error>{errors.imageUrl?.message}</Error>
        </InputWrapper>
        <Button type="submit" variant="contained">
          Добавить Todo
        </Button>
      </StyledForm>
    </Paper>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0 0;
`;
