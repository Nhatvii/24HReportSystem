﻿using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Service;
using _24HReportSystemData.ViewModel;
using _24HReportSystemData.ViewModel.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using ReportSystemData.ViewModel.Account;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _24HReportSystemAPI.Controllers
{
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _repository;
        private readonly IEmailSender _emailSender;

        public AccountController(IAccountService service, IEmailSender emailSender)
        {
            _repository = service;
            _emailSender = emailSender;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Account> GetAllAccount([FromQuery]AccountParameters accountParameters)
        {
            return Ok(_repository.GetAllAccount(accountParameters));
        }
        //[HttpGet]
        //[Route("GetEmailTest")]
        //[Produces("application/json")]
        //public ActionResult<Account> GetEmailTest()
        //{
        //    var message = new Message(new string[] { "tranvanquanghuy117@gmail.com" }, "Account verify 24HReportSystem", "This is the content from our email.");
        //    _emailSender.SendEmail(message);
        //    return Ok(message);
        //}
        [HttpGet]
        [Route("GetAccount")]
        [Produces("application/json")]
        public ActionResult<Report> GetAccountByID(string UserId)
        {
            return Ok(_repository.GetAccountByID(UserId));
        }
        [HttpGet]
        [Route("CheckAccountRegister")]
        [Produces("application/json")]
        public ActionResult<Report> CheckAccountRegister(string phoneNumber)
        {
            return Ok(_repository.CheckAccountRegister( phoneNumber));
        }

        [HttpPost]
        [Route("Login")]
        public ActionResult<Account> Login(LoginParameter login)
        {
            return Ok(_repository.Login(login));
        }
        [HttpPost]
        [Route("LoginWithGoogle")]
        public async Task<IActionResult> LoginWithGoogle(string email)
        {
            return Ok(await _repository.LoginWithGoogleAsync(email));
        }

        [HttpPost]
        [Produces("application/json")]
        [Route("Register")]
        public async Task<IActionResult> Register(CreateAccountViewModel acc)
        {
            return Ok(await _repository.RegisterAsync(acc));
        }
        [HttpPut]
        [Produces("application/json")]
        public ActionResult<Account> UpdateAccount(UpdateAccountViewModel account)
        {
            return Ok(_repository.UpdateAccount(account));
        }
        [HttpPut]
        [Produces("application/json")]
        [Route("UpdateAccountAuthen")]
        public ActionResult<Account> UpdateAccountAuthen(string accountID)
        {
            return Ok(_repository.UpdateAccountAuthen(accountID));
        }
        [HttpPut]
        [Produces("application/json")]
        [Route("UpdateAccountLocation")]
        public ActionResult<Account> UpdateAccountLocation(UpdateLocationAccountViewModel model)
        {
            return Ok(_repository.UpdateAccountLocation(model));
        }
    }
}
