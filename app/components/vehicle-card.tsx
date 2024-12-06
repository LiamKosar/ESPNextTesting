"use client";
import { ItemWrapper, MaintenanceProcedure, Vehicle } from "../types/response-data";
import { calcColorFromPercentage } from "./dashboard-tab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CircularHighlightButton from "./circle-button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

type VehicleCardProps = {
  vehicle: Vehicle;
  callback?: (item: ItemWrapper) => undefined;
  selectedItem?: ItemWrapper;
  hover?: boolean;
  className?: string;
};

export function VehicleCard({ vehicle, callback = () => {}, selectedItem, hover = true, className = "" }: VehicleCardProps) {
  const isSelected = selectedItem ? selectedItem.type === "vehicle" && selectedItem.item.vehicle_id === vehicle.vehicle_id : false;
  console.log('vehicle at card', vehicle)
  console.log('vehicle numgreen', vehicle.num_green)

  return (

    <Card
      className={cn(hover ? "cursor-pointer" : "", isSelected ? "border-slate-600 border-2 border-double" : "", className)}
      onClick={() => callback({ type: "vehicle", item: vehicle })}
    >
      <CardHeader className={cn("flex flex-row items-center justify-between space-y-0 pb-2")}>
        <CardTitle className="text-sm font-medium">{vehicle.name}</CardTitle>
        {selectedItem ? (
          <CircularHighlightButton callback={callback} data={{ type: "vehicle", item: vehicle }} isHighlighted={isSelected}></CircularHighlightButton>
        ) : (
          <></>
        )}
      </CardHeader>

      <CardContent>
        <div className="mb-2">
          <div className="text-lg font-bold">{vehicle.runtime} hours</div>
          <p className="text-sm text-muted-foreground">Last updated: {new Date(vehicle.date_updated).toLocaleString()}</p>
        </div>

        <Separator className="w-3/4 border-t-2" orientation="horizontal"></Separator>
        <div className="flex flex-wrap gap-4 mt-2">
          {
          
          vehicle.num_red? (
            <div className="flex flex-wrap gap-2">
              <div
                className="w-4 h-4 self-center"
                style={{
                  borderRadius: "50%",
                  backgroundColor: calcColorFromPercentage(100),
                }}
              ></div>
              <p className="text-sm">{vehicle.num_red} top priority</p>
            </div>
          ) : (
            <> </>
          )}
          {vehicle.num_yellow? (
            <div className="flex flex-wrap gap-2">
              <div
                className="w-4 h-4 self-center"
                style={{
                  borderRadius: "50%",
                  backgroundColor: calcColorFromPercentage(70),
                }}
              ></div>
              <p className="text-sm">{vehicle.num_yellow} medium priority</p>
            </div>
          ) : (
            <> </>
          )}
          {
          vehicle.num_green ? (
            <div className="flex flex-wrap gap-2">
              <div
                className="w-4 h-4 self-center"
                style={{
                  borderRadius: "50%",
                  backgroundColor: calcColorFromPercentage(0),
                }}
              ></div>
              <p className="text-sm">{vehicle.num_green} low priority</p>
            </div>
          ) : (
            <> </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
