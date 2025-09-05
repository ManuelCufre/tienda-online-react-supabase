import {
  CloseButton,
  FileUpload,
  Input,
  InputGroup,
  Field,
} from "@chakra-ui/react";
import { LuFileUp } from "react-icons/lu";

export default function FormaPago() {
  return (
    <div className="!pb-8">
      <h2 className="!font-semibold">Pago</h2>
      <div>
        <span className="!text-sm !font-semibold">Pasos para pagar: </span>
      </div>
      <div className="flex gap-8">
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
      <div className="flex gap-4 relative top-8">
        <Field.Root required width={'20rem'}>
          <Field.Label>
            N* de comprobante 
          </Field.Label>
          <Input placeholder="Número de comprobante" />
          <Field.HelperText>We'll never share your email.</Field.HelperText>
        </Field.Root>
        <FileUpload.Root gap="1" maxWidth="300px">
          <FileUpload.HiddenInput />
          <FileUpload.Label>Cargar comprobante</FileUpload.Label>
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
      </div>
    </div>
  );
}
