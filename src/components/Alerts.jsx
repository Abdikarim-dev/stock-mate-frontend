export const WarningAlert = () => {
  return (
    <div
      className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
      role="alert"
    >
      <span className="font-medium">Warning alert!</span> Change a few things up
      and try submitting again.
    </div>
  );
};
export const DangerAlert = ({ alert, data, setData }) => {
  const dismissAlert = () => {
    const newAlerts = data?.filter((a) => a.id !== alert.id);
    setData(newAlerts);
  };
  return (
    <div
      className="flex justify-between items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
      role="alert"
    >
      <div>
        <span className="font-medium">{alert?.title}</span> {alert?.description}
      </div>
      <div
        className="text-red-800 font-semibold cursor-pointer hover:text-red-600"
        onClick={() => dismissAlert()}
      >
        X
      </div>
    </div>
  );
};
