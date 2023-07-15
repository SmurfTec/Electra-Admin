interface ListingStats {
    total_active_listings: number;
    total_listings: number;
    total_listings_for_last_month: number;
    total_listings_percentage: number;
  }
  
  interface ProductStats {
    products_percentage: number;
    total_products: number;
    total_products_sold: number;
    total_products_sold_last_Six_months: number;
    total_products_sold_last_month: number;
    total_unique_products_sold: number;
    total_unique_products_sold_last_Six_months: number;
    total_unique_products_sold_last_month: number;
  }
  
  interface RevenueStats {
    average_price: number;
    orders_revenue_this_year: number;
    revenue_percentage: number;
    sixMonths: {
      total_price: number;
      total_sales: number;
      average_price: number;
      data: any; // You can define a specific type for `data` if you have the structure.
    };
    threeMonths: {
      total_price: number;
      total_sales: number;
      average_price: number;
      data: any; // You can define a specific type for `data` if you have the structure.
    };
    total_revenue: number;
    total_sale: number;
    year: {
      total_price: number;
      total_sales: number;
      average_price: number;
      data: any; // You can define a specific type for `data` if you have the structure.
    };
  }
  
  interface UserStats {
    total_user_this_year: any[]; // You can define a specific type for the array elements.
    total_users_last_month: string;
    total_users_registered: number;
    total_users_this_month: string;
    users_percentage: number;
  }
  
  export interface StatsData {
    listingStats: ListingStats;
    productStats: ProductStats;
    revenueStats: RevenueStats;
    userStats: UserStats;
  }
  
  // Example usage:
  const data: StatsData = {
    listingStats: {
      total_active_listings: 40,
      total_listings: 93,
      total_listings_for_last_month: 55,
      total_listings_percentage: -30.909090909090907,
    },
    productStats: {
      products_percentage: -95.23809523809523,
      total_products: 158,
      total_products_sold: 204,
      total_products_sold_last_Six_months: 101,
      total_products_sold_last_month: 21,
      total_unique_products_sold: 1,
      total_unique_products_sold_last_Six_months: 1,
      total_unique_products_sold_last_month: 1,
    },
    revenueStats: {
      average_price: 1496.1347495653174,
      orders_revenue_this_year: 150704.928,
      revenue_percentage: -94.78666752133408,
      sixMonths: {
        total_price: 78116,
        total_sales: 52,
        average_price: 91.64268632646929,
        data: {} // Add the specific structure for `data`.
      },
      threeMonths: {
        total_price: 30626,
        total_sales: 21,
        average_price: 67.16488361236792,
        data: {} // Add the specific structure for `data`.
      },
      total_revenue: 299231.928,
      total_sale: 204,
      year: {
        total_price: 199890,
        total_sales: 136,
        average_price: 72.88737147729677,
        data: {} // Add the specific structure for `data`.
      },
    },
    userStats: {
      total_user_this_year: [], // Add the specific structure for the array elements.
      total_users_last_month: "27",
      total_users_registered: 51,
      total_users_this_month: "12",
      users_percentage: -55.55555555555556,
    },
  };
  