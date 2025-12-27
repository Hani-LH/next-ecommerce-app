import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/products';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));

  try {
    const { id } = await params;
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(product, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Failed to fetch product', code: 'FETCH_ERROR' },
      { status: 500 }
    );
  }
}
