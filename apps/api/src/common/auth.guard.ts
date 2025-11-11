import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// Dev-only stub: Accept X-Tenant-Id and X-User-Id headers for multi-tenant scoping
@Injectable()
export class DevAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const tenantId = req.header('x-tenant-id');
    const userId = req.header('x-user-id');
    // Attach to request for downstream usage
    req.tenantId = tenantId ?? null;
    req.userId = userId ?? null;
    // In real life, integrate Clerk/Auth0 and verify JWT
    return true;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      tenantId?: string | null;
      userId?: string | null;
    }
  }
}
