#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/550afcb10854a130bd8ad4641139e9853f5c098d72dadce4252de885efef2693/contract';
import endContract from '../../snapshots/550afcb10854a130bd8ad4641139e9853f5c098d72dadce4252de885efef2693/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'communities',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('guildId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('iconUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('inviteUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'invites',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('createdById', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('guildId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('kind', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('maxUses', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('revokedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('staffRole', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('teamId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('tokenHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tournamentId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('usedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('usedById', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('uses', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'invites_kind_check_a9ed639c',
            sql`"kind" IN ('STAFF', 'COMMUNITY', 'TEAM')`,
          ),
          checkExpression(
            'invites_staffRole_check_0b11325e',
            sql`"staffRole" IN ('OWNER', 'ORGANIZER')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'matches',
        columns: [
          col('key', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('scoreA', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('scoreB', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('startsAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('UPCOMING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('tournamentId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['tournamentId', 'key']),
          checkExpression(
            'matches_status_check_db8f0624',
            sql`"status" IN ('UPCOMING', 'LIVE', 'FINISHED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'staff_members',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['userId']),
          checkExpression(
            'staff_members_role_check_2fefdc8d',
            sql`"role" IN ('OWNER', 'ORGANIZER')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'team_members',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isCaptain', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('isManager', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('lineup', 'text', {
            notNull: true,
            default: lit('NONE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('position', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('teamId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tournamentId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'team_members_captain_player_03bc770d',
            sql`NOT "isCaptain" OR "lineup" = 'PLAYER'`,
          ),
          checkExpression(
            'team_members_lineup_check_84f49323',
            sql`"lineup" IN ('PLAYER', 'COACH', 'NONE')`,
          ),
          checkExpression(
            'team_members_position_b83ffe2a',
            sql`("lineup" = 'PLAYER') = ("position" IS NOT NULL) AND ("position" IS NULL OR "position" BETWEEN 1 AND 5)`,
          ),
          checkExpression(
            'team_members_status_check_eb620b9f',
            sql`"status" IN ('PENDING', 'ACTIVE')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'teams',
        columns: [
          col('communityId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('seed', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tag', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tournamentId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'tournaments',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('rankLimit', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('rosterDeadline', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'tournaments_status_check_6181c7cd',
            sql`"status" IN ('DRAFT', 'REGISTRATION', 'LOCKED', 'LIVE', 'FINISHED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('avatarUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('discordId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('displayName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('rankCheckedAt', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('rankTier', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('steamAvatarUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('steamId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('steamName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('steamProfileUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('username', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'communities',
        constraint: 'communities_guildId_key',
        columns: ['guildId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'invites',
        constraint: 'invites_tokenHash_key',
        columns: ['tokenHash'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'team_members',
        constraint: 'team_members_tournamentId_userId_key',
        columns: ['tournamentId', 'userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teams',
        constraint: 'teams_id_tournamentId_key',
        columns: ['id', 'tournamentId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teams',
        constraint: 'teams_tournamentId_communityId_key',
        columns: ['tournamentId', 'communityId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teams',
        constraint: 'teams_tournamentId_slug_key',
        columns: ['tournamentId', 'slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teams',
        constraint: 'teams_tournamentId_seed_key',
        columns: ['tournamentId', 'seed'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'tournaments',
        constraint: 'tournaments_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_discordId_key',
        columns: ['discordId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_steamId_key',
        columns: ['steamId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'invites',
        index: 'invites_createdById_idx_8bf640ed',
        columns: ['createdById'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'invites',
        index: 'invites_teamId_idx_f2b72ab3',
        columns: ['teamId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'invites',
        index: 'invites_tournamentId_idx_d0bd97a6',
        columns: ['tournamentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'invites',
        index: 'invites_usedById_idx_3111f7a3',
        columns: ['usedById'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'matches',
        index: 'matches_tournamentId_idx_d0bd97a6',
        columns: ['tournamentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'team_members',
        index: 'team_members_captain_c9449c99',
        columns: ['teamId'],
        extras: { where: sql`"isCaptain"`, unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'team_members',
        index: 'team_members_slot_08ccec31',
        columns: ['teamId', 'position'],
        extras: { where: sql`"status" = 'ACTIVE' AND "lineup" = 'PLAYER'`, unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'team_members',
        index: 'team_members_teamId_idx_f2b72ab3',
        columns: ['teamId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'team_members',
        index: 'team_members_teamId_tournamentId_idx_68021069',
        columns: ['teamId', 'tournamentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'team_members',
        index: 'team_members_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teams',
        index: 'teams_communityId_idx_e2c72225',
        columns: ['communityId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teams',
        index: 'teams_tournamentId_idx_d0bd97a6',
        columns: ['tournamentId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'invites',
        foreignKey: {
          name: 'invites_tournamentId_fkey',
          columns: ['tournamentId'],
          references: { schema: 'public', table: 'tournaments', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'invites',
        foreignKey: {
          name: 'invites_teamId_fkey',
          columns: ['teamId'],
          references: { schema: 'public', table: 'teams', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'invites',
        foreignKey: {
          name: 'invites_createdById_fkey',
          columns: ['createdById'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'invites',
        foreignKey: {
          name: 'invites_usedById_fkey',
          columns: ['usedById'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'matches',
        foreignKey: {
          name: 'matches_tournamentId_fkey',
          columns: ['tournamentId'],
          references: { schema: 'public', table: 'tournaments', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'staff_members',
        foreignKey: {
          name: 'staff_members_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'team_members',
        foreignKey: {
          name: 'team_members_teamId_tournamentId_fkey',
          columns: ['teamId', 'tournamentId'],
          references: { schema: 'public', table: 'teams', columns: ['id', 'tournamentId'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'team_members',
        foreignKey: {
          name: 'team_members_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teams',
        foreignKey: {
          name: 'teams_tournamentId_fkey',
          columns: ['tournamentId'],
          references: { schema: 'public', table: 'tournaments', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teams',
        foreignKey: {
          name: 'teams_communityId_fkey',
          columns: ['communityId'],
          references: { schema: 'public', table: 'communities', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
