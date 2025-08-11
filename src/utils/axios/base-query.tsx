import { getSession } from "@/lib/auth/auth.service";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { httpPost } from "./services";
import { JWT } from "@/lib/auth/auth.model";
import envConfig from "@/config/dotenv";
const axiosBaseQuery = () => {
  const instance = axios.create({
    baseURL: envConfig.SERVER_BASE_URL,
  });

  instance.interceptors.request.use(
    async (request) => {
      if (request.url?.includes("/set-user-session")) return request;
      if (request.url?.includes("/auth")) return request;

      const session = await getSession();
      if (session) {
        let accessToken = `Bearer ${session?.token?.accessToken}`;
        const refreshToken = `${session?.token?.refreshToken}`;
       
        const decoded = jwtDecode<{ exp: number }>(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp <= currentTime) {
          const res = await httpPost<JWT, unknown>(
            `http://s0w48okkg408wg884wckssow.207.244.244.205.sslip.io/api/set-user-session`,
            {
              refresh_token: refreshToken,
            },
          );
          if (res?.accessToken) {
            accessToken = `Bearer ${res?.accessToken}`;
          }

          console.log({ res });
        }
        request.headers.Authorization = accessToken;
        request.headers['x-refresh-token'] = refreshToken;

        instance.defaults.headers.common.Authorization = accessToken;
      }
      return request;
    },
    (axiosError) => {
      const err = axiosError as AxiosError;
      console.error({ AcErr: err });

      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    },
  );

  return instance;
};
export const api = axiosBaseQuery();
