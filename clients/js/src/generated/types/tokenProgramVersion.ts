/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Serializer } from '@metaplex-foundation/umi';

export enum TokenProgramVersion {
  Original,
  Token2022,
}

export type TokenProgramVersionArgs = TokenProgramVersion;

export function getTokenProgramVersionSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<TokenProgramVersionArgs, TokenProgramVersion> {
  const s = context.serializer;
  return s.enum<TokenProgramVersion>(TokenProgramVersion, {
    description: 'TokenProgramVersion',
  }) as Serializer<TokenProgramVersionArgs, TokenProgramVersion>;
}
