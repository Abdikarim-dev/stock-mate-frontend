import { format } from "date-fns";
import { useSelector } from "react-redux";

const AuditLogTable = () => {
  const audits = useSelector((s) => s.audit.audits);
  return (
    <div className="container mx-auto py-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date And Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {audits?.map((audit) => (
              <tr key={audit.id}>
                <td className="px-6 py-4 whitespace-nowrap">{audit.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{audit.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{audit.desc}</td>
                <td className="px-6 py-4 whitespace-nowrap">{audit.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(audit?.dateAndTime, "PPp")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogTable;
