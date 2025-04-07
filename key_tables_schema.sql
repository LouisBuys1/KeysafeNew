-- Client table
CREATE TABLE KEYTables_Client (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Key table
CREATE TABLE KEYTables_Key (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES KEYTables_Client(id) ON DELETE CASCADE,
  copies INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'in' CHECK (status IN ('in', 'out')),
  time_in TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  time_out TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team table
CREATE TABLE KEYTables_Team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  pin TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin login table
CREATE TABLE KEYTables_AdminLogin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_key_client_id ON KEYTables_Key(client_id);
CREATE INDEX idx_key_status ON KEYTables_Key(status);
CREATE UNIQUE INDEX idx_team_pin ON KEYTables_Team(pin);
CREATE INDEX idx_admin_username ON KEYTables_AdminLogin(username);

-- Create trigger to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_client_timestamp
BEFORE UPDATE ON KEYTables_Client
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_key_timestamp
BEFORE UPDATE ON KEYTables_Key
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_team_timestamp
BEFORE UPDATE ON KEYTables_Team
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_admin_timestamp
BEFORE UPDATE ON KEYTables_AdminLogin
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
