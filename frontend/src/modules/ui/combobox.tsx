import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/modules/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/modules/ui/popover';
import { cn } from '~/lib/utils';
import { Button } from '~/modules/ui/button';
import { ScrollArea } from '~/modules/ui/scroll-area';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AvatarWrap } from '../common/avatar-wrap';
import { useMeasure } from '~/hooks/use-measure';
import { useBreakpoints } from '~/hooks/use-breakpoints';

interface ComboBoxOption {
  value: string;
  label: string;
  url?: string | null;
}

interface ComboboxProps {
  options: ComboBoxOption[];
  name: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  renderOption?: (option: ComboBoxOption) => React.ReactNode;
  contentWidthMatchInput?: boolean;
  disabled?: boolean;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  name,
  onChange,
  placeholder,
  searchPlaceholder,
  renderOption,
  contentWidthMatchInput,
  disabled,
}) => {
  const formValue = useFormContext?.()?.getValues(name);

  const { ref, bounds } = useMeasure();
  const isMobile = useBreakpoints('max', 'sm');
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<ComboBoxOption | null>(options.find((o) => o.value === formValue) || null);

  const [searchValue, setSearchValue] = React.useState('');

  const handleSelect = (newResult: string) => {
    const result = options.find((o) => o.label === newResult);
    if (!result) return;
    setSelectedOption(result);
    onChange(result.value);
    setOpen(false);
    setSearchValue('');
  };

  // Whenever the form value changes (also on reset), update the internal state
  useEffect(() => {
    const selected = options.find((o) => o.value === formValue);
    setSelectedOption(selected || null);
  }, [formValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref as React.LegacyRef<HTMLButtonElement>}
          variant="input"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
          disabled={disabled}
        >
          {selectedOption ? (
            <div className="flex items-center gap-2">
              {name !== 'timezone' && name !== 'country' && (
                <AvatarWrap className="h-6 w-6 text-xs" type="UNKNOWN" id={selectedOption.value} name={name} url={selectedOption.url} />
              )}
              {renderOption && selectedOption ? renderOption(selectedOption) : selectedOption.label}
            </div>
          ) : (
            placeholder || ''
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" style={{ width: `${contentWidthMatchInput ? `${bounds.left + bounds.right + 2}px` : '100%'}` }} className={'p-0'}>
        <Command>
          {!isMobile && (
            <CommandInput
              value={searchValue}
              onValueChange={(searchValue) => {
                setSearchValue(searchValue);
              }}
              clearValue={setSearchValue}
              placeholder={searchPlaceholder || ''}
            />
          )}

          <CommandList>
            <CommandEmpty>No option found</CommandEmpty>
            <ScrollArea className="max-h-[30vh] h-fit overflow-y-auto">
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value?.trim().toLowerCase() + Math.floor(Math.random() * 1000)}
                    value={option.label}
                    onSelect={handleSelect}
                    className="group rounded-md flex justify-between items-center w-full leading-normal"
                  >
                    <div className="flex items-center gap-2">
                      {name !== 'timezone' && name !== 'country' && <AvatarWrap type="UNKNOWN" id={option.value} name={name} url={option.url} />}
                      {renderOption ? renderOption(option) : <> {option.label}</>}
                    </div>
                    <Check size={16} className={cn('text-success', formValue === option.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
