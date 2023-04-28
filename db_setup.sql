-- Table: public.doctor

-- DROP TABLE IF EXISTS public.doctor;

CREATE TABLE IF NOT EXISTS public.doctor
(
    id integer NOT NULL DEFAULT 'nextval('doctor_id_seq'::regclass)',
    first_name character varying(50) COLLATE pg_catalog."default",
    last_name character varying(50) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    phone character varying(20) COLLATE pg_catalog."default",
    specialization character varying(100) COLLATE pg_catalog."default",
    license_number character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT doctor_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.doctor
    OWNER to postgres;

-- Table: public.pharmacy

-- DROP TABLE IF EXISTS public.pharmacy;

CREATE TABLE IF NOT EXISTS public.pharmacy
(
    id integer NOT NULL DEFAULT 'nextval('pharmacy_id_seq'::regclass)',
    name character varying(100) COLLATE pg_catalog."default",
    address character varying(200) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    phone character varying(20) COLLATE pg_catalog."default",
    license_number character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT pharmacy_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pharmacy
    OWNER to postgres;

-- Table: 3:00 AM 4/29/2023

-- DROP TABLE IF EXISTS public.login_user;

CREATE TABLE IF NOT EXISTS public.login_user
(
    id integer NOT NULL DEFAULT 'nextval('user_id_seq'::regclass)',
    user_id integer,
    user_type character varying(20) COLLATE pg_catalog."default",
    username character varying(50) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default",
    last_login timestamp without time zone,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.login_user
    OWNER to postgres;

-- Table: public.patient

-- DROP TABLE IF EXISTS public.patient;

CREATE TABLE IF NOT EXISTS public.patient
(
    id integer NOT NULL DEFAULT 'nextval('patient_id_seq'::regclass)',
    first_name character varying(50) COLLATE pg_catalog."default",
    last_name character varying(50) COLLATE pg_catalog."default",
    address character varying(200) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    phone character varying(20) COLLATE pg_catalog."default",
    date_of_birth date,
    gender character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT patient_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.patient
    OWNER to postgres;

-- Table: public.medicine

-- DROP TABLE IF EXISTS public.medicine;

CREATE TABLE IF NOT EXISTS public.medicine
(
    id integer NOT NULL DEFAULT 'nextval('medicine_id_seq'::regclass)',
    name character varying(100) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    type character varying(50) COLLATE pg_catalog."default",
    manufacturer character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT medicine_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.medicine
    OWNER to postgres;

-- Table: public.prescription

-- DROP TABLE IF EXISTS public.prescription;

CREATE TABLE IF NOT EXISTS public.prescription
(
    id integer NOT NULL DEFAULT 'nextval('prescription_id_seq'::regclass)',
    doctor_id integer,
    patient_id integer,
    description text COLLATE pg_catalog."default",
    "time" timestamp without time zone,
    CONSTRAINT prescription_pkey PRIMARY KEY (id),
    CONSTRAINT prescription_doctor_id_fkey FOREIGN KEY (doctor_id)
        REFERENCES public.doctor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT prescription_patient_id_fkey FOREIGN KEY (patient_id)
        REFERENCES public.patient (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.prescription
    OWNER to postgres;

-- Table: public.medication

-- DROP TABLE IF EXISTS public.medication;

CREATE TABLE IF NOT EXISTS public.medication
(
    id integer NOT NULL DEFAULT 'nextval('medication_id_seq'::regclass)',
    medicine_id integer,
    prescription_id integer,
    dosage character varying(50) COLLATE pg_catalog."default",
    quantity integer,
    start_date date,
    end_date date,
    refill_information character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT medication_pkey PRIMARY KEY (id),
    CONSTRAINT medication_medicine_id_fkey FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT medication_prescription_id_fkey FOREIGN KEY (prescription_id)
        REFERENCES public.prescription (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.medication
    OWNER to postgres;

-- Table: public.pharmacy_medicines

-- DROP TABLE IF EXISTS public.pharmacy_medicines;

CREATE TABLE IF NOT EXISTS public.pharmacy_medicines
(
    id integer NOT NULL DEFAULT 'nextval('pharmacy_medicines_id_seq'::regclass)',
    pharmacy_id integer NOT NULL,
    medicine_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    created_at timestamp with time zone DEFAULT 'now()',
    updated_at timestamp with time zone DEFAULT 'now()',
    CONSTRAINT pharmacy_medicines_pkey PRIMARY KEY (id),
    CONSTRAINT pharmacy_medicines_medicine_id_fkey FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pharmacy_medicines_pharmacy_id_fkey FOREIGN KEY (pharmacy_id)
        REFERENCES public.pharmacy (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pharmacy_medicines
    OWNER to postgres;