import {Card, Input} from "@heroui/react";
import defaultPerson from "../../assets/images/deafultPerson2.jpg"
import CreatePostModal from "./CreatePostModal";
import {useDisclosure} from "@heroui/react";
export default function CreatePost() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <Card>
      <div className=" flex items-center gap-2 justify-around p-2">
        <div>
            <img src={defaultPerson} alt="" className="w-15 rounded-b-3xl" />
        </div>
         <Input onClick={onOpen} isReadOnly type="text" placeholder="What s on ur mind, Mounir ?" />
      </div>
    </Card>
    <CreatePostModal isOpen={isOpen} onOpenChange={onOpenChange}/>
    </>
  );
}
