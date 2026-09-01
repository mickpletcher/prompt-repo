# Remote Service Connectivity Diagnosis

Use this prompt to diagnose why a Windows client, browser, script, or application
cannot reach a remote service without changing the remote system prematurely.

## Prompt

Diagnose this connection:

- Client system: `[INSERT WINDOWS VERSION AND NETWORK]`
- Client application or command: `[INSERT CLIENT]`
- Service type: `[HTTPS | API | WEBSOCKET | SSH | DATABASE | OTHER]`
- Sanitized hostname and port: `[INSERT TARGET]`
- Expected route or tunnel: `[DIRECT | VPN | TAILSCALE | SSH TUNNEL | PROXY | OTHER]`
- Authentication method: `[INSERT METHOD WITHOUT SECRET]`
- Exact sanitized error: `[INSERT ERROR]`
- Last known working time or change: `[INSERT DETAILS OR UNKNOWN]`
- Available server-side access: `[NONE | READ ONLY | ADMIN]`
- Requested mode: `[DIAGNOSIS ONLY | APPLY APPROVED CLIENT FIX]`

Default to diagnosis only. Do not restart services, change firewalls, open ports,
modify DNS, alter certificates, rotate credentials, or change server
configuration until the failed layer is identified and the action is approved.

### 1. Define the expected connection path

Map the path from client to service:

1. application or browser;
2. local configuration;
3. DNS or hosts resolution;
4. local proxy, VPN, or tunnel;
5. route and firewall;
6. destination listener;
7. TLS or protocol negotiation;
8. authentication and authorization;
9. application endpoint or resource.

Confirm the intended scheme, host, port, path, protocol, and tunnel endpoint.
Do not share real tokens, passwords, cookies, private keys, internal hostnames,
or full private URLs.

### 2. Preserve the original failure

Capture:

- exact client error and timestamp;
- HTTP status, WebSocket close code, TLS alert, or socket error;
- application logs with secrets removed;
- whether failure occurs in one client or every client;
- whether failure is immediate, delayed, intermittent, or authentication-specific.

Ensure wrappers and cleanup code do not mask the original connection failure.
Separate a UI message from the underlying network or protocol error.

### 3. Test from the bottom up

Use read-only tests in this order:

#### Name resolution

- verify the hostname resolves to the expected address;
- identify split DNS, stale cache, search suffix, IPv4, and IPv6 differences;
- compare normal resolution with the expected VPN or tunnel namespace.

#### Route and port

- inspect the expected interface and route;
- test the exact TCP or UDP port as appropriate;
- confirm a tunnel or VPN is connected and routes the destination;
- distinguish timeout, refusal, unreachable network, and filtered traffic.

#### TLS and protocol

- verify certificate name, chain, dates, trust, and protocol compatibility;
- confirm the service actually speaks the expected protocol on that port;
- inspect proxy interception, redirect, mixed-content, and secure-context issues;
- test the exact WebSocket or API path, not only the root web page.

#### Authentication and authorization

- confirm the credential type and required scope without revealing its value;
- distinguish missing, expired, invalid, and insufficient credentials;
- verify server time and client time when tokens are time-bound;
- separate successful authentication from permission to the requested resource.

#### Application behavior

- compare a minimal protocol client with the full application;
- inspect URI construction, headers, origin rules, subprotocols, and API version;
- check whether a browser extension, content policy, or client configuration
  changes the request.

Stop when the first failed layer is proven. Do not jump to server changes because
the application reports a generic connection error.

### 4. Handle tunnels and remote gateways

For SSH tunnels, VPNs, overlay networks, and gateways, verify:

- local bind address and port;
- remote destination as seen from the tunnel endpoint;
- route ownership and DNS behavior;
- listener scope such as loopback versus all interfaces;
- tunnel process health and reconnect behavior;
- whether browser or application URLs reference the local or remote endpoint;
- whether TLS names remain valid through the tunnel.

Do not expose a loopback-only service publicly as a troubleshooting shortcut.

### 5. Propose the smallest correction

For the proven root cause, state:

- exact client or server component at fault;
- evidence;
- smallest safe fix;
- security impact;
- rollback;
- validation steps;
- whether remote administration is required.

Prefer client-side or configuration corrections when the service is healthy.
Do not disable TLS validation, antivirus, firewall, or authentication as a
permanent fix.

### 6. Apply only an approved client fix

In `APPLY APPROVED CLIENT FIX` mode, change only the approved client setting,
tunnel, or local configuration. Preserve its previous value and verify the
connection through the original application afterward.

Remote service, firewall, DNS, identity, and certificate changes require
separate authorization.

### Completion report

Provide:

- expected connection path;
- first failed layer and evidence;
- tests and sanitized results;
- root cause and smallest correction;
- changes made and rollback;
- final application-level verification;
- remote actions or credentials still required.
