import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { useState } from "react";
import Header from "@/components/layout/Header";
import ResumenCompra from "./ResumenCompra";
import FormDatosPersonales from "./FormDatosPersonales";
import FormEnvio from "./FormEnvio";
import FormPago from "./FormPago";

const steps = [
  { title: "Datos personales", render: <FormDatosPersonales /> },
  { title: "Envío", render: <FormEnvio /> },
  { title: "Pago", render: <FormPago /> },
];

export default function CheckOutSteps() {
  const [activeStep, setActiveStep] = useState(0);

  // Navegación
  const goToNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Obtener información del paso actual
  const getCurrentStepInfo = () => {
    const currentStep = activeStep ?? 0;
    return {
      index: currentStep,
      number: currentStep + 1,
      title: steps[currentStep]?.title || "Paso desconocido",
      total: steps.length,
      isFirst: currentStep === 0,
      isLast: currentStep === steps.length - 1,
    };
  };

  const currentStepInfo = getCurrentStepInfo();

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-[65vw] relative top-34 flex gap-8">
        <div className="w-[65%]">
          {/* Indicador de pasos */}
          <div className="mb-6">
            <Steps.Root index={activeStep} count={steps.length}>
              <Steps.List>
                {steps.map((s, index) => (
                  <Steps.Item key={index} index={index}>
                    <Steps.Indicator />
                    <Steps.Title>{s.title}</Steps.Title>
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
            </Steps.Root>
          </div>

          {/* Contenido del paso actual */}
          <div className="mb-6">
            {steps[activeStep]?.render}
          </div>

          {/* Botones de navegación */}
          <ButtonGroup size="sm" variant="outline">
            <Button 
              onClick={goToPrevious}
              disabled={activeStep === 0}
            >
              Atrás
            </Button>
            <Button 
              onClick={goToNext}
              disabled={activeStep === steps.length - 1}
            >
              Siguiente
            </Button>
          </ButtonGroup>

        </div>
        <ResumenCompra />
      </div>
    </div>
  );
}
