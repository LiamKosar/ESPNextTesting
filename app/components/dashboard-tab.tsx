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
import { useState, useEffect} from 'react'
import { useVehicleMaintenanceProcedures } from "../custom-hooks/hook";

const fetcher = (url: string): Promise<GetRequestResponse> =>
  fetch(url).then((res) => res.json());

export function DashboardTab({ vehicles }: DashboardTabProps) {
  // const { data, error } = useSWR<GetRequestResponse>('/api/vehicle/get', fetcher)
  // console.log(data?.data)
  // let vehicles: Vehicle[] | null = null;
  // if (data) {
  //   vehicles= JSON.parse(data.data);
  //   vehicles?.forEach((vehicle) => {
  //     console.log(`Vehicle Name: ${vehicle.name}, Runtime: ${vehicle.runtime}`);
  //   });
  // }
  const [openDialog, setOpenDialog] = useState<number | null>(null)
  // const vehicleToMaintenanceProcedures: Record<number, MaintenanceProcedure[]> =
  //   {};

  // vehicles.forEach((vechicle: Vehicle) => {
  //   const { data, error } = useSWR<GetRequestResponse>(
  //     `/api/maintenance-procedure/get?vehicle_id=${vechicle.vehicle_id}`,
  //     fetcher
  //   );
  //   let maintenanceProcedures: MaintenanceProcedure[] | null = null;
  //   if (data) {
  //     maintenanceProcedures = JSON.parse(data.data);
  //     if (maintenanceProcedures)
  //       vehicleToMaintenanceProcedures[vechicle.vehicle_id] =
  //         maintenanceProcedures;
  //   }
  // });
  const vehicleToMaintenanceProcedures = useVehicleMaintenanceProcedures(vehicles);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {vehicles.map((vehicle: Vehicle) => (
        <Card key={vehicle.vehicle_id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {vehicle.name}
            </CardTitle>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg> */}
            <svg
              fill="#8f8f8f"
              version="1.1"
              id="Capa_1"
              width="40px"
              height="40px"
              viewBox="-3.14 -3.14 37.73 37.73"
              stroke="#8f8f8f"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="0.18867"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M7.592,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.768,0,3.203-1.434,3.203-3.204 S9.36,16.86,7.592,16.86z M7.592,21.032c-0.532,0-0.968-0.434-0.968-0.967s0.436-0.967,0.968-0.967 c0.531,0,0.966,0.434,0.966,0.967S8.124,21.032,7.592,21.032z"></path>{" "}
                    <path d="M30.915,17.439l-0.524-4.262c-0.103-0.818-0.818-1.418-1.643-1.373L27.6,11.868l-3.564-3.211 c-0.344-0.309-0.787-0.479-1.249-0.479l-7.241-0.001c-1.625,0-3.201,0.555-4.468,1.573l-4.04,3.246l-5.433,1.358 c-0.698,0.174-1.188,0.802-1.188,1.521v1.566C0.187,17.44,0,17.626,0,17.856v2.071c0,0.295,0.239,0.534,0.534,0.534h3.067 c-0.013-0.133-0.04-0.26-0.04-0.396c0-2.227,1.804-4.029,4.03-4.029s4.029,1.802,4.029,4.029c0,0.137-0.028,0.264-0.041,0.396 h8.493c-0.012-0.133-0.039-0.26-0.039-0.396c0-2.227,1.804-4.029,4.029-4.029c2.227,0,4.028,1.802,4.028,4.029 c0,0.137-0.026,0.264-0.04,0.396h2.861c0.295,0,0.533-0.239,0.533-0.534v-1.953C31.449,17.68,31.21,17.439,30.915,17.439z M20.168,12.202l-10.102,0.511L12,11.158c1.051-0.845,2.357-1.305,3.706-1.305h4.462V12.202z M21.846,12.117V9.854h0.657 c0.228,0,0.447,0.084,0.616,0.237l2.062,1.856L21.846,12.117z"></path>{" "}
                    <path d="M24.064,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.769,0,3.203-1.434,3.203-3.204 S25.833,16.86,24.064,16.86z M24.064,21.032c-0.533,0-0.967-0.434-0.967-0.967s0.434-0.967,0.967-0.967 c0.531,0,0.967,0.434,0.967,0.967S24.596,21.032,24.064,21.032z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{vehicle.runtime} hours</div>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(vehicle.date_updated).toLocaleString()}
              {/* Last updated: {vehicle.date_updated} */}
            </p>
            <Collapsible>
              <CollapsibleTrigger className="flex items-center text-sm text-blue-500 hover:text-blue-700">
                Maintenance Procedures
                <ChevronDown className="h-4 w-4 ml-1" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {(vehicleToMaintenanceProcedures[vehicle.vehicle_id] ?? []).map(
                  (procedure: MaintenanceProcedure) => (
                    <Card key={procedure.id} className="bg-muted">
                      <CardHeader className="py-2 px-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium">
                            {procedure.name}
                          </CardTitle>
                          <Dialog
                            open={openDialog == procedure.id}
                            onOpenChange={(isOpen) =>
                              setOpenDialog(isOpen ? procedure.id : null)
                            }
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-0">
                                <Info className="h-4 w-4" />
                                <span className="sr-only">
                                  View details for {procedure.name}
                                </span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{procedure.name}</DialogTitle>
                              </DialogHeader>
                              <p>{procedure.description}</p>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <p className="text-xs text-muted-foreground">
                          Set Interval: {procedure.interval}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Current Interval: {procedure.current_interval}
                        </p>
                      </CardContent>
                    </Card>
                  )
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
