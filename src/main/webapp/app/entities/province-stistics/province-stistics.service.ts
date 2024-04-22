import axios from 'axios';

import { type IProvinceStistics } from '@/shared/model/province-stistics.model';

const baseApiUrl = 'api/province-stistics';

export default class ProvinceStisticsService {
  public find(id: number): Promise<IProvinceStistics> {
    return new Promise<IProvinceStistics>((resolve, reject) => {
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

  public retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
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

  // public create(entity: IProvinceStistics): Promise<IProvinceStistics> {
  //   return new Promise<IProvinceStistics>((resolve, reject) => {
  //     axios
  //       .post(`${baseApiUrl}`, entity)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }

  // public update(entity: IProvinceStistics): Promise<IProvinceStistics> {
  //   return new Promise<IProvinceStistics>((resolve, reject) => {
  //     axios
  //       .put(`${baseApiUrl}/${entity.id}`, entity)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }

  // public partialUpdate(entity: IProvinceStistics): Promise<IProvinceStistics> {
  //   return new Promise<IProvinceStistics>((resolve, reject) => {
  //     axios
  //       .patch(`${baseApiUrl}/${entity.id}`, entity)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }

  // public handleNCEApStatistics(): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     axios
  //       .get(`${baseApiUrl}/nce-apstatistics`)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }
}
