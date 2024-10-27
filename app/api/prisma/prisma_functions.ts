import { prisma } from "@/app/lib/prisma";
import { QueryParameters, PrismaQueryFunction } from "../../lib/types";

// Create a new maintenance procedure
export const create_maintenance_procedure: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  await prisma.maintenanceprocedure.create({
    data: {
      vehicle_id: query_params["vehicle_id"],
      name: query_params["name"],
      ...(query_params["description"] && {
        description: query_params["description"],
      }),
      interval: query_params["interval"],
      ...(query_params["current_interval"] && {
        current_interval: query_params["current_interval"],
      }),
    },
  });
};

// Delete a maintenance procedure
export const delete_maintenance_procedure: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  await prisma.maintenanceprocedure.delete({
    where: {
      id: query_params["id"],
    },
  });
};

// Update an existing maintenance procedure
export const update_maintenance_procedure: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  await prisma.maintenanceprocedure.update({
    where: {
      id: query_params["id"],
    },
    data: {
      ...(query_params["interval"] && { interval: query_params["interval"] }),
      ...(query_params["current_interval"] && {
        current_interval: query_params["current_interval"],
      }),
      ...(query_params["description"] && {
        description: query_params["description"],
      }),
      ...(query_params["name"] && { name: query_params["name"] }),
    },
  });
};

// Retrieve maintenance procedures
export const get_maintenance_procedures: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<string> => {
  const maintenance_procedures = await prisma.maintenanceprocedure.findMany({
    where: {
      vehicle_id: query_params["vehicle_id"],
      ...(query_params["id"] && { id: query_params["id"] }),
    },
  });

  return JSON.stringify(maintenance_procedures);
};

// Create a new vehicle
export const create_vehicle: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  const date_updated = new Date().toUTCString();
  await prisma.vehicle.create({
    data: {
      name: query_params["name"],
      user_email: query_params["user_email"],
      date_updated: date_updated,
      ...(query_params["image_url"] && {
        image_url: query_params["image_url"],
      }),
      ...(query_params["runtime"] && { runtime: query_params["runtime"] }),
      ...(query_params["mac_address"] && {
        mac_address: query_params["mac_address"],
      }),
    },
  });
};

// Update an existing vehicle
export const update_vehicle: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  const date_updated = new Date().toUTCString();
  await prisma.vehicle.update({
    where: {
      vehicle_id: query_params["vehicle_id"],
    },
    data: {
      date_updated: date_updated,
      ...(query_params["image_url"] && {
        image_url: query_params["image_url"],
      }),
      ...(query_params["runtime"] && { runtime: query_params["runtime"] }),
      ...(query_params["mac_address"] && {
        mac_address: query_params["mac_address"],
      }),
      ...(query_params["name"] && { name: query_params["name"] }),
      ...(query_params["user_email"] && {
        user_email: query_params["user_email"],
      }),
    },
  });
};

// Delete a vehicle
export const delete_vehicle: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  await prisma.vehicle.delete({
    where: {
      vehicle_id: query_params["vehicle_id"],
    },
  });
};

// Retrieve vehicles
export const get_vehicles: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<string> => {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      user_email: query_params["user_email"],
      ...(query_params["vehicle_id"] && {
        vehicle_id: query_params["vehicle_id"],
      }),
    },
  });

  return JSON.stringify(vehicles);
};
