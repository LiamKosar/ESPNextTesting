import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Device, MaintenanceProcedure, Vehicle } from "../types/response-data";
import { VehicleCard } from "./vehicle-card";
import { Separator } from "@/components/ui/separator";

type DeviceDetailsProps = {
  device: Device;
  vehicle?: Vehicle;
};

export function DeviceDetails({ device, vehicle }: DeviceDetailsProps) {
  return (
    <Card className="p-1 sticky">
      <CardHeader className="flex items-center space-y-0">
        <CardTitle className="text-lg font-medium justify-self-center">
          Model: Beta Testing Device
        </CardTitle>
        {/* <p className="text-sm text-muted-foreground">
          Last updated:{" "}
          {new Date(device.date_updated).toLocaleDateString()}
        </p> */}
      </CardHeader>
      <CardContent>
        <div className="mt-2 mb-4">
          <div className="flex flex-row items-center justify-between space-y-0">
            <p>MAC Address</p>
            <p className="text-sm text-muted-foreground">
              {device.mac_address}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between space-y-0">
            <p>Last Connected</p>
            <p className="text-sm text-muted-foreground">
              {device.date_updated}
            </p>
          </div>

          <div className="flex flex-row items-center justify-between space-y-0">
            <p>Version</p>
            <p className="text-sm text-muted-foreground">{device.version}</p>
          </div>
        </div>

        <Separator className="border-t-2" orientation="horizontal"></Separator>
        {vehicle ? (
          <div className="my-4">
            <VehicleCard hover={false} vehicle={vehicle}></VehicleCard>
          </div>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}
