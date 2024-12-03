import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Device, ItemWrapper, MaintenanceProcedure, Vehicle } from "../types/response-data";
import { calcColorFromPercentage } from "./dashboard-tab";
import { Progress } from "@/components/ui/progress";
import { DeviceCard } from "./device-card";
import { toast } from "sonner"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { ChevronDown, Info } from "lucide-react";
import { SearchBox, SearchBoxItem } from "./search-box";
import React, { useState } from "react";
import DeleteButton from "./delete-button";
import { Separator } from "@/components/ui/separator";

type VehicleDetailsProps = {
  vehicle: Vehicle;
  maintenanceProcedures: MaintenanceProcedure[];
  connectedDevice?: Device;
  unnoccupiedDevices: Device[];
  callback: (item: ItemWrapper) => Promise<void>;
};

export function VehicleDetails({
  vehicle,
  maintenanceProcedures,
  connectedDevice,
  unnoccupiedDevices, 
  callback,
}: VehicleDetailsProps) {


 

  const mapDevicesToSearchBoxItems = (): SearchBoxItem<Device>[] => {
    const result: SearchBoxItem<Device>[] = [];

    unnoccupiedDevices.forEach((device) => {
      result.push({
        name: device.mac_address,
        value: device.mac_address,
        item: device,
      });
    });

    return result;
  };

  const updateVehicleDeviceCallback = (item: Device): undefined => {
    vehicle.mac_address = item.mac_address;
    callback({type: "vehicle", item: vehicle})
    toast("Device Connected", {
      description: `You have successfully connected ${vehicle.name} to a device`
    })
  };

  const deleteVehichleDeviceConnection = (): undefined => {
    vehicle.mac_address = "delete";
    callback({type: "vehicle", item: vehicle})
    toast("Device Disconnected", {
      description: `You have successfully disconnected ${vehicle.name} from a device`
    })
  }

  return ( 
    <Card className="p-1" style={{height: "90vh"}}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-medium">{vehicle.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date(vehicle.date_updated).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="text-md font-bold mb-2">
          Total Runtime: {vehicle.runtime}hrs
        </div>

        <Collapsible className="my-4" defaultOpen={true}>
          <CollapsibleTrigger className="flex items-center text-sm text-blue-500 hover:text-blue-700">
            Maintenance Procedures
            <ChevronDown className="h-4 w-4 ml-1" />
          </CollapsibleTrigger>
          <CollapsibleContent style={{maxHeight: "45vh"}} className="my-2 mt-3 px-3 grid gap-4 md:grid-cols-2 lg:grid-cols-2 overflow-scroll overscroll-none">
            {maintenanceProcedures?.map((procedure: MaintenanceProcedure) => (
              <Card key={procedure.id} className="bg-muted p-0">
                <CardHeader className="text-center pb-2">
                  <CardTitle>{procedure.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="bg-card p-2 rounded-md">
                    <p className="text-sm">{procedure.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        Current:{" "}
                        <span className="font-bold">
                          {procedure.current_interval.toFixed(1)}hrs
                        </span>
                      </span>
                      <span>
                        Interval:{" "}
                        <span className="font-bold">
                          {procedure.interval.toFixed(1)}hrs
                        </span>
                      </span>
                    </div>
                    <Progress
                      value={procedure.percentage}
                      bgColor={calcColorFromPercentage(
                        procedure.percentage || 0
                      )}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CollapsibleContent>
        </Collapsible>
        <Separator className="border-t-2" orientation="horizontal"></Separator>
        {connectedDevice ? (
          <div className="relative my-4">
            <span className="absolute flex justify-end p-4 top-0 right-0"><DeleteButton onClick={() => deleteVehichleDeviceConnection()}></DeleteButton></span>
            <DeviceCard hover={false} device={connectedDevice}></DeviceCard>
          </div>
        ) : (
          <div className="justify-items-center justify-center mt-3 mb-1 py-2 ">
            <div className="self-center">
            <SearchBox<Device>
              callback={updateVehicleDeviceCallback}
              items={mapDevicesToSearchBoxItems()}
              name="Connect a device..."
              searchFieldDefault="Search devices..."

            ></SearchBox></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
