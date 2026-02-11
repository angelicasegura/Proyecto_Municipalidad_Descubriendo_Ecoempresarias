import { authFetch } from "../../../../auth/AuthFetch";
import type { User } from "../../../../types/userType";

interface PaginationResponse<T> {
  items: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface FetchParams {
  page: number;
  limit: number;
  searchTerm: string;
  roleFilter: string;
  signal?: AbortSignal;
}

export const fetchUsuarios = async ({
  page,
  limit,
  searchTerm,
  roleFilter,
  signal
}: FetchParams): Promise<PaginationResponse<User>> => {
  
  const queryParams: Record<string, string> = {
    page: page.toString(),
    limit: limit.toString(),
  };

  if (searchTerm) queryParams.search = searchTerm;
  if (roleFilter && roleFilter !== "all") {
    queryParams.roleId = roleFilter;
  }

  const params = new URLSearchParams(queryParams);
  const url = `https://localhost:7050/api/Usuarios/pagination/?${params.toString()}`;

  const res = await authFetch(url, { signal });

  if (!res.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  return res.json();
};