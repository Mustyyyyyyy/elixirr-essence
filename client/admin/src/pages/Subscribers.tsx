import { useEffect, useState } from "react";
import api from "../utils/api";

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/subscribers")
      .then(({ data }) => setSubscribers(data.subscribers))
      .then(() => setLoading(false), () => setLoading(false));
  }, []);

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Audience</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">Notifications</h1>
        <p className="mt-2 text-sm text-gray-500">Customers subscribed to new drops and exclusive releases.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? <p className="p-6 text-gray-500">Loading subscribers...</p> : subscribers.length === 0 ? (
          <p className="p-6 text-gray-500">No subscribers yet.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr><th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">Email</th><th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-500">Subscribed</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id}><td className="px-6 py-4 text-sm font-medium text-gray-900">{subscriber.email}</td><td className="px-6 py-4 text-sm text-gray-500">{new Date(subscriber.subscribed_at).toLocaleDateString()}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
