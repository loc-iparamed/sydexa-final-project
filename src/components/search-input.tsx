import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(value);

  // Trigger onChange immediately for search functionality
  useEffect(() => {
    if (internalValue !== value) {
      onChange(internalValue);
    }
  }, [internalValue, onChange, value]);

  // Update internal value when external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
      <Input
        placeholder={placeholder}
        value={internalValue}
        onChange={e => setInternalValue(e.target.value)}
        className='pl-12 py-3 rounded-full border-2 border-slate-300 focus:border-blue-500 transition-colors duration-300 shadow-sm'
      />
    </div>
  );
};

export default SearchInput;
