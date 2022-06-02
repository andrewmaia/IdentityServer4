using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MvcClient.Models;
using Newtonsoft.Json.Linq;
using IdentityModel.Client;

namespace MvcClient.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Logout()
        {
            return SignOut("Cookies", "oidc");
        } 

        public async Task<IActionResult> CallApi()
        {
            var response = await AccessTokenRefreshWrapper(
                ()=> SecuredGetRequest("https://localhost:6001/identity")
            );

            string retorno = await response.Content.ReadAsStringAsync();
            ViewBag.Json = JArray.Parse(retorno).ToString();
            return View("json");
        }

        private async Task<HttpResponseMessage> AccessTokenRefreshWrapper(
            Func<Task<HttpResponseMessage>> requisicao
        ){  
            var response = await requisicao();
            if(response.StatusCode == HttpStatusCode.Unauthorized)
            {
                await RefreshToken();
                response = await requisicao();
            }
            return response;
        }

        private async Task<HttpResponseMessage> SecuredGetRequest(string url)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            return await client.GetAsync(url);
        }

        public async Task RefreshToken()
        {
            var identityClient = new HttpClient();
            var document = await identityClient.GetDiscoveryDocumentAsync("https://localhost:5001");


            var refreshToken = await HttpContext.GetTokenAsync("refresh_token");
            RefreshTokenRequest request = new RefreshTokenRequest();
            request.Address=document.TokenEndpoint;
            request.RefreshToken=refreshToken;
            request.ClientId= "mvc";
            request.ClientSecret ="secret";
            var tokenResponse = await identityClient.RequestRefreshTokenAsync(request);

            var authInfo= await HttpContext.AuthenticateAsync("Cookies");
            authInfo.Properties.UpdateTokenValue("access_token", tokenResponse.AccessToken);
            authInfo.Properties.UpdateTokenValue("refresh_token", tokenResponse.RefreshToken);

            await HttpContext.SignInAsync("Cookies",authInfo.Principal,authInfo.Properties); 
            refreshToken = await HttpContext.GetTokenAsync("refresh_token");           
        }        
    }
}
