import {
  ICredentialIssuer,
  ICredentialVerifier,
  IDataStore,
  IDataStoreORM,
  IDIDManager,
  IDIDManagerCreateArgs,
  IIdentifier,
  IKeyManager,
  IResolver,
} from '@veramo/core'
import { IContactManager } from '@sphereon/ssi-sdk.contact-manager'
import { IOID4VCIStore } from '@sphereon/ssi-sdk.oid4vci-issuer-store'
import { IOID4VCIIssuer } from '@sphereon/ssi-sdk.oid4vci-issuer'
import { IIssuanceBranding } from '@sphereon/ssi-sdk.issuance-branding'
import { ISphereonKeyManager } from '@sphereon/ssi-sdk-ext.key-manager'
import { IPDManager } from '@sphereon/ssi-sdk.pd-manager'
import { IPresentationExchange } from '@sphereon/ssi-sdk.presentation-exchange'
import { IPEXInstanceOptions } from '@sphereon/ssi-sdk.siopv2-oid4vp-rp-auth/src/types/ISIOPv2RP'
import { ISIOPv2RP } from '@sphereon/ssi-sdk.siopv2-oid4vp-rp-auth'

export const DID_PREFIX = 'did'

/**
 * SSI SDK modules supported by this agent. This type is used to expose available agent methods in the IDE
 */
export type TAgentTypes = IDIDManager &
  IResolver &
  IKeyManager &
  IDataStore &
  IDataStoreORM &
  ICredentialVerifier &
  ICredentialIssuer &
  IContactManager &
  IOID4VCIStore &
  IOID4VCIIssuer &
  IIssuanceBranding &
  ISphereonKeyManager &
  IPDManager &
  IPresentationExchange &
  ISIOPv2RP

/**
 * The Key Management System (name) to use. Currently, there is only one KMS
 */
export enum KMS {
  LOCAL = 'local',
}

/**
 * Predefined DID methods. In case more DID methods should be support, you will also have to import SSI-SDK modules
 */
export enum DIDMethods {
  DID_ION = 'ion',
  DID_JWK = 'jwk',
  DID_WEB = 'web',
  DID_KEY = 'key',
  DID_EBSI = 'ebsi',
}

/**
 * Options for creating DIDs from configuration files. These files are imported into the agent database during startup
 */
export interface IDIDOpts {
  did?: string // The DID to import
  createArgs?: IDIDManagerCreateArgs
  // importArgs?: IImportX509DIDArg
  privateKeyHex?: string // The private key. Can be removed once the DID is created in the agent DB
}

/**
 * DID creation result, which contains an identifier
 */
export interface IDIDResult extends IDIDOpts {
  identifier?: IIdentifier // The identifier that was created
}

export type OID4VPInstanceOpts = Omit<IPEXInstanceOptions, 'definition'>

/*
/!**
 * X.509 Certificate values that can be set during import
 *!/
export interface IImportX509DIDArg {
    domain: string
    privateKeyPEM: string
    certificatePEM: string
    certificateChainPEM: string
    certificateChainURL?: string
    kms?: string // The Key Management System to use. Will default to 'local' when not supplied.
    kid?: string // The requested KID. A default will be generated when not supplied
}
*/
