import { type IAccessPointGroup } from '@/shared/model/access-point-group.model';

export interface IAccessPoint {
  id?: number;
  nedn?: string | null;
  neid?: number | null;
  aliasname?: string | null;
  nename?: string | null;
  necategory?: string | null;
  netype?: string | null;
  nevendorname?: string | null;
  neesn?: string | null;
  neip?: string | null;
  nemac?: string | null;
  version?: string | null;
  nestate?: number | null;
  createtime?: string | null;
  neiptype?: number | null;
  subnet?: string | null;
  neosversion?: string | null;
  group?: IAccessPointGroup | null;
}

export class AccessPoint implements IAccessPoint {
  constructor(
    public id?: number,
    public nedn?: string | null,
    public neid?: number | null,
    public aliasname?: string | null,
    public nename?: string | null,
    public necategory?: string | null,
    public netype?: string | null,
    public nevendorname?: string | null,
    public neesn?: string | null,
    public neip?: string | null,
    public nemac?: string | null,
    public version?: string | null,
    public nestate?: number | null,
    public createtime?: string | null,
    public neiptype?: number | null,
    public subnet?: string | null,
    public neosversion?: string | null,
    public group?: IAccessPointGroup | null,
  ) {}
}
