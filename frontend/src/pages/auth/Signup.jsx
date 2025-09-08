import { Button, Field, Input, Stack, Text } from "@chakra-ui/react";
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
      setErrorSignup(null);
      await crearUsuario(data);
    } catch (error) {
      setErrorSignup(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
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
        >
          <h2 className="!font-semibold self-center !text-xl">
            Registrarse
          </h2>{" "}
          <Field.Root invalid={!!errors.lastName}>
            <Field.Label>Email</Field.Label>
            <Input type="email" {...register("email")} />
          </Field.Root>
          <Field.Root invalid={!!errors.lastName}>
            <Field.Label>Contraseña</Field.Label>
            <PasswordInput type="password" {...register("contraseña")} />
          </Field.Root>
          <Button type="submit" width={"full"}>
            Crear cuenta
          </Button>
          <Text color={"red.500"}>{errorSignup}</Text>
          <div className="flex gap-4 items-center justi">
            <Text textStyle="sm">¿Ya tienes una cuenta?</Text>
            <Button size={"xs"} variant="ghost" as={RouterLink} to="/login">
              Iniciar Sesión
            </Button>
          </div>
        </Stack>
      </form>
    </div>
  );
}
