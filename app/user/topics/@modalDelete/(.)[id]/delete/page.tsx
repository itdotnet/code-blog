"use client";
import { deleteBlog } from "@/app/lib/actions/blog";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  params: { id: string };
}
const ModalDeleteTopicPage = ({ params }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  

  const handldeDelete = async () => {
    try {
      await deleteBlog(+params.id);

      router.push("/user/topics");

      setIsOpen(false);
    } catch (e) {
      throw e;
    }
  };

  const handleCancel = () => {
    router.push("/user/topics");
    setIsOpen(false);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={handleCancel}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Delete Topic</ModalHeader>
        <ModalBody>
          <p className="capitalize">are you sure to delete the topic?</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handldeDelete} color="danger" variant="light">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteTopicPage;