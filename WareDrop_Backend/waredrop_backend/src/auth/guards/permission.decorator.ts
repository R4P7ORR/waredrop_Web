import {Reflector} from "@nestjs/core";
import {Permission} from "../../permissions/permissions.service";

export const RequiredPermission = Reflector.createDecorator<Permission>();