<template>
  <div class="flex w-full flex-col">
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
    </form>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import IftaLabel from "primevue/iftalabel";
import Password from "primevue/password";

import { reactive } from "vue";
import { object, string, ref, ValidationError } from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const schema = object({
  username: string().required("Required"),
  email: string().email("Invalid email").required("Required"),
  password: string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Required"),
});

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
      { abortEarly: false } // This ensures all errors are collected
    );
    console.log(user);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      err.inner.forEach((error) => {
        console.log(`${error.path}: ${error.message}`);
      });
    } else {
      console.error("An unexpected error occurred:", err);
    }
  }
};
</script>

<style lang="scss" scoped></style>
