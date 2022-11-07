import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export interface TagType {
  key: string;
  label: string;
}

export type SearchDataType = {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
};

export type OfflineDataType = {
  name: string;
  cvr: number;
};

export interface RadarData {
  name: string;
  label: string;
  value: number;
}

export type AnalysisData = {
  visitData: VisitDataType[];
  visitData2: VisitDataType[];
  salesData: VisitDataType[];
  searchData: SearchDataType[];
  offlineData: OfflineDataType[];
  offlineChartData: OfflineChartData[];
  salesTypeData: VisitDataType[];
  salesTypeDataOnline: VisitDataType[];
  salesTypeDataOffline: VisitDataType[];
  radarData: DataItem[];
};

export type GeographicType = {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
};

export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export type CurrentUser = {
  name: string;
  avatar: string;
  userid: string;
  notice: NoticeType[];
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
};

export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type ActivitiesType = {
  id: string;
  updatedAt: string;
  user: {
    name: string;
    avatar: string;
  };
  group: {
    name: string;
    link: string;
  };
  project: {
    name: string;
    link: string;
  };

  template: string;
};

export type RadarDataType = {
  label: string;
  name: string;
  value: number;
};


export type AddBoardType = {
    id?: string;
    name: string;
    content: string;
};

export type DelUserTYPE = {
    user_id: string;
}

export type UptUserType = {
    user_id: string;
    username?: string;
    nickname?: string;
    password?: string;
    enabled?: string;
    email?: string;
    userface?: string;
}

export type GetPostDetailType = {
    forum_id: string;
}

export type UptPostType = {
    title: string;
    content: string;
    classify_id:string
}

export type UptComment = {
    content: string;
    user_id: string;
    forum: string;
}

export type UptParentComment = {
    comment_id: number;
    content: string;
    user_id: string;
    forum_id: number;
    root_comment_id: number;
    to_comment_id: 0;
}

export type DelPosType = {
    forum_id:string
}

export type SearchPostType = {
    forum_title: string;
}

export type UptPlateType = {
    name: string;
    classifyid?: string;
}

export type UptPasswordType = {
    user_id: string;
    password: string;
}

export type DelComment = {
    comment_id: string;
    user_id: string;
}