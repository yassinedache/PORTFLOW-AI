var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service.js';
import { TerminalController } from './terminal.controller.js';
let TerminalModule = class TerminalModule {
};
TerminalModule = __decorate([
    Module({
        controllers: [TerminalController],
        providers: [TerminalService],
        exports: [TerminalService],
    })
], TerminalModule);
export { TerminalModule };
//# sourceMappingURL=terminal.module.js.map