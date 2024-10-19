<template>
  <div
    class="rounded-full border-transparent border-2 absolute"
    :style="{ width: mesures.mapSize, top: mesures.y, left: mesures.x }"
  >
    <div :style="{ padding: mesures.padding }">
      <div class="relative">
        <img
          :src="map?.displayIcon"
          alt=""
          class="rotate-180"
          @load="updateImgSize"
          ref="imgRef"
        />
        <div
          v-for="participation of lobbyStore.lobby?.participations"
          v-if="gameOnRoll"
          class="absolute top-0 left-0"
          :style="{
          left: `${participation.x * (imgSize! / 400) -10}px`,
          top: `${participation.y * (imgSize! / 400) -10}px`,
        }"
        >
          <img
            :src="
            apiStore.agents.find(
              (agent) => agent.displayName === participation.agent
            )?.abilities.find(
              (ability) => participation.spell === ability.displayName
            )!.displayIcon
          "
            class="h-5 w-5"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApiStore } from "../../store/apiStore";
import { useLobbyStore } from "../../store/lobbyStore";
import { useUserStore } from "../../store/userStore";
import { computed, nextTick, reactive, ref, watch } from "vue";

const lobbyStore = useLobbyStore();
const apiStore = useApiStore();
const userStore = useUserStore();
const map = apiStore.maps.find(
  (map) => map.displayName === lobbyStore.lobby?.map
);
const referenceSizes = {
  width: 20,
  divTop: 3.4,
  divLeft: 0.77,
};

const props = defineProps({
  gameOnRoll: {
    type: Boolean,
    required: true,
  },
});

const imgRef = ref<HTMLElement>();
const imgSize = ref<number | null>(null);

const updateImgSize = () => {
  if (imgRef.value) {
    imgSize.value = imgRef.value.getBoundingClientRect().height;
  }
};
const mesures = reactive({
  mapSize: `${
    referenceSizes.width * userStore.user?.profile.settings.mapSize!
  }%`,
  padding: `${(1 - userStore.user?.profile.settings.mapZoom!) * 50}%`,
  y: `${
    referenceSizes.divTop - (1 - userStore.user?.profile.settings.mapSize!) * 3
  }%`,
  x: `${
    referenceSizes.divLeft -
    (1 - userStore.user?.profile.settings.mapSize!) * 0.3
  }%`,
});

watch(
  () => userStore.user?.profile.settings,
  async (newSettings) => {
    if (newSettings) {
      mesures.mapSize = `${referenceSizes.width * (newSettings.mapSize ?? 1)}%`;
      mesures.padding = `${(1 - (newSettings.mapZoom ?? 1)) * 50}%`;
      mesures.y = `${
        referenceSizes.divTop - (1 - (newSettings.mapSize ?? 1)) * 3
      }%`;
      mesures.x = `${
        referenceSizes.divLeft - (1 - (newSettings.mapSize ?? 1)) * 0.3
      }%`;
    }
    await nextTick();
    updateImgSize();
  },
  { deep: true }
);
</script>

<style scoped></style>
