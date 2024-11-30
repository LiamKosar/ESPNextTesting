'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardTab } from "./dashboard-tab"
import { ProfileTab } from "./profile-tab"
import useSWR from 'swr'
import { Vehicle, GetRequestResponse } from "../types/response-data"
import { Card } from "@/components/ui/card"
import LoadingCard from "./loading-card"
const fetcher = (url: string): Promise<GetRequestResponse> =>
  fetch(url).then((res) => res.json());

export function DashboardTabs() {
  const { data, error } = useSWR<GetRequestResponse>('/api/vehicle/get', fetcher)
  console.log(data?.data)
  let vehicles: Vehicle[] | null = null;
  if (data) {
    vehicles= JSON.parse(data.data);
    vehicles?.forEach((vehicle) => {
      console.log(`Vehicle Name: ${vehicle.name}, Runtime: ${vehicle.runtime}`);
    });
  }
  
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
       {vehicles != null ?<DashboardTab vehicles={vehicles}/>: <LoadingCard />} 
      </TabsContent>
      <TabsContent value="profile">
        <ProfileTab />
      </TabsContent>
    </Tabs>
  )
}

