import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpThunk } from "../store/thunk/authThunk";
import { ErrorMessage } from "../components/ErrorMessage";

export const SignUp = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.email === "Admin@gmail.com" && data.password === "Admin123!") {
      data.role = "ADMIN";
    } else {
      data.role = "USER";
    }
    dispatch(signUpThunk(data));
    reset();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "500px",
        padding: "20px",
        textAlign: "center",
        margin: "0 auto",
        marginTop: "25px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
        }}
      >
        Registration
      </Typography>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <TextField
            label="FirstName"
            fullWidth
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Введите Имя",
              },
            })}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <TextField
            label="LastName"
            fullWidth
            type="text"
            {...register("surname", {
              required: {
                value: true,
                message: "Введите Фамилию",
              },
            })}
          />
          <ErrorMessage>{errors?.surname?.message}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <TextField
            label="PhoneNumber"
            fullWidth
            type="tel"
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "Введите номер например(+7)",
              },
              minLength: {
                value: 8,
                message: "Minimum 8 numbers",
              },
              maxLength: {
                value: 16,
                message: "Maximum 16 numbers",
              },
            })}
          />
          <ErrorMessage>{errors?.phoneNumber?.message}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <TextField
            label="Email"
            fullWidth
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Введите Email",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Введите @ для email",
              },
            })}
          />
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <TextField
            label="Password"
            fullWidth
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Введите пароль",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
                message:
                  "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
              },
            })}
          />
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        </InputWrapper>
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
        <Link to={"/sign-in"}>Sign In</Link>
      </StyledForm>
    </Paper>
  );
};

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
