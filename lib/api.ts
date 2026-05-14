import { NextResponse } from 'next/server';
import { z } from 'zod';

export type ApiErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN' | 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_ERROR';
export function ok<T>(data: T, init?: ResponseInit) { return NextResponse.json({ ok: true, data }, init); }
export function fail(code: ApiErrorCode, message: string, status = 400, details?: unknown) { return NextResponse.json({ ok: false, error: { code, message, details } }, { status }); }
export async function readJson<T extends z.ZodTypeAny>(request: Request, schema: T): Promise<z.infer<T>> { return schema.parse(await request.json()); }
