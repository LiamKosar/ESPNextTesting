"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info } from "lucide-react";
import useSWR from "swr";
import {
  Vehicle,
  GetRequestResponse,
  DashboardTabProps,
  MaintenanceProcedure,
} from "../types/response-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import CircularHighlightButton from "./circle-button";
import { Progress } from "@/components/ui/progress"

const fetcher = (url: string): Promise<GetRequestResponse> =>
  fetch(url).then((res) => res.json());

export function DashboardTab({ vehicles }: DashboardTabProps) {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [vehicleToMaintenanceProcedures, setVehicleToMaintenanceProcedures] =
    useState<Record<number, MaintenanceProcedure[]>>({});

  const [selectedItem, setSelectedItem] = useState<Vehicle | null>(null);

  function updateSelectedItem(vehicle: Vehicle): undefined {
    if (vehicle === null || vehicle.vehicle_id !== selectedItem?.vehicle_id) {
      setSelectedItem(vehicle);
    }
  }

  const calcColorFromPercentage = (percentage: number): string => {
    if (percentage < 50) return '#69ff5c';
    else if (50 <= percentage && percentage < 85) return '#ffff69'
    else return '#f56c6c'
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
    <div className="grid auto-rows-auto gap-4 md:grid-cols-1 lg:grid-cols-2">
      <div>
      <Card className="p-6 grid gap-4">
        {vehicles.map((vehicle: Vehicle) => (
          <Card key={vehicle.vehicle_id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {vehicle.name}
              </CardTitle>
              <div></div>
              <CircularHighlightButton
                callback={updateSelectedItem}
                data={vehicle}
                isHighlighted={
                  selectedItem !== null &&
                  selectedItem.vehicle_id === vehicle.vehicle_id
                }
              ></CircularHighlightButton>
            </CardHeader>
            <CardContent>

                <div><div className="text-lg font-bold">{vehicle.runtime} hours</div>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(vehicle.date_updated).toLocaleString()}
              </p></div>
              <div className="flex flex-wrap gap-4 mt-2">{vehicle.num_red ? <div className="flex flex-wrap gap-2">
                <div className="w-4 h-4 self-center" style={{borderRadius: "50%", backgroundColor: calcColorFromPercentage(100)}}></div>
                <p className="text-sm">{vehicle.num_red} top priority</p>
              </div> :<> </>}
              {vehicle.num_yellow ? <div className="flex flex-wrap gap-2">
                <div className="w-4 h-4 self-center" style={{borderRadius: "50%", backgroundColor: calcColorFromPercentage(70)}}></div>
                <p className="text-sm">{vehicle.num_yellow} medium priority</p>
              </div> :<> </>}
              {vehicle.num_green ? <div className="flex flex-wrap gap-2">
                <div className="w-4 h-4 self-center" style={{borderRadius: "50%", backgroundColor: calcColorFromPercentage(0)}}></div>
                <p className="text-sm">{vehicle.num_green} low priority</p>
              </div> :<> </>}
              </div>
              
            </CardContent>
          </Card>
        ))}
      </Card>
      </div>
      <div>
        {selectedItem === null ? (
          <h1>Nothing selected</h1>
        ) : (
          <Card className="p-1 sticky">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">
                {selectedItem.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(selectedItem.date_updated).toLocaleDateString()}
                {/* Last updated: {vehicle.date_updated} */}
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-md font-bold mb-2">Total Runtime: {selectedItem.runtime}hrs</div>
             

              {/* <Collapsible>
                <CollapsibleTrigger className="flex items-center text-sm text-blue-500 hover:text-blue-700">
                  Maintenance Procedures
                  <ChevronDown className="h-4 w-4 ml-1" />
                </CollapsibleTrigger> */}
                <div className="text-blue-500">Maintenance Procedures</div>
                <div className="mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  {(
                    vehicleToMaintenanceProcedures[selectedItem.vehicle_id] ?? []
                  ).map((procedure: MaintenanceProcedure) => (
                    <Card key={procedure.id} className="bg-muted">
                    <CardHeader className="text-center pb-2">
                      <CardTitle>{procedure.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-card p-3 rounded-md">
                        <p className="text-sm">{procedure.description}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Current: <span className="font-bold">{procedure.current_interval}</span></span>
                          <span>Interval: <span className="font-bold">{procedure.interval}</span></span>
                        </div>
                        <Progress value={procedure.percentage}  bgColor={calcColorFromPercentage(procedure.percentage || 0)} className="w-full" />
                      </div>
                    </CardContent>
                  </Card>
                  ))}
                </div>
              {/* </Collapsible> */}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
