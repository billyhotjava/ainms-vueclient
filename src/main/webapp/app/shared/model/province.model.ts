export interface IProvince {
  id?: number;
  provinceCode?: number | null;
  provinceName?: string | null;
}

export class Province implements IProvince {
  constructor(
    public id?: number,
    public provinceCode?: number | null,
    public provinceName?: string | null,
  ) {}
}
