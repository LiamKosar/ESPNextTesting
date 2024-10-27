import { prisma } from "@/app/lib/prisma";

export const create_maintenance_procedure = async (
  vehicle_id: number,
  name: string,
  description: string | null,
  interval: number,
  current_interval: number | null
): Promise<void> => {
  await prisma.maintenanceprocedure.create({
    data: {
      vehicle_id: vehicle_id,
      name: name,
      ...(description && { description }),
      interval: interval,
      ...(current_interval && { current_interval }),
    },
  });
};

export const delete_maintenance_procedure = async (
  id: number
): Promise<void> => {
  await prisma.maintenanceprocedure.delete({
    where: {
      id: id,
    },
  });
};

export const update_maintenance_procedure = async (
  name: string | null,
  description: string | null,
  interval: number | null,
  current_interval: number | null,
  id: number
): Promise<void> => {
  await prisma.maintenanceprocedure.update({
    where: {
      id: id,
    },
    data: {
      ...(interval && { interval }),
      ...(current_interval && { current_interval }),
      ...(description && { description }),
      ...(name && { name }),
    },
  });
};

export const get_maintenance_procedures = async (
  vehicle_id: number, id: number | null
): Promise<string> => {
  const maintenance_procedures = await prisma.maintenanceprocedure.findMany({
    where: {
      vehicle_id: vehicle_id, ...(id && { id }),
    },
  });

  const response = JSON.stringify(maintenance_procedures);
  return response;
};

export const create_vehicle = async (
  name: string,
  user_email: string,
  image_url: string | null,
  runtime: number | null,
  date_updated: string,
  mac_address: string | null
): Promise<void> => {
  await prisma.vehicle.create({
    data: {
      name: name,
      user_email: user_email,
      date_updated: date_updated,
      ...(image_url && { image_url }),
      ...(runtime && { runtime }),
      ...(mac_address && { mac_address }),
    },
  });
};

export const update_vehicle = async (
  vehicle_id: number,
  name: string | null,
  user_email: string | null,
  image_url: string | null,
  runtime: number | null,
  date_updated: string,
  mac_address: string | null
): Promise<void> => {
  await prisma.vehicle.update({
    where: {
      vehicle_id: vehicle_id,
    },
    data: {
      date_updated: date_updated,
      ...(image_url && { image_url }),
      ...(runtime && { runtime }),
      ...(mac_address && { mac_address }),
      ...(name && { name }),
      ...(user_email && { user_email }),
    },
  });
};

export const delete_vehicle = async (vehicle_id: number): Promise<void> => {
  await prisma.vehicle.delete({
    where: {
      vehicle_id: vehicle_id,
    },
  });
};

export const get_vehicles = async (user_email: string, vehicle_id: number | null): Promise<string> => {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      user_email: user_email, ...(vehicle_id && { vehicle_id }),
    },
});

  const response = JSON.stringify(vehicles);
  console.log(response);
  return response;
};

// export const get_single_vehicle = async (
//   vehicle_id: number
// ): Promise<string> => {
//   const vehicle = await prisma.vehicle.findFirst({
//     where: {
//       vehicle_id: vehicle_id,
//     },
//   });

//   const response = JSON.stringify(vehicle);
//   return response;
// };
