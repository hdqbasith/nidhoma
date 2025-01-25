import type { FetchContext } from 'ofetch'
import type { ConsolaInstance } from 'consola'
import type { NuxtApp } from '#app'
export interface TokenStorage {
  /**
   * Function to load a token from the storage.
   */
  get: (app: NuxtApp) => Promise<string | undefined>;
  /**
   * Function to save a token to the storage.
   */
  set: (app: NuxtApp, token?: string) => Promise<void>;
}
const tokenStorageKey = 'sanctum.storage.token';
const localTokenStorage: TokenStorage = {
    get: async () => {
        if (import.meta.server) {
            return undefined;
        }

        return window.localStorage.getItem(tokenStorageKey) ?? undefined;
    },

    set: async (app: NuxtApp, token?: string) => {
        if (import.meta.server) {
            return;
        }

        if (!token) {
            window.localStorage.removeItem(tokenStorageKey);
            return;
        }

        window.localStorage.setItem(tokenStorageKey, token);
      },
};
export default defineAppConfig({
  ui: {
    primary: 'red',
    gray: 'neutral',
  },

  siteTitle: 'ProjectName',

  sanctum: {
    interceptors: {
      onRequest: async (
        app: NuxtApp,
        ctx: FetchContext,
        logger: ConsolaInstance,
      ) => {
        logger.debug(`custom onRequest interceptor (${ctx.request})`)
      },

      onResponse: async (
        app: NuxtApp,
        ctx: FetchContext,
        logger: ConsolaInstance,
      ) => {
        logger.debug(`custom onResponse interceptor (${ctx.request})`)

        // Redirect to maintenance page if the server is down
        if (ctx.response?.status === 503) {
          app.runWithContext(async () => {
            const currentRoute = app.$router.currentRoute.value.path.replace(/\/$/, '')
            const maintenanceRoute = '/maintenance'
            
            if (currentRoute === maintenanceRoute) {
              return
            }
            
            await navigateTo(maintenanceRoute, { external: true })
          })
        }
      },
    },
    tokenStorage: localTokenStorage,
  },
})
