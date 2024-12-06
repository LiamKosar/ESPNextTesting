import {
  ItemWrapper,
  Vehicle,
} from "../types/response-data";
import { VehicleCard } from "./vehicle-card";

type VehicleCardListProps = {
    vehicles: Vehicle[],
    callback: (item: ItemWrapper) => undefined,
    selectedItem: ItemWrapper
}

export function VehicleDeviceCardList({ vehicles, callback, selectedItem }: VehicleCardListProps) {
    console.log('vehicles at list', vehicles)
    return (
        <div className="p-6 grid gap-4 overflow-scroll overscroll-contain" style={{height: "75vh"}}>
        {vehicles.map((vehicle: Vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} callback={callback} selectedItem={selectedItem}></VehicleCard>
        ))}
      </div>
    );
}
