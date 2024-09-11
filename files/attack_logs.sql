CREATE TABLE IF NOT EXISTS public.attack_logs (
	"sourceCountry" varchar(50) NULL,
	"destinationCountry" varchar(50) NULL,
	"millisecond" int4 NULL,
	"type" varchar(50) NULL,
	"weight" varchar(50) NULL,
	"attackTime" timestamptz  NULL
);