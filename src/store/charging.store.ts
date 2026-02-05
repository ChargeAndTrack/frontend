import { getSocket } from "@/services/socket";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useChargingStore = defineStore('charging', () => {
    const inCharge = ref<{ carId: string, chargingStationId: string }[]>([]);

    function add(carId: string, chargingStationId: string) {
        if (!inCharge.value.some(item => item.carId === carId && item.chargingStationId === chargingStationId )) {
            inCharge.value.push({ carId, chargingStationId });
            localStorage.removeItem("inCharge");
            localStorage.setItem("inCharge", JSON.stringify(inCharge.value));
        }
    }

    function remove(carId: string) {
        const itemIndex = inCharge.value.findIndex(c => c.carId === carId);
        if (itemIndex !== -1) {
            inCharge.value.splice(itemIndex, 1);
        }
        localStorage.removeItem("inCharge");
        localStorage.setItem("inCharge", JSON.stringify(inCharge.value));
    }

    function restoreSession() {
        const savedInCharge = localStorage.getItem("inCharge");
        if (savedInCharge) {
            inCharge.value = JSON.parse(savedInCharge);
            inCharge.value.forEach(item => getSocket().emit('start-recharge', item.carId));
        }
    }

    return { inCharge, add, remove, restoreSession };
});
