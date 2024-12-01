import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Device,
  ItemWrapper,
  Vehicle,
} from "../types/response-data";
import CircularHighlightButton from "./circle-button";
import { calcColorFromPercentage } from "./dashboard-tab";

type DeviceCardListProps = {
    devices: Device[],
    callback: (item: ItemWrapper) => undefined,
    selectedItem: ItemWrapper
}

export function DeviceCardList({ devices, callback, selectedItem }: DeviceCardListProps) {

    return (
        <div className="p-6 grid gap-4">
        {devices.map((device: Device) => (
          <Card key={device.mac_address}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {device.mac_address}
              </CardTitle>
              <div></div>
              <CircularHighlightButton
                callback={callback}
                data={{type: "device", item: device}}
                isHighlighted={
                  selectedItem.type === "device" &&
                  selectedItem.item.mac_address === device.mac_address
                }
              ></CircularHighlightButton>
            </CardHeader>
            <CardContent>

                <div><div className="text-lg font-bold">Version: {device.version}</div>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(device.date_updated).toLocaleString()}
              </p></div>
              
            </CardContent>
          </Card>
        ))}
      </div>
    );
}
