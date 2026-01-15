import type { Alert } from '@/lib/types';
import AlertCard from './alert-card';

type AlertsListProps = {
  alerts: Alert[];
};

export default function AlertsList({ alerts }: AlertsListProps) {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <h3 className="text-xl font-semibold text-muted-foreground">No Active Alerts</h3>
        <p className="text-muted-foreground mt-2">You're all clear! We'll notify you when someone needs help.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {alerts.map((alert) => (
        <AlertCard key={alert.alertId} alert={alert} />
      ))}
    </div>
  );
}
