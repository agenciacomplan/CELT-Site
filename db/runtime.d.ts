declare module "celt-db-runtime" {
  export const getDb: typeof import("./cloudflare").getDb;
}
