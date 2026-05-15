'use client'
import React from 'react'
import Link from 'next/link'
import { Users, Package, Hammer, FolderOpen, Image, Settings } from 'lucide-react'

const COLLECTIONS = [
  { slug: 'products',    label: 'Productos',   icon: Package,    href: '/admin/collections/products'    },
  { slug: 'artisans',   label: 'Artesanos',   icon: Hammer,     href: '/admin/collections/artisans'    },
  { slug: 'collections',label: 'Colecciones', icon: FolderOpen, href: '/admin/collections/collections' },
  { slug: 'media',      label: 'Multimedia',  icon: Image,      href: '/admin/collections/media'       },
  { slug: 'users',      label: 'Usuarios',    icon: Users,      href: '/admin/collections/users'       },
  { slug: 'settings',   label: 'Ajustes',     icon: Settings,   href: '/admin/globals/site-settings'   },
]

export default function CustomDashboard() {
  return (
    <div style={{ padding: '0 0 32px' }}>
      <div className="coll-grid">
        {COLLECTIONS.map(({ slug, label, icon: Icon, href }) => (
          <Link key={slug} href={href} className="coll-card">
            <Icon className="coll-card__icon" size={20} />
            <div className="coll-card__label">{label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
