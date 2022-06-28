<template>
  <q-page padding>
    <div class="q-pa-md" v-if="existSheet">
      <q-card style="max-width: 300px">
        <q-item class="bg-deep-orange">
          <q-item-section avatar>
            <q-avatar color="blue-grey-10" text-color="white" icon="report_problem" size="xl">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span text-color="yellow-12">Error en la carga.</span>         
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>

          <q-card-section>
            No se encontro la Hoja Plan de Cuentas.
            Presione el boton para crear la hoja.
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
          <q-btn color="blue-grey-10" text-color="white" label="Crear Hoja" @click="createTable"/>
        </q-card-actions>
      </q-card>
  </div>

  <div class="q-pa-md" v-if="existTable">
      <q-card style="max-width: 300px">
        <q-item class="bg-deep-orange">
          <q-item-section avatar>
            <q-avatar color="blue-grey-10" text-color="white" icon="report_problem" size="xl">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span text-color="yellow-12">Error en la carga.</span>         
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>

          <q-card-section>
            No se encontro la la Tabla Plan de Cuentas.
            Presione el boton para crear la Tabla.
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
          <q-btn color="blue-grey-10" text-color="white" label="Crear Tabla" @click="createTable"/>
        </q-card-actions>
      </q-card>
  
      
  </div>
  </q-page>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { onMounted, ref, watch } from 'vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  beforeCreate() {
    Excel.run(async (context) => {
      let sheetCuentas = context.workbook.worksheets.getItemOrNullObject("Plan de Cuentas")
      let tableCuentas = sheetCuentas.tables.getItemOrNullObject("PlanDeCuentas")
      await context.sync()
      if(sheetCuentas.isNullObject){
        this.existSheet = true
        this.existTable = true

      }else{
        if (tableCuentas.isNullObject) {
          this.existTable = true
        }
        sheetCuentas.activate()
      }

      existSheet = false
    })
    .catch(function (error) {
              console.log("Error: " + error);
              if (error instanceof OfficeExtension.Error) {
                  console.log("Debug info: " + JSON.stringify(error.debugInfo));
              }
          })
  },

  setup(){

    const existSheet = ref(false)
    const existTable = ref(false)

    function createSheet() {
      Excel.run(async (context) => {
        let sheetCuentas = context.workbook.worksheets.getItemOrNullObject("Plan de Cuentas")
          await context.sync()
        if(sheetCuentas.isNullObject){
          sheetCuentas = context.workbook.worksheets.add("Plan de Cuentas")
          await context.sync()
          existSheet.value = false
        }
      })
      .catch(function (error) {
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
          console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
      })
    }

    function createTable() {
        Excel.run(async (context) => {
          let sheet = context.workbook.worksheets.getItem("Plan de Cuentas");
          let planDeCuentasTable = sheet.tables.add("A1:B1", true /*hasHeaders*/);
          planDeCuentasTable.name = "PlanDeCuentas";

          planDeCuentasTable.getHeaderRowRange().values = [["Codigo", "Nombre de la Cuenta"]];

          if (Office.context.requirements.isSetSupported("ExcelApi", "1.2")) {
            planDeCuentasTable.columns.getItemAt(0).getDataBodyRange().numberFormat=[["@"]]
              sheet.getUsedRange().format.autofitColumns();
              sheet.getUsedRange().format.autofitRows();
          }
          await context.sync();
          existTable.value = false
        })
      }

    return {
      existSheet,
      existTable,
      createTable,
      createSheet,
    }
  }
  

}
</script>
