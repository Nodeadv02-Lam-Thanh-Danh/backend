--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: checkout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checkout (
    id integer NOT NULL,
    order_id integer NOT NULL,
    shipping_method integer DEFAULT 1 NOT NULL,
    payment_method integer DEFAULT 1 NOT NULL,
    shipping_address integer DEFAULT 1,
    total_price integer NOT NULL,
    status character varying DEFAULT 'new'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.checkout OWNER TO postgres;

--
-- Name: checkout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.checkout ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.checkout_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "categoryId" integer NOT NULL,
    "restaurantId" integer NOT NULL,
    sale_daily boolean NOT NULL,
    sale_date date,
    quantity integer NOT NULL,
    quantity_remained integer NOT NULL,
    price integer
);


ALTER TABLE public.food OWNER TO postgres;

--
-- Name: food_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(255) NOT NULL
);


ALTER TABLE public.food_category OWNER TO postgres;

--
-- Name: food_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.food_category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.food_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.food ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.food_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id integer NOT NULL,
    url character varying(500) NOT NULL,
    "foodId" integer NOT NULL
);


ALTER TABLE public.image OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.image ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "time" timestamp without time zone DEFAULT now() NOT NULL,
    details json NOT NULL,
    status character varying(30) DEFAULT 'new'::character varying NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."order" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurant (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    business_hours json NOT NULL
);


ALTER TABLE public.restaurant OWNER TO postgres;

--
-- Name: restaurant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.restaurant ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.restaurant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(1024),
    phone character varying(20),
    address character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    last_name character varying(100) NOT NULL,
    username character varying(100) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: checkout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checkout (id, order_id, shipping_method, payment_method, shipping_address, total_price, status, created_at, updated_at) FROM stdin;
5	64	1	1	1	4670000	ordered	2024-11-15 20:39:02.399	\N
\.


--
-- Data for Name: food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food (id, name, "categoryId", "restaurantId", sale_daily, sale_date, quantity, quantity_remained, price) FROM stdin;
15	Burger 2 restaurant B	2	2	t	\N	100	100	50000
16	Burger 1 restaurant C	2	3	t	\N	100	100	40000
17	Burger 2 restaurant C	2	3	t	\N	100	100	50000
18	Bún 1 restaurant A	3	1	t	\N	100	100	40000
19	Bún 2 restaurant A	3	1	t	\N	100	100	50000
22	Bún 1 restaurant C	3	3	t	\N	100	100	40000
23	Bún 2 restaurant C	3	3	t	\N	100	100	50000
25	Mì 2 restaurant A	4	1	t	\N	100	100	50000
26	Mì 1 restaurant B	4	2	t	\N	100	100	40000
27	Mì 2 restaurant B	4	2	t	\N	100	100	50000
28	Mì 1 restaurant C	4	3	t	\N	100	100	40000
29	Mì 2 restaurant C	4	3	t	\N	100	100	50000
7	Gà rán 1 restaurant B	1	2	t	\N	100	98	75000
20	Bún 1 restaurant B	3	2	t	\N	100	97	40000
11	Burger 1 restaurant A	2	1	t	\N	100	80	40000
14	Burger 1 restaurant B	2	2	t	\N	100	0	40000
21	Bún 2 restaurant B	3	2	t	\N	100	100	50000
1	Gà rán 1 restaurant A	1	1	t	\N	100	100	80000
4	Gà rán 2 restaurant A	1	1	t	\N	100	100	70000
8	Gà rán 2 restaurant B	1	2	t	\N	100	100	85000
10	Gà rán 2 restaurant C	1	3	t	\N	100	100	95000
24	Mì 1 restaurant A	4	1	t	\N	100	100	40000
9	Gà rán 1 restaurant C	1	3	t	\N	100	100	65000
13	Burger 2 restaurant A	2	1	t	\N	100	100	50000
\.


--
-- Data for Name: food_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food_category (id, name, icon) FROM stdin;
1	Gà rán	/images/ga.png
2	Burger	/images/burger.jpg
3	Bún	/images/bun.jpg
4	Mì	/images/noddle.png
\.


--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.image (id, url, "foodId") FROM stdin;
2	/images/my_image_1.jpg	4
1	/images/my_image_2.jpg	1
3	/images/my_image_1.jpg	7
4	/images/my_image_2.jpg	8
5	/images/my_image_2.jpg	9
6	/images/my_image_1.jpg	10
7	/images/my_image_1.jpg	13
8	/images/my_image_1.jpg	11
51	/images/my_image_2.jpg	9
52	/images/my_image_2.jpg	10
53	/images/my_image_2.jpg	11
54	/images/my_image_2.jpg	13
55	/images/my_image_2.jpg	14
56	/images/my_image_2.jpg	15
57	/images/my_image_2.jpg	16
58	/images/my_image_2.jpg	17
59	/images/my_image_2.jpg	18
60	/images/my_image_2.jpg	19
61	/images/my_image_2.jpg	20
62	/images/my_image_2.jpg	21
63	/images/my_image_2.jpg	22
64	/images/my_image_2.jpg	23
65	/images/my_image_2.jpg	24
66	/images/my_image_2.jpg	25
67	/images/my_image_2.jpg	26
68	/images/my_image_2.jpg	27
69	/images/my_image_2.jpg	28
70	/images/my_image_2.jpg	29
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id, "userId", "time", details, status) FROM stdin;
64	15	2024-11-15 16:42:04.877	[{"quantity":2,"foodId":7},{"quantity":3,"foodId":20},{"quantity":10,"foodId":11},{"quantity":100,"foodId":14}]	ordered
\.


--
-- Data for Name: restaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurant (id, name, address, business_hours) FROM stdin;
1	Restaurant A	address of restaurant A	{\n  "start": "10:00",\n  "end": "20:00"\n}
2	Restaurant B	address of restaurant B	{\n  "start": "09:00",\n  "end": "22:00"\n}
3	Restaurant C	address of restaurant C	{\n  "start": "08:00",\n  "end": "19:00"\n}
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, first_name, email, password, phone, address, created_at, updated_at, last_name, username) FROM stdin;
15	Lâm	germayu@gmail.com	$2b$10$rgf2CQgmPQxLlzlneg/qGusYYm2RGj/WFM5JtUNXM6pC.fIJfTehq	0389964150	123/25	2024-11-09 09:08:02.55	\N	Thành Danh	germayu
\.


--
-- Name: checkout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.checkout_id_seq', 5, true);


--
-- Name: food_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_category_id_seq', 4, true);


--
-- Name: food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_id_seq', 29, true);


--
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_id_seq', 70, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 66, true);


--
-- Name: restaurant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurant_id_seq', 3, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 17, true);


--
-- Name: food_category FoodCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_category
    ADD CONSTRAINT "FoodCategory_pkey" PRIMARY KEY (id);


--
-- Name: checkout checkout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkout
    ADD CONSTRAINT checkout_pkey PRIMARY KEY (id);


--
-- Name: user email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email_unique UNIQUE (email);


--
-- Name: food food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (id);


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- Name: food minimum_quantity; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.food
    ADD CONSTRAINT minimum_quantity CHECK ((quantity >= 1)) NOT VALID;


--
-- Name: food minimum_quantity_remained; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.food
    ADD CONSTRAINT minimum_quantity_remained CHECK ((quantity_remained >= 0)) NOT VALID;


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: user phone_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT phone_unique UNIQUE (phone);


--
-- Name: restaurant restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT username_unique UNIQUE (username);


--
-- Name: idx_food_images_food_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_food_images_food_id ON public.image USING btree ("foodId");


--
-- Name: checkout checkout_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkout
    ADD CONSTRAINT checkout_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- Name: food food_restaurantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT "food_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES public.restaurant(id) NOT VALID;


--
-- Name: image image_foodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT "image_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES public.food(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

