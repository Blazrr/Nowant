import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { Agent, Map } from "../types/typings";

export const useApiStore = defineStore("api", () => {
  const maps = ref<Map[]>([]);
  const agents = ref<Agent[]>([]);
  const fetchValorantApi = async (toFetch: "maps" | "agents") => {
    console.log("fetching");
    const response = await fetch(`https://valorant-api.com/v1/${toFetch}`);
    const data = await response.json();
    toFetch === "maps"
      ? (maps.value = data.data.filter(
          (map) =>
            map.tacticalDescription === "A/B Sites" ||
            map.tacticalDescription === "A/B/C Sites"
        ))
      : (agents.value = data.data);
  };
  onMounted(() => {
    const toFetch = ["maps", "agents"] as const;
    for (const dataToFetch of toFetch) {
      fetchValorantApi(dataToFetch);
    }
  });
  return { maps, agents };
});
