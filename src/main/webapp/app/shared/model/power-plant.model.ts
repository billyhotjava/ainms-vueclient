import { type IProvince } from '@/shared/model/province.model';

export interface IPowerPlant {
  id?: number;
  powerPlantName?: string | null;
  province?: IProvince | null;
}

export class PowerPlant implements IPowerPlant {
  constructor(
    public id?: number,
    public powerPlantName?: string | null,
    public province?: IProvince | null,
  ) {}
}
