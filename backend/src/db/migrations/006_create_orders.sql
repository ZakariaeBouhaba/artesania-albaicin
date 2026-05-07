CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);

CREATE TABLE orders (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status           order_status NOT NULL DEFAULT 'pending',
  subtotal         NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
  shipping_cost    NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
  tax_amount       NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  total            NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  notes            TEXT,
  shipping_name    VARCHAR(200),
  shipping_address TEXT,
  shipping_city    VARCHAR(100),
  shipping_country VARCHAR(100),
  shipping_postal  VARCHAR(20),
  tracking_number  VARCHAR(100),
  shipped_at       TIMESTAMPTZ,
  delivered_at     TIMESTAMPTZ,
  cancelled_at     TIMESTAMPTZ,
  cancel_reason    TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id    ON orders (user_id);
CREATE INDEX idx_orders_status     ON orders (status);
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
