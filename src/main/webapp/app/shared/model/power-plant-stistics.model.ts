import { type IProvinceStistics } from '@/shared/model/province-stistics.model';

export interface IPowerPlantStistics {
  id?: number;
  name?: string;
  totalCount?: number | null;
  onlineCount?: number | null;
  offlineCount?: number | null;
  otherCount?: number | null;
  statisticDate?: Date | null;
  statisticTime?: Date | null;
  province?: IProvinceStistics | null;
}

export class PowerPlantStistics implements IPowerPlantStistics {
  constructor(
    public id?: number,
    public name?: string,
    public totalCount?: number | null,
    public onlineCount?: number | null,
    public offlineCount?: number | null,
    public otherCount?: number | null,
    public statisticDate?: Date | null,
    public statisticTime?: Date | null,
    public province?: IProvinceStistics | null,
  ) {}
}
