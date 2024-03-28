import { type IAccessController } from '@/shared/model/access-controller.model';
import { type IPowerPlant } from '@/shared/model/power-plant.model';

export interface IAccessPointGroup {
  id?: number;
  name?: string;
  controller?: IAccessController | null;
  powerPlant?: IPowerPlant | null;
}

export class AccessPointGroup implements IAccessPointGroup {
  constructor(
    public id?: number,
    public name?: string,
    public controller?: IAccessController | null,
    public powerPlant?: IPowerPlant | null,
  ) {}
}
