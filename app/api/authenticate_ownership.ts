import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/app/lib/prisma";

export const authenticate_vehicle_ownership = async (vehicle_id: number | null): Promise<boolean> => {
    
    const session = await getSession();
    const email = session?.user.email;
    const userOwnsVehicle = await prisma.user
        .findUnique({
          where: {
            email: email,
          },
          include: {
            vehicle: true,
          },
        })
        .then((user) => {
          return (
            user?.vehicle?.some(
              (vehicle) => vehicle.vehicle_id === vehicle_id
            ) || false
          );
        });
    return userOwnsVehicle; 
};
