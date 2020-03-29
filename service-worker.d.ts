/**
 * Configuration interface for the register method
 */
export interface Config {
  /**
   * The asset name of the service worker file.
   *
   * Default value: `service-worker.js`
   */
  swDest?: string;

  /**
   * You may use this variable to force assets to be referenced verbatim to the url you
   * provide (hostname included). This may be particularly useful when using a CDN to host
   * your application.
   *
   * Default value: ``
   */
  publicUrl?: string;

  /**
   * Callback fired when the `onstatechange` event is dispatched , the sw state is
   * 'installed' and there's not already a controller.
   *
   * @param registration ServiceWorkerRegistration object from the `register` promise
   */
  onSuccess?: (registration: ServiceWorkerRegistration) => void;

  /**
   * Callback fired when the `onstatechange` event is dispatched , the sw state is
   * 'installed' and there's already a controller.
   *
   * @param registration ServiceWorkerRegistration object from the `register` promise
   */
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
}

/**
 * Register the service worker.
 *
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
export function register(config?: Config): void;

/**
 * Unregister the service worker.
 *
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
export function unregister(): void;
