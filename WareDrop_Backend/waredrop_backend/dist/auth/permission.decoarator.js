"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const PermissionGuard = (permission) => (0, common_1.SetMetadata)('permission', permission);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=permission.decoarator.js.map