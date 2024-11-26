import { useEffect, useState } from "react";
import useSWR from "swr";
import { Vehicle, MaintenanceProcedure, GetRequestResponse } from "../types/response-data";
const fetcher = (url: string): Promise<GetRequestResponse> =>
    fetch(url).then((res) => res.json());
export const useVehicleMaintenanceProcedures = (
  vehicles: Vehicle[]
): Record<number, MaintenanceProcedure[]> => {
  const [proceduresMap, setProceduresMap] = useState<
    Record<number, MaintenanceProcedure[]>
  >({});

  vehicles.forEach((vehicle) => {
    const { data } = useSWR<GetRequestResponse>(
      `/api/maintenance-procedure/get?vehicle_id=${vehicle.vehicle_id}`,
      fetcher
    );

    useEffect(() => {
      if (data) {
        const maintenanceProcedures = JSON.parse(data.data);
        setProceduresMap((prev) => ({
          ...prev,
          [vehicle.vehicle_id]: maintenanceProcedures,
        }));
      }
    }, [data, vehicle.vehicle_id]);
  });

  return proceduresMap;
};
