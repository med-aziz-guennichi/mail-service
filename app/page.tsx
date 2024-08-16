"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useEmailSender } from "@/hooks/useEmailSender";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState([""]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [sendTime, setSendTime] = useState('');
  const { loading, sendEmail } = useEmailSender();

  const handleSubmit = async () => {
    await sendEmail(inputs, subject, description, sendTime);
  };
  return (
    <Dialog open>
    <DialogTrigger asChild>
      <Button variant="outline">Send Email</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Compose Email</DialogTitle>
        <DialogDescription>
          Fill in the details below to send an email. Click send when you're ready.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="col-span-4">
            <Label>Subject</Label>
            <Input 
              value={subject} 
              placeholder="Enter the subject of your email." 
              onChange={(e) => setSubject(e.target.value)} 
            />
            <Label>Message</Label>
            <Textarea 
              placeholder="Enter your message here." 
              onChange={(e) => setDescription(e.target.value)} 
            />
            <Label>Schedule Send Time</Label>
            <Input 
              type="datetime-local" 
              value={sendTime} 
              onChange={(e) => setSendTime(e.target.value)} 
            />
          </div>
          <hr className="col-span-4 border-gray-300" />
          {
            inputs.map((input, index) => (
              <div key={index} className="col-span-4">
                <Label>Recipient Email</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="email"
                    value={input}
                    placeholder="example@domain.com"
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[index] = e.target.value;
                      setInputs(newInputs);
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newInputs = [...inputs];
                      newInputs.splice(index, 1);
                      setInputs(newInputs);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          }
          <Button
          className="col-span-4"
            variant="outline"
            onClick={() => {
              setInputs([...inputs, ""]);
            }}
          >
            Add another email
          </Button>
        </div>
      </div>
      <DialogFooter>
        <Button disabled={loading || inputs.join(", ").toString().length === 0 || subject === "" || description === ""} onClick={handleSubmit}>
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : "Send"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  
  );
}
