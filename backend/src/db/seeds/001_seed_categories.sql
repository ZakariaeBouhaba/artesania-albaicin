INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Perfumes',         'perfumes',       'Fragancias artesanales inspiradas en Al-Ándalus',     1),
  ('Piel de Cuero',    'piel-de-cuero',  'Artículos de cuero repujado y trabajado a mano',      2),
  ('Artesanía',        'artesania',      'Cerámica, madera y artículos decorativos granadinos',  3),
  ('Joyería',          'joyeria',        'Plata y cobre trabajados con filigrana nazarí',        4),
  ('Textil',           'textil',         'Tejidos bordados y seda de Granada',                   5)
ON CONFLICT (slug) DO NOTHING;
