import { Context } from 'hono';
import { User } from 'lucia';
import { auth } from '../db/lucia';
import { config } from 'config';
import { setCookie as baseSetCookie } from 'hono/cookie';

export const setCookie = (ctx: Context, name: string, value: string) =>
  baseSetCookie(ctx, name, value, {
    secure: config.mode === 'production', // set `Secure` flag in HTTPS
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
  });

export const setSessionCookie = async (ctx: Context, userId: User['id']) => {
  const session = await auth.createSession(userId, {});
  const sessionCookie = auth.createSessionCookie(session.id);

  ctx.header('Set-Cookie', sessionCookie.serialize());
};

export const removeSessionCookie = (ctx: Context) => {
  const sessionCookie = auth.createBlankSessionCookie();
  ctx.header('Set-Cookie', sessionCookie.serialize());
};
