CREATE TABLE `agendamentos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`responsavel` text NOT NULL,
	`whatsapp` text NOT NULL,
	`crianca` text NOT NULL,
	`serie` text NOT NULL,
	`turno` text NOT NULL,
	`data` text NOT NULL,
	`horario` text NOT NULL,
	`consentimento` integer NOT NULL,
	`status` text DEFAULT 'pendente' NOT NULL,
	`sincronizado_planilha` integer DEFAULT false NOT NULL,
	`criado_em` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_agendamentos_data_horario` ON `agendamentos` (`data`,`horario`);--> statement-breakpoint
CREATE TABLE `bloqueios_agenda` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`data` text NOT NULL,
	`horario` text NOT NULL,
	`motivo` text DEFAULT 'Indisponível' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_bloqueios_data_horario` ON `bloqueios_agenda` (`data`,`horario`);
--> statement-breakpoint
PRAGMA optimize;
