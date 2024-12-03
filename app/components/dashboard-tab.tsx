"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Vehicle,
  GetRequestResponse,
  MaintenanceProcedure,
  Device,
  ItemWrapper,
} from "../types/response-data";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehicleDeviceCardList } from "./vehicle-card-list";
import { VehicleDetails } from "./vehicle-details";
import { DeviceCardList } from "./device-card-list";
import { DeviceDetails } from "./device-details";

type DashboardTabProps = {
  vehicles: Vehicle[],
  devices: Device[]
};

export const calcColorFromPercentage = (percentage: number): string => {
  if (percentage < 50) return '#69ff5c';
  else if (50 <= percentage && percentage < 85) return '#ffff69'
  else return '#f56c6c'
}


const updateVehicleMacAddress = async (vehicle_id: number, mac_address: string) => {

  const body = {
    vehicle_id: vehicle_id,
    mac_address: mac_address,
  };
  
  try {
    const response = await fetch("/api/vehicle/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      alert("Error updating vehicle.");
      console.error(await response.text());
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};



export function DashboardTab({ vehicles, devices }: DashboardTabProps) {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [vehicleToMaintenanceProcedures, setVehicleToMaintenanceProcedures] =
  useState<Record<number, MaintenanceProcedure[]>>({});
  let item = localStorage.getItem('selectedItem');

  const [connectedDevice, setConnectedDevice] = useState<Device | undefined>(
  );


  const [selectedItem, setSelectedItem] = useState<ItemWrapper>({type: "empty", item: null});


  function updateSelectedItem(item: ItemWrapper): undefined {
    if (item != null) {
      setSelectedItem(item)
    }
  }

  const findVehicle = (mac_address: string): Vehicle | undefined => {
    return vehicles.find(vehicle => vehicle.mac_address === mac_address);
  }

  const findDevice = (mac_address: string): Device | undefined => {
    let device= devices.find(devices => devices.mac_address === mac_address);
    console.log("device", device)
    return device;
  }

  const getUnnoccupiedDevices = (): Device[] => {
    return devices.filter((device) => {
        const matchingVehicle = findVehicle(device.mac_address);
        return matchingVehicle == null;
    })
  }


  // Fetch all maintenance procedures
  useEffect(() => {
    vehicles.forEach((vehicle) => {
      fetch(`/api/maintenance-procedure/get?vehicle_id=${vehicle.vehicle_id}`)
        .then((response) => response.json())
        .then((data: GetRequestResponse) => {
          const maintenanceProcedures = JSON.parse(data.data);

          let procedures = maintenanceProcedures;
          procedures.forEach((procedure: MaintenanceProcedure) => {
            procedure.percentage = (procedure.current_interval/procedure.interval) * 100;
          });
          procedures.sort((a: MaintenanceProcedure, b: MaintenanceProcedure) => {
            if (b.percentage && a.percentage) {
            return b.percentage - a.percentage;
          }
            return -1;
          });

          vehicle.num_green = procedures.filter((p: MaintenanceProcedure) => ((p.percentage || 0) < 50)).length
          vehicle.num_yellow = procedures.filter((p: MaintenanceProcedure) => ((p.percentage || 0) >= 50 && (p.percentage || 0) < 85)).length
          vehicle.num_red = procedures.filter((p: MaintenanceProcedure) => ((p.percentage || 0) >= 85)).length
          setVehicleToMaintenanceProcedures((prev) => ({
            ...prev,
            [vehicle.vehicle_id]: procedures,
          }));


        });
    });
  }, [vehicles]);
  return (
    <div className="grid auto-rows-auto gap-4 md:grid-cols-1 lg:grid-cols-2 overscroll-contain">
      
      <div>
      <Card style={{height: "90vh"}}>
      <Tabs defaultValue="vehicles" className="w-full bg-transparent">
      <TabsList style={{height: "5vh"}} className="grid w-full grid-cols-6 bg-transparent m-3">
        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        <TabsTrigger value="devices">Devices</TabsTrigger>
      </TabsList>
      <TabsContent value="vehicles">
      <VehicleDeviceCardList vehicles={vehicles} callback={updateSelectedItem} selectedItem={selectedItem}></VehicleDeviceCardList>
      </TabsContent>
      <TabsContent value="devices">
      <DeviceCardList devices={devices} callback={updateSelectedItem} selectedItem={selectedItem}></DeviceCardList>
      </TabsContent>
    </Tabs>
    </Card>
      </div>
      
      <div>
        {selectedItem.type === "empty" ? (
          <h1>Nothing selected</h1>
        ) : 
        selectedItem.type === "vehicle" ? <VehicleDetails callback={async (item: ItemWrapper)=> {
          updateSelectedItem(item);
          await updateVehicleMacAddress(item.item.vehicle_id, item.item.mac_address);
        }} unnoccupiedDevices={getUnnoccupiedDevices()}  connectedDevice={findDevice(selectedItem.item.mac_address)} vehicle={selectedItem.item} maintenanceProcedures={vehicleToMaintenanceProcedures[selectedItem.item.vehicle_id]}></VehicleDetails>
        : <DeviceDetails device={selectedItem.item} vehicle={findVehicle(selectedItem.item.mac_address)}></DeviceDetails>
        }
      </div>
    </div>
  );
}
