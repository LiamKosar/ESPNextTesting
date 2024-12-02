import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Device,
  ItemWrapper,
  Vehicle,
} from "../types/response-data";
import CircularHighlightButton from "./circle-button";
import { calcColorFromPercentage } from "./dashboard-tab";
import { DeviceCard } from "./device-card";

type DeviceCardListProps = {
    devices: Device[],
    callback: (item: ItemWrapper) => undefined,
    selectedItem: ItemWrapper
}

export function DeviceCardList({ devices, callback, selectedItem }: DeviceCardListProps) {
 
    return (
        <div className="p-6 grid gap-4">
        {devices.map((device: Device) => (
          <DeviceCard key={device.mac_address} device={device} callback={callback} selectedItem={selectedItem}></DeviceCard>
        ))}
      </div>
    );
}
