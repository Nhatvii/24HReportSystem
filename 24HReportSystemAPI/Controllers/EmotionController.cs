using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using ReportSystemData.ViewModel.Emotion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportSystemAPI.Controllers
{
    [Route("api/Emotion")]
    [ApiController]
    public class EmotionController : ControllerBase
    {
        private readonly IEmotionService _repository;
        public EmotionController(IEmotionService service)
        {
            _repository = service;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Emotion> GetAllPost([FromQuery] EmotionParameters emotionParameter)
        {
            return Ok(_repository.GetAllEmotion(emotionParameter));
        }
        [HttpPut]
        [Produces("application/json")]
        [Route("EditEmotion")]
        public async Task<IActionResult> UpdateStatusEmotion(EditStatusEmotion statusEmotion)
        {
            return Ok(await _repository.ChangeStatusEmotion(statusEmotion));
        }

        [HttpPost]
        [Produces("application/json")]
        [Route("CreatePostSave")]
        public async Task<IActionResult> CreatePostSave(EditStatusEmotion post)
        {
            return Ok(await _repository.CreateEmotionSave(post));
        }
        [HttpPost]
        [Produces("application/json")]
        [Route("CreatePostView")]
        public async Task<IActionResult> CreatePostView(EditStatusEmotion post)
        {
            return Ok(await _repository.CreateEmotionView(post));
        }
    }
}
