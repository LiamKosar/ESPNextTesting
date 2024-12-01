import { ItemWrapper, Vehicle } from "../types/response-data";
import { calcColorFromPercentage } from "./dashboard-tab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CircularHighlightButton from "./circle-button";
import { cn } from "@/lib/utils";

type VehicleCardProps = {
  vehicle: Vehicle;
  callback?: (item: ItemWrapper) => undefined;
  selectedItem?: ItemWrapper;
};

export function VehicleCard({
  vehicle,
  callback = () => {},
  selectedItem,
}: VehicleCardProps) {
  const isSelected = selectedItem
    ? selectedItem.type === "vehicle" &&
      selectedItem.item.vehicle_id === vehicle.vehicle_id
    : false;
  return (
    <Card
      className={cn(
        "cursor-pointer",
        isSelected ? "border-slate-600 border-2 border-double" : ""
      )}
      onClick={() => callback({ type: "vehicle", item: vehicle })}
    >
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between space-y-0 pb-2"
        )}
      >
        <CardTitle className="text-sm font-medium">{vehicle.name}</CardTitle>
        <div></div>
        {selectedItem ? (
          <CircularHighlightButton
            callback={callback}
            data={{ type: "vehicle", item: vehicle }}
            isHighlighted={isSelected}
          ></CircularHighlightButton>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardContent>
        <div>
          <div className="text-lg font-bold">{vehicle.runtime} hours</div>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(vehicle.date_updated).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          {vehicle.num_red ? (
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
          {vehicle.num_yellow ? (
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
          {vehicle.num_green ? (
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
