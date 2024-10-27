
export default function DashboardLayout({
  children,
  dashboardSidebar,
}: {
  children: React.ReactNode,
  dashboardSidebar: React.ReactNode,
}) {
  return (
    // <div>
    //   {/* <div className="-mt-2 -ml-3 ">{dashboardSidebar}</div> */}
    //   <div>{children}</div> 
    // </div>



<main>
  {/* <SidebarTrigger /> */}
  {children}
</main>
  );
}