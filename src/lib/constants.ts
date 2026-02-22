export const LANGS = ["fa", "en"] as const;
export const DEFAULT_LANG: (typeof LANGS)[number] = "fa";

export const SOCKET_EVENTS = {
  PRODUCT_UPDATED: "product:updated",
  CATEGORY_UPDATED: "category:updated",
  SETTINGS_UPDATED: "settings:updated",
  PRODUCT_CREATED: "product:created",
  PRODUCT_DELETED: "product:deleted",
  CATEGORY_CREATED: "category:created",
  CATEGORY_DELETED: "category:deleted",
};
