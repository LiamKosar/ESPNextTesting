import { DashboardTabs } from "../components/dashboard-tabs"
export default async function Dashboard() {
       //let data = await fetch('http://localhost:3000/api/vehicle/get')
  // let vehicles = await data.json()
  return (

   
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <DashboardTabs />
    </div>
  )
}
