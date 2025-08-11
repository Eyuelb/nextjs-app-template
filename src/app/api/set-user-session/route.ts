"use server";
import { AUTH_SESSION_KEY } from "@/lib/auth/auth.const";
import { getSession } from "@/lib/auth/auth.service";
import { getBaseUrl } from "@/utils/req";

export async function POST() {
  const session = await getSession();
  const expires = new Date();
  expires.setHours(expires.getHours() + 4);
  if (!session?.token?.refreshToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const request = await fetch(getBaseUrl("/auth/refresh"), {
      method: "POST",
      headers: {
        "x-refresh-token": session.token.refreshToken,
      },
    });
    const res = await request.json();
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        "Set-Cookie": `${AUTH_SESSION_KEY}=${JSON.stringify({
          ...session,
          token: {
            refreshToken: session.token.refreshToken,
            accessToken: res.accessToken,
          },
        })}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=${expires} `,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
