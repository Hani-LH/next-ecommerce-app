import { NextRequest, NextResponse } from 'next/server';
import { mockProducts, filterProducts } from '@/lib/products';
import { ProductsApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  // Simulate network delay for realistic testing
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const category = searchParams.get('category') ?? undefined;
    const priceRange = searchParams.get('priceRange') ?? undefined;
    const search = searchParams.get('search') ?? undefined;
    const sortBy = searchParams.get('sortBy') ?? undefined;
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') ?? '12', 10);

    // Apply filters
    const filteredProducts = filterProducts(mockProducts, {
      category,
      priceRange,
      search,
      sortBy,
    });

    // Calculate pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const response: ProductsApiResponse = {
      products: paginatedProducts,
      total,
      page,
      pageSize,
      totalPages,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Failed to fetch products', code: 'FETCH_ERROR' },
      { status: 500 }
    );
  }
}
