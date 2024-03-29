import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';
import { S3Files } from 'types/file';
import { ProductStatus } from '@common/api/course';

export interface ForumInput {
  content?: string;
  courseSeq?: number;
  status?: ProductStatus.APPROVE,
  subject?: string;
}

export interface Forum {
  courseSeq: number;
  createdDtime: string;
  modifiedDtime: string;
  regIp: string;
  seq: number;
  status: number;
  subject: string;
  updIp: string;
  userSeq: number;
  content: string;
  s3Files: S3Files;
}

export function useForumList({ courseSeq, page, elementCnt }: {
  courseSeq: number, page: number, elementCnt?: number
}) {
  const key = courseSeq
    ? [ `/forum/tutor`, { params: { courseSeq: courseSeq, page, elementCnt } } ]
    : null;

  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Forum[]>>>(key, GET);

  return {
    forumPaginationResult: data?.data,
    forumPaginationResultError: error,
    mutate
  };
}

export function useForum(forumId: number | null) {
  const { data, error, mutate } = useSWR<SWRResponse<Forum>>(forumId ? `/forum/tutor/${forumId}` : null, GET);

  return {
    forum: data?.data,
    forumError: error,
    mutate
  };
}

export async function uploadForum(forumInput: ForumInput): Promise<Forum> {
  const { data } = await POST(`/forum/tutor`, forumInput);
  return data;
}

export function modifyForum(forumId: number, forumInput: ForumInput) {
  return PUT(`/forum/tutor/${forumId}`, forumInput);
}

export async function removeForum(forumId: number) {
  return await DELETE(`/forum/tutor/${forumId}`);
}
