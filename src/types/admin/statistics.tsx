//src/types/admin/statistics.tsx
export interface DashboardSummary {
  statistics: {
    listings: {
      total: number;
      verified: number;
      pending: number;
    };
    users: {
      total: number;
      landlords: number;
      tenants: number;
    };
    revenue: {
      monthly: number;
      currency: string;
    };
    bookings: {
      active: number;
      pending: number;
    };
    rooms: {
      total: number;
      totalBeds: number;
      occupancyRate: number;
    };
  };
  pendingListings: any[];
  recentActivity: any[];
}
