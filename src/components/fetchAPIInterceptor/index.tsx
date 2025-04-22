"use client";

// import { clientEnv } from '@/components/clientEnv';
import { TToastContext, ToastContext } from "@/context/toastContext";
import { clearCookies } from "@/lib/utils/cookies";
// import { updateAppD } from '@/lib/utils/heplerFunction';
// import { isInvalidAPIConnectToken } from '@/services/clientServices';
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const FetchAPIInterceptor = () => {
  const toast = useContext<TToastContext>(ToastContext);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    overRideFetchMethod();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    clearCookies();
    // updateAppD();
    if (path !== "/login") {
      router.push("/login");
      router.refresh();
    }
  };

  const overRideFetchMethod = () => {
    const { fetch: origFetch } = window;
    window.fetch = async (...args) => {
      const [url, fetchConfig] = args;
      const response = await origFetch(...args);
      // const basePath = clientEnv?.env?.UNIFIEDPORTAL_API_CONNECT_BASEURL ?? '';
      const basePath = "http://localhost:6003";
      const responseUrl = response?.url ?? "";
      const isValidResponseURL =
        responseUrl.includes(basePath) ||
        responseUrl.includes("nitro-cibg-data-service/kyc");

      if (!response?.ok && response?.status === 500 && isValidResponseURL) {
        const cloneResData = await response.clone().json();
        // if (!isInvalidAPIConnectToken(cloneResData)) {
        //   toast.errorToast && toast.errorToast('Something went wrong');
        //   return response;
        // }
      }

      const headers = Object.fromEntries(response.headers || []);
      const fetchConfigHeader: any = fetchConfig?.headers;
      if (fetchConfigHeader?.["RepeatAuth"] && response.status == 401) {
        handleLogout();
      }
      /**
       * if the 'Content-Type' is not 'application/json', avoid to perform 'response.json()'
       * */
      if (
        !["application/json; charset=utf-8", "application/json;"].includes(
          headers["Content-Type"],
        )
      ) {
        return response;
      }

      /* the original response can be resolved unmodified: */
      return response;
    };
  };

  return null;
};

export default React.memo(FetchAPIInterceptor);
