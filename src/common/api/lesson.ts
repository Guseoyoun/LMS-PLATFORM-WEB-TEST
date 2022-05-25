import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { ContentInput, ContentType } from '@common/api/content';
import { PRODUCT_STATUS } from '@common/api/course';
import useSWR, { SWRResponse } from 'swr';
import { S3Files } from 'types/file';

export interface LessonInput {
  contentType?: ContentType;
  completeTime?: number;
  lessonNm?: string;
  mobileUrl?: string;
  pcUrl?: string;
  chapter?: number;
  totalPage?: number;
  totalTime?: number;
  min?: number;
  sec?: number;
}

export interface Lesson {
  completeTime: number;
  contentSeq: number;
  contentType: ContentType;
  createdDtime: string;
  lessonNm: string;
  mobileUrl: string;
  modifiedDtime: string;
  pcUrl: string;
  fileName: string;
  s3Files: S3Files;
  seq: number;
  chapter: number;
  status: PRODUCT_STATUS;
  totalPage: number;
  totalTime: number;
  min: number;
  sec: number;
}

export function useLessonList(contentId: number) {
  const { data, error, mutate } = useSWR<SWRResponse<Lesson[]>>(contentId ? `/lesson/adm/${contentId}` : null, GET);

  return {
    lessonList: data?.data,
    lessonListError: error,
    mutate
  };
}

export function useLesson(lessonId: number | null) {
  const { data, error } = useSWR<SWRResponse<Lesson>>(lessonId ? `/lesson/adm/detail/${lessonId}` : null, GET);

  return {
    lesson: data?.data,
    lessonError: error,
  };
}

export function uploadLessons({ contentId, lessonInput }: {
  contentId: number,
  lessonInput: LessonInput[]
}) {
  return POST(`/lesson/adm/${contentId}`, lessonInput);
}

export function modifyLesson({ lessonId, formData }: {
  lessonId: number,
  formData: FormData
}) {
  return PUT(`/lesson/adm/modification/${lessonId}`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export async function removeLesson(lessonId: number) {
  return await DELETE(`/lesson/adm/delete/${lessonId}`);
}
