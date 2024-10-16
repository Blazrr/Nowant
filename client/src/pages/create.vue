<template>
  <DefaultLayout>
    <Toast />
    <div class="px-4 flex flex-col h-full gap-4">
      <div
        class="bg-cover bg-center h-full w-full rounded-lg p-4 relative"
        :style="{
          backgroundImage: `url(${selectedMap.splash})`,
        }"
      >
        <span class="text-sec-500 font-orbitron text-3xl font-extrabold"
          >{{ selectedMap.displayName }}
        </span>
        <div
          class="flex items-center flex-col space-y-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        >
          <FloatLabel variant="in">
            <InputText id="name" v-model="state.name" variant="filled" />
            <label for="name">Lobby name *</label>
          </FloatLabel>
          <FloatLabel variant="in">
            <InputText
              id="password"
              v-model="state.password"
              variant="filled"
            />
            <label for="password">Lobby password</label>
          </FloatLabel>
        </div>
        <div class="absolute bottom-4 right-4">
          <Button label="Create" @click="create" />
        </div>
      </div>

      <div class="grid grid-rows-3 grid-flow-col gap-4 h-[600px]">
        <template v-for="map in apiStore.maps">
          <div
            @click="selectedMap = map"
            :class="[
              'bg-[length:110%_110%] hover:bg-[length:130%_130%] active:bg-[length:150%_150%] bg-center h-full w-full rounded-lg cursor-pointer transition-all flex items-center justify-center hover:text-sec-400 active:text-sec-600',
              map.displayName === selectedMap.displayName &&
                'ring-2 ring-sec-500',
            ]"
            :style="{
              backgroundImage: `url(${map.splash})`,
            }"
          >
            <span
              :class="[
                'font-orbitron text-2xl font-bold ',
                map === selectedMap && 'text-sec-500',
              ]"
              >{{ map.displayName }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import DefaultLayout from "../layouts/default.vue";
import { useApiStore } from "../store/apiStore";
import { type Map } from "../types/typings";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { useUserStore } from "../store/userStore";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { ValidationError } from "yup";
import argon2 from "argon2-browser";
const toast = useToast();

const state = reactive({
  name: undefined,
  password: undefined,
});

const userStore = useUserStore();
const apiStore = useApiStore();
const selectedMap = ref<Map>(
  apiStore.maps[Math.floor(Math.random() * apiStore.maps.length)]
);

const create = async () => {
  try {
    const password = await argon2.hash({ pass: state.password });
    console.log(password);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/lobbies/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
        body: JSON.stringify({
          map: selectedMap.value.displayName,
          name: state.name,
          password,
        }),
      }
    );
    const data = await response.json();
    if (data.errors) {
      throw new Error(JSON.stringify(data));
    }
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred";
    if (err instanceof ValidationError) {
      errorMessage = err.inner.map((error) => error.message).join("\n");
    } else {
      const parsedError = JSON.parse((err as Error).message);
      errorMessage = parsedError.errors
        ? parsedError.errors.map((e: any) => e.message).join("\n")
        : parsedError.message || errorMessage;
    }
    toast.add({
      severity: "error",
      summary: "Error on your form entries",
      detail: errorMessage,
      life: 3000,
    });
  }
};
</script>

<style lang="scss" scoped></style>
