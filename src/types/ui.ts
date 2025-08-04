export interface Option {
  id: string;
  value: string;
  label?: string;
};

export interface SearchSelectProps {
  options: Option[] ;
  placeholder?: string;
  onSelect: (option: Option) => void;
  selected?: Option | null;
  className?: string
};
