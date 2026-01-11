# n8n-nodes-fusionauth

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for FusionAuth, the self-hosted identity and access management platform. This node enables workflow automation for user management, applications, tenants, groups, consents, authentication operations, and much more.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![FusionAuth](https://img.shields.io/badge/FusionAuth-API-green)

## Features

- **12 Resource Types**: User, Application, Tenant, Group, Registration, Identity Provider, Consent, Form, Form Field, Lambda, Webhook, Audit Log
- **80+ Operations**: Comprehensive CRUD operations plus specialized actions for each resource
- **Webhook Trigger**: Real-time event handling with HMAC signature verification
- **Multi-Tenant Support**: Full tenant scoping for all operations
- **API Key Authentication**: Secure authentication with optional tenant headers
- **Comprehensive Error Handling**: Detailed error messages from FusionAuth's response format

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-fusionauth`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Create custom nodes directory if it doesn't exist
mkdir -p custom

# Install the package
npm install n8n-nodes-fusionauth
```

### Development Installation

```bash
# Clone or extract the package
cd n8n-nodes-fusionauth

# Install dependencies
npm install

# Build the project
npm run build

# Link to n8n custom directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-fusionauth

# Restart n8n
```

## Credentials Setup

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Instance URL | String | Yes | Your FusionAuth instance URL (e.g., `https://your-instance.fusionauth.io`) |
| API Key | Password | Yes | FusionAuth API key created in the admin UI |
| Tenant ID | String | No | Default tenant ID for multi-tenant setups |

### Creating an API Key

1. Log in to your FusionAuth admin console
2. Navigate to **Settings** > **API Keys**
3. Click **Add** to create a new API key
4. Configure appropriate permissions for your use case
5. Copy the generated API key

## Resources & Operations

### User

| Operation | Description |
|-----------|-------------|
| Create | Create a new user |
| Get | Get user by ID |
| Get by Email | Get user by email address |
| Get by Username | Get user by username |
| Get All | Search and list users |
| Update | Update user properties |
| Patch | Partial update user |
| Delete | Hard delete user |
| Deactivate | Soft delete/deactivate user |
| Reactivate | Reactivate deactivated user |
| Bulk Delete | Delete multiple users |
| Import | Bulk import users |
| Change Password | Change user password |
| Forgot Password | Start forgot password flow |
| Verify Email | Send verification email |
| Get Two-Factor Recovery Codes | Get 2FA recovery codes |
| Generate Two-Factor Recovery Codes | Generate new recovery codes |
| Enable Two-Factor | Enable 2FA method |
| Disable Two-Factor | Disable 2FA |
| Send Two-Factor Code | Send 2FA code |
| Get Recent Logins | Get user's recent logins |
| Get Registrations | Get user's app registrations |
| Get Refresh Tokens | List user's refresh tokens |
| Revoke Refresh Tokens | Revoke refresh tokens |
| Get User Actions | Get actions on user |
| Get User Comments | Get user comments |
| Add User Comment | Add comment to user |
| Get Consents | Get user consents |
| Update Consents | Update user consents |

### Application

| Operation | Description |
|-----------|-------------|
| Create | Create application |
| Get | Get application by ID |
| Get All | List all applications |
| Update | Update application settings |
| Patch | Partial update application |
| Delete | Remove application |
| Get OAuth Configuration | Get OAuth config |
| Get Roles | List application roles |
| Create Role | Create application role |
| Update Role | Update role |
| Delete Role | Remove role |

### Tenant

| Operation | Description |
|-----------|-------------|
| Create | Create tenant |
| Get | Get tenant by ID |
| Get All | List all tenants |
| Update | Update tenant settings |
| Patch | Partial update tenant |
| Delete | Remove tenant |

### Group

| Operation | Description |
|-----------|-------------|
| Create | Create group |
| Get | Get group by ID |
| Get All | List all groups |
| Update | Update group |
| Delete | Remove group |
| Add Members | Add users to group |
| Remove Members | Remove users from group |
| Get Members | List group members |

### Registration

| Operation | Description |
|-----------|-------------|
| Create | Register user to application |
| Get | Get registration by user and application ID |
| Update | Update registration |
| Patch | Partial update registration |
| Delete | Remove registration |
| Verify | Verify registration |

### Identity Provider

| Operation | Description |
|-----------|-------------|
| Create | Create identity provider |
| Get | Get IdP by ID |
| Get All | List all identity providers |
| Update | Update IdP settings |
| Delete | Remove identity provider |
| Lookup | Lookup user by IdP link |
| Link | Link user to IdP |
| Unlink | Unlink user from IdP |

**Supported Identity Provider Types:**
- Apple, Epic Games, External JWT, Facebook, Google, HYPR
- LinkedIn, Nintendo, OpenID Connect, SAMLv2, SAMLv2 IdP Initiated
- Sony, Steam, Twitch, Twitter, Xbox

### Consent

| Operation | Description |
|-----------|-------------|
| Create | Create consent definition |
| Get | Get consent by ID |
| Get All | List all consents |
| Update | Update consent |
| Delete | Remove consent |
| Get User Consents | Get user's consent status |
| Grant User Consent | Grant consent for user |
| Revoke User Consent | Revoke user's consent |

### Form

| Operation | Description |
|-----------|-------------|
| Create | Create form |
| Get | Get form by ID |
| Get All | List all forms |
| Update | Update form |
| Delete | Remove form |

### Form Field

| Operation | Description |
|-----------|-------------|
| Create | Create form field |
| Get | Get form field by ID |
| Get All | List all form fields |
| Update | Update form field |
| Delete | Remove form field |

### Lambda

| Operation | Description |
|-----------|-------------|
| Create | Create lambda function |
| Get | Get lambda by ID |
| Get All | List all lambdas |
| Update | Update lambda |
| Delete | Remove lambda |

**Supported Lambda Types:**
- JWT Populate, OpenID Reconcile, SAMLv2 Reconcile/Populate
- Apple/Facebook/Google/Twitter Reconcile
- External JWT Reconcile, LDAP Connector Reconcile
- SCIM Server Group/User Request/Response Converters
- Self Service Registration Validation
- Client Credentials JWT Populate

### Webhook

| Operation | Description |
|-----------|-------------|
| Create | Create webhook |
| Get | Get webhook by ID |
| Get All | List all webhooks |
| Update | Update webhook |
| Delete | Remove webhook |
| Test | Test webhook delivery |

### Audit Log

| Operation | Description |
|-----------|-------------|
| Get | Get audit log by ID |
| Get All | Search audit logs |
| Export | Export audit logs |

## Trigger Node

The **FusionAuth Trigger** node listens for webhook events from FusionAuth.

### Supported Events

**User Events:**
- user.create, user.create.complete, user.update, user.update.complete
- user.deactivate, user.reactivate, user.delete, user.delete.complete
- user.bulk.create, user.action, user.email.update, user.email.verified
- user.identity-provider.link, user.identity-provider.unlink
- user.login.success, user.login.failed, user.login.new-device, user.login.suspicious
- user.password.breach, user.password.reset.send/start/success, user.password.update
- user.registration.create/update/delete (with .complete variants), user.registration.verified
- user.two-factor.method.add, user.two-factor.method.remove

**JWT Events:**
- jwt.public-key.update, jwt.refresh, jwt.refresh-token.revoke

**Group Events:**
- group.create, group.update, group.delete (with .complete variants)
- group.member.add, group.member.remove, group.member.update (with .complete variants)

**Other Events:**
- kickstart.success, audit-log.create

### Webhook Configuration

1. Create a new workflow with the FusionAuth Trigger node
2. Activate the workflow to get the webhook URL
3. In FusionAuth Admin UI, go to **Settings** > **Webhooks**
4. Create a new webhook pointing to your n8n webhook URL
5. Select the events you want to receive
6. Optionally configure HMAC signing for security

## Usage Examples

### Create a User with Registration

```javascript
// Using the FusionAuth node
// Resource: User
// Operation: Create

{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "registrations": [{
    "applicationId": "your-app-id",
    "roles": ["user"]
  }]
}
```

### Search Users

```javascript
// Resource: User
// Operation: Get All

// Use filters:
// - Query String: "email:*@example.com"
// - Sort By: "email"
// - Sort Order: "asc"
```

### Bulk Import Users

```javascript
// Resource: User
// Operation: Import

// Users JSON:
{
  "users": [
    {
      "email": "user1@example.com",
      "password": "password1"
    },
    {
      "email": "user2@example.com",
      "password": "password2"
    }
  ]
}
```

## Error Handling

The node handles FusionAuth's error response format:

```json
{
  "fieldErrors": {
    "user.email": [{
      "code": "[duplicate]user.email",
      "message": "A User with email already exists."
    }]
  },
  "generalErrors": [{
    "code": "[invalid]",
    "message": "Invalid request."
  }]
}
```

Errors are parsed and returned as readable messages in n8n.

## Security Best Practices

1. **Use API Keys with Minimum Permissions**: Create API keys with only the permissions needed for your workflows
2. **Enable Webhook Signatures**: Use HMAC signing for webhook verification
3. **Use Tenant Scoping**: Scope API keys to specific tenants when possible
4. **Rotate API Keys Regularly**: Follow your organization's security policies
5. **Use Environment Variables**: Store sensitive credentials as n8n environment variables

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Lint
npm run lint

# Run tests
npm test

# Test with coverage
npm run test:coverage
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Documentation**: [FusionAuth API Docs](https://fusionauth.io/docs/apis/)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-fusionauth/issues)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io/)

## Acknowledgments

- [FusionAuth](https://fusionauth.io/) for the excellent identity platform
- [n8n](https://n8n.io/) for the powerful workflow automation platform
