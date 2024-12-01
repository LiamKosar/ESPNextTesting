import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceProcedure, Vehicle } from "../types/response-data";
import CircularHighlightButton from "./circle-button";
import { calcColorFromPercentage } from "./dashboard-tab";
import { Progress } from "@/components/ui/progress";

type VehicleDetailsProps = {
    vehicle: Vehicle,
    maintenanceProcedures: MaintenanceProcedure[]
}

export function VehicleDetails({vehicle, maintenanceProcedures}: VehicleDetailsProps) {
  return (
    <Card className="p-1 sticky">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-medium">
          {vehicle.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Last updated:{" "}
          {new Date(vehicle.date_updated).toLocaleDateString()}
          {/* Last updated: {vehicle.date_updated} */}
        </p>
      </CardHeader>
      <CardContent>
        <div className="text-md font-bold mb-2">
          Total Runtime: {vehicle.runtime}hrs
        </div>
        <div className="text-blue-500">Maintenance Procedures</div>
        <div className="mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {maintenanceProcedures.map(
            (procedure: MaintenanceProcedure) => (
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
            )
          )}
        </div>
        {/* </Collapsible> */}
      </CardContent>
    </Card>
  );
}
