<template>
  <div>
    <MultiSelect
      v-model="selectedMaps"
      display="chip"
      :options="apiStore.maps"
      optionLabel="displayName"
      filter
      placeholder="Select Maps"
      :maxSelectedLabels="3"
      class="w-36"
    />
  </div>
</template>

<script setup lang="ts">
import MultiSelect from "primevue/multiselect";
import { ref, watch } from "vue";
import { Map } from "../../types/typings";
import { useApiStore } from "../../store/apiStore";

const selectedMaps = ref();
const apiStore = useApiStore();
const emit = defineEmits(["maps-filtered"]);

watch(selectedMaps, (value) => {
  emit("maps-filtered", value);
});
</script>

<style scoped></style>
