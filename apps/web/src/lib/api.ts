// API client for making requests to the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface RequestOptions extends RequestInit {
  tenantId?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { tenantId, headers, ...rest } = options;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (tenantId) {
    defaultHeaders['x-tenant-id'] = tenantId;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
    ...rest,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An error occurred',
    }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

// Tenant API
export const tenantsApi = {
  getAll: () => request('/tenants'),
  getById: (id: string) => request(`/tenants/${id}`),
  getBySubdomain: (subdomain: string) =>
    request(`/tenants/by-subdomain?subdomain=${subdomain}`),
  create: (data: any) =>
    request('/tenants', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    request(`/tenants/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// Products API
export const productsApi = {
  getAll: (tenantId: string) => request('/products', { tenantId }),
  getById: (tenantId: string, id: string) =>
    request(`/products/${id}`, { tenantId }),
  getBySlug: (tenantId: string, slug: string) =>
    request(`/products/by-slug/${slug}`, { tenantId }),
  create: (tenantId: string, data: any) =>
    request('/products', {
      method: 'POST',
      tenantId,
      body: JSON.stringify(data),
    }),
  update: (tenantId: string, id: string, data: any) =>
    request(`/products/${id}`, {
      method: 'PATCH',
      tenantId,
      body: JSON.stringify(data),
    }),
  calculatePrice: (
    tenantId: string,
    id: string,
    quantity: number,
    options: Record<string, string>
  ) =>
    request(`/products/${id}/calculate-price`, {
      method: 'POST',
      tenantId,
      body: JSON.stringify({ quantity, options }),
    }),
};

// Orders API
export const ordersApi = {
  getAll: (tenantId: string) => request('/orders', { tenantId }),
  getById: (tenantId: string, id: string) =>
    request(`/orders/${id}`, { tenantId }),
  getByOrderNumber: (tenantId: string, orderNumber: string) =>
    request(`/orders/by-number/${orderNumber}`, { tenantId }),
  create: (tenantId: string, data: any) =>
    request('/orders', {
      method: 'POST',
      tenantId,
      body: JSON.stringify(data),
    }),
  updateStatus: (tenantId: string, id: string, status: string) =>
    request(`/orders/${id}/status`, {
      method: 'PATCH',
      tenantId,
      body: JSON.stringify({ status }),
    }),
};

// Uploads API
export const uploadsApi = {
  getPresignedUrl: (
    tenantId: string,
    filename: string,
    contentType: string
  ) =>
    request('/uploads/presigned-url', {
      method: 'POST',
      tenantId,
      body: JSON.stringify({ filename, contentType }),
    }),
  getPresignedUrls: (
    tenantId: string,
    files: Array<{ filename: string; contentType: string }>
  ) =>
    request('/uploads/presigned-urls', {
      method: 'POST',
      tenantId,
      body: JSON.stringify({ files }),
    }),
};

// Billing API
export const billingApi = {
  createPaymentIntent: (amount: number, currency = 'usd') =>
    request('/billing/payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, currency }),
    }),
  createCheckoutSession: (
    tenantId: string,
    items: Array<{ name: string; amount: number; quantity: number }>,
    successUrl: string,
    cancelUrl: string
  ) =>
    request('/billing/checkout-session', {
      method: 'POST',
      tenantId,
      body: JSON.stringify({ items, successUrl, cancelUrl }),
    }),
};
