export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
export const json = (body: unknown, status = 200) => Response.json(body, { status, headers: CORS });
export const preflight = () => new Response(null, { status: 204, headers: CORS });
