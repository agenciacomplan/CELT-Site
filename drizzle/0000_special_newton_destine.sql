CREATE TABLE `indicacoes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`responsavel` text NOT NULL,
	`whatsapp` text NOT NULL,
	`crianca` text NOT NULL,
	`serie` text NOT NULL,
	`turno` text NOT NULL,
	`indicador` text NOT NULL,
	`consentimento` integer NOT NULL,
	`sincronizado_planilha` integer DEFAULT false NOT NULL,
	`criado_em` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
