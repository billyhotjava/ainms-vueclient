export interface ICountryStistics {
  id?: number;
  name?: string;
  totalCount?: number | null;
  onlineCount?: number | null;
  offlineCount?: number | null;
  otherCount?: number | null;
  statisticDate?: Date | null;
  statisticTime?: Date | null;
}

export class CountryStistics implements ICountryStistics {
  constructor(
    public id?: number,
    public name?: string,
    public totalCount?: number | null,
    public onlineCount?: number | null,
    public offlineCount?: number | null,
    public otherCount?: number | null,
    public statisticDate?: Date | null,
    public statisticTime?: Date | null,
  ) {}
}
