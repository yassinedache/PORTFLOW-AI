var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { GateAccessService } from './gate-access.service.js';
import { GateAccessController } from './gate-access.controller.js';
import { QrModule } from '../qr/qr.module.js';
import { EventsModule } from '../events/events.module.js';
let GateAccessModule = class GateAccessModule {
};
GateAccessModule = __decorate([
    Module({
        imports: [QrModule, EventsModule],
        controllers: [GateAccessController],
        providers: [GateAccessService],
        exports: [GateAccessService],
    })
], GateAccessModule);
export { GateAccessModule };
//# sourceMappingURL=gate-access.module.js.map