/**
 * useModal.tsx
 * This hooks is used to manage modal functionality throughout the project.
 */
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  closeModal,
  ModalProps,
  selectModal,
  selectModalComponent,
  selectModalContent,
  selectModalOnClose,
  selectModalonSave,
  selectModalOnSuccess,
  selectModalshowButton,
  selectModalShowTitle,
  selectModalSize,
  selectModalTitle,
  showModal,
} from "@/state/modal/slice";

export default function useModal() {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectModal);
  const title = useAppSelector(selectModalTitle);
  const showTitle = useAppSelector(selectModalShowTitle);
  const showButton = useAppSelector(selectModalshowButton);
  const content = useAppSelector(selectModalContent);
  const Component = useAppSelector(selectModalComponent);
  const size = useAppSelector(selectModalSize);
  const onSave = useAppSelector(selectModalonSave);
  const modalOnSuccess = useAppSelector(selectModalOnSuccess);
  const modalOnClose = useAppSelector(selectModalOnClose);

  const onShowModal = (props: ModalProps) => {
    dispatch(showModal(props));
  };

  const onCloseModal = () => {
    dispatch(closeModal());
    modalOnClose?.();
  };

  const onSuccessModal = (...args: any) => {
    dispatch(closeModal());
    modalOnSuccess?.(args);
  };

  return {
    size,
    title,
    onSave,
    content,
    showTitle,
    showButton,
    onShowModal,
    onCloseModal,
    onSuccessModal,
    showModal: show,
    ModalComponent: Component,
  };
}
