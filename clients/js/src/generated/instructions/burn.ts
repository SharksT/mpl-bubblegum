/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bytes,
  mapSerializer,
  struct,
  u32,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findTreeConfigPda } from '../accounts';
import {
  PickPartial,
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  expectSome,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type BurnInstructionAccounts = {
  treeConfig?: PublicKey | Pda;
  leafOwner: PublicKey | Pda | Signer;
  leafDelegate?: PublicKey | Pda | Signer;
  merkleTree: PublicKey | Pda;
  logWrapper?: PublicKey | Pda;
  compressionProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type BurnInstructionData = {
  discriminator: Array<number>;
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: bigint;
  index: number;
};

export type BurnInstructionDataArgs = {
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: number | bigint;
  index: number;
};

export function getBurnInstructionDataSerializer(): Serializer<
  BurnInstructionDataArgs,
  BurnInstructionData
> {
  return mapSerializer<BurnInstructionDataArgs, any, BurnInstructionData>(
    struct<BurnInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['root', bytes({ size: 32 })],
        ['dataHash', bytes({ size: 32 })],
        ['creatorHash', bytes({ size: 32 })],
        ['nonce', u64()],
        ['index', u32()],
      ],
      { description: 'BurnInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [116, 110, 29, 56, 107, 219, 42, 93],
    })
  ) as Serializer<BurnInstructionDataArgs, BurnInstructionData>;
}

// Extra Args.
export type BurnInstructionExtraArgs = { proof: Array<PublicKey> };

// Args.
export type BurnInstructionArgs = PickPartial<
  BurnInstructionDataArgs & BurnInstructionExtraArgs,
  'proof'
>;

// Instruction.
export function burn(
  context: Pick<Context, 'eddsa' | 'programs'>,
  input: BurnInstructionAccounts & BurnInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplBubblegum',
    'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    treeConfig: {
      index: 0,
      isWritable: false,
      value: input.treeConfig ?? null,
    },
    leafOwner: { index: 1, isWritable: false, value: input.leafOwner ?? null },
    leafDelegate: {
      index: 2,
      isWritable: false,
      value: input.leafDelegate ?? null,
    },
    merkleTree: { index: 3, isWritable: true, value: input.merkleTree ?? null },
    logWrapper: {
      index: 4,
      isWritable: false,
      value: input.logWrapper ?? null,
    },
    compressionProgram: {
      index: 5,
      isWritable: false,
      value: input.compressionProgram ?? null,
    },
    systemProgram: {
      index: 6,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: BurnInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.treeConfig.value) {
    resolvedAccounts.treeConfig.value = findTreeConfigPda(context, {
      merkleTree: expectPublicKey(resolvedAccounts.merkleTree.value),
    });
  }
  if (!resolvedAccounts.leafDelegate.value) {
    resolvedAccounts.leafDelegate.value = expectSome(
      resolvedAccounts.leafOwner.value
    );
  }
  if (!resolvedAccounts.logWrapper.value) {
    resolvedAccounts.logWrapper.value = context.programs.getPublicKey(
      'splNoop',
      'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV'
    );
    resolvedAccounts.logWrapper.isWritable = false;
  }
  if (!resolvedAccounts.compressionProgram.value) {
    resolvedAccounts.compressionProgram.value = context.programs.getPublicKey(
      'splAccountCompression',
      'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'
    );
    resolvedAccounts.compressionProgram.isWritable = false;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedArgs.proof) {
    resolvedArgs.proof = [];
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Remaining Accounts.
  const remainingAccounts = resolvedArgs.proof.map((value, index) => ({
    index,
    value,
    isWritable: false,
  }));
  orderedAccounts.push(...remainingAccounts);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getBurnInstructionDataSerializer().serialize(
    resolvedArgs as BurnInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
