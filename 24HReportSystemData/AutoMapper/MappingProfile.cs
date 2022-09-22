using _24HReportSystemData.Models;
using _24HReportSystemData.ViewModel.Notify;
using _24HReportSystemData.ViewModel.Office;
using _24HReportSystemData.ViewModel.Report;
using AutoMapper;
using ReportSystemData.Parameter.Report;
using ReportSystemData.ViewModel.Category;
using ReportSystemData.ViewModel.Comment;
using ReportSystemData.ViewModel.Emotion;
using ReportSystemData.ViewModel.Post;
using ReportSystemData.ViewModel.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
            CreateMap<CreateTaskViewModel, Task>();

            CreateMap<CreateCommentViewModel, Comment>();

            CreateMap<Category, CreateCategoryViewModel>();
            CreateMap<CreateCategoryViewModel, Category>();

            CreateMap<UpdateViewCountViewModel, EditStatusEmotion>();

            CreateMap<ReportResponseWithUserID, Report>();
            CreateMap<Report, ReportResponseWithUserID>();

            CreateMap<CreateOfficeViewModel, OfficeInfo>();

            CreateMap<CreateNotifyViewModel, NotifyInfo>();
        }
    }
}
