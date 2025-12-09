import AuditLogTable from "../components/AuditLogTable";

const AuditLogs = () => {
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">Logs</span>
      </div>
      {/* <div>User Table View</div> */}

      <AuditLogTable />
    </div>
  );
};

export default AuditLogs;
