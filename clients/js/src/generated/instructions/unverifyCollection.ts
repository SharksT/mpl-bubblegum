/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  findMasterEditionPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
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
import { resolveCreatorHash, resolveDataHash } from '../../hooked';
import { findTreeConfigPda } from '../accounts';
import {
  PickPartial,
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  expectSome,
  getAccountMetasAndSigners,
} from '../shared';
import {
  MetadataArgs,
  MetadataArgsArgs,
  getMetadataArgsSerializer,
} from '../types';

// Accounts.
export type UnverifyCollectionInstructionAccounts = {
  treeConfig?: PublicKey | Pda;
  leafOwner: PublicKey | Pda;
  leafDelegate?: PublicKey | Pda;
  merkleTree: PublicKey | Pda;
  payer?: Signer;
  /**
   * the case of `set_and_verify_collection` where
   * we are actually changing the NFT metadata.
   */

  treeCreatorOrDelegate?: PublicKey | Pda;
  collectionAuthority?: Signer;
  /**
   * If there is no collecton authority record PDA then
   * this must be the Bubblegum program address.
   */

  collectionAuthorityRecordPda?: PublicKey | Pda;
  collectionMint: PublicKey | Pda;
  collectionMetadata?: PublicKey | Pda;
  collectionEdition?: PublicKey | Pda;
  bubblegumSigner?: PublicKey | Pda;
  logWrapper?: PublicKey | Pda;
  compressionProgram?: PublicKey | Pda;
  tokenMetadataProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type UnverifyCollectionInstructionData = {
  discriminator: Array<number>;
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: bigint;
  index: number;
  metadata: MetadataArgs;
};

export type UnverifyCollectionInstructionDataArgs = {
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: number | bigint;
  index: number;
  metadata: MetadataArgsArgs;
};

export function getUnverifyCollectionInstructionDataSerializer(): Serializer<
  UnverifyCollectionInstructionDataArgs,
  UnverifyCollectionInstructionData
> {
  return mapSerializer<
    UnverifyCollectionInstructionDataArgs,
    any,
    UnverifyCollectionInstructionData
  >(
    struct<UnverifyCollectionInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['root', bytes({ size: 32 })],
        ['dataHash', bytes({ size: 32 })],
        ['creatorHash', bytes({ size: 32 })],
        ['nonce', u64()],
        ['index', u32()],
        ['metadata', getMetadataArgsSerializer()],
      ],
      { description: 'UnverifyCollectionInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [250, 251, 42, 106, 41, 137, 186, 168],
    })
  ) as Serializer<
    UnverifyCollectionInstructionDataArgs,
    UnverifyCollectionInstructionData
  >;
}

// Extra Args.
export type UnverifyCollectionInstructionExtraArgs = {
  proof: Array<PublicKey>;
};

// Args.
export type UnverifyCollectionInstructionArgs = PickPartial<
  UnverifyCollectionInstructionDataArgs &
    UnverifyCollectionInstructionExtraArgs,
  'dataHash' | 'creatorHash' | 'proof'
>;

// Instruction.
export function unverifyCollection(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: UnverifyCollectionInstructionAccounts &
    UnverifyCollectionInstructionArgs
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
    payer: { index: 4, isWritable: false, value: input.payer ?? null },
    treeCreatorOrDelegate: {
      index: 5,
      isWritable: false,
      value: input.treeCreatorOrDelegate ?? null,
    },
    collectionAuthority: {
      index: 6,
      isWritable: false,
      value: input.collectionAuthority ?? null,
    },
    collectionAuthorityRecordPda: {
      index: 7,
      isWritable: false,
      value: input.collectionAuthorityRecordPda ?? null,
    },
    collectionMint: {
      index: 8,
      isWritable: false,
      value: input.collectionMint ?? null,
    },
    collectionMetadata: {
      index: 9,
      isWritable: true,
      value: input.collectionMetadata ?? null,
    },
    collectionEdition: {
      index: 10,
      isWritable: false,
      value: input.collectionEdition ?? null,
    },
    bubblegumSigner: {
      index: 11,
      isWritable: false,
      value: input.bubblegumSigner ?? null,
    },
    logWrapper: {
      index: 12,
      isWritable: false,
      value: input.logWrapper ?? null,
    },
    compressionProgram: {
      index: 13,
      isWritable: false,
      value: input.compressionProgram ?? null,
    },
    tokenMetadataProgram: {
      index: 14,
      isWritable: false,
      value: input.tokenMetadataProgram ?? null,
    },
    systemProgram: {
      index: 15,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: UnverifyCollectionInstructionArgs = { ...input };

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
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.treeCreatorOrDelegate.value) {
    resolvedAccounts.treeCreatorOrDelegate.value = context.identity.publicKey;
  }
  if (!resolvedAccounts.collectionAuthority.value) {
    resolvedAccounts.collectionAuthority.value = context.identity;
  }
  if (!resolvedAccounts.collectionAuthorityRecordPda.value) {
    resolvedAccounts.collectionAuthorityRecordPda.value = programId;
    resolvedAccounts.collectionAuthorityRecordPda.isWritable = false;
  }
  if (!resolvedAccounts.collectionMetadata.value) {
    resolvedAccounts.collectionMetadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.collectionMint.value),
    });
  }
  if (!resolvedAccounts.collectionEdition.value) {
    resolvedAccounts.collectionEdition.value = findMasterEditionPda(context, {
      mint: expectPublicKey(resolvedAccounts.collectionMint.value),
    });
  }
  if (!resolvedAccounts.bubblegumSigner.value) {
    resolvedAccounts.bubblegumSigner.value = publicKey(
      '4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK'
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
  if (!resolvedAccounts.tokenMetadataProgram.value) {
    resolvedAccounts.tokenMetadataProgram.value = context.programs.getPublicKey(
      'mplTokenMetadata',
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );
    resolvedAccounts.tokenMetadataProgram.isWritable = false;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedArgs.dataHash) {
    resolvedArgs.dataHash = resolveDataHash(
      context,
      resolvedAccounts,
      resolvedArgs,
      programId,
      false
    );
  }
  if (!resolvedArgs.creatorHash) {
    resolvedArgs.creatorHash = resolveCreatorHash(
      context,
      resolvedAccounts,
      resolvedArgs,
      programId,
      false
    );
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
  const data = getUnverifyCollectionInstructionDataSerializer().serialize(
    resolvedArgs as UnverifyCollectionInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
