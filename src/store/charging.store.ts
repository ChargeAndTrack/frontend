import { getSocket } from "@/services/socket";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useChargingStore = defineStore('charging', () => {
    const inCharge = ref<{ carId: string, chargingStationId: string }[]>([]);

    function add(carId: string, chargingStationId: string) {
        inCharge.value.push({ carId, chargingStationId });
        localStorage.setItem("inCharge", JSON.stringify(inCharge.value));
    }

    function remove(carId: string, chargingStationId: string) {
        const itemIndex = inCharge.value.findIndex(c => c.carId === carId && c.chargingStationId === chargingStationId);
        if (itemIndex !== -1) {
            inCharge.value.splice(itemIndex, 1);
        }
        localStorage.setItem("inCharge", JSON.stringify(inCharge.value));
    }

    function restoreSession() {
        const savedInCharge = localStorage.getItem("inCharge");
        if (savedInCharge) {
            inCharge.value = JSON.parse(savedInCharge);
            inCharge.value.forEach(item => getSocket().emit('start-recharge', item.carId, item.chargingStationId));
        }
    }

    return { inCharge, add, remove, restoreSession };
});
