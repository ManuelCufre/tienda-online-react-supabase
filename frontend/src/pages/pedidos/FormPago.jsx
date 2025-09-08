import {
  CloseButton,
  FileUpload,
  Input,
  InputGroup,
  Field,
  Button,
  Box,
  defineStyle,
  Grid,
} from "@chakra-ui/react";
import { LuFileUp } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";

export default function FormaPago() {
  const [enviado, setEnviado] = useState(false);
  const { setPaymentData } = useCheckout();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Datos de pago:", data);
    setPaymentData(data);
    setEnviado(true);
  };

  return (
    <div className="!pt-8 !px-4 !pb-16 !border rounded-md relative top-8">
      <h2 className="!font-semibold">Pago</h2>
      
      <div className="!pt-4 !pb-4">
        <span className="!text-sm !font-semibold">Pasos para pagar: </span>
        <div className="flex flex-wrap gap-4 !mt-2">
          <div className="flex gap-2">
            <span className="!text-sm !font-semibold">Alias: </span>
            <span className="!text-sm">Manuelcufre.tienda</span>
          </div>
          <div className="flex gap-2">
            <span className="!text-sm !font-semibold">CBU: </span>
            <span className="!text-sm">5840543254325432</span>
          </div>
          <div className="flex gap-2">
            <span className="!text-sm !font-semibold">Destinatario: </span>
            <span className="!text-sm">Manuel Agustín Cufré</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-4 items-center relative top-6">
          <Grid templateColumns="repeat(2, 1fr)" gap="4" width={'full'}>
            <Field.Root required>
              <Box pos="relative" w="full">
                <Input
                  className="peer"
                  autoComplete="off"
                  {...register("numero_comprobante", { required: true })}
                />
                <Field.Label fontSize={"xs"} css={floatingStyles}>
                  N° de comprobante
                </Field.Label>
              </Box>
              {errors.numero_comprobante && (
                <span className="text-red-500 text-xs">Este campo es requerido</span>
              )}
            </Field.Root>
            
            <Field.Root>
              <Box pos="relative" w="full">
                <FileUpload.Root gap="1" width="full">
                  <FileUpload.HiddenInput />
                  <InputGroup
                    startElement={<LuFileUp />}
                    endElement={
                      <FileUpload.ClearTrigger asChild>
                        <CloseButton
                          me="-1"
                          size="xs"
                          variant="plain"
                          focusVisibleRing="inside"
                          focusRingWidth="2px"
                          pointerEvents="auto"
                        />
                      </FileUpload.ClearTrigger>
                    }
                  >
                    <Input asChild>
                      <FileUpload.Trigger>
                        <FileUpload.FileText lineClamp={1} />
                      </FileUpload.Trigger>
                    </Input>
                  </InputGroup>
                </FileUpload.Root>
                <Field.Label fontSize={"xs"} css={floatingStyles}>
                  Cargar comprobante
                </Field.Label>
              </Box>
            </Field.Root>
          </Grid>
          
          <Button 
            type="submit" 
            disabled={enviado}
            width="200px"
          >
            {enviado ? "Datos guardados" : "Confirmar pago"}
          </Button>
        </div>
      </form>
    </div>
  );
}

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});
