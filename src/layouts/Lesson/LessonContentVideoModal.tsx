import { ModalQuiz } from '@components/ui/Modal';
interface Props {
  open: boolean;
  courseSeq?: number;
  handleClose: () => void;
}
const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: 'ID', align: 'left' },
  { name: '콘텐츠명', align: 'right' },
  { name: '연결된 과정 ID', align: 'right' },
  { name: '연결된 과정명', align: 'right' },
];
export function LessonContentVideoModal({
  open,
  handleClose,
  courseSeq,
}: Props) {
  return (
    <ModalQuiz
      title='헬로'
      maxWidth='md'
      // loading={!data}
      open={open}
      onClose={handleClose}
      onCloseModal={handleClose}
      fullWidth
    />
  );
}
