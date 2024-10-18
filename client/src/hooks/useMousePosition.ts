import { onMounted, onUnmounted, ref, Ref } from "vue";

export default function useMousePosition(mapRef: Ref<HTMLElement | null>) {
  const x = ref(0);
  const y = ref(0);

  const updateMousePosition = (event: MouseEvent) => {
    if (mapRef.value) {
      const rect = mapRef.value.getBoundingClientRect();
      x.value = event.clientX - rect.left;
      y.value = event.clientY - rect.top;
    }
  };

  const addEventListener = () => {
    if (mapRef.value) {
      mapRef.value.addEventListener("mousemove", updateMousePosition);
    }
  };

  const removeEventListener = () => {
    if (mapRef.value) {
      mapRef.value.removeEventListener("mousemove", updateMousePosition);
    }
  };

  onMounted(() => {
    addEventListener();
  });

  onUnmounted(() => {
    removeEventListener();
  });

  return { x, y };
}
