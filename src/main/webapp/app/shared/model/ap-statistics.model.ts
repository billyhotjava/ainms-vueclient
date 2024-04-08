
export interface IAPStatisticsByProvince{
    totalAPs?: number;
    standByAPCount?: number;
    offlineAPCount?: number;
    otherAPCount?: number;
    provinceId?: number;
    provinceName?: string | null;
}

export class APStatisticsByProvince implements IAPStatisticsByProvince{
  constructor(
    public totalAPs?: number,
    public standByAPCount?: number,
    public offlineAPCount?: number,
    public otherAPCount?: number,
    public provinceId?: number,
    public provinceName?: string | null,
  ) {}
}

export interface IAPStatisticsByPowerPlant{
  totalAPs?: number;
  standByAPCount?: number;
  offlineAPCount?: number;
  otherAPCount?: number;
  powerPlantId?: number;
  powerPlantName?: string | null;
  provinceName?: string | null;
}

export class APStatisticsByPowerPlant implements IAPStatisticsByPowerPlant{
constructor(
  public totalAPs?: number,
  public standByAPCount?: number,
  public offlineAPCount?: number,
  public otherAPCount?: number,
  public powerPlantId?: number,
  public powerPlantName?: string | null,
  public provinceName?: string | null,
) {}
}
