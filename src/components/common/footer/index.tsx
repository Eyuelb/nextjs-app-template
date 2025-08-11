"use client";
import { Center, Group } from "@mantine/core";
import { ThemeToggleButton } from "@/components/common/theme-toggle-button";
import LocaleSwitcherSelect from "../locale-switcher-select";

export function Footer() {
  return (
    <footer className="bg-[var(--card)] border-t w-full  flex items-center justify-center md:p-0">
      <Center className="w-full max-w-[1200px]">
        <Group
          justify="space-between"
          className="w-full py-1.5 pb-2 gap-2 px-6"
          wrap="nowrap"
        >
          <span />
          <Group fz={14} fw={700} gap={4} ta="center">
            Copyright &copy;
            <span>--</span>
            {new Date().getFullYear()}
          </Group>
          <Group className=" rounded-xl border gap-1" wrap="nowrap">
            <ThemeToggleButton />
            <LocaleSwitcherSelect />
          </Group>
        </Group>
      </Center>
    </footer>
  );
}
