CREATE TABLE products (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             VARCHAR(255) NOT NULL,
  slug             VARCHAR(280) NOT NULL UNIQUE,
  description      TEXT,
  price            NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10, 2) CHECK (compare_at_price >= 0),
  stock            INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  sku              VARCHAR(100) UNIQUE,
  category_id      UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_published     BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured      BOOLEAN NOT NULL DEFAULT FALSE,
  weight_grams     INTEGER,
  created_by       UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_by       UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category_id  ON products (category_id);
CREATE INDEX idx_products_is_published ON products (is_published);
CREATE INDEX idx_products_slug         ON products (slug);
CREATE INDEX idx_products_name_trgm    ON products USING GIN (name gin_trgm_ops);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
