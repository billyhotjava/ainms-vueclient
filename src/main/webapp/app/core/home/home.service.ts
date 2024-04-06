import axios from 'axios';


const baseApiUrl = 'api/access-points';
export default class HomeService {
  public retrieveCountsByProvince(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/province-counts`)
        .then(res => {
          console.log("home service" + res.data); 
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}