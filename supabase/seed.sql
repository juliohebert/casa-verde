-- Local-only demo accounts. Do not reuse these passwords outside local development.
insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-0000-0000-000000000001',
    'authenticated',
    'authenticated',
    'host@casaverde.local',
    crypt('HostDemo123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"owner_name":"Maria anfitria"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-0000-0000-000000000002',
    'authenticated',
    'authenticated',
    'admin@casaverde.local',
    crypt('AdminDemo123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"owner_name":"Administrador local"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
on conflict (id) do nothing;

insert into auth.identities (
  id,
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
values
  (
    '20000000-0000-0000-0000-000000000001',
    'host@casaverde.local',
    '10000000-0000-0000-0000-000000000001',
    jsonb_build_object(
      'sub',
      '10000000-0000-0000-0000-000000000001',
      'email',
      'host@casaverde.local',
      'email_verified',
      true
    ),
    'email',
    now(),
    now(),
    now()
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'admin@casaverde.local',
    '10000000-0000-0000-0000-000000000002',
    jsonb_build_object(
      'sub',
      '10000000-0000-0000-0000-000000000002',
      'email',
      'admin@casaverde.local',
      'email_verified',
      true
    ),
    'email',
    now(),
    now(),
    now()
  )
on conflict (provider_id, provider) do nothing;

update public.profiles
set
  role = 'super_admin',
  trial_ends_at = now() + interval '10 years'
where id = '10000000-0000-0000-0000-000000000002';

insert into public.properties (
  id,
  owner_id,
  name,
  slug,
  public_token,
  is_published,
  guide_data
)
values (
  '30000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'Casa do Vale',
  'casa-do-vale',
  '40000000-0000-0000-0000-000000000001',
  true,
  '{
    "host": {
      "names": "Maria e Joao",
      "photoPath": null,
      "tagline": "Estamos por perto para ajudar.",
      "bio": "Anfitrioes locais apaixonados pela serra.",
      "languages": ["pt-BR", "en"],
      "responseTime": "Em ate 30 minutos",
      "phone": "+5585999999999",
      "whatsapp": "+5585999999999",
      "email": "host@casaverde.local",
      "airbnbSupportLink": null
    },
    "property": {
      "addressLine1": "Estrada das Palmeiras, 120",
      "addressLine2": "",
      "cityStateZip": "Serra Verde, CE",
      "latitude": -3.7319,
      "longitude": -38.5267
    },
    "wifi": {
      "ssid": "CasaDoVale",
      "password": "somente-ambiente-local",
      "routerLocation": "Sala, ao lado da estante"
    },
    "rules": [
      {
        "id": "silencio",
        "category": "Convivencia",
        "icon": "volume-2",
        "rule": "Respeite o horario de silencio depois das 22h.",
        "isProhibition": false
      }
    ],
    "amenities": [
      {
        "id": "cozinha",
        "category": "Cozinha",
        "icon": "cooking-pot",
        "items": ["Fogao", "Geladeira", "Cafeteira"]
      }
    ],
    "checkIn": {
      "time": "15:00",
      "gateCode": "8492#",
      "steps": [
        {
          "id": "portao",
          "title": "Abra o portao",
          "description": "Digite o codigo no teclado ao lado direito."
        }
      ]
    },
    "checkOut": {
      "time": "11:00",
      "steps": [
        {
          "id": "chaves",
          "title": "Deixe as chaves",
          "description": "Coloque as chaves na caixa ao lado da porta."
        }
      ]
    }
  }'::jsonb
)
on conflict (id) do nothing;
