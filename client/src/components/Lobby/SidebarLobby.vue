<template>
  <div class="p-4 flex h-screen flex-col fixed w-[189px]">
    <RouterLink to="/" class="text-xl font-extrabold text-sec-500 font-orbitron"
      >NOWANT</RouterLink
    >
    <div class="mt-16">
      <span class="font-extrabold font-orbitron text-xl"> Participations</span>
      <div
        class="flex flex-col space-y-4 mt-5 max-h-[500px] overflow-y-scroll no-scrollbar p-1"
      >
        <div
          v-for="participation of lobby?.participations"
          class="flex flex-col ring-1 ring-sec-500 p-2 rounded-lg relative"
        >
          <i
            v-if="participation.user.id === userStore?.user?.id"
            @click="deleteParticipation(participation)"
            class="absolute top-2 right-2 pi pi-times-circle cursor-pointer"
          ></i>
          <div class="flex items-center space-x-2 text-sm">
            <img
              :src="
                apiStore.agents
                  .find((agent) => agent.displayName === participation.agent)
                  ?.abilities.find(
                    (ability) => participation.spell === ability.displayName
                  )!.displayIcon
              "
              alt=""
              class="h-6 w-6 rounded-full ring-1 ring-sec-500 p-1"
            />
            <p class="font-orbitron">
              {{
                apiStore.agents.find(
                  (agent) => agent.displayName === participation.agent
                )?.displayName
              }}
              <br />
              at {{ participation.timer }}s
            </p>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <img
              :src="`${env.VITE_S3_URL}/${participation.user.profile.picture}`"
              alt=""
              class="h-6 w-6 rounded-full"
            />
            <p class="font-orbitron">By {{ participation.user.username }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RouterLink } from "vue-router";
import { Lobby, Participation } from "../../types/typings";
import { useApiStore } from "../../store/apiStore";
import { useUserStore } from "../../store/userStore";

const apiStore = useApiStore();
const userStore = useUserStore();

const props = defineProps({
  lobby: {
    type: Object as PropType<Lobby>,
    required: false,
  },
});

const deleteParticipation = async (participation: Participation) => {
  try {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/participations/delete/${
        participation?.id
      }`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.token}`,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
};

const env = import.meta.env;
</script>

<style scoped></style>
