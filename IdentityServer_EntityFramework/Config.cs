// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            { 
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource(
                    "recursoDeIdentidade1",
                    "Recurso de Identidade 1",
                    new List<string>{
                        "Claim1",
                        "Claim2"                                               
                    }
                )
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            { 
                new ApiScope("api1","My API")                
            };

        public static IEnumerable<Client> Clients =>
            new Client[] 
            {
                new Client
                {
                    ClientId = "client",

                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes = { "api1" }
                },                
                new Client
                        {
                            ClientId = "mvc",
                            ClientSecrets = { new Secret("secret".Sha256()) },

                            AllowedGrantTypes = GrantTypes.Code,

                            // where to redirect to after login
                            RedirectUris = { "https://localhost:5002/signin-oidc" },

                            // where to redirect to after logout
                            PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" },
                            RequireConsent = true,
                            AllowOfflineAccess = true,
                            
                            AllowedScopes = new List<string>
                            {
                                IdentityServerConstants.StandardScopes.OpenId,
                                IdentityServerConstants.StandardScopes.Profile,
                                "recursoDeIdentidade1",
                                "api1"
                            }
                        },                
                new Client
                        {
                            ClientId = "angular",
                            

                            AllowedGrantTypes = GrantTypes.Implicit,
                            AllowAccessTokensViaBrowser = true,

                            // where to redirect to after login-callback
                            RedirectUris = { "http://localhost:4200/login-callback" },

                            // where to redirect to after logout
                            PostLogoutRedirectUris = { "http://localhost:4200/home" },
                            AllowedCorsOrigins = { "http://localhost:4200" },
                            AlwaysIncludeUserClaimsInIdToken= true,
                            AllowedScopes = new List<string>
                            {
                                IdentityServerConstants.StandardScopes.OpenId,
                                IdentityServerConstants.StandardScopes.Profile,
                                "recursoDeIdentidade1",
                                "api1"
                            }
                        }           
        };
    }
}