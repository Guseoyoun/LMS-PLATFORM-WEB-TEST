export enum businessType {
  PASSENGER = 'PASSENGER', // 여객
  FREIGHT = 'FREIGHT', // 화물
}

export enum businessSubType {
  BUS = 'BUS', //버스 - 여객
  CHARTER_BUS = 'CHARTER_BUS', //전세버스 - 여객
  SPECIAL_PASSENGER = 'SPECIAL_PASSENGER', //특수여객 - 여객
  CORPORATE_TAXI = 'CORPORATE_TAXI', //법인택시 - 여객
  PRIVATE_TAXI = 'PRIVATE_TAXI', //개인택시 - 여객
  GENERAL_CARGO = 'GENERAL_CARGO', //일반화물 - 화물
  CONSIGNMENT = 'CONSIGNMENT', //용달화물 - 화물
  INDIVIDUAL_CARGO = 'INDIVIDUAL_CARGO', //개별화물 - 화물
  // SPECIAL_TRANSPORTATION = 'SPECIAL_TRANSPORTATION', //특별교통수단
  // KNEELING_BUS = 'KNEELING_BUS', //저상버스
  // DANGEROUS_GOODS = 'DANGEROUS_GOODS', //위험물
  // DESIGNATED_WASTE = 'DESIGNATED_WASTE', //지정폐기물
  // HAZARDOUS_CHEMICALS = 'HAZARDOUS_CHEMICALS', //유해화학물질
  // HIGH_PRESSURE_GAS_FLAMMABLE = 'HIGH_PRESSURE_GAS_FLAMMABLE', //고압가스(가연성)
  // HIGH_PRESSURE_GAS_TOXIC = 'HIGH_PRESSURE_GAS_TOXIC', //고압가스(독성)
}
export const businessTypeReg = [ 
  { type: businessType.PASSENGER, ko: '여객' },
  { type: businessType.FREIGHT, ko: '화물' },
];

export const businessSubTypeReg = [ // 업종
  { type: businessSubType.BUS, ko: '버스' },
  { type: businessSubType.CHARTER_BUS, ko: '전세버스' },
  { type: businessSubType.SPECIAL_PASSENGER, ko: '특수여객' },
  { type: businessSubType.CORPORATE_TAXI, ko: '법인택시' },
  { type: businessSubType.PRIVATE_TAXI, ko: '개인택시' },
  { type: businessSubType.GENERAL_CARGO, ko: '일반화물' },
  { type: businessSubType.CONSIGNMENT, ko: '용달화물' },
  { type: businessSubType.INDIVIDUAL_CARGO, ko: '개별화물' },
  // { type: businessSubType.SPECIAL_TRANSPORTATION, ko: '특별교통수단' },
  // { type: businessSubType.KNEELING_BUS, ko: ' 저상버스' },
  // { type: businessSubType.DANGEROUS_GOODS, ko: '위험물' },
  // { type: businessSubType.DESIGNATED_WASTE, ko: '지정폐기물' },
  // { type: businessSubType.HAZARDOUS_CHEMICALS, ko: '유해화학물질' },
  // { type: businessSubType.HIGH_PRESSURE_GAS_FLAMMABLE, ko: '고압가스(가연성)' },
  // { type: businessSubType.HIGH_PRESSURE_GAS_TOXIC, ko: '고압가스(독성)' },
];

export const businessSubTypePassengerReg = [
  { type: businessSubType.BUS, ko: '버스' },
  { type: businessSubType.CHARTER_BUS, ko: '전세버스' },
  { type: businessSubType.SPECIAL_PASSENGER, ko: '특수여객' },
  { type: businessSubType.CORPORATE_TAXI, ko: '법인택시' },
  { type: businessSubType.PRIVATE_TAXI, ko: '개인택시' },
]

export const businessSubTypeFreightReg = [
  { type: businessSubType.CONSIGNMENT, ko: '용달화물' },
  { type: businessSubType.GENERAL_CARGO, ko: '일반화물' },
  { type: businessSubType.INDIVIDUAL_CARGO, ko: '개별화물' },
]

export const locationList = [ // 차량등록지
  { ko: '충남', en: 'CHUNGNAM' },
  { ko: '천안', en: 'CHEONAN' },
  { ko: '공주', en: 'GONGJU' },
  { ko: '보령', en: 'BORYEONG' },
  { ko: '아산', en: 'ASAN' },
  { ko: '서산', en: 'SEOSAN' },
  { ko: '논산', en: 'NONSAN' },
  { ko: '계룡', en: 'GYERYONG' },
  { ko: '당진', en: 'DANGJIN' },
  { ko: '금산', en: 'GEUMSAN' },
  { ko: '부여', en: 'BUYEO' },
  { ko: '서천', en: 'SEOCHEON' },
  { ko: '청양', en: 'CHEONGYANG' },
  { ko: '홍성', en: 'HONGSEONG' },
  { ko: '예산', en: 'YESAN' },
  { ko: '태안', en: 'TAEAN' },
  { ko: '세종', en: 'SEJONG' },
  // { ko: '서울', en: 'SEOUL' },
  // { ko: '부산', en: 'BUSAN' },
  // { ko: '대구', en: 'DAEGU' },
  // { ko: '인천', en: 'INCHEON' },
  // { ko: '광주', en: 'GWANGJU' },
  // { ko: '대전', en: 'DAEJEON' },
  // { ko: '울산', en: 'ULSAN' },
  // { ko: '경기', en: 'GYEONGGI' },
  // { ko: '강원', en: 'GANGWON' },
  // { ko: '충북', en: 'CHUNGBUK' },
  // { ko: '전북', en: 'JEONBUK' },
  // { ko: '전남', en: 'JEONNAM' },
  // { ko: '경북', en: 'GYEONGBUK' },
  // { ko: '경남', en: 'GYEONGNAM' },
  // { ko: '제주', en: 'JEJU' },
];
export const residenceList = [ // 거주지
  // { ko: '충남', en: 'CHUNGNAM' },
  { ko: '천안', en: 'CHEONAN' },
  { ko: '공주', en: 'GONGJU' },
  { ko: '보령', en: 'BORYEONG' },
  { ko: '아산', en: 'ASAN' },
  { ko: '서산', en: 'SEOSAN' },
  { ko: '논산', en: 'NONSAN' },
  { ko: '계룡', en: 'GYERYONG' },
  { ko: '당진', en: 'DANGJIN' },
  { ko: '금산', en: 'GEUMSAN' },
  { ko: '부여', en: 'BUYEO' },
  { ko: '서천', en: 'SEOCHEON' },
  { ko: '청양', en: 'CHEONGYANG' },
  { ko: '홍성', en: 'HONGSEONG' },
  { ko: '예산', en: 'YESAN' },
  { ko: '태안', en: 'TAEAN' },
  { ko: '세종', en: 'SEJONG' },
  { ko: '서울', en: 'SEOUL' },
  { ko: '부산', en: 'BUSAN' },
  { ko: '대구', en: 'DAEGU' },
  { ko: '인천', en: 'INCHEON' },
  { ko: '광주', en: 'GWANGJU' },
  { ko: '대전', en: 'DAEJEON' },
  { ko: '울산', en: 'ULSAN' },
  { ko: '경기', en: 'GYEONGGI' },
  { ko: '강원', en: 'GANGWON' },
  { ko: '충북', en: 'CHUNGBUK' },
  { ko: '전북', en: 'JEONBUK' },
  { ko: '전남', en: 'JEONNAM' },
  { ko: '경북', en: 'GYEONGBUK' },
  { ko: '경남', en: 'GYEONGNAM' },
  { ko: '제주', en: 'JEJU' },
];


export const businessSubTypeCategoryReg = [
  {
    category: 'PASSENGER',
    type: '버스',
    enType: businessSubType.BUS,
  },
  {
    category: 'PASSENGER',
    type: '전세버스',
    enType: businessSubType.CHARTER_BUS,
  },
  {
    category: 'PASSENGER',
    type: '특수여객',
    enType: businessSubType.SPECIAL_PASSENGER,
  },
  {
    category: 'PASSENGER',
    type: '법인택시',
    enType: businessSubType.CORPORATE_TAXI,
  },
  {
    category: 'FREIGHT',
    type: '일반화물',
    enType: businessSubType.GENERAL_CARGO,
  },
  {
    category: 'PASSENGER',
    type: '개인택시',
    enType: businessSubType.PRIVATE_TAXI,
  },
  {
    category: 'FREIGHT',
    type: '용달화물',
    enType: businessSubType.CONSIGNMENT,
  },
  {
    category: 'FREIGHT',
    type: '개별화물',
    enType: businessSubType.INDIVIDUAL_CARGO,
  },
  // {
  //   category: 'PASSENGER',
  //   type: '특별교통수단',
  //   enType: courseSubCategoryType.SPECIAL_TRANSPORTATION,
  // },
  // {
  //   category: 'PASSENGER',
  //   type: '저상버스',
  //   enType: courseSubCategoryType.KNEELING_BUS,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '위험물',
  //   enType: courseSubCategoryType.DANGEROUS_GOODS,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '지정폐기물',
  //   enType: courseSubCategoryType.DESIGNATED_WASTE,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '유해화학물질',
  //   enType: courseSubCategoryType.HAZARDOUS_CHEMICALS,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '고압가스(가연성)',
  //   enType: courseSubCategoryType.HIGH_PRESSURE_GAS_FLAMMABLE,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '고압가스(독성)',
  //   enType: courseSubCategoryType.HIGH_PRESSURE_GAS_TOXIC,
  // },
];
