<template>
  <div class="flex">
    <LoginSidebar />
    <div class="flex w-full flex-col flex-1">
      <Toast />

      <h1
        class="mx-auto mt-12 text-5xl font-extrabold text-sec-500 font-orbitron"
      >
        LOGIN
      </h1>
      <form
        :state="state"
        @submit="login"
        class="flex-col flex space-y-4 items-center mt-16"
      >
        <IftaLabel>
          <InputText
            type="text"
            id="email"
            v-model="state.username"
            class="w-[300px]"
          />
          <label for="email">Username</label>
        </IftaLabel>

        <IftaLabel>
          <InputText
            type="password"
            id="password"
            v-model="state.password"
            :feedback="false"
            toggleMask
            class="w-[300px]"
          />
          <label for="password">Password</label>
        </IftaLabel>
        <Button label="Login" type="submit" class="w-[200px]" />
        <RouterLink
          to="/register"
          class="text-sec-500 underline cursor-pointer"
        >
          Dont have an account? Register
        </RouterLink>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginSidebar from "../components/Login/Sidebar.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import IftaLabel from "primevue/iftalabel";
import { reactive } from "vue";
import { object, string, ValidationError } from "yup";
import { useUserStore } from "../store/userStore";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
const toast = useToast();
const router = useRouter();
const state = reactive({
  username: undefined,
  password: undefined,
});
const schema = object({
  username: string().required("Please enter your username"),
  password: string().required("Please enter your password"),
});

const login = async (e: Event) => {
  e.preventDefault();
  try {
    let user = await schema.validate(
      {
        username: state.username,
        password: state.password,
      },
      { abortEarly: false }
    );
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    console.log(data);
    if (!data.token) {
      throw new Error(JSON.stringify(data));
    }
    window.ipcRenderer.send("setToken", data.token.token);
    await useUserStore().setToken(data.token.token);
    router.push("/");
  } catch (err: unknown) {
    console.error(err);
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

<style scoped></style>
