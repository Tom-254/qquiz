import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Button } from ".";
import { CloseIcon, LongLeftArrow } from "../assets";

interface Props {
  isOpen?: boolean;
  title?: string,
  mainButtonTitle?: string,
  next?: boolean;
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
  goBack?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

const CustomDialog = ({ isOpen, title, mainButtonTitle, next=false, closeModal, goBack, children }: Props) => {
  // const [isOpen, setIsOpen] = useState(true);

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={() => ""}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-[20px] bg-white text-left  shadow-xl transition-all">
                  <Dialog.Title className="flex flex-col  gap-[16px] bg-white w-full py-[16px] h-full border-b-[1px] border-light">
                    <div className="flex flex-row items-center justify-between px-[24px] mb-auto">
                      <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b-20)]">
                        {title}
                      </p>
                      <Button type="link" buttonIconRight={<CloseIcon />} onClick={closeModal} />
                    </div>
                  </Dialog.Title>
                  <Dialog.Description className="p-[24px]">
                    {children}
                  </Dialog.Description>
                  <div className="px-[24px] py-[16px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
                    {next && <div className="mx-auto sm:mx-0">
                      <Button type="link" buttonIconLeft={<LongLeftArrow />} onClick={goBack}>
                          Back
                        </Button>
                    </div>}
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
                      <Button type="tertiary" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button>
                        {mainButtonTitle}
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CustomDialog;
