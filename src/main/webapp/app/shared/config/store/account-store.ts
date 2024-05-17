import { defineStore } from 'pinia';

// 定义账户信息的类型，替换any为更具体的类型定义
interface Account {
  provinceId: number;
  plantId: number;
  roles: string[];
  // 添加其他账户信息属性...
}

export interface AccountStateStorable {
  logon: Promise<any> | null;
  userIdentity: Account | null;
  authenticated: boolean;
  profilesLoaded: boolean;
  ribbonOnProfiles: string;
  activeProfiles: string[];
}

export const defaultAccountState: AccountStateStorable = {
  logon: null,
  userIdentity: null,
  authenticated: false,
  profilesLoaded: false,
  ribbonOnProfiles: '',
  activeProfiles: [],
};

export const useAccountStore = defineStore('account', {
  state: (): AccountStateStorable => ({ ...defaultAccountState }),
  getters: {
    account: (state) => state.userIdentity,
    provinceId: (state) => state.userIdentity?.provinceId,
    plantId: (state) => state.userIdentity?.plantId,
    isAdmin: (state) => state.userIdentity?.roles?.includes('ROLE_ADMIN'),
    // 可以根据需要添加更多getter...
  },
  actions: {
    authenticate(promise: Promise<any>) {
      this.logon = promise;
    },
    setAuthentication(identity: Account | null): void {
      this.userIdentity = identity;
      this.authenticated = !!identity; // 如果identity不为null，则认为用户已认证
      this.logon = null;
    },
    logout(): void {
      this.userIdentity = null;
      this.authenticated = false;
      this.logon = null;
    },
    setProfilesLoaded(): void {
      this.profilesLoaded = true;
    },
    setActiveProfiles(profiles: string[]): void {
      this.activeProfiles = profiles;
    },
    setRibbonOnProfiles(ribbon: string): void {
      this.ribbonOnProfiles = ribbon;
    },
  },
});
