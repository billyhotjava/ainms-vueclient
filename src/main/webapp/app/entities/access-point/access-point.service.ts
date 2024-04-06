import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { type IAccessPoint } from '@/shared/model/access-point.model';

const baseApiUrl = 'api/access-points';
export default class AccessPointService {
  public find(id: number): Promise<IAccessPoint> {
    return new Promise<IAccessPoint>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieveByProvinceId(provinceId: any, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const queryParams = buildPaginationQueryOpts(paginationQuery);
      // 确保第一个查询参数前使用 '?'，之后的参数使用 '&'
      const queryString = queryParams ? `?${queryParams}` : '';
      // 修改此处，以正确地构造URL
      const fullUrl = `${baseApiUrl}/provinceId/${provinceId}${queryString}`;
      console.log('Sending request to URL: ', fullUrl);
      axios
        .get(`${baseApiUrl}/provinceId/${provinceId}${queryString}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IAccessPoint): Promise<IAccessPoint> {
    return new Promise<IAccessPoint>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IAccessPoint): Promise<IAccessPoint> {
    return new Promise<IAccessPoint>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: IAccessPoint): Promise<IAccessPoint> {
    return new Promise<IAccessPoint>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}
