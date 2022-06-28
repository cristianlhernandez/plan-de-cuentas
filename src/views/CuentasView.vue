<template>
  <q-page padding>
     <div class="bg-grey-10 text-white q-pa-sm">
      <q-radio keep-color v-model="valor" val="capitulo" label="Capítulo" color="blue-grey" class="text-blue-grey"/>
      <q-radio keep-color v-model="valor" val="grupo" label="Grupo" color="purple" class="text-purple q-ml-md" />
      <q-radio keep-color v-model="valor" val="rubro" label="Rubro" color="indigo" class="text-indigo q-ml-md" />
      <q-radio keep-color v-model="valor" val="cuenta" label="Cuenta" color="teal" class="text-teal q-ml-md" />
      <q-radio keep-color v-model="valor" val="auxiliar" label="Auxiliar" color="green" class="text-green q-ml-md" />
    </div>
    <div class="q-pa-md q-mt-lg" style="max-width: 500px">
        <q-form
            v-if="valor != null"
            @submit.prevent="onSubmit"
            @reset="onReset"
            class="q-gutter-lg"
        >
            <!--Inicio de la condicion Codigo-->
            <q-input v-if="valor==='capitulo'"
                outlined 
                fill-mask="#"
                label="Código del capítulo (#)" 
                label-color="blue-grey"
                color="blue-grey"
                mask="#"
                v-model="codigo"
                lazy-rules
                :rules="[ val => val !== null && val !== '#' || 'Ingrese el Código del Capítulo']"
            />
            <q-input v-if="valor==='grupo'"
                outlined 
                fill-mask="#"
                label="Código del grupo (#.#)"
                label-color="purple"
                color="purple"  
                mask="#.#"
                v-model="codigo"
                lazy-rules
                :rules="[ val => val !== null && val !== '#.#' || 'Ingrese el Código del Grupo']"
            />
            <q-input v-if="valor==='rubro'"
                outlined 
                fill-mask="#"
                label="Código de la Rubro (#.#.#)" 
                label-color="indigo"
                color="indigo"
                mask="#.#.#"
                v-model="codigo"
                lazy-rules
                :rules="[ val => val !== null && val !== '#.#.#' || 'Ingrese el Código del Rubro']"
            />
            <q-input v-if="valor==='cuenta'"
                outlined 
                fill-mask="#"
                label="Código de la Cuenta (#.#.#.##)" 
                label-color="teal"
                color="teal"
                mask="#.#.#.##"
                v-model="codigo"
                lazy-rules
                :rules="[ val => val !== null && val !== '#.#.#.##' || 'Ingrese el Código de la Cuenta']"
            />
            <q-input v-if="valor==='auxiliar'"
                outlined 
                fill-mask="#"
                label="Código del auxiliar (#.#.#.##/###)"
                label-color="green"
                color="green" 
                mask="#.#.#.##/###"
                v-model="codigo"
                lazy-rules
                :rules="[ val => val !== null && val !== '#.#.#.##/###' || 'Ingrese el Código del Auxiliar']"
            />
            <!--Fin de la condicion Codigo-->

            <q-input
                outlined 
                label="Nombre de la Cuenta" 
                v-model="nombre"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Ingrese el Nombre']"
            />
            <q-btn type="submit" color="black" label="Guardar" />
        </q-form>
    </div>
  </q-page>  
</template>



<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'


export default {
    name: 'CuentasComponent',
    setup() {

        const valor = ref(null)
        const codigo = ref(null)
        const nombre = ref(null)
        const $q = useQuasar()

       

        
        function onSubmit(){
            console.log('Continuar')

            Excel.run(async (context) => {
                let HCuentas = context.workbook.worksheets.getItem("Plan de Cuentas")
                let TCuentas = HCuentas.tables.getItem("PlanDeCuentas")

                await context.sync()
                
                console.log(codigo.value)
                TCuentas.rows.add(null,
                [[codigo.value, nombre.value]], true
                )

                await context.sync()
                $q.notify({
                    color: 'green',
                    textColor: 'white',
                    message: 'La Cuenta fue agregada con exito',
                    position: 'center',
                    timeout: 2500,
                })
                codigo.value=null
                nombre.value=null
                valor.value=null
            })
             .catch(function (error) {
                console.log("Error: " + error);
                if (error instanceof OfficeExtension.Error) {
                    console.log("Debug info: " + JSON.stringify(error.debugInfo));
                }
            });
    
            
        }

        function onReset() {
            
            
        }

        return {
            valor,
            codigo,
            nombre,
            onSubmit,
            onReset,
        }
    },
}
</script>