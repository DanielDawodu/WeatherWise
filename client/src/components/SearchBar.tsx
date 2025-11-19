import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';

const searchSchema = z.object({
  city: z.string().min(1, 'Please enter a city name').trim(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      city: '',
    },
  });

  const handleSubmit = (values: SearchFormValues) => {
    onSearch(values.city);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-md mx-auto">
        <div className="relative">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search for a city..."
                    disabled={isLoading}
                    className="h-14 px-6 pr-14 text-lg rounded-full shadow-lg border-2 focus-visible:ring-4 focus-visible:ring-primary/20"
                    data-testid="input-city-search"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !form.watch('city').trim()}
            className="absolute right-1 top-1 h-12 w-12 rounded-full"
            data-testid="button-search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
