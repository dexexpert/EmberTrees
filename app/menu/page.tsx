'use client'

import { Banner } from "@/components";
import { PRODUCT_CATEGORIES } from "@/lib/constants/constants";
import { Button } from "@/components/ui";
import { useState } from "react";
import type { ProductFilters } from "@/types";

export default function Menu() {
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'all',
    search: '',
    sortBy: 'name',
    potency: 'all',
  });
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category: category as any }));
  };
  return (
    <div>
      <Banner imageUrl="/images/menu/banner.png" title="Our Menu" subtitle="Browse our carefully curated selection of premium cannabis products"/>
      <div className="py-[100px]">
      {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-16 px-4 sm:px-0" data-testid="filter-categories">
          {PRODUCT_CATEGORIES.map((category) => (
            <Button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              variant={filters.category === category.value ? 'default' : 'outline'}
              className={`px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full font-light transition-all duration-300 ${
                filters.category === category.value
                  ? 'bg-black text-white hover:bg-gray-800 border-0 shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-0'
              }`}
              data-testid={`button-category-${category.value}`}
            >
              {category.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4 sm:px-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full sm:w-80 px-6 py-4 rounded-2xl border-0 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-gray-100 font-light"
              data-testid="input-search-products"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-52 px-6 py-4 rounded-2xl border-0 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-gray-100 font-light" data-testid="select-sort-products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-xl">
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="font-light">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.potency} onValueChange={handlePotencyChange}>
              <SelectTrigger className="w-full sm:w-52 px-6 py-4 rounded-2xl border-0 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-gray-100 font-light" data-testid="select-potency-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-xl">
                {POTENCY_FILTERS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="font-light">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Product Grid */}
        <ProductGrid filters={filters} />
        </div>
    </div>
  );
}