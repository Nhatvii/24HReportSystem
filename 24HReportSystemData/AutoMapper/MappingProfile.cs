﻿using _24HReportSystemData.Models;
using _24HReportSystemData.ViewModel.Report;
using AutoMapper;
using ReportSystemData.Parameter.Report;
using ReportSystemData.ViewModel.Category;
using ReportSystemData.ViewModel.Comment;
using ReportSystemData.ViewModel.Emotion;
using ReportSystemData.ViewModel.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<Post, PostDTO>().ReverseMap();
            CreateMap<Report, CreateReportViewModel>();
            CreateMap<CreateReportViewModel, Report>();

            CreateMap<CreatePostViewModel, Post>();

            CreateMap<CreateCommentViewModel, Comment>();

            CreateMap<Category, CreateCategoryViewModel>();
            CreateMap<CreateCategoryViewModel, Category>();

            CreateMap<UpdateViewCountViewModel, EditStatusEmotion>();

            CreateMap<ReportResponseWithUserID, Report>();
            CreateMap<Report, ReportResponseWithUserID>();
        }
    }
}
