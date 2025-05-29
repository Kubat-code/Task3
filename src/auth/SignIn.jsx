import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ErrorMessage } from "../components/ErrorMessage";
import { signInThunk } from "../store/thunk/authThunk";
import { isAuth } from "../store/slice/authSlice";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(signInThunk({ userData: data, navigate }));
    reset();
  };

  const handleGuestLogin = () => {
    const guest = { role: "GUEST" };
    localStorage.setItem("auth", JSON.stringify({ data: guest }));
    dispatch(isAuth("GUEST"));
    navigate("/guest");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "500px",
        padding: "20px",
        textAlign: "center",
        margin: "0 auto",
        marginTop: "150px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
        }}
      >
        Sign In
      </Typography>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <TextField
            label="Email"
            fullWidth
            type="email"
            {...register("email", {
              required: { value: true, message: "Введите Email" },
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
              required: { value: true, message: "Введите пароль" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
                message:
                  "Минимум 6 символов, одна заглавная, одна строчная, цифра и спецсимвол",
              },
            })}
          />
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        </InputWrapper>
        <Button type="submit" variant="contained">
          Login
        </Button>

        <GuestButton type="button" onClick={handleGuestLogin}>
          Войти как гость
        </GuestButton>

        <StyledBox>
          <p>Don't you have an account?</p>
          <StyledLink to="/sign-up">Sign Up</StyledLink>
        </StyledBox>
      </StyledForm>
    </Paper>
  );
};

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const GuestButton = styled(Button)`
  color: white;
`;
