"use client";

import cx from "clsx";
import { useState } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
} from "@mantine/core";
import classes from "./Table.module.css";

interface TableProps {
  usersData: {
    createdAt: string;
    email: string;
    avatar: string;
    id: string;
  }[];
}

export function TableSelection({ usersData }: TableProps) {
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === usersData?.length
        ? []
        : usersData?.map((item) => item.id)
    );

  const rows = usersData?.map((item) => {
    const selected = selection.includes(item.id);
    const emailUsername =
      typeof item.email === "string" ? item.email.split("@")[0] : "Unknown";
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {emailUsername}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.id}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === usersData?.length}
                indeterminate={
                  selection.length > 0 && selection.length !== usersData?.length
                }
              />
            </Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Id</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
