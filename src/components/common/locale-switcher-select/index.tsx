"use client";

import { localesOption } from "@/core/i18n/config";
import { Combobox, ThemeIcon, useCombobox } from "@mantine/core";
import { useLocale } from "next-intl";
import TooltipButton from "../tooltip-button";
import { setLocale } from "@/core/i18n/locale";

export default function LocaleSwitcherSelect() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const locale = useLocale();

  const options = localesOption.map((item) => (
    <Combobox.Option value={item.value} key={item.value} fz={12} p={0}>
      <ThemeIcon
        color="var(--card-text)"
        variant={item.value === locale ? "light" : "transparent"}
      >
        {item.label}
      </ThemeIcon>
    </Combobox.Option>
  ));
  return (
    <Combobox
      store={combobox}
      withArrow
      width={37}
      onOptionSubmit={async (nextLocale) => {
        await setLocale(nextLocale);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TooltipButton
          tooltip="Language"
          className=" cursor-pointer"
          onClick={() => combobox.toggleDropdown()}
          variant="transparent"
          fz={12}
          fw={600}
        >
          {locale.toUpperCase()}
        </TooltipButton>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
