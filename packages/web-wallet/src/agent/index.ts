import {getDidJwkResolver} from '@sphereon/ssi-sdk-ext.did-resolver-jwk'
import {eventLoggerAuditMethods} from '@sphereon/ssi-sdk.event-logger'
import {sphereonKeyManagerMethods} from '@sphereon/ssi-sdk-ext.key-manager'
import {VcApiIssuerClient} from '@sphereon/ssi-sdk.w3c-vc-api-issuer-rest-client'
import {QrCodeProvider} from '@sphereon/ssi-sdk.qr-code-generator'
import {LinkHandlerEventType, LinkHandlerPlugin, LinkHandlers, LogLinkHandler} from '@sphereon/ssi-sdk.core'
import {OID4VCIRestClient} from '@sphereon/ssi-sdk.oid4vci-issuer-rest-client'
import {createAgent, IAgentContext, IAgentPlugin} from '@veramo/core'
import {getDidIonResolver} from '@veramo/did-provider-ion'
import {getDidKeyResolver} from '@veramo/did-provider-key'
import {DIDResolverPlugin} from '@veramo/did-resolver'
import {AgentRestClient} from '@veramo/remote-client'
import {Resolver} from 'did-resolver'
import {AGENT_BASE_URL, OID4VCI_API_URL, VC_API_GET_CREDENTIAL_ISSUE_URL} from './environment'
import {OID4VCIHolder, oid4vciHolderContextMethods, OID4VCIHolderLinkHandler} from '@sphereon/ssi-sdk.oid4vci-holder'
import {contactManagerMethods} from '@sphereon/ssi-sdk.contact-manager'
import {issuanceBrandingMethods} from '@sphereon/ssi-sdk.issuance-branding'
import {pdManagerMethods} from '@sphereon/ssi-sdk.pd-manager'
import {oid4vciStateNavigationListener} from '@machines/oid4vci/oid4vciStateNavigation'
import {AuthorizationRequestOpts, PARMode} from '@sphereon/oid4vci-common'
import {CLIENT_ID, OID4VCI_CODE_URL_REGEX, OID4VCI_DEFAULT_REDIRECT_URI, SIOP_DEFAULT_REDIRECT_URI} from '@/app'
import {TAgentTypes} from '@types'
import {DidAuthSiopOpAuthenticator, OID4VPCallbackStateListener, Siopv2OID4VPLinkHandler} from '@sphereon/ssi-sdk.siopv2-oid4vp-op-auth'
import {vpStateCallbacks} from '@machines/siopv2/siopv2StateNavigation'
import {didAuthSiopOpAuthenticatorMethods} from '@sphereon/ssi-sdk.siopv2-oid4vp-op-auth'

export const resolver = new Resolver({
  ...getDidKeyResolver(),
  ...getDidJwkResolver(),
  ...getDidIonResolver(),
})

export const linkHandlers: LinkHandlers = new LinkHandlers().add(new LogLinkHandler())

const plugins: IAgentPlugin[] = [
  new DIDResolverPlugin({
    resolver,
  }),
  new VcApiIssuerClient({
    issueUrl: VC_API_GET_CREDENTIAL_ISSUE_URL,
    authorizationToken: 'test',
  }),
  new OID4VCIRestClient({
    baseUrl: OID4VCI_API_URL,
    authentication: {
      enabled: false,
    },
  }),
  new DidAuthSiopOpAuthenticator(),
  new QrCodeProvider(),
  new AgentRestClient({
    url: AGENT_BASE_URL,
    enabledMethods: [
      ...issuanceBrandingMethods,
      ...eventLoggerAuditMethods,
      ...oid4vciHolderContextMethods,
      ...didAuthSiopOpAuthenticatorMethods,
      'didManagerCreate',
      ...pdManagerMethods,
      ...contactManagerMethods,
      ...sphereonKeyManagerMethods,
    ],
  }),
  new OID4VCIHolder(),
  new LinkHandlerPlugin({
    eventTypes: [LinkHandlerEventType.LINK_HANDLER_URL],
    handlers: linkHandlers,
  }),
]

const agent = createAgent<TAgentTypes>({
  plugins,
})

export default agent
export const agentContext = {...agent.context, agent}

const addLinkListeners = (linkHandlers: LinkHandlers, context: IAgentContext<any>): void => {
  const vciAuthorizationRequestOpts = {
    redirectUri: OID4VCI_DEFAULT_REDIRECT_URI,
    clientId: CLIENT_ID,
    // fixme: Set back to auto. We only do this because of a bug in PAR handling Walt.id
    parMode: PARMode.NEVER,
  } satisfies AuthorizationRequestOpts
  linkHandlers.add([
    new OID4VCIHolderLinkHandler({
      protocols: [
        OID4VCI_CODE_URL_REGEX, // Only scoped to /oid4vci, as we pass in redirect URIs, and we could have other codes in the future
        new RegExp('https?:\\/\\/.*\\?.*credential_offer=.+'),
        new RegExp('https?:\\/\\/.*\\?.*credential_offer_uri=.+'),
      ],
      authorizationRequestOpts: vciAuthorizationRequestOpts,
      stateNavigationListener: oid4vciStateNavigationListener,
      context,
    }),
    new Siopv2OID4VPLinkHandler({
      protocols: [new RegExp('http:\\/\\/.*\\?.*request_uri=.+'), new RegExp('https:\\/\\/.*\\?.*request_uri=.+')],
      stateNavigationListener: OID4VPCallbackStateListener(vpStateCallbacks),
      noStateMachinePersistence: true,
      context,
    }),
  ])
}

addLinkListeners(linkHandlers, agentContext)
