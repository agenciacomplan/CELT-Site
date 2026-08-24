import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

type QueryMethod = "all" | "run" | "get" | "values";
type D1Result = {
  success?: boolean;
  results?: Array<Record<string, unknown> | unknown[]>;
};
type D1Response = {
  success?: boolean;
  result?: D1Result[];
  errors?: Array<{ message?: string }>;
};

let database: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
  if (database) return database;

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !databaseId || !apiToken) {
    throw new Error(
      "Vercel requires CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID and CLOUDFLARE_API_TOKEN to access the existing D1 database."
    );
  }

  database = drizzle(
    async (sql, params, method: QueryMethod) => {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/d1/database/${encodeURIComponent(databaseId)}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sql, params }),
        },
      );
      const payload = (await response.json()) as D1Response;
      const result = payload.result?.[0];

      if (!response.ok || !payload.success || !result?.success) {
        const message = payload.errors?.map((error) => error.message).filter(Boolean).join("; ");
        throw new Error(message || `Cloudflare D1 query failed with status ${response.status}.`);
      }

      const rows = (result.results ?? []).map((row) =>
        Array.isArray(row) ? row : Object.values(row),
      );

      return { rows: method === "get" ? rows[0] : rows };
    },
    { schema },
  );

  return database;
}
