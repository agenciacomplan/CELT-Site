import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const indicacoes = sqliteTable("indicacoes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  responsavel: text("responsavel").notNull(),
  whatsapp: text("whatsapp").notNull(),
  crianca: text("crianca").notNull(),
  serie: text("serie").notNull(),
  turno: text("turno").notNull(),
  indicador: text("indicador").notNull(),
  consentimento: integer("consentimento", { mode: "boolean" }).notNull(),
  sincronizadoPlanilha: integer("sincronizado_planilha", { mode: "boolean" }).notNull().default(false),
  criadoEm: text("criado_em").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const agendamentos = sqliteTable("agendamentos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  responsavel: text("responsavel").notNull(),
  whatsapp: text("whatsapp").notNull(),
  crianca: text("crianca").notNull(),
  serie: text("serie").notNull(),
  turno: text("turno").notNull(),
  indicador: text("indicador").notNull().default(""),
  data: text("data").notNull(),
  horario: text("horario").notNull(),
  consentimento: integer("consentimento", { mode: "boolean" }).notNull(),
  status: text("status").notNull().default("pendente"),
  sincronizadoPlanilha: integer("sincronizado_planilha", { mode: "boolean" }).notNull().default(false),
  criadoEm: text("criado_em").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex("idx_agendamentos_data_horario").on(table.data, table.horario),
]);

export const bloqueiosAgenda = sqliteTable("bloqueios_agenda", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: text("data").notNull(),
  horario: text("horario").notNull(),
  motivo: text("motivo").notNull().default("Indisponível"),
}, (table) => [
  uniqueIndex("idx_bloqueios_data_horario").on(table.data, table.horario),
]);
