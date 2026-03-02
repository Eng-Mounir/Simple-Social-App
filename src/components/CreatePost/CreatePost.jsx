import { Card, Input, Avatar, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { HiPhotograph, HiVideoCamera, HiEmojiHappy } from "react-icons/hi";
import { BsCalendar2Event, BsFileText } from "react-icons/bs";
import { BiSolidTag } from "react-icons/bi";
import defaultPerson from "../../assets/images/deafultPerson2.jpg";
import CreatePostModal from "./CreatePostModal";
import { useDisclosure } from "@heroui/react";

export default function CreatePost() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
          <div className="flex items-center gap-3 p-4">
            <Avatar 
              src={defaultPerson} 
              className="w-12 h-12 ring-2 ring-blue-100 dark:ring-blue-900"
            />
            <Input
              onClick={onOpen}
              isReadOnly
              type="text"
              placeholder="Share your thoughts..."
              className="flex-1"
              classNames={{
                input: "bg-slate-100 dark:bg-slate-800 border-0 text-sm",
                inputWrapper: "hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              }}
              startContent={
                <HiPhotograph className="text-blue-500 w-5 h-5" />
              }
            />
          </div>
          
          <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-slate-200 dark:border-slate-800">
            <ActionButton icon={<HiPhotograph />} label="Photo" color="text-blue-500" />
            <ActionButton icon={<HiVideoCamera />} label="Video" color="text-red-500" />
            <ActionButton icon={<BiSolidTag />} label="Tag" color="text-purple-500" />
            <ActionButton icon={<HiEmojiHappy />} label="Feeling" color="text-yellow-500" />
          </div>
        </Card>
      </motion.div>
      
      <CreatePostModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

function ActionButton({ icon, label, color }) {
  return (
    <Button
      size="sm"
      variant="light"
      className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <span className={`${color} text-lg`}>{icon}</span>
      <span className="text-xs font-medium hidden sm:block">{label}</span>
    </Button>
  );
}