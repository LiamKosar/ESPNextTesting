import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ItemWrapper,
  Vehicle,
} from "../types/response-data";
import CircularHighlightButton from "./circle-button";
import { calcColorFromPercentage } from "./dashboard-tab";
import { VehicleCard } from "./vehicle-card";
import { ScrollArea } from "@/components/ui/scroll-area"

type VehicleCardListProps = {
    vehicles: Vehicle[],
    callback: (item: ItemWrapper) => undefined,
    selectedItem: ItemWrapper
}

export function VehicleDeviceCardList({ vehicles, callback, selectedItem }: VehicleCardListProps) {

    return (
        <div style={{maxHeight: "400px"}} className="p-6 grid gap-4 overflow-scroll overscroll-none">
        {vehicles.map((vehicle: Vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} callback={callback} selectedItem={selectedItem}></VehicleCard>
        ))}
      </div>
    );
}
