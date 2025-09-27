import { CrudItem } from "@/types/crud";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/items`;

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    // Intentar leer el error del backend
    const errorText = await res.text();
    // Si es 401 → token inválido/expirado → limpiar y redirigir al login
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    throw new Error(errorText || `Error HTTP ${res.status}`);
  }
  return res.json();
}

export const crudService = {
  getAll: async (): Promise<CrudItem[]> => {
    const res = await fetch(API_URL, {
      headers: { ...getAuthHeaders() },
      cache: "no-store",
    });
    return handleResponse(res);
  },

  getOne: async (id: number): Promise<CrudItem> => {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  create: async (item: Omit<CrudItem, "id">): Promise<CrudItem> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(item),
    });
    return handleResponse(res);
  },

  update: async (id: number, item: { nombre: string; descripcion: string }) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(item),
    });
    return handleResponse(res);
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeaders() },
    });
    await handleResponse(res);
  },
};
