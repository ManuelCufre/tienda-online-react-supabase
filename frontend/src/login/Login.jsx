import { Button, Field, Input, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useState } from "react";
import useSupaBase from "../useSupaBase";


export default function Login() {
    const{signUpNuevoUsuario} = useSupaBase()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        signUpNuevoUsuario(data.email)
      }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4" align="flex-start" maxW="sm" mx="auto" mt="15%" shadow="sm" p="8" borderRadius="sm" bg="white"> 
          
  
          <Field.Root invalid={!!errors.lastName}>
            <Field.Label>Email</Field.Label>
            <Input type="email" {...register("email")} />
            
          </Field.Root>
        
  
          <Button type="submit">Iniciar Sesión</Button>
        </Stack>
      </form>
    )
}