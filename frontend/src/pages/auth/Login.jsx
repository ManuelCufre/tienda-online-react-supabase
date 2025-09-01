import { Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useSupaBase from "@/hooks/useSupaBase";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(null);
  const navigate = useNavigate();
  const { iniciarSesionUsuario, user } = useSupaBase();

  useEffect(() => {
    if (user) {
      navigate("/productos");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setErrorLogin(null);
      await iniciarSesionUsuario(data);
    } catch (error) {
      setErrorLogin(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        gap="4"
        align="flex-start"
        minW="440px"
        mx="auto"
        shadow="sm"
        p="8"
        borderRadius="sm"
        bg="white"
      >
        <h3>Iniciar sesion</h3>
        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Email</Field.Label>
          <Input type="email" {...register("email")} />
        </Field.Root>
        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Contraseña</Field.Label>
          <PasswordInput type="password" {...register("password")} />
        </Field.Root>
        <Button type="submit">Iniciar Sesión</Button>
        <Text color={"red.500"}>{errorLogin}</Text>
        <div className="flex gap-4 items-center">
          <Text textStyle = "sm">¿No tienes una cuenta?</Text>
          <Button size={'xs'} variant="outline" as={RouterLink} to="/signup">
            Registrate
          </Button>
        </div>
      </Stack>
    </form>
    </div>
  );
}
