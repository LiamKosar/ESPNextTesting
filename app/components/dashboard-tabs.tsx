"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTab } from "./dashboard-tab";
import { ProfileTab } from "./profile-tab";
import LoadingCard from "./loading-card";
import { useDevices, useVehicles } from "../hooks/get-requests";

export function DashboardTabs() {
  const { vehicles, isLoading: vehiclesLoading, vehiclesError } = useVehicles();
  const { devices, devicesError } = useDevices();

  // Show loading state while initial data is being fetched
  const isLoading = vehiclesLoading || !devices;
  
  // Show error state if either fetch fails
  if (vehiclesError || devicesError) {
    return <div>Error loading data</div>;
  }

  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        {isLoading ? (
          <LoadingCard />
        ) : (
          <DashboardTab vehicles={vehicles!} devices={devices!} />
        )}
      </TabsContent>
      <TabsContent value="profile">
        <ProfileTab />
      </TabsContent>
    </Tabs>
  );
}
