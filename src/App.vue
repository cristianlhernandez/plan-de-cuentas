<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff"  class="shadow-2 rounded-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Plan de Cuentas</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        bordered
      >
        <q-scroll-area class="fit">
          <q-list>

            <q-item clickable v-ripple to="/" @click="drawer= !drawer">
              <q-item-section avatar>
                <q-icon name="home"/>
              </q-item-section>
              <q-item-section>
                Inicio
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/cuentas" @click="drawer= !drawer">
              <q-item-section avatar>
                <q-icon name="format_list_numbered"/>
              </q-item-section>
              <q-item-section>
                Cuentas
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawer: ref(false),
    }
  }
}
</script>
