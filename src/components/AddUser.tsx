"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { API_URL } from "@/utils/constants";

const AddUser = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState<string>("");

  const handleEmail = (e: string) => {
    setEmail(e);
  };

  const handleClick = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        avatar:
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/277.jpg",
      }),
    });
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add a User" centered>
        <form className="flex flex-col gap-4" onSubmit={handleClick}>
          <div>
            <label htmlFor="name">Name</label>
            <Input placeholder="Your Name" title="Name" id="name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              value={email}
              placeholder="Your email"
              leftSection={<IconMail size={16} />}
              id="email"
              onChange={(e) => handleEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="filled" color="green">
            Add
          </Button>
        </form>
      </Modal>
      <Button onClick={open}>Add New User</Button>
    </>
  );
};

export default AddUser;
