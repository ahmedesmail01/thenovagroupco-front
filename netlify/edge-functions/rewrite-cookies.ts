import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    // Remove the explicit domain so browser defaults to current host (netlify.app)
    // The current host will be what the browser uses when 'domain' is absent.
    const updatedSetCookie = setCookie.replace(/domain=[^;]+;?/gi, "");
    
    // Create a new response with the updated header
    const newHeaders = new Headers(response.headers);
    newHeaders.set("set-cookie", updatedSetCookie);
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
};

export const config: Config = {
  path: ["/api/*", "/sanctum/*"],
};
