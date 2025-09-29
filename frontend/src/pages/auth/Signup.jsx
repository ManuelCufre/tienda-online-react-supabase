import {
  Button,
  Field,
  Input,
  Stack,
  Text,
  Box,
  Alert,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";

export default function Signup() {
  const navigate = useNavigate();
  const { crearUsuario, user } = useAuth();
  const [errorSignup, setErrorSignup] = useState(null);
  const [successSignup, setSuccessSignup] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/productos");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Añadido para verificar la contraseña
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setErrorSignup(null);
      setSuccessSignup(false);
      await crearUsuario(data);
      setSuccessSignup(true);
    } catch (error) {
      setErrorSignup(error.message);
    }
  };

  // Para verificar la fortaleza de la contraseña (opcional)
  const passwordValue = watch("password", "");

  return (
    <Box
      className="flex justify-center items-center h-screen"
      bg="#F0F0F0"
      _dark={{ bg: "#1A1A1A" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          gap="4"
          align="flex-start"
          minW={"440px"}
          mx="auto"
          shadow="sm"
          p="8"
          borderRadius="sm"
          bg="white"
          _dark={{ bg: "#303030" }}
        >
          <h2 className="!font-semibold self-center !text-xl">Registrarse</h2>

          {successSignup && (
            <Stack maxW="300px">
              <Alert.Root status="success" width={"sm"} className="flex flex-col">
                <div className="flex gap-2">
                  <Alert.Indicator />
                <Alert.Title>Regristo exitoso!!</Alert.Title>
                </div>
                <Alert.Description>
                  Por favor, revisa tu correo electrónico para verificar tu
                  cuenta antes de iniciar sesión.
                </Alert.Description>
              </Alert.Root>
            </Stack>
          )}

          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Contraseña</Field.Label>
            <PasswordInput
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}
          </Field.Root>

          <Button type="submit" width={"full"}>
            Crear cuenta
          </Button>

          {errorSignup && <Text color="red.500">{errorSignup}</Text>}

          <div className="flex gap-4 items-center justify-center">
            <Text textStyle="sm">¿Ya tienes una cuenta?</Text>
            <Button size={"xs"} variant="ghost" as={RouterLink} to="/login">
              Iniciar Sesión
            </Button>
          </div>
        </Stack>
      </form>
    </Box>
  );
}
