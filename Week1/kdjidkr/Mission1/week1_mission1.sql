CREATE TABLE `Untitled` (
	`Key`	bigint	NOT NULL,
	`Field`	varchar(10)	NULL,
	`Field2`	int	NULL,
	`Field3`	datetime	NULL,
	`Field4`	varchar(50)	NULL,
	`Field5`	int	NULL,
	`Field6`	varchar(15)	NULL,
	`Field7`	datetime	NULL,
	`Field8`	datetime(6)	NULL,
	`Field9`	datetime(6)	NULL
);

CREATE TABLE `Untitled2` (
	`Key`	int	NOT NULL,
	`Field`	varchar(30)	NULL,
	`Field2`	VARCHAR(255)	NULL
);

CREATE TABLE `Untitled3` (
	`Key`	bigint	NOT NULL,
	`Key2`	int	NOT NULL,
	`Key3`	bigint	NOT NULL
);

CREATE TABLE `Untitled4` (
	`Key`	bigint	NOT NULL,
	`Key2`	bigint	NOT NULL,
	`Field`	boolean	NULL,
	`Field2`	boolean	NULL,
	`Field3`	boolean	NULL,
	`Field4`	boolean	NULL,
	`Field5`	boolean	NULL,
	`Field6`	datetime(6)	NULL,
	`Field7`	datetime(6)	NULL
);

CREATE TABLE `Untitled5` (
	`Key`	bigint	NOT NULL,
	`Field`	varchar(30)	NULL,
	`Field2`	varchar(50)	NULL,
	`Field3`	datetime(6)	NULL,
	`Field4`	datetime(6)	NULL
);

CREATE TABLE `Untitled6` (
	`Key`	bigint	NOT NULL,
	`Key2`	bigint	NOT NULL,
	`Key3`	bigint	NOT NULL,
	`Field`	int	NULL,
	`Field2`	text	NULL,
	`Field5`	datetime	NULL,
	`Field3`	datetime(6)	NULL,
	`Field4`	datetime(6)	NULL
);

CREATE TABLE `Untitled7` (
	`Key`	bitint	NOT NULL,
	`Key2`	bigint	NOT NULL,
	`Field`	varchar(100)	NULL
);

CREATE TABLE `Untitled8` (
	`Key`	bigint	NOT NULL,
	`Key2`	bigint	NOT NULL,
	`Field`	int	NULL,
	`Field2`	int	NULL,
	`Field3`	datetime	NULL
);

CREATE TABLE `Untitled9` (
	`Key`	bigint	NOT NULL,
	`Key2`	bigint	NOT NULL,
	`Key3`	bigint	NOT NULL,
	`Field`	bigint	NULL,
	`Field2`	boolean	NULL,
	`Field3`	datetime(6)	NULL,
	`Field4`	VARCHAR(255)	NULL
);

CREATE TABLE `Untitled10` (
	`Key`	bigint	NOT NULL,
	`Key2`	bigint	NOT NULL,
	`Field`	varchar(100)	NULL,
	`Field2`	text	NULL,
	`Field3`	datetime	NULL,
	`Field4`	datetime(6)	NULL,
	`Field5`	datetime(6)	NULL
);

CREATE TABLE `CopyOfUntitled7` (
	`Key`	bitint	NOT NULL,
	`Key2`	bigint	NOT NULL,
	`Field`	varchar(100)	NULL
);

ALTER TABLE `Untitled` ADD CONSTRAINT `PK_UNTITLED` PRIMARY KEY (
	`Key`
);

ALTER TABLE `Untitled2` ADD CONSTRAINT `PK_UNTITLED2` PRIMARY KEY (
	`Key`
);

ALTER TABLE `Untitled3` ADD CONSTRAINT `PK_UNTITLED3` PRIMARY KEY (
	`Key`,
	`Key2`,
	`Key3`
);

ALTER TABLE `Untitled4` ADD CONSTRAINT `PK_UNTITLED4` PRIMARY KEY (
	`Key`,
	`Key2`
);

ALTER TABLE `Untitled5` ADD CONSTRAINT `PK_UNTITLED5` PRIMARY KEY (
	`Key`
);

ALTER TABLE `Untitled6` ADD CONSTRAINT `PK_UNTITLED6` PRIMARY KEY (
	`Key`,
	`Key2`,
	`Key3`
);

ALTER TABLE `Untitled7` ADD CONSTRAINT `PK_UNTITLED7` PRIMARY KEY (
	`Key`,
	`Key2`
);

ALTER TABLE `Untitled8` ADD CONSTRAINT `PK_UNTITLED8` PRIMARY KEY (
	`Key`,
	`Key2`
);

ALTER TABLE `Untitled9` ADD CONSTRAINT `PK_UNTITLED9` PRIMARY KEY (
	`Key`,
	`Key2`,
	`Key3`
);

ALTER TABLE `Untitled10` ADD CONSTRAINT `PK_UNTITLED10` PRIMARY KEY (
	`Key`,
	`Key2`
);

ALTER TABLE `CopyOfUntitled7` ADD CONSTRAINT `PK_COPYOFUNTITLED7` PRIMARY KEY (
	`Key`,
	`Key2`
);

ALTER TABLE `Untitled3` ADD CONSTRAINT `FK_Untitled2_TO_Untitled3_1` FOREIGN KEY (
	`Key2`
)
REFERENCES `Untitled2` (
	`Key`
);

ALTER TABLE `Untitled3` ADD CONSTRAINT `FK_Untitled_TO_Untitled3_1` FOREIGN KEY (
	`Key3`
)
REFERENCES `Untitled` (
	`Key`
);

ALTER TABLE `Untitled4` ADD CONSTRAINT `FK_Untitled_TO_Untitled4_1` FOREIGN KEY (
	`Key2`
)
REFERENCES `Untitled` (
	`Key`
);

ALTER TABLE `Untitled6` ADD CONSTRAINT `FK_Untitled_TO_Untitled6_1` FOREIGN KEY (
	`Key2`
)
REFERENCES `Untitled` (
	`Key`
);

ALTER TABLE `Untitled6` ADD CONSTRAINT `FK_Untitled5_TO_Untitled6_1` FOREIGN KEY (
	`Key3`
)
REFERENCES `Untitled5` (
	`Key`
);

ALTER TABLE `Untitled7` ADD CONSTRAINT `FK_Untitled6_TO_Untitled7_1` FOREIGN KEY (
	`Key2`
)
REFERENCES `Untitled6` (
	`Key`
);

ALTER TABLE `Untitled8` ADD CONSTRAINT `FK_Untitled5_TO_Untitled8_1` FOREIGN KEY (
	`Key2`
)
REFERENCES `Untitled5` (
	`Key`
);

ALTER TABLE `Untitled9` ADD CONSTRAINT `FK_Untitled8_TO_Untitled9_1` FOREIGN KEY (
	`Key2`
)
REFERENCES `Untitled8` (
	`Key`
);

ALTER TABLE `Untitled9` ADD CONSTRAINT `FK_Untitled_TO_Untitled9_1` FOREIGN KEY (
	`Key3`
)
REFERENCES `Untitled` (
	`Key`
);

ALTER TABLE `Untitled10` ADD CONSTRAINT `FK_Untitled_TO_Untitled10_1` FOREIGN KEY (
	`Key2`
)
REFERENCES `Untitled` (
	`Key`
);

ALTER TABLE `CopyOfUntitled7` ADD CONSTRAINT `FK_Untitled10_TO_CopyOfUntitled7_1` FOREIGN KEY (
	`Key2`
)
REFERENCES `Untitled10` (
	`Key`
);

