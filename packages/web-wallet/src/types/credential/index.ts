import {Party} from '@sphereon/ssi-sdk.data-store'
import {CredentialStatus} from '@sphereon/ui-components.core'
import {CredentialMiniCardViewProps} from '@sphereon/ui-components.ssi-react'
import {CredentialSummary} from '@sphereon/ui-components.credential-branding'
import {getMatchingIdentity} from '@helpers/IdentityFilters'
import {formatDate} from '@helpers/date/DateHelper'
import {CredentialMapper} from '@sphereon/ssi-types'

export type Credential = {
  hash: string
  raw: string
  id: string
  issuanceDate: string
  expirationDate?: string
  context: string
  type: string
  issuerDid: string
  subjectDid: string
}

export type CredentialReference = {
  id: string
  credential_id: string
  credential_string: string
  asset_id: string
}

export enum IssueMethod {
  QR_CODE = 'qrCode',
}
export class CredentialTableItem {
  id?: string
  hash: string
  createdStr: string
  validFromStr: string
  expirationDateStr?: string
  context: string
  type: string
  issuer: Party
  subject: Party | undefined
  raw: string
  status: CredentialStatus
  actions: string
  miniCardView: CredentialMiniCardViewProps

  constructor(data: {
    id?: string
    hash: string
    createdStr: string
    validFromStr: string
    expirationDateStr?: string
    context: string
    type: string
    issuer: Party
    subject: Party | undefined
    raw: string
    status: CredentialStatus
    credentialCardViewProps: CredentialMiniCardViewProps
  }) {
    this.id = data.id
    this.hash = data.hash
    this.createdStr = data.createdStr
    this.validFromStr = data.validFromStr
    this.expirationDateStr = data.expirationDateStr
    this.context = data.context
    this.type = data.type
    this.issuer = data.issuer
    this.subject = data.subject
    this.raw = data.raw
    this.status = data.status
    this.actions = 'actions'
    this.miniCardView = data.credentialCardViewProps
  }

  static from(credential: Credential, parties: Party[], credentialSummary?: CredentialSummary): CredentialTableItem {
    const issuerPartyIdentity = getMatchingIdentity(parties, credential.issuerDid)
    if (!issuerPartyIdentity) {
      throw new Error(`Couldn't find matching identity for the issuer: ${credential.issuerDid}`)
    }

    const subjectPartyIdentity = credential.subjectDid ? getMatchingIdentity(parties, credential.subjectDid) : undefined
    const subjectParty = subjectPartyIdentity ? subjectPartyIdentity.party : undefined

    const issuanceDateStr = formatDate(credential.issuanceDate)
    const expirationDateStr = formatDate(credential.expirationDate)

    const status = CredentialMapper.hasProof(JSON.parse(credential.raw))
      ? credential.expirationDate && new Date(credential.expirationDate) < new Date()
        ? CredentialStatus.EXPIRED
        : CredentialStatus.VALID
      : CredentialStatus.DRAFT

    const credentialCardViewProps: CredentialMiniCardViewProps = {
      ...(credentialSummary?.branding?.logo && {logo: credentialSummary?.branding?.logo}),
      ...(credentialSummary?.branding?.background?.image && {backgroundImage: credentialSummary?.branding?.background?.image}),
      ...(credentialSummary?.branding?.background?.color && {backgroundColor: credentialSummary?.branding?.background?.color}),
    }

    return new CredentialTableItem({
      id: credential.id,
      hash: credential.hash,
      createdStr: issuanceDateStr,
      validFromStr: issuanceDateStr,
      expirationDateStr,
      context: credential.context,
      type: credential.type
        .split(',')
        .filter(type => type !== 'VerifiableCredential')
        .join(','),
      issuer: issuerPartyIdentity.party,
      subject: subjectParty,
      raw: credential.raw,
      status,
      credentialCardViewProps,
    })
  }
}
