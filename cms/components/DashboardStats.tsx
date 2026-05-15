import React from 'react'
import type { Payload } from 'payload'

type Props = {
  payload: Payload
}

export async function DashboardStats({ payload }: Props) {
  const [allProducts, lowStockProducts] = await Promise.all([
    payload.find({ collection: 'products', limit: 0 }),
    payload.find({
      collection: 'products',
      where: { stock: { less_than: 5 } },
      limit: 10,
      sort: 'stock',
    }),
  ])

  const totalProducts = allProducts.totalDocs
  const lowStock = lowStockProducts.docs

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginTop: '24px',
      marginBottom: '8px',
    }}>
      {/* Total Products */}
      <div style={{
        background: '#faf5ea',
        border: '1px solid #d9ccae',
        borderRadius: '8px',
        padding: '24px 28px',
      }}>
        <p style={{
          margin: '0 0 8px',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#8a7a5a',
          fontFamily: 'sans-serif',
        }}>
          Total de productos
        </p>
        <p style={{
          margin: 0,
          fontSize: '40px',
          fontWeight: '300',
          color: '#1d1a14',
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
        }}>
          {totalProducts}
        </p>
      </div>

      {/* Low Stock */}
      <div style={{
        background: lowStock.length > 0 ? '#fff8ee' : '#faf5ea',
        border: `1px solid ${lowStock.length > 0 ? '#d4ac5a' : '#d9ccae'}`,
        borderRadius: '8px',
        padding: '24px 28px',
      }}>
        <p style={{
          margin: '0 0 8px',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: lowStock.length > 0 ? '#b18a3a' : '#8a7a5a',
          fontFamily: 'sans-serif',
        }}>
          Stock bajo (&lt; 5 unidades)
        </p>
        <p style={{
          margin: '0 0 12px',
          fontSize: '40px',
          fontWeight: '300',
          color: lowStock.length > 0 ? '#b03a2e' : '#1d1a14',
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
        }}>
          {lowStock.length}
        </p>
        {lowStock.length > 0 && (
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            {lowStock.map((product) => (
              <li key={product.id} style={{
                fontSize: '13px',
                color: '#5c4f36',
                fontFamily: 'sans-serif',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
              }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {typeof product.name === 'string' ? product.name : JSON.stringify(product.name)}
                </span>
                <span style={{
                  fontWeight: 600,
                  color: product.stock === 0 ? '#b03a2e' : '#b18a3a',
                  flexShrink: 0,
                }}>
                  {product.stock} uds.
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
