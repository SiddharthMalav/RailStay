/**
 * ModalContainer.tsx
 * This container used to wrap the modal functionality has controlled by useModal hook
 */
"use client";
import useModal from "@/hooks/useModal";
import { ModalSize } from "@/state/modal/slice";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSave, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../button";

export default function ModalContainer() {
  const {
    showModal,
    onCloseModal,
    title,
    size = ModalSize.md,
    ModalComponent,
    onSave,
    content,
    showTitle,
    showButton,
  } = useModal();

  const sizes: { [key in ModalSize]: string } = {
    [ModalSize.md]: "min-w-[40%]",
    [ModalSize.sm]: "min-w-[30%]",
    [ModalSize.lg]: "min-w-[60%]",
    [ModalSize.xl]: "min-w-[80%]",
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };
  const onClickSaveButton: any = () => {
    if (onSave) {
      onSave();
    }
    onCloseModal();
  };

  if (!showModal) return <></>;
  const renderModalButton = () => {
    if (showButton) {
      return (
        <div className="border-t border-gray-300 pt-2 pb-3 px-4 rounded-b-lg">
          <div className="flex justify-end">
            <div className="gap-1 flex">
              <Button variant="secondary" size="md" onClick={onCloseModal}>
                <FontAwesomeIcon icon={faXmark as IconProp} size="lg" />
                <span>&nbsp;Cancel</span>
              </Button>
              <Button
                type="submit"
                size="md"
                variant="primary"
                onClick={onClickSaveButton}
              >
                <FontAwesomeIcon icon={faSave as IconProp} size="lg" />
                <span>&nbsp;Save</span>
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };
  const renderShowTitle = () => {
    if (showTitle) {
      return (
        <div className="pb-[8px] border-b border-gray-300 pt-4 px-4 rounded-t-lg">
          {title}
        </div>
      );
    }
  };
  const renderContent = () => {
    if (ModalComponent) {
      return <ModalComponent />;
    }
    if (content) {
      return content;
    }
    return null;
  };

  return (
    <div
      className="!fixed top-0 left-0 !w-[100%] !h-[100%] bg-black bg-opacity-50 flex !justify-center !items-center !z-[1000]"
      onClick={handleOverlayClick}
    >
      <div
        className={`
          "!fixed transform bg-white !duration-[0.3s] !ease-out !animate-popup !block
             shadow-md max-w-[90%]
          ${sizes[size]},
          rounded-lg
        `}
      >
        {renderShowTitle()}
        <div className={`px-6 py-4" ${showButton ? "" : "h-full"}`}>
          {renderContent()}
        </div>
        {renderModalButton()}
      </div>
    </div>
  );
}
