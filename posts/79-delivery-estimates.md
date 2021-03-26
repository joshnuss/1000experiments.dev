---
title: Delivery estimates - Part 1
experiment: 79
date: "2021-03-26"
permalink: delivery-estimates
tags: delivery-estimates, supabase
---

A client asked me to create a delivery estimate app that supports multiple warehouses.

Apps exists that do this, but they don't support more complex shipping situations where different warehouses have different rules.

So I started by create a postgres db with supabase, just to wrap my head around what a schema could look like.

The tables are:

- `countries` - list of supported countries
- `subdivisions` - provinces, countries, territories etc.. a country can have multiple types of subdivisions
- `postal_codes` - list of postal codes by subdivision, included latitude and longitude
- `carriers` - a list of carriers, ie FedEx, UPS etc
- `services` - a list of services provided by each carrier, ie "Express", "2 day", "Ground"
- `accounts` - a list of accounts, each has an api key
- `warehouses` - a list of warehouses for each account, this is the source of the package
- `warehouse_services` - the list of services a warehouse supports, ie "FedEx Overnight", "UPS Ground"
- `warehouse_zones` - a warehouse may only ship to certain zones
- `delivery_estimates` - contains the minumum and maximum number of days a package would take for each permutation of postal code and warehouse zone

Below is the SQL to create DB:

## Code

```sql
create extension if not exists postgis;

drop table if exists delivery_estimates;
drop table if exists warehouse_zones;
drop table if exists postal_codes;
drop table if exists subdivisions;
drop table if exists countries;
drop table if exists warehouse_zones;
drop table if exists warehouse_services;
drop table if exists accounts;
drop table if exists services;
drop table if exists carriers;

create table countries (
  id serial primary key,
  name varchar not null,
  iso2 varchar(2) not null,
  iso3 varchar(3) not null,
  subdivision_name varchar not null default 'Province',
  postal_code_name varchar not null default 'Postal Code',
  postal_code_example varchar not null,
  postal_code_regex varchar not null
);

create unique index countries$iso2 on countries (iso2);
create unique index countries$iso3 on countries (iso3);
create index countries$name on countries (name);

create table subdivisions (
  id serial primary key,
  country_id bigint references countries not null,
  name varchar not null,
  type varchar not null default 'province',
  code varchar(2) not null
);

create unique index subdivisions$code on subdivisions (country_id, code);
create index subdivisions$name on subdivisions (country_id, name);

create table postal_codes (
  id serial primary key,
  country_id bigint references countries not null,
  subdivision_id bigint references subdivisions not null,
  code varchar not null,
  municipality varchar not null,
  geog geography not null
);

create unique index postal_codes$main on postal_codes (country_id, subdivision_id, code);
create unique index postal_codes$code on postal_codes (code);

insert into countries (name, iso2, iso3, subdivision_name, postal_code_name, postal_code_example, postal_code_regex) values ('United States', 'US', 'USA', 'State', 'Zip Code', '#####', '\d5');
insert into countries (name, iso2, iso3, subdivision_name, postal_code_name, postal_code_example, postal_code_regex) values ('Canada', 'CA', 'CAN', 'Province', 'Postal Code', 'A#A #A#', '[A-Z][0-9][A-Z]( |-)?[0-9][A-Z][0-9]');

insert into subdivisions (country_id, name, code, type) values (1, 'Alabama', 'AL', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Alaska', 'AK', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Arizona', 'AZ', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Arkansas', 'AR', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'California', 'CA', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Colorado', 'CO', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Connecticut', 'CT', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Delaware', 'DE', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'District of Columbia', 'DC', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Florida', 'FL', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Georgia', 'GA', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Hawaii', 'HI', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Idaho', 'ID', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Illinois', 'IL', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Indiana', 'IN', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Iowa', 'IA', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Kansas', 'KS', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Kentucky', 'KY', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Louisiana', 'LA', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Maine', 'ME', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Montana', 'MT', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Nebraska', 'NE', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Nevada', 'NV', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'New Hampshire', 'NH', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'New Jersey', 'NJ', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'New Mexico', 'NM', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'New York', 'NY', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'North Carolina', 'NC', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'North Dakota', 'ND', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Ohio', 'OH', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Oklahoma', 'OK', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Oregon', 'OR', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Maryland', 'MD', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Massachusetts', 'MA', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Michigan', 'MI', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Minnesota', 'MN', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Mississippi', 'MS', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Missouri', 'MO', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Pennsylvania', 'PA', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Rhode Island', 'RI', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'South Carolina', 'SC', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'South Dakota', 'SD', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Tennessee', 'TN', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Texas', 'TX', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Utah', 'UT', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Vermont', 'VT', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Virginia', 'VA', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Washington', 'WA', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'West Virginia', 'WV', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Wisconsin', 'WI', 'state' );
insert into subdivisions (country_id, name, code, type) values (1, 'Wyoming', 'WY', 'state' );


create table carriers (
  id serial primary key,
  name varchar not null
);

insert into carriers(name) values ('FedEx');
insert into carriers(name) values ('UPS');
insert into carriers(name) values ('DHL');
insert into carriers(name) values ('USPS');

create table services (
  id serial primary key,
  carrier_id bigint references carriers not null,
  name varchar not null,
  code varchar not null
);

create unique index services$main on services (carrier_id, code);

create table accounts (
  id serial primary key,
  name varchar not null,
  email varchar not null,
  api_key varchar not null
);

create table warehouses (
  id serial primary key,
  name varchar not null,
  account_id bigint references accounts,
  address varchar not null,
  municipality varchar not null,
  country_id bigint references countries not null,
  subdivision_id bigint references subdivisions not null,
  postal_code_id bigint references postal_codes not null
);

create table warehouse_services (
  id serial primary key,
  account_id bigint references accounts not null,
  warehouse_id bigint references warehouses not null,
  carrier_id bigint references carriers not null,
  service_id bigint references services not null
);

create unique index warehouse_services$main on warehouse_services (account_id, warehouse_id, carrier_id, service_id);

create table warehouse_zones (
  id serial primary key,
  account_id bigint references accounts not null,
  warehouse_id bigint references warehouses not null,
  country_id bigint references countries not null,
  subdivision_id bigint references subdivisions not null,
  postal_code_id bigint references postal_codes
);

create unique index warehouse_zones$main on warehouse_zones (account_id, warehouse_id, country_id, subdivision_id, postal_code_id);

create table delivery_estimates (
  id serial primary key,
  account_id bigint references accounts not null,
  warehouse_id bigint references warehouses not null,
  warehouse_zone_id bigint references warehouse_zones not null,
  country_id bigint references countries not null,
  subdivision_id bigint references subdivisions not null,
  postal_code_id bigint references postal_codes,
  minimum int not null,
  maximum int not null
);

create unique index delivery_estimates$main on delivery_estimates (account_id, warehouse_id, warehouse_zone_id, country_id, subdivision_id, postal_code_id);

insert into accounts (name, email, api_key) values ('Josh', 'josh@example.com', 'pk_prod_1234');
insert into warehouses ( account_id, name, address, municipality, country_id, subdivision_id, postal_code_id)
  select 1, 'West Coast', '1 Infinite Loop', municipality, country_id, subdivision_id, id from postal_codes where code = '95014';
insert into warehouses ( account_id, name, address, municipality, country_id, subdivision_id, postal_code_id)
  select 1, 'East Coast', '79 Chambers St', municipality, country_id, subdivision_id, id from postal_codes where code = '10007';
```
