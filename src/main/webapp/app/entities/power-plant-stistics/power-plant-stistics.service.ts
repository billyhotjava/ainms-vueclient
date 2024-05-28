import axios from 'axios';

import { type IPowerPlantStistics } from '@/shared/model/power-plant-stistics.model';
import buildPaginationQueryOpts from '@/shared/sort/sorts';

const baseApiUrl = 'api/power-plant-stistics';

export default class PowerPlantStisticsService {
  public find(id: number): Promise<IPowerPlantStistics> {
    return new Promise<IPowerPlantStistics>((resolve, reject) => {
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

  public retrieveByDate(startdate: string, enddate:string, paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const querydatastr = 'startdate='+startdate+'&enddate='+enddate;
      const queryParams = buildPaginationQueryOpts(paginationQuery);
      const queryString = queryParams ? `?${queryParams}`+'&'+querydatastr : '?'+ querydatastr;
      console.log('queryString', queryString);
      axios
        .get(`${baseApiUrl}/byDate${queryString}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // public delete(id: number): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     axios
  //       .delete(`${baseApiUrl}/${id}`)
  //       .then(res => {
  //         resolve(res);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }

  // public create(entity: IPowerPlantStistics): Promise<IPowerPlantStistics> {
  //   return new Promise<IPowerPlantStistics>((resolve, reject) => {
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

  // public update(entity: IPowerPlantStistics): Promise<IPowerPlantStistics> {
  //   return new Promise<IPowerPlantStistics>((resolve, reject) => {
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

  // public partialUpdate(entity: IPowerPlantStistics): Promise<IPowerPlantStistics> {
  //   return new Promise<IPowerPlantStistics>((resolve, reject) => {
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
}
