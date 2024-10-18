<template>
  <div class="p-4 flex h-screen flex-col fixed w-[189px]">
    <RouterLink to="/" class="text-xl font-extrabold text-sec-500 font-orbitron"
      >NOWANT</RouterLink
    >
    <div class="flex flex-col items-center mt-12">
      <span class="font-orbitron text-xl font-extrabold">Pick an agent</span>
      <div class="flex gap-2 flex-rows mt-2">
        <div
          @click="currRole = 'all'"
          :class="[
            'h-6 w-6 flex items-center justify-center cursor-pointer',
            currRole === 'all' && 'ring-sec-500 ring-2',
          ]"
        >
          <i class="pi-th-large pi items-center" style="font-size: 1.3rem"> </i>
        </div>
        <img
          @click="currRole = role.displayName"
          v-for="role of agentRoles"
          :src="role.displayIcon"
          :class="[
            'h-6 w-6 cursor-pointer',
            currRole === role.displayName && 'ring-sec-500 ring-2',
          ]"
          alt=""
        />
      </div>
      <div class="h-[300px] mt-4">
        <div class="grid grid-flow-row grid-cols-4 gap-1">
          <img
            @click="(currAgent = agent), (currAbility = agent.abilities[0])"
            v-for="agent of filteredAgents"
            :src="agent.displayIcon"
            alt=""
            :class="[
              'h-10 w-10 cursor-pointer',
              currAgent === agent && 'ring-sec-500 ring-2',
            ]"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-flow-row grid-cols-4 gap-1 mt-8">
      <template v-for="ability of currAgent?.abilities">
        <img
          @click="currAbility = ability"
          :src="ability.displayIcon"
          alt=""
          :class="[
            'h-10 w-10 cursor-pointer',
            ability === currAbility && 'ring-sec-500 ring-2',
          ]"
        />
      </template>
    </div>

    <label for="timer" class="font-bold block mb-2 text-center mt-16">
      Timer
    </label>
    <InputNumber
      inputId="timer"
      mode="decimal"
      :maxFractionDigits="2"
      showButtons
      :min="0.1"
      :max="20"
      :step="0.1"
      fluid
      v-model="timer"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, defineEmits } from "vue";
import { useApiStore } from "../../store/apiStore";
import { Agent, Role } from "../../types/typings";
import InputNumber from "primevue/inputnumber";

const apiStore = useApiStore();
const currRole = ref<string>("all");
const filteredAgents = ref<Agent[]>(apiStore.agents);
const currAgent = ref<Agent | null>(null);
const currAbility = ref();
const timer = ref(2.5);
const agentRoles: Role[] = apiStore.agents.reduce(
  (acc: Role[], agent: Agent) => {
    if (agent.role) {
      const roleExists = acc.find(
        (role: Role) => role.displayName === agent?.role?.displayName
      );
      if (!roleExists) {
        acc.push(agent.role);
      }
    }
    return acc;
  },
  [] as Role[]
);

const emit = defineEmits(["selected-data"]);
watch(currRole, (newRole) => {
  if (newRole === "all") {
    filteredAgents.value = apiStore.agents;
  } else {
    filteredAgents.value = apiStore.agents.filter(
      (agent) => agent.role?.displayName === newRole
    );
  }
});

const selectedData = computed(() => {
  return {
    agent: currAgent.value,
    ability: currAbility.value,
    timer: timer.value,
  };
});

watch(
  selectedData,
  (newData) => {
    emit("selected-data", newData);
  },
  { deep: true }
);

onMounted(() => {
  currAgent.value = filteredAgents.value[0];
  currAbility.value = currAgent.value?.abilities[0];
});
</script>

<style scoped></style>
