import { getAlerts } from "../apicalls/alert";
import { DangerAlert } from "./Alerts";
import { useEffect, useState } from "react";

const WrapperAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [data, setData] = useState(alerts); // exclude the alert

  useEffect(() => {
    const getAlertsdata = async () => {
      const response = await getAlerts();
      if (response.success) setAlerts(response.alerts);
    };
    getAlertsdata();
  }, []);

  useEffect(() => {
    setData(alerts);
  }, [alerts]);

  return (
    <div>
      {data?.map((alert) => {
        return (
          <DangerAlert
            data={data}
            setData={setData}
            key={alert.id}
            alert={alert}
          />
        );
      })}
    </div>
  );
};

export default WrapperAlerts;
