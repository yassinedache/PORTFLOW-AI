var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, Matches, IsUUID, IsNumber, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTruckDto {
    plate;
}
__decorate([
    ApiProperty({ description: 'License plate number', example: 'DZ-1234-A16' }),
    IsString(),
    Matches(/^[A-Z0-9\-]+$/i, {
        message: 'Plate must contain only alphanumeric characters and hyphens',
    }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "plate", void 0);
export class CreateContainerDto {
    containerNumber;
}
__decorate([
    ApiProperty({
        description: 'Container number',
        example: 'MSKU1234567',
    }),
    IsString(),
    Matches(/^[A-Z0-9]{3,15}$/i, {
        message: 'Container number must be 3-15 alphanumeric characters',
    }),
    __metadata("design:type", String)
], CreateContainerDto.prototype, "containerNumber", void 0);
export class UpdateTruckLocationDto {
    truckId;
    lat;
    lng;
}
__decorate([
    ApiProperty({ description: 'Truck ID' }),
    IsUUID(),
    __metadata("design:type", String)
], UpdateTruckLocationDto.prototype, "truckId", void 0);
__decorate([
    ApiProperty({ description: 'Latitude', example: 36.7538 }),
    IsNumber(),
    __metadata("design:type", Number)
], UpdateTruckLocationDto.prototype, "lat", void 0);
__decorate([
    ApiProperty({ description: 'Longitude', example: 3.0588 }),
    IsNumber(),
    __metadata("design:type", Number)
], UpdateTruckLocationDto.prototype, "lng", void 0);
//# sourceMappingURL=create-truck.dto.js.map