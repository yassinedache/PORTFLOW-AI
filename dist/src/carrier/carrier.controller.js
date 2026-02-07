var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Delete, Body, Param, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, } from '@nestjs/swagger';
import { CarrierService } from './carrier.service.js';
import { CreateTruckDto, CreateContainerDto, UpdateTruckLocationDto, } from './dto/create-truck.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let CarrierController = class CarrierController {
    carrierService;
    constructor(carrierService) {
        this.carrierService = carrierService;
    }
    createTruck(dto, carrierId) {
        return this.carrierService.createTruck(dto, carrierId);
    }
    getMyTrucks(carrierId) {
        return this.carrierService.getMyTrucks(carrierId);
    }
    deleteTruck(id, carrierId) {
        return this.carrierService.deleteTruck(id, carrierId);
    }
    createContainer(dto, carrierId) {
        return this.carrierService.createContainer(dto, carrierId);
    }
    getMyContainers(carrierId) {
        return this.carrierService.getMyContainers(carrierId);
    }
    deleteContainer(id, carrierId) {
        return this.carrierService.deleteContainer(id, carrierId);
    }
    updateTruckLocation(dto, carrierId) {
        return this.carrierService.updateTruckLocation(dto, carrierId);
    }
    getTruckLocations(truckId, carrierId) {
        return this.carrierService.getTruckLocations(truckId, carrierId);
    }
};
__decorate([
    Post('trucks'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Register a truck (Carrier)' }),
    __param(0, Body()),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTruckDto, String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "createTruck", null);
__decorate([
    Get('trucks'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Get my trucks (Carrier)' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "getMyTrucks", null);
__decorate([
    Delete('trucks/:id'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Delete a truck (Carrier)' }),
    __param(0, Param('id')),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "deleteTruck", null);
__decorate([
    Post('containers'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Register a container (Carrier)' }),
    __param(0, Body()),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateContainerDto, String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "createContainer", null);
__decorate([
    Get('containers'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Get my containers (Carrier)' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "getMyContainers", null);
__decorate([
    Delete('containers/:id'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Delete a container (Carrier)' }),
    __param(0, Param('id')),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "deleteContainer", null);
__decorate([
    Post('trucks/location'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Update truck GPS location (Carrier)' }),
    __param(0, Body()),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateTruckLocationDto, String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "updateTruckLocation", null);
__decorate([
    Get('trucks/:id/locations'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Get truck location history (Carrier)' }),
    __param(0, Param('id')),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "getTruckLocations", null);
CarrierController = __decorate([
    ApiTags('Carrier - Fleet Management'),
    ApiBearerAuth(),
    Controller('carrier'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [CarrierService])
], CarrierController);
export { CarrierController };
//# sourceMappingURL=carrier.controller.js.map