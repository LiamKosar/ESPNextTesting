export type Vehicle = {
    vehicle_id: number;
    user_email: string;
    name: string;
    mac_address: string | null;
    runtime: number;
    image_url: string | null;
    date_updated: string;
    num_red?: number,
    num_yellow?: number,
    num_green?: number
  };

export type GetRequestResponse = {
    message: string,
    data: string
}

export type DashboardTabProps = {
    vehicles: Vehicle[];
};

export type MaintenanceProcedure = {
  id: number,
  name: string,
  description: string | null,
  interval: number,
  current_interval: number,
  vehicle_id: number
  percentage?: number
}

// export type VehicleMaintenanceProcedures = {
//   vehic
// }