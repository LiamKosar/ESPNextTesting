import useSWR, { mutate } from "swr";
import { Vehicle, GetRequestResponse, MaintenanceProcedure } from "../types/response-data";
import { useMemo } from "react";

const fetcher = (url: string): Promise<GetRequestResponse> => fetch(url).then((res) => res.json());

const maintenanceFetcher = async (url: string): Promise<MaintenanceProcedure[]> => {
  const response = await fetch(url);
  const data: GetRequestResponse = await response.json();
  const procedures: MaintenanceProcedure[] = JSON.parse(data.data);
  
  procedures.forEach((procedure) => {
    procedure.percentage = (procedure.current_interval / procedure.interval) * 100;
  });
  
  return procedures.sort((a, b) => ((b.percentage || 0) - (a.percentage || 0)));
};

export const useVehicles = () => {
  // Main vehicles fetch
  const { data: vehiclesData, error: vehiclesError, mutate: mutateVehicles } = useSWR<GetRequestResponse>(
    "/api/vehicle/get", 
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 0
    }
  );

  // Parse vehicles first
  const parsedVehicles = useMemo(() => {
    if (!vehiclesData?.data) return null;
    try {
      return JSON.parse(vehiclesData.data) as Vehicle[];
    } catch (err) {
      console.error("Failed to parse vehicles:", err);
      return null;
    }
  }, [vehiclesData]);

  // Create maintenance SWR hooks for each vehicle
  const { data: maintenanceData, error: maintenanceError, mutate: mutateMaintenanceData } = useSWR(
    parsedVehicles ? ['maintenance', parsedVehicles.map(v => v.vehicle_id)] : null,
    async ([_, vehicleIds]: [string, number[]]) => {
      const urls = vehicleIds.map(id => `/api/maintenance-procedure/get?vehicle_id=${id}`);
      const results = await Promise.all(urls.map(maintenanceFetcher));
      return results;
    },
    {
      revalidateOnFocus: true,
      dedupingInterval: 0
    }
  );

  // Combine vehicles with their maintenance data
  const processedVehicles = useMemo(() => {
    if (!parsedVehicles || !maintenanceData) return null;

    return parsedVehicles.map((vehicle: Vehicle, index: number) => {
      const maintenanceProcedures = maintenanceData[index];
      if (!maintenanceProcedures) return vehicle;

      return {
        ...vehicle,
        maintenanceProcedures,
        num_green: maintenanceProcedures.filter((p) => (p.percentage || 0) < 50).length,
        num_yellow: maintenanceProcedures.filter(
          (p) => (p.percentage || 0) >= 50 && (p.percentage || 0) < 85
        ).length,
        num_red: maintenanceProcedures.filter((p) => (p.percentage || 0) >= 85).length,
      };
    });
  }, [parsedVehicles, maintenanceData]);


  return {
    vehicles: processedVehicles,
    isLoading: !vehiclesError && (!vehiclesData || !maintenanceData),
    vehiclesError: vehiclesError || maintenanceError,
  };
};

export const useDevices = () => {
  const { data: devicesData, error: devicesError } = useSWR<GetRequestResponse>("/api/device/get", fetcher);
  
  const devices = useMemo(() => {
    if (!devicesData?.data) return null;
    try {
      return JSON.parse(devicesData.data);
    } catch (err) {
      console.error("Failed to parse device data:", err);
      return null;
    }
  }, [devicesData]);

  return {
    devices,
    devicesError,
  };
};
