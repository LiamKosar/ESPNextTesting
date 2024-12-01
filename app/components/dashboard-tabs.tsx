'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardTab } from "./dashboard-tab"
import { ProfileTab } from "./profile-tab"
import useSWR from 'swr'
import { Vehicle, GetRequestResponse, Device } from "../types/response-data"
import { Card } from "@/components/ui/card"
import LoadingCard from "./loading-card"

const fetcher = (url: string): Promise<GetRequestResponse> =>
  fetch(url).then((res) => res.json());

export function DashboardTabs() {
  const { data: vehiclesData, error: vehiclesError } = useSWR<GetRequestResponse>('/api/vehicle/get', fetcher)
  console.log(vehiclesData?.data)
  let vehicles: Vehicle[] | null = null;
  if (vehiclesData) {
    vehicles= JSON.parse(vehiclesData.data);
  }

  const { data: devicesData, error: devicesError } = useSWR<GetRequestResponse>('/api/device/get', fetcher)
  console.log(devicesData?.data)
  let devices: Device[] | null = null;
  if (devicesData) {
    devices= JSON.parse(devicesData.data);
  }
  
  
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
       {vehicles != null && devices != null ?<DashboardTab vehicles={vehicles} devices={devices}/>: <LoadingCard />} 
      </TabsContent>
      <TabsContent value="profile">
        <ProfileTab />
      </TabsContent>
    </Tabs>
  )
}

