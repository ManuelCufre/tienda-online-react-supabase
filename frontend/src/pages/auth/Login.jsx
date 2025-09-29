import { Button, Field, Input, Stack, Text, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(null);
  const navigate = useNavigate();
  const { iniciarSesion, user } = useAuth();

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
      await iniciarSesion(data);
    } catch (error) {
      setErrorLogin(error.message);
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen"  bg="#F0F0F0" _dark={{ bg: "#1A1A1A" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        gap="4"
        align="flex-start"
        minW="440px"
        mx="auto"
        shadow="sm"
        p="8"
        borderRadius="sm"
         bg="white" _dark={{ bg: "#303030" }}
      >
        <h2 className="!font-semibold self-center !text-xl">Iniciar sesión</h2>
        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Email</Field.Label>
          <Input type="email" {...register("email")} />
        </Field.Root>
        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Contraseña</Field.Label>
          <PasswordInput type="password" {...register("password")} />
        </Field.Root>
        <Button type="submit" width={'full'}>Iniciar Sesión</Button>
        <Text color={"red.500"}>{errorLogin}</Text>
        <div className="flex gap-4 items-center">
          <Text textStyle = "sm">¿No tienes una cuenta?</Text>
          <Button size={'xs'} variant="ghost" as={RouterLink} to="/signup">
            Registrate
          </Button>
        </div>
      </Stack>
    </form>
    </Box>
  );
}
