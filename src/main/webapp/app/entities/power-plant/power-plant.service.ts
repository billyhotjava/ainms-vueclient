import axios from 'axios';

import { type IPowerPlant } from '@/shared/model/power-plant.model';

const baseApiUrl = 'api/power-plants';
const baseApiUrl_name = 'api/power-plants/with-province-name';

export default class PowerPlantService {
  public find(id: number): Promise<IPowerPlant> {
    return new Promise<IPowerPlant>((resolve, reject) => {
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
  public retrieve_name(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
      .get(`${baseApiUrl_name}`)
        .then(res => {
          console.log(res)
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

  public create(entity: IPowerPlant): Promise<IPowerPlant> {
    return new Promise<IPowerPlant>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          console.log(res)
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IPowerPlant): Promise<IPowerPlant> {
    return new Promise<IPowerPlant>((resolve, reject) => {
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

  public partialUpdate(entity: IPowerPlant): Promise<IPowerPlant> {
    return new Promise<IPowerPlant>((resolve, reject) => {
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
