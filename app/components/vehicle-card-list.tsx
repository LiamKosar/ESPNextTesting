import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ItemWrapper,
  Vehicle,
} from "../types/response-data";
import CircularHighlightButton from "./circle-button";
import { calcColorFromPercentage } from "./dashboard-tab";
import { VehicleCard } from "./vehicle-card";

type VehicleCardListProps = {
    vehicles: Vehicle[],
    callback: (item: ItemWrapper) => undefined,
    selectedItem: ItemWrapper
}

export function VehicleDeviceCardList({ vehicles, callback, selectedItem }: VehicleCardListProps) {

    return (
        <div className="p-6 grid gap-4">
        {vehicles.map((vehicle: Vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} callback={callback} selectedItem={selectedItem}></VehicleCard>
        ))}
      </div>
    );
}
