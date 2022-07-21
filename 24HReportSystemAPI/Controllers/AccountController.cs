using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
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

        public AccountController(IAccountService service)
        {
            _repository = service;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Account> GetAllAccount()
        {
            return Ok(_repository.GetAllAccount());
        }

        [HttpGet]
        [Route("GetAccount")]
        [Produces("application/json")]
        public ActionResult<Report> GetAccountByID(string email)
        {
            return Ok(_repository.GetAccountByID(email));
        }
        [HttpGet]
        [Route("CheckAccountRegister")]
        [Produces("application/json")]
        public ActionResult<Report> CheckAccountRegister([Required]string email, [Required]string phoneNumber)
        {
            return Ok(_repository.CheckAccountRegister(email, phoneNumber));
        }

        [HttpPost]
        [Route("Login")]
        public ActionResult<Account> Login(LoginParameter login)
        {
            return Ok(_repository.Login(login));
        }

        [HttpPost]
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
    }
}
