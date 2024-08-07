import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  // withCredentials: true,
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async () => {
    try {
      const response = await axiosInstance.get<T>(this.endpoint, {
        withCredentials: true,
      });
      return {
        response: [
          {
            products: [
              {
                _id: "66ad0415f65ce008d4f53eca",
                name: "Prod 5",
                price: 32,
                image: "AgACAgQAAxkBAAM-Zq0Iy7ZrVyyPevNhr3kpCNuU_CAAAsDFMRvgQmhRm5RZtCExHj8BAAMCAANtAAM1BA",
                category: "66accf09bc3dca337e746832",
                image_url: "https://api.telegram.org/file/bot7242601647:AAF9aci9aNaery45AUZJ34XH87rnrrTAi5Y/photos/file_4",
              },
            ],
            _id: "66accf09bc3dca337e746832",
            name: "Cat 1",
          },
          {
            products: [
              {
                _id: "66acfe9c295dc9495e070296",
                name: "Prod-1 changed",
                price: 23,
                image: "AgACAgQAAxkBAAMOZqz-nGLOKUlEkY-sPRyf8H7hOhoAAmHDMRsiMmBRFUVGHnkxMhABAAMCAAN5AAM1BA",
                category: "66accf37bc3dca337e746834",
                image_url: "https://api.telegram.org/file/bot7242601647:AAF9aci9aNaery45AUZJ34XH87rnrrTAi5Y/photos/file_3",
              },
              {
                _id: "66ad59e4bd3d6bf3fe325ee2",
                name: "Bottle of Coke",
                price: 2,
                image: "AgACAgUAAxkBAANSZq1Z5IOoW4PvpB8kX8HCqbY_ce4AAkDCMRtObGlVqR18n8fkFgIBAAMCAAN5AAM1BA",
                category: "66accf37bc3dca337e746834",
                image_url: "https://api.telegram.org/file/bot7242601647:AAF9aci9aNaery45AUZJ34XH87rnrrTAi5Y/photos/file_5",
              },
            ],
            _id: "66accf37bc3dca337e746834",
            name: "Cat 2",
          },
          {
            products: [
              {
                _id: "66ad02f6063dcbe19c94c1b6",
                name: "Prod 2",
                price: 30,
                image: "AgACAgQAAxkBAAMmZq0C9gvdtXvOd3Ckk_q-2SodmNEAAsDFMRvgQmhRm5RZtCExHj8BAAMCAANtAAM1BA",
                category: "66accf37bc3dca337e746835",
                image_url: "https://api.telegram.org/file/bot7242601647:AAF9aci9aNaery45AUZJ34XH87rnrrTAi5Y/photos/file_4",
              },
              {
                _id: "66ad039fae805fc016f43869",
                name: "Prod 4",
                price: 32,
                image: "AgACAgQAAxkBAANCZq0JBirmErNFazr39Gm03hVbr6kAAmHDMRsiMmBRFUVGHnkxMhABAAMCAAN5AAM1BA",
                category: "66accf37bc3dca337e746835",
                image_url: "https://api.telegram.org/file/bot7242601647:AAF9aci9aNaery45AUZJ34XH87rnrrTAi5Y/photos/file_3",
              },
            ],
            _id: "66accf37bc3dca337e746835",
            name: "Cat 3",
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  post = async (data: any) => {
    return axiosInstance.post<T>(this.endpoint, data, { withCredentials: true }).then((res) => res.data);
  };

  patch = async (data: any) => {
    try {
      const response = await axiosInstance.patch<T>(this.endpoint, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  delete = async () => {
    try {
      const response = await axiosInstance.delete<T>(this.endpoint, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
}

export default ApiClient;
