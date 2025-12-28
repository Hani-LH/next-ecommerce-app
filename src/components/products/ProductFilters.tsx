'use client';

import dynamic from 'next/dynamic';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  ProductFilters as FilterTypes,
  PRODUCT_CATEGORIES,
  PRICE_RANGES,
  SORT_OPTIONS,
} from '@/types';
import { useDebounce } from '@/hooks';
import { cn, buildUrlWithParams } from '@/utils';

const Input = dynamic(() => import('@/components/ui').then((mod) => mod.Input),{ssr: false});
const Select = dynamic(() =>
  import('@/components/ui').then((mod) => mod.Select),{ssr: false}
);
const Button = dynamic(() =>
  import('@/components/ui').then((mod) => mod.Button),{ssr: false}
);
interface ProductFiltersProps {
  onFiltersChange?: (filters: FilterTypes) => void;
}

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize empty to avoid hydration mismatch, sync after mount
  const [searchInput, setSearchInput] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Debounce search input (300ms delay)
  const debouncedSearch = useDebounce(searchInput, 300);

  // Get current filter values from URL
  const currentFilters: FilterTypes = {
    category:
      (searchParams.get('category') as FilterTypes['category']) ?? 'all',
    priceRange:
      (searchParams.get('priceRange') as FilterTypes['priceRange']) ?? 'all',
    search: searchParams.get('search') ?? '',
    sortBy: (searchParams.get('sortBy') as FilterTypes['sortBy']) ?? 'featured',
  };

  // Sync search input with URL after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const urlSearch = searchParams.get('search') ?? '';
    setSearchInput(urlSearch);
  }, [searchParams]);

  // Update URL with new filters
  const updateFilters = useCallback(
    (newFilters: Partial<FilterTypes>) => {
      const updatedFilters = { ...currentFilters, ...newFilters };
      const url = buildUrlWithParams('/', {
        category: updatedFilters.category,
        priceRange: updatedFilters.priceRange,
        search: updatedFilters.search,
        sortBy: updatedFilters.sortBy,
      });

      router.push(url, { scroll: false });
      onFiltersChange?.(updatedFilters);
    },
    [currentFilters, router, onFiltersChange]
  );

  // Update search when debounced value changes (only after mounted)
  useEffect(() => {
    if (mounted && debouncedSearch !== currentFilters.search) {
      updateFilters({ search: debouncedSearch });
    }
  }, [debouncedSearch, mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear all filters
  const clearFilters = () => {
    setSearchInput('');
    router.push('/', { scroll: false });
  };

  // Check if any filters are active
  const hasActiveFilters =
    currentFilters.category !== 'all' ||
    currentFilters.priceRange !== 'all' ||
    currentFilters.search !== '' ||
    currentFilters.sortBy !== 'featured';

  // Count active filters (excluding sort)
  const activeFilterCount = [
    currentFilters.category !== 'all',
    currentFilters.priceRange !== 'all',
    currentFilters.search !== '',
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
            rightIcon={
              searchInput ? (
                <button
                  onClick={() => setSearchInput('')}
                  className="hover:text-brand-900 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : undefined
            }
            aria-label="Search products"
          />
        </div>

        {/* Filter Toggle (Mobile) */}
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="lg:hidden"
          aria-expanded={isFiltersOpen}
          aria-controls="filter-panel"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-brand-900 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {/* Sort (Always Visible) */}
        <div className="hidden sm:block w-48">
          <Select
            options={SORT_OPTIONS.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
            value={currentFilters.sortBy}
            onChange={(e) =>
              updateFilters({ sortBy: e.target.value as FilterTypes['sortBy'] })
            }
            aria-label="Sort products"
          />
        </div>
      </div>

      {/* Filter Panel */}
      <div
        id="filter-panel"
        className={cn(
          'grid gap-4',
          'lg:grid-cols-4',
          // Mobile: collapsible
          isFiltersOpen ? 'grid-cols-1 sm:grid-cols-2' : 'hidden lg:grid'
        )}
      >
        {/* Category Filter */}
        <Select
          label="Category"
          options={[
            { value: 'all', label: 'All Categories' },
            ...PRODUCT_CATEGORIES.map((cat) => ({
              value: cat.value,
              label: cat.label,
            })),
          ]}
          value={currentFilters.category ?? 'all'}
          onChange={(e) =>
            updateFilters({
              category: e.target.value as FilterTypes['category'],
            })
          }
        />

        {/* Price Range Filter */}
        <Select
          label="Price Range"
          options={PRICE_RANGES.map((range) => ({
            value: range.value,
            label: range.label,
          }))}
          value={currentFilters.priceRange ?? 'all'}
          onChange={(e) =>
            updateFilters({
              priceRange: e.target.value as FilterTypes['priceRange'],
            })
          }
        />

        {/* Sort (Mobile only) */}
        <div className="sm:hidden">
          <Select
            label="Sort By"
            options={SORT_OPTIONS.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
            value={currentFilters.sortBy}
            onChange={(e) =>
              updateFilters({ sortBy: e.target.value as FilterTypes['sortBy'] })
            }
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-surface-600"
            >
              <X className="w-4 h-4" />
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {currentFilters.category && currentFilters.category !== 'all' && (
            <FilterTag
              label={
                PRODUCT_CATEGORIES.find(
                  (c) => c.value === currentFilters.category
                )?.label ?? ''
              }
              onRemove={() => updateFilters({ category: 'all' })}
            />
          )}
          {currentFilters.priceRange && currentFilters.priceRange !== 'all' && (
            <FilterTag
              label={
                PRICE_RANGES.find((p) => p.value === currentFilters.priceRange)
                  ?.label ?? ''
              }
              onRemove={() => updateFilters({ priceRange: 'all' })}
            />
          )}
          {currentFilters.search && (
            <FilterTag
              label={`"${currentFilters.search}"`}
              onRemove={() => {
                setSearchInput('');
                updateFilters({ search: '' });
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Filter tag component
function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-sm">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-brand-200 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
