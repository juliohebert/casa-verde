import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        eyebrow="Nova propriedade"
        title="Comece pelo essencial"
        description="O editor completo entra na Fase 4. Esta pagina valida o shell e os componentes de formulario."
      />
      <Card>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome da propriedade</FieldLabel>
              <Input id="name" placeholder="Ex.: Chale Vale Verde" />
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Endereco</FieldLabel>
              <Input id="address" placeholder="Rua, numero e complemento" />
            </Field>
            <Field>
              <FieldLabel htmlFor="city">Cidade e estado</FieldLabel>
              <Input id="city" placeholder="Fortaleza, CE" />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t">
          <Button variant="outline">Cancelar</Button>
          <Button>Continuar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
