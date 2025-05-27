"use client";

import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { XIcon } from "lucide-react";
import * as React from "react";
import { useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

export interface Option {
  value: string;
  label?: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

interface GroupOption {
  [key: string]: Option[];
}

export interface MultipleSelectorProps extends BaseFormFieldProps {
  // Original MultipleSelector props
  value?: Option[];
  defaultOptions?: Option[];
  /** Options can be string array or object array with label/value */
  options?: Option[] | string[] | { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  /** Loading component. */
  loadingIndicator?: React.ReactNode;
  /** Empty component. */
  emptyIndicator?: React.ReactNode;
  /** Debounce time for async search. Only work with `onSearch`. */
  delay?: number;
  /**
   * Only work with `onSearch` prop. Trigger search when `onFocus`.
   * For example, when user click on the input, it will trigger the search to get initial options.
   **/
  triggerSearchOnFocus?: boolean;
  /** async search */
  onSearch?: (value: string) => Promise<Option[]>;
  /**
   * sync search. This search will not showing loadingIndicator.
   * The rest props are the same as async search.
   * i.e.: creatable, groupBy, delay.
   **/
  onSearchSync?: (value: string) => Option[];
  onChange?: (options: Option[]) => void;
  /** Enhanced onChange that returns string array for easier integration */
  onValueChange?: (values: string[]) => void;
  /** Limit the maximum number of selected options. */
  maxSelected?: number;
  /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
  onMaxSelected?: (maxLimit: number) => void;
  /** Hide the placeholder when there are options selected. */
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  /** Group the options base on provided key. */
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  /**
   * First item selected is a default behavior by cmdk. That is why the default is true.
   * This is a workaround solution by add a dummy item.
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean;
  /** Allow user to create option when there is no option matched. */
  creatable?: boolean;
  /** Props of `Command` */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** Props of `CommandInput` */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >;
  /** hide the clear all button. */
  hideClearAllButton?: boolean;
  /** Custom empty text */
  emptyText?: string;
  /** Custom loading text */
  loadingText?: string;
  /** Enable/disable search functionality */
  searchable?: boolean;
}

export interface MultipleSelectorRef {
  selectedValue: Option[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Optimized option transformation with memoization
function transformOptions(
  options: Option[] | string[] | { value: string; label: string; disabled?: boolean }[],
): Option[] {
  return options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    if ("disabled" in option) {
      return {
        value: option.value,
        label: option.label,
        disable: !!option.disabled,
      };
    }
    return option as Option;
  });
}

function transToGroupOption(options: Option[], groupBy?: string): GroupOption {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return { "": options };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption: GroupOption, picked: Option[]): GroupOption {
  const cloneOption: GroupOption = {};

  for (const [key, value] of Object.entries(groupOption)) {
    cloneOption[key] = value.filter((val) => !picked.find((p) => p.value === val.value));
  }
  return cloneOption;
}

function isOptionsExist(groupOption: GroupOption, targetOption: Option[]): boolean {
  for (const [, value] of Object.entries(groupOption)) {
    if (value.some((option) => targetOption.find((p) => p.value === option.value))) {
      return true;
    }
  }
  return false;
}

const CommandEmpty = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
    const render = useCommandState((state) => state.filtered.count === 0);

    if (!render) return null;

    return (
      <div
        className={cn("px-2 py-4 text-center text-sm", className)}
        cmdk-empty=""
        role="presentation"
        {...props}
      />
    );
  },
);

CommandEmpty.displayName = "CommandEmpty";

const MultipleSelector = React.forwardRef<HTMLInputElement, MultipleSelectorProps>(
  (
    {
      label,
      error,
      hint,
      required,
      showHint = true,
      value,
      onChange,
      onValueChange,
      placeholder = "Select options...",
      defaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      onSearchSync,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
      hideClearAllButton = false,
      emptyText = "No options found",
      loadingText = "Loading...",
      searchable = true,
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [onScrollbar, setOnScrollbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const [selected, setSelected] = React.useState<Option[]>(value || []);
    const [inputValue, setInputValue] = React.useState("");
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    // Memoized transformed options
    const transformedDefaultOptions = useMemo(() => transformOptions(defaultOptions), [defaultOptions]);

    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(transformedDefaultOptions, groupBy),
    );

    // Check if max selected is reached
    const isMaxSelected = useMemo(() => selected.length >= maxSelected, [selected.length, maxSelected]);

    // Enhanced onChange handler with memoization
    const handleOptionsChange = useCallback(
      (newOptions: Option[]) => {
        setSelected(newOptions);
        onChange?.(newOptions);
        onValueChange?.(newOptions.map((option) => option.value));
      },
      [onChange, onValueChange],
    );

    const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        inputRef.current.blur();
      }
    }, []);

    const handleSelect = useCallback(
      (option: Option) => {
        if (selected.length >= maxSelected) {
          onMaxSelected?.(maxSelected);
          return;
        }
        const newOptions = [...selected, option];
        handleOptionsChange(newOptions);
        if (newOptions.length === maxSelected) {
          onMaxSelected?.(newOptions.length);
          inputRef.current?.focus();
        }
      },
      [selected, maxSelected, onMaxSelected, handleOptionsChange],
    );

    const handleUnselect = useCallback(
      (option: Option) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        handleOptionsChange(newOptions);
      },
      [handleOptionsChange, selected],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "" && selected.length > 0) {
              const lastSelectOption = selected[selected.length - 1];
              if (!lastSelectOption.fixed) {
                handleUnselect(selected[selected.length - 1]);
              }
            }
          }
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [handleUnselect, selected],
    );

    const handleClearAll = useCallback(() => {
      const newSelected = selected.filter((s) => s.fixed);
      handleOptionsChange(newSelected);
    }, [selected, handleOptionsChange]);

    // Event listeners for click outside
    useEffect(() => {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      };
    }, [open, handleClickOutside]);

    // Sync external value changes
    useEffect(() => {
      if (value) {
        setSelected(value);
      }
    }, [value]);

    // Handle options updates
    useEffect(() => {
      if (!arrayOptions || onSearch) {
        return;
      }
      const transformedOptions = transformOptions(arrayOptions);
      const newOption = transToGroupOption(transformedOptions, groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [arrayOptions, groupBy, onSearch, options]);

    // Sync search effect
    useEffect(() => {
      const doSearchSync = () => {
        const res = onSearchSync?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
      };
      const exec = async () => {
        if (!onSearchSync || !open) return;
        if (triggerSearchOnFocus) {
          doSearchSync();
        }
        if (debouncedSearchTerm) {
          doSearchSync();
        }
      };
      void exec();
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus, onSearchSync]);

    // Async search effect
    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };
      const exec = async () => {
        if (!onSearch || !open) return;
        if (triggerSearchOnFocus) {
          await doSearch();
        }
        if (debouncedSearchTerm) {
          await doSearch();
        }
      };
      void exec();
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus, onSearch]);

    // Memoized creatable item
    const CreatableItem = useMemo(() => {
      if (!creatable) return null;
      if (
        !inputValue ||
        inputValue.length === 0 ||
        isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
        selected.find((s) => s.value === inputValue)
      ) {
        return null;
      }
      const Item = (
        <CommandItem
          value={inputValue}
          className="cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value: string) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(maxSelected);
              return;
            }
            setInputValue("");
            const newOptions = [...selected, { value, label: value }];
            handleOptionsChange(newOptions);
          }}
        >
          {`Add "${inputValue}"`}
        </CommandItem>
      );
      if (!onSearch && inputValue.length > 0) {
        return Item;
      }
      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
        return Item;
      }
      return null;
    }, [
      creatable,
      inputValue,
      options,
      selected,
      onSearch,
      debouncedSearchTerm,
      isLoading,
      maxSelected,
      onMaxSelected,
      handleOptionsChange,
    ]);

    // Memoized empty item
    const EmptyItem = useMemo(() => {
      const defaultEmptyIndicator = <p className="text-center text-sm text-muted-foreground">{emptyText}</p>;
      const indicator = emptyIndicator || defaultEmptyIndicator;
      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {indicator}
          </CommandItem>
        );
      }
      return <CommandEmpty>{indicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, emptyText, onSearch, options]);

    // Memoized selectable options
    const selectables = useMemo<GroupOption>(
      () => removePickedOption(options, selected),
      [options, selected],
    );

    // Memoized command filter
    const commandFilter = useMemo(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }
      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
        };
      }
      return undefined;
    }, [creatable, commandProps?.filter]);

    // Memoized loading indicator
    const defaultLoadingIndicator = useMemo(
      () => <p className="text-center text-sm text-muted-foreground">{loadingText}</p>,
      [loadingText],
    );

    // Memoized selected badges
    const selectedBadges = useMemo(() => {
      return selected.map((option) => (
        <div
          key={option.value}
          className={cn(
            "animate-fadeIn cursor-pointer bg-background text-secondary-foreground hover:bg-background relative inline-flex h-7 items-center rounded-md border ps-2 pe-7 pl-2 text-xs font-medium transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-fixed:pe-2",
            badgeClassName,
          )}
          data-fixed={option.fixed ? true : undefined}
          data-disabled={disabled || undefined}
        >
          {option.label || option.value}
          {!option.fixed && (
            <button
              className="text-muted-foreground/80 cursor-pointer hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute -inset-y-px -end-px flex size-7 items-center justify-center rounded-e-md border border-transparent p-0 outline-hidden transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUnselect(option);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => handleUnselect(option)}
              aria-label="Remove"
            >
              <XIcon size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      ));
    }, [selected, badgeClassName, disabled, handleUnselect]);

    return (
      <FormFieldWrapper
        label={label}
        error={error}
        hint={hint}
        required={required}
        showHint={showHint}
        disabled={disabled}
        className={className}
      >
        {(id, describedBy) => (
          <Command
            ref={dropdownRef}
            {...commandProps}
            onKeyDown={(e) => {
              handleKeyDown(e);
              commandProps?.onKeyDown?.(e);
            }}
            className={cn("h-auto overflow-visible bg-transparent", commandProps?.className)}
            shouldFilter={
              commandProps?.shouldFilter !== undefined ? commandProps.shouldFilter : searchable && !onSearch
            }
            filter={commandFilter}
          >
            <div
              className={cn(
                "border-input py-1 focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative rounded-md border text-sm transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50",
                {
                  "p-1": selected.length !== 0,
                  "cursor-text": !disabled && selected.length !== 0,
                },
                !hideClearAllButton && "pe-9",
                error && "border-destructive focus-within:ring-destructive/20",
              )}
              onClick={() => {
                if (disabled) return;
                inputRef?.current?.focus();
              }}
            >
              <div className="flex flex-wrap gap-1">
                {selectedBadges}
                <CommandPrimitive.Input
                  {...inputProps}
                  id={id}
                  ref={inputRef}
                  value={inputValue}
                  disabled={disabled}
                  onValueChange={(value) => {
                    setInputValue(value);
                    inputProps?.onValueChange?.(value);
                  }}
                  onBlur={(event) => {
                    if (!onScrollbar) {
                      setOpen(false);
                    }
                    inputProps?.onBlur?.(event);
                  }}
                  onFocus={(event) => {
                    setOpen(true);
                    if (triggerSearchOnFocus) {
                      onSearch?.(debouncedSearchTerm);
                    }
                    inputProps?.onFocus?.(event);
                  }}
                  placeholder={hidePlaceholderWhenSelected && selected.length !== 0 ? "" : placeholder}
                  className={cn(
                    "placeholder:text-muted-foreground/70 flex-1 bg-transparent outline-hidden disabled:cursor-not-allowed",
                    {
                      "w-full": hidePlaceholderWhenSelected,
                      "px-3 py-1": selected.length === 0,
                      "ml-1": selected.length !== 0,
                    },
                    inputProps?.className,
                  )}
                  aria-describedby={describedBy}
                  aria-invalid={!!error}
                />
                <button
                  type="button"
                  onClick={handleClearAll}
                  className={cn(
                    "text-muted-foreground/80 cursor-pointer hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute end-0 top-0 flex size-9 items-center justify-center rounded-md border border-transparent transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
                    (hideClearAllButton ||
                      disabled ||
                      selected.length < 1 ||
                      selected.filter((s) => s.fixed).length === selected.length) &&
                      "hidden",
                  )}
                  aria-label="Clear all"
                >
                  <XIcon size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div
                className={cn(
                  "border-input absolute top-2 z-10 w-full overflow-hidden rounded-md border",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                  !open && "hidden",
                )}
                data-state={open ? "open" : "closed"}
              >
                {open && (
                  <CommandList
                    className="bg-popover text-popover-foreground shadow-lg outline-hidden"
                    onMouseLeave={() => {
                      setOnScrollbar(false);
                    }}
                    onMouseEnter={() => {
                      setOnScrollbar(true);
                    }}
                    onMouseUp={() => {
                      inputRef?.current?.focus();
                    }}
                  >
                    {isLoading ? (
                      <>{loadingIndicator || defaultLoadingIndicator}</>
                    ) : (
                      <>
                        {EmptyItem}
                        {CreatableItem}
                        {!selectFirstItem && <CommandItem value="-" className="hidden" />}
                        {Object.entries(selectables).map(([key, dropdowns]) => (
                          <CommandGroup
                            key={key}
                            heading={key}
                            className="h-full overflow-auto cursor-pointer"
                          >
                            {dropdowns.map((option) => {
                              return (
                                <CommandItem
                                  key={option.value}
                                  value={option.value}
                                  disabled={option.disable}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onSelect={() => handleSelect(option)}
                                  className={cn(
                                    "cursor-pointer",
                                    option.disable && "pointer-events-none cursor-not-allowed opacity-50",
                                    isMaxSelected && "opacity-50 cursor-not-allowed",
                                  )}
                                >
                                  {option.label || option.value}
                                  {isMaxSelected && (
                                    <span className="ml-auto text-xs text-muted-foreground">Max reached</span>
                                  )}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        ))}
                      </>
                    )}
                  </CommandList>
                )}
              </div>
            </div>
          </Command>
        )}
      </FormFieldWrapper>
    );
  },
);

MultipleSelector.displayName = "MultipleSelector";

export default React.memo(MultipleSelector);
