import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import { useRoute, useRouter } from 'vue-router';
import UserManagementService from './user-management.service';
import { type IUser, User } from '@/shared/model/user.model';
import { useAlertService } from '@/shared/alert/alert.service';
import languages from '@/shared/config/languages';
import ProvinceService from '@/entities/province/province.service';
import PowerPlantService from '@/entities/power-plant/power-plant.service';
import type { IProvince } from '@/shared/model/province.model';
import type { IPowerPlant } from 'shared/model/power-plant.model';

const loginValidator = (value: string) => {
  if (!value) {
    return true;
  }
  return /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/.test(value);
};

const validations: any = {
  userAccount: {
    login: {
      required,
      maxLength: maxLength(254),
      pattern: loginValidator,
    },
    firstName: {
      maxLength: maxLength(50),
    },
    lastName: {
      maxLength: maxLength(50),
    },
    email: {
      email,
      minLength: minLength(5),
      maxLength: maxLength(50),
    },
  },
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AinmsUserManagementEdit',
  validations,
  setup() {
    const route = useRoute();
    const router = useRouter();

    const alertService = inject('alertService', () => useAlertService(), true);
    const userManagementService = inject('userManagementService', () => new UserManagementService(), true);
    const previousState = () => router.go(-1);

    // add for join view
    const provinceService = inject('provinceService', () => new ProvinceService() );
    const provinces: Ref<IProvince[]> = ref([]);
    // end for join view

    const plantService = inject('plantService', () => new PowerPlantService(), true );
    const plants: Ref<IPowerPlant[]> = ref([]);

    const userAccount: Ref<IUser> = ref({ ...new User(), authorities: [] });
    const isSaving: Ref<boolean> = ref(false);
    const authorities: Ref<string[]> = ref([]);

    const initAuthorities = async () => {
      const response = await userManagementService.retrieveAuthorities();
      authorities.value = response.data;
    };

    const loadUser = async (userId: string) => {
      const response = await userManagementService.get(userId);
      userAccount.value = response.data;
      
      if(response.data.provinceId){
        const res = await plantService.retrieveByProvinceId(response.data.provinceId);
        plants.value = res.data
      }
    };

    const initRelationships = () => {
      provinceService()
        .retrieve()
        .then(res => {
          provinces.value = res.data;
        });

    };
    initRelationships();

    initAuthorities();
    const userId = route.params?.userId;
    if (userId) {
      loadUser(userId);
    }

    return {
      alertService,
      userAccount,
      provinceService,
      provinces,
      plantService,
      plants,
      isSaving,
      authorities,
      userManagementService,
      previousState,
      v$: useVuelidate(),
      languages: languages(),
      t$: useI18n().t,
    };
  },
  methods: {
    save(): void {
      this.isSaving = true;
      this.userAccount.isActive = true;//always true
      console.log("==edit&create:userAccount", this.userAccount);
      if (this.userAccount.id) {
        this.userManagementService
          .update(this.userAccount)
          .then(res => {
            this.returnToList();
            this.alertService.showInfo(this.getToastMessageFromHeader(res));
          })
          .catch(error => {
            this.isSaving = true;
            console.log("==edit&create:error", error);
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.userManagementService
          .create(this.userAccount)
          .then(res => {
            this.returnToList();
            this.alertService.showSuccess(this.getToastMessageFromHeader(res));
          })
          .catch(error => {
            this.isSaving = true;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    returnToList(): void {
      this.isSaving = false;
      this.previousState();
    },

    getToastMessageFromHeader(res: any): string {
      if( res && res.header){
        console.log("==getToastMessageFromHeader:res.headers", res.headers);
        return this.t$(res.headers['x-ainmsvueclientapp-alert'], {
          param: decodeURIComponent(res.headers['x-ainmsvueclientapp-params'].replace(/\+/g, ' ')),
        }).toString();
      }
    },

    getProvinceName(provinceId: number): string {
      const provinceOption = this.provinces.find(option => option.id === provinceId);
      return provinceOption ? provinceOption.provinceName : '';
    }, 

    async getPlantsfromProvinceid(provinceId: number): void {
      const res = await this.plantService.retrieveByProvinceId(provinceId);
      console.log(res);
      this.plants = res.data;
      console.log(this.plants);
      return;
    }
  },
});
