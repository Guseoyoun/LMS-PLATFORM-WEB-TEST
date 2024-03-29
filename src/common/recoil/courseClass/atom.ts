import { courseCategoryType, UserTransSaveInputDataType } from '@common/api/courseClass';
import { FilterType } from '@layouts/Calendar/Calendar';
import { atom } from 'recoil';

export const isIndividual = atom({
  key: 'isIndividual',
  default: true,
});

export const courseClassEnrollList = atom<UserTransSaveInputDataType[]>({
  key: 'courseClassEnrollList',
  default: [],
});

export const courseClassEnrollInfo = atom<{
  courseCategoryType?: courseCategoryType;
  courseBusinessType?: FilterType;
  seq: number;
} | null>({
  key: 'courseClassEnrollInfo',
  default: null,
});
