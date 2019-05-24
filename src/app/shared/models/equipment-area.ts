import { Equipment } from 'src/app/shared/models/equipment';

export class EquipmentArea {
  equipmentId: string;
  equipmentName: string;
  areaId: string;
  length: number;
  width: number;
  count: number;

  constructor(id: string, name: string, 
    areaId: string, count: number, 
    length: number, width: number) {
    this.equipmentId = id;
    this.equipmentName = name;
    this.areaId = areaId;
    this.length = length;
    this.width = width;
    this.count = count;
  }
}