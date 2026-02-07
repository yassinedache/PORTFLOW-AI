var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service.js';
import { OperatorController } from './operator.controller.js';
import { EventsModule } from '../events/events.module.js';
let OperatorModule = class OperatorModule {
};
OperatorModule = __decorate([
    Module({
        imports: [EventsModule],
        controllers: [OperatorController],
        providers: [OperatorService],
        exports: [OperatorService],
    })
], OperatorModule);
export { OperatorModule };
//# sourceMappingURL=operator.module.js.map