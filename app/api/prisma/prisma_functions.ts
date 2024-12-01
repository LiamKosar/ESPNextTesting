import { prisma } from "@/app/lib/prisma";
import { QueryParameters, PrismaQueryFunction } from "../../lib/types";

/**
 * Creates a new maintenance procedure using the specified query_params
 * vehicle_id: required
 * name: required
 * interval: required
 * description: not required
 * current_interval: not required
 * @param query_params
 */
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

/**
 * Deletes a maintenance_procedure using the specified query_params
 * id: required
 * @param query_params 
 */
export const delete_maintenance_procedure: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  await prisma.maintenanceprocedure.delete({
    where: {
      id: query_params["id"],
    },
  });
};

/**
 * Updates maintenance procedure using the specified query_params
 * id: required
 * name: not required
 * interval: not required
 * description: not required
 * current_interval: not required
 * @param query_params
 */
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

/**
 * Gets one/many maintenance procedures
 * vehicle_id: required
 * id: not required
 * If id is specified, only 1 maintenance procedure will be returned
 * Otherwise, all maintenance procedures associated with the specified vehicle will be returned
 * @param query_params
 * @returns string object with 1 or more maintenance procedure
 */
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

/**
 * Creates a new vehicle using the specified query_params
 * name: required
 * user_email: required
 * date_updated: required
 * image_url: not required
 * runtime: not required
 * mac_address: not required
 * @param query_params
 */
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

/**
 * Updated a vehicle using the specified query_params
 * vehicle_id: required
 * date_updated: required
 * name: not required
 * user_email: not required
 * image_url: not required
 * runtime: not required
 * mac_address: not required
 * @param query_params
 */
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

/**
 * Deletes the specified vehicle
 * vehicle_id: required
 * @param query_params 
 */
export const delete_vehicle: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  await prisma.vehicle.delete({
    where: {
      vehicle_id: query_params["vehicle_id"],
    },
  });
};

/**
 * Gets one/many vehicles
 * user_email: required
 * vehicle_id: not required required
 * If vehicle_id is specified, only 1 vehicle will be returned
 * Otherwise, all vehicles associated with the specified user_email will be returned
 * @param query_params
 * @returns string object with 1 or more vehicle
 */
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

export const get_devices: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<string> => {
  const devices = await prisma.device.findMany({
    where: {
      user_email: query_params["user_email"],
      ...(query_params["mac_address"] && {
        mac_address: query_params["mac_address"],
      }),
    },
  });

  return JSON.stringify(devices);
};


export const confirm_device_can_be_updated_by_user: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<boolean> => {

  const device = await prisma.device.findUnique({
    where: {
      mac_address: query_params["mac_address"],
    }
  });

  if (device) {
    return device.user_email === query_params["user_email"] || device.user_email === "kosar.liam@gmail.com"
  }
  return false;  
}


export const update_device: PrismaQueryFunction = async (
  query_params: QueryParameters
): Promise<void> => {
  const date_updated = new Date().toUTCString();
  await prisma.device.update({
    where: {
      mac_address: query_params["mac_address"],
    },
    data: {
      user_email: query_params["user_email"],
      date_updated: date_updated,
      ...(query_params["version"] && {
        version: query_params["version"],
      }),
      ...(query_params["runtime"] && { runtime: query_params["runtime"] }),
    },
  });
};