import { ItemWrapper, Device } from "../types/response-data";
import { calcColorFromPercentage } from "./dashboard-tab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CircularHighlightButton from "./circle-button";
import { cn } from "@/lib/utils";

type DeviceCardProps = {
  device: Device;
  callback?: (item: ItemWrapper) => undefined;
  selectedItem?: ItemWrapper;
  hover?: boolean;
};

export function DeviceCard({
  device,
  callback = () => {},
  selectedItem,
  hover = true
}: DeviceCardProps) {
  const isSelected = selectedItem
    ? selectedItem.type === "device" &&
      selectedItem.item.mac_address === device.mac_address
    : false;

  return (
    <Card
      className={cn(
        hover ? "cursor-pointer" : "",
        isSelected ? "border-slate-600 border-2 border-double" : ""
      )}
      onClick={() => callback({ type: "device", item: device })}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {device.mac_address}
        </CardTitle>
        <div></div>
        {selectedItem ? (
          <CircularHighlightButton
            callback={callback}
            data={{ type: "device", item: device }}
            isHighlighted={isSelected}
          ></CircularHighlightButton>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardContent>
        <div>
          <div className="text-lg font-bold">Version: {device.version}</div>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(device.date_updated).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
