export async function onRequest(context) {
  const incoming = new URL(context.request.url);
  const upstream = "https://long-sun-17c3.kypka43.workers.dev" + incoming.pathname + incoming.search;
  const headers = new Headers(context.request.headers);
  headers.delete("host");
  headers.delete("cf-connecting-ip");
  const method = context.request.method;
  const response = await fetch(upstream, {
    method,
    headers,
    body: method !== "GET" && method !== "HEAD" ? context.request.body : undefined,
    redirect: "manual",
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
