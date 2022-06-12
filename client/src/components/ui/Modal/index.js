import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

// Hooks
import { useWeb3 } from "components/providers";

export default function Modal({
  show,
  closeModal,
  hash,
  account,
  web3,
  contract,
}) {
  const [address, setAddress] = React.useState();

  const onAdd = async () => {
    console.log(hash);
    await contract.methods.approve(address, hash).send({ from: account?.data });
    closeModal();
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-md font-bold tracking-tighter text-center montserrat leading-6 text-gray-900"
                  >
                    Enter the email address of the person you want to share this
                    document with.
                  </Dialog.Title>

                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-5 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="mt-2 flex">
                    <button
                      type="button"
                      className="inline-flex mx-auto justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onAdd}
                    >
                      Add!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
