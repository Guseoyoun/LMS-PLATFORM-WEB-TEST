import { regCategoryType } from "@common/api/user";

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
];

export enum TargetMainType {
  TYPE_CHILDREN = "TYPE_CHILDREN",
  TYPE_TEENAGER = "TYPE_TEENAGER",
  TYPE_ELDERLY = "TYPE_ELDERLY",
  TYPE_SELF_DRIVING = "TYPE_SELF_DRIVING",
}

export const TargetMainTypeReg = [
  { type: TargetMainType.TYPE_CHILDREN, ko: '어린이' },
  { type: TargetMainType.TYPE_TEENAGER, ko: '청소년' },
  { type: TargetMainType.TYPE_ELDERLY, ko: '어르신' },
  { type: TargetMainType.TYPE_SELF_DRIVING, ko: '자가운전자' },
]

export enum TargetSubType {
  TYPE_KINDERGARTEN = "TYPE_KINDERGARTEN",
  TYPE_ELEMENTARY = "TYPE_ELEMENTARY",
  TYPE_MIDDLE = "TYPE_MIDDLE",
  TYPE_HIGH = "TYPE_HIGH",
  TYPE_SELF_DRIVER = "TYPE_SELF_DRIVER",
  TYPE_ELDERLY = "TYPE_ELDERLY",
}


export const TargetSubTypeReg = [
  { type: TargetSubType.TYPE_KINDERGARTEN, ko: '유치원' },
  { type: TargetSubType.TYPE_ELEMENTARY, ko: '초등학교' },
  { type: TargetSubType.TYPE_MIDDLE, ko: '중학교' },
  { type: TargetSubType.TYPE_HIGH, ko: '고등학교' },
  { type: TargetSubType.TYPE_SELF_DRIVER, ko: '자가운전자' },
  { type: TargetSubType.TYPE_ELDERLY, ko: '어르신' },
]

export const TargetSubTypeChildrenReg = [
  { type: TargetSubType.TYPE_KINDERGARTEN, ko: '유치원' },
  { type: TargetSubType.TYPE_ELEMENTARY, ko: '초등학교' },
]

export const TargetSubTypeTeenagerReg = [
  { type: TargetSubType.TYPE_MIDDLE, ko: '중학교' },
  { type: TargetSubType.TYPE_HIGH, ko: '고등학교' },
]

export const TargetTypeMatch = [
  { mainType : TargetMainType.TYPE_ELDERLY, subType : TargetSubType.TYPE_ELDERLY},
  { mainType : TargetMainType.TYPE_SELF_DRIVING, subType : TargetSubType.TYPE_SELF_DRIVER},
]

export enum RoleType {
  ROLE_TRANS_USER = 'ROLE_TRANS_USER', // 저상/운수 유저
  ROLE_TRANS_MANAGER = 'ROLE_TRANS_MANAGER', // 저상/운수 관리자
  ROLE_TRAFFIC_SAFETY_USER = 'ROLE_TRAFFIC_SAFETY_USER', // 도민 유저
  ROLE_TRAFFIC_SAFETY_MANAGER = 'ROLE_TRAFFIC_SAFETY_MANAGER', // 도민 관리자
  ROLE_ADMIN = 'ROLE_ADMIN' // 전체관리자
}

export const RoleTypeReg = [
  {en: RoleType.ROLE_TRANS_USER, ko: '저상/운수 일반회원'},
  {en: RoleType.ROLE_TRANS_MANAGER, ko: '저상/운수 관리자'},
  {en: RoleType.ROLE_TRAFFIC_SAFETY_USER, ko: '도민 일반회원'},
  {en: RoleType.ROLE_TRAFFIC_SAFETY_MANAGER, ko: '도민 관리자'},
  {en: RoleType.ROLE_ADMIN, ko: '통합관리자'},
]

export const UserListConfig = [
  { label: '실명가입', value: regCategoryType.TYPE_TRANS_EDU },
  { label: '핸드폰가입', value: regCategoryType.TYPE_TRAFFIC_SAFETY_EDU },
];

export const UserRadioConfig = [
  { name: '전체',value: '' },
  { name: '저상/운수 일반회원', value: RoleType.ROLE_TRANS_USER },
  { name: '저상/운수 관리자', value: RoleType.ROLE_TRANS_MANAGER },
  { name: '도민 일반회원', value: RoleType.ROLE_TRAFFIC_SAFETY_USER },
  { name: '도민 관리자', value: RoleType.ROLE_TRAFFIC_SAFETY_MANAGER },
  { name: '통합 관리자', value: RoleType.ROLE_ADMIN }, // 차후 도민
];

export const UserRadioExcelConfig = [
  { name: '전체', value: '' },
  { name: '저상/운수_일반회원', value: RoleType.ROLE_TRANS_USER },
  { name: '저상/운수_관리자', value: RoleType.ROLE_TRANS_MANAGER },
  { name: '도민_일반회원', value: RoleType.ROLE_TRAFFIC_SAFETY_USER },
  { name: '도민_관리자', value: RoleType.ROLE_TRAFFIC_SAFETY_MANAGER },
  { name: '통합_관리자', value: RoleType.ROLE_ADMIN }, // 차후 도민
];

export const CourseTrafficTargetType = [
  { 
    type: TargetMainType.TYPE_CHILDREN, 
    ko: '어린이' ,
    child: [
      { type: TargetSubType.TYPE_KINDERGARTEN, ko: '유치원', applicants: [ 'age3', 'age4', 'age5' ] },
      { type: TargetSubType.TYPE_ELEMENTARY, ko: '초등학교', applicants: [ 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6' ] }
    ],
  },
  { 
    type: TargetMainType.TYPE_TEENAGER, 
    ko: '청소년' ,
    child: [
      { type: TargetSubType.TYPE_MIDDLE, ko: '중학교', applicants: [ 'grade1', 'grade2', 'grade3' ] },
      { type: TargetSubType.TYPE_HIGH, ko: '고등학교', applicants: [ 'grade1', 'grade2', 'grade3' ] },
    ],
  },
  { 
    type: TargetMainType.TYPE_ELDERLY, 
    ko: '어르신' ,
    child: [
      { type: TargetSubType.TYPE_ELDERLY, ko: '어르신', applicants: [ 'elderly' ] },
    ],
  },
  { 
    type: TargetMainType.TYPE_SELF_DRIVING, 
    ko: '자가운전자' ,
    child: [
      { type: TargetSubType.TYPE_SELF_DRIVER, ko: '자가운전자', applicants: [ 'selfDriver' ] },
    ],
  },
]

// 1대1 문의 타입
export enum QnaType {
  TYPE_DEFAULT = 'TYPE_DEFAULT', // 저상/운수 1대1문의
  TYPE_PROVINCIAL = 'TYPE_PROVINCIAL', // 도민 1대1문의
}

export enum QnaSubType {
  TYPE_SIGNUP_OR_SIGNIN = 'TYPE_SIGNUP_OR_SIGNIN',
  TYPE_EDU_OR_COMPLETE = 'TYPE_EDU_OR_COMPLETE',
  TYPE_WEB_OR_APP = 'TYPE_WEB_OR_APP',
  TYPE_ETC = 'TYPE_ETC',
}

export const QnaTypeTabsConfig = [
  { name: '전체', value: '' },
  { name: '운수/저상', value: QnaType.TYPE_DEFAULT },
  { name: '도민', value: QnaType.TYPE_PROVINCIAL },
];

export const QnaSubTypeTabsConfig = [
  { name: '회원가입/로그인', value: 'TYPE_SIGNUP_OR_SIGNIN' },
  { name: '교육/수료', value: 'TYPE_EDU_OR_COMPLETE' },
  { name: '홈페이지/앱', value: 'TYPE_WEB_OR_APP' },
  { name: '기타', value: 'TYPE_ETC' },
];