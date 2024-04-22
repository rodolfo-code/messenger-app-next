"use client";
import { useState } from "react";

import axios from "axios";
import Picker from "emoji-picker-react";
import { FaRegFaceSmile } from "react-icons/fa6";
import { CldUploadButton } from "next-cloudinary";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import EmojiPicker, { EmojiStyle, PickerProps } from "emoji-picker-react";

import useConversation from "@/app/hooks/useConversation";

import MessageInput from "./MessageInput";

import "./styles.css";

interface CustomPickerProps extends PickerProps {
  pickerStyle: { width: string };
  size?: number;
  open: boolean;
  emojiStyle?: EmojiStyle | undefined;
}

const CustomPicker: React.FC<CustomPickerProps> = ({ pickerStyle, onEmojiClick, open, emojiStyle, ...rest }) => {
  return (
    <div className="relative">
      <div className="absolute bottom-6">
        <Picker style={pickerStyle} onEmojiClick={onEmojiClick} open={open} emojiStyle={emojiStyle} width={32} {...rest} />
      </div>
    </div>
  );
};

const Form = () => {
  const { conversationId } = useConversation();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    const prevMessage = getValues("message");
    const addEmoji = prevMessage + event.emoji;
    setValue("message", addEmoji);
  };

  const handleOpenEmojiModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
      "
    >
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="a0uja7ql">
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <div>
        <CustomPicker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} open={open} emojiStyle={EmojiStyle.APPLE} />
        <FaRegFaceSmile onClick={handleOpenEmojiModal} className="cursor-pointer text-gray-400" size={20} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
        <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
        <button
          type="submit"
          className="
            rounded-full
            p-2
            bg-sky-500
            cursor-pointer
            hover:bg-sky-600
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
