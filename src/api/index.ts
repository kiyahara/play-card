import axios, { AxiosInstance } from "axios";
import queryString from "query-string";
// import { getSession } from 'next-auth/react';
// import { errorNotification } from '@/utils';
// import jwt from 'jsonwebtoken';
// import { Session } from 'next-auth';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const apiKey = process.env.NEXT_PUBLIC_NEXTAUTH_KEY;
// const valueKey = process.env.NEXT_PUBLIC_NEXTAUTH_VALUE;

export const APIAxiosInstance = axios.create({
  baseURL: baseURL,
  // timeout: 1000 * 60,
  timeout: 2000 * 60,
});

// const getApiKey = () => {
//   return {
//     key: apiKey,
//     value: valueKey,
//   };
// };

// const createAuthorizationHeaders = (token: string) => {
//   const { key, value } = getApiKey();

//   if (typeof key !== "string" || key.trim() === "") {
//     throw new Error("API key is not valid.");
//   }

//   return {
//     Authorization: `Bearer ${token}`,
//     [key]: value,
//   };
// };

// export async function getAccessToken(): Promise<string> {
//   try {
//     // Cek apakah sedang dalam proses refresh token (localstorage hanya berjalan di browser)
//     if (typeof window !== "undefined") {
//       const isRefreshing = localStorage.getItem("isRefreshing");
//       if (isRefreshing === "true") {
//         // Tunggu sebentar untuk mendapatkan token baru
//         await new Promise((resolve) => setTimeout(resolve, 500));
//       }
//     }

//     // Pertama coba ambil dari localStorage untuk menghindari panggilan session yang tidak perlu
//     if (typeof window !== "undefined") {
//       const accessToken = localStorage.getItem("access");
//       if (accessToken) {
//         // Verifikasi token belum kadaluarsa
//         try {
//           const decodedToken = jwt.decode(accessToken) as Session;
//           const expiredToken = decodedToken?.exp * 1000;
//           const now = Date.now();

//           // Jika token masih valid dan jauh dari waktu kadaluarsa, gunakan token ini
//           if (expiredToken && now < expiredToken - 180000) {
//             return accessToken;
//           }
//         } catch (error) {
//           console.error("Error saat decode token:", error);
//         }
//       }
//     }

//     // Jika token di localStorage sudah kadaluarsa atau tidak valid, coba ambil dari session
//     const data = await getSession();
//     if (data?.accessToken) {
//       if (typeof window !== "undefined") {
//         localStorage.setItem("access", data.accessToken);
//       }
//       return data.accessToken;
//     }

//     return "";
//   } catch (error: any) {
//     if (typeof window !== "undefined") {
//       // Tampilkan notifikasi error hanya jika bukan error 401
//       if (error?.response?.status !== 401) {
//         errorNotification(error);
//       }
//     } else {
//       console.error("Error saat mengambil access token:", error);
//     }
//     return "";
//   }
// }

type arrayFormat =
  | "comma"
  | "bracket"
  | "index"
  | "separator"
  | "bracket-separator"
  | "colon-list-separator"
  | "none"
  | undefined;

const createApi = (axiosInstance: AxiosInstance) => {
  return {
    get: async <T = any>(
      url: any,
      params?: any,
      string?: arrayFormat,
      config: any = {},
    ) => {
      // const token = await getAccessToken();
      // const headers = createAuthorizationHeaders(token);
      const response = await axiosInstance.get(url, {
        // headers,
        params,
        ...config,
        paramsSerializer: {
          serialize: (params) => {
            return queryString.stringify(params, {
              arrayFormat: string ?? "comma",
              encode: false,
            });
          },
        },
      });
      return {
        result: response.data as T,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },
    post: async (url: string, data: any, config: any = {}) => {
      // const token = await getAccessToken();
      // const authorization = createAuthorizationHeaders(token);
      const headers = {
        // ...authorization,
        ...config?.headers,
      };
      const newConfig = {
        ...config,
        headers,
      };
      const response = await axiosInstance.post(url, data, newConfig);
      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },
    put: async (url: string, data?: any) => {
      // const token = await getAccessToken();
      // const headers = createAuthorizationHeaders(token);
      // { headers }
      const response = await axiosInstance.put(url, data);
      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },
    delete: async (url: string, params: any) => {
      // const token = await getAccessToken();
      // const headers = createAuthorizationHeaders(token);
      const response = await axiosInstance.delete(url, {
        params,
        // headers,
      });
      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },
    deleteById: async (url: string, id: string) => {
      // const token = await getAccessToken();
      // const headers = createAuthorizationHeaders(token);
      const response = await axiosInstance.delete(url, {
        data: id,
        // headers,
      });
      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },
  };
};

export const api = createApi(APIAxiosInstance);
