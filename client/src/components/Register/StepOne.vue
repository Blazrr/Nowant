<template>
  <div class="flex w-full flex-col flex-1">
    <Toast />
    <h1
      class="mx-auto mt-12 text-5xl font-extrabold text-sec-500 font-orbitron"
    >
      REGISTER
    </h1>
    <form
      :state="state"
      @submit="register"
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
          type="text"
          id="email"
          v-model="state.email"
          class="w-[300px]"
        />
        <label for="email">Email</label>
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

      <IftaLabel>
        <InputText
          type="password"
          id="confirmPassword"
          v-model="state.confirmPassword"
          :feedback="false"
          class="w-[300px]"
        />
        <label for="confirmPassword">Confirm Password</label>
      </IftaLabel>

      <Button label="Register" type="submit" class="w-[200px]" />
      <RouterLink to="/login" class="text-sec-500 underline cursor-pointer">
        Already have an account? Login
      </RouterLink>
    </form>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import IftaLabel from "primevue/iftalabel";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { reactive } from "vue";
import { object, string, ref, ValidationError } from "yup";
import { useUserStore } from "../../store/userStore";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});
const schema = object({
  username: string().required("Username is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const toast = useToast();

const emit = defineEmits(["handleStep"]);

const register = async (e: Event) => {
  e.preventDefault();
  try {
    let user = await schema.validate(
      {
        username: state.username,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
      },
      { abortEarly: false }
    );
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      }
    );
    const data = await res.json();
    if (!data.token) {
      throw new Error(JSON.stringify(data));
    }
    window.ipcRenderer.send("setToken", data.token.token);
    await useUserStore().setToken(data.token.token);
    return emit("handleStep", 2);
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
