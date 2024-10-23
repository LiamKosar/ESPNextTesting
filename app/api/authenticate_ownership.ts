import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/app/lib/prisma";

export const authenticate_ownership = async (mac_address: string): Promise<boolean> => {
    
    const session = await getSession();
    const email = session?.user.email;
    const userOwnsDevice = await prisma.user
        .findUnique({
          where: {
            email: email,
          },
          include: {
            device: true, // Include the user's devices
          },
        })
        .then((user) => {
          // Check if the user has the specified device
          return (
            user?.device?.some(
              (device) => device.mac_address === mac_address
            ) || false
          );
        });
    return userOwnsDevice; 
};