export type Vehicle = {
    vehicle_id: number;
    user_email: string;
    name: string;
    mac_address: string | null;
    runtime: number;
    image_url: string | null;
    date_updated: string;
  };

export type GetRequestResponse = {
    message: string,
    data: string
}

export type DashboardTabProps = {
    vehicles: Vehicle[];
  };