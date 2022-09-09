using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface ICategoryService : IBaseService<Category>
    {
        List<Category> GetAllCategory(SubCategoryParameters subCategoryParameters);
        Category GetCategoryByID(int id);
        Task<SuccessResponse> CreateCategoryAsync(CreateCategoryViewModel cate);
        SuccessResponse UpdateCategory(UpdateCategoryViewModel cate);
        SuccessResponse DeleteCategory(int id);
        bool CheckAvailableCategory(int id);
        bool CheckAvaiCategoryWithRoot(int id);
    }
    public partial class CategoryService : BaseService<Category>, ICategoryService
    {
        private readonly IMapper _mapper;
        public CategoryService(DbContext context, IMapper mapper, ICategoryRepository repository) : base(context, repository)
        {
            _dbContext = context;
            _mapper = mapper;
        }

        public List<Category> GetAllCategory(SubCategoryParameters subCategoryParameters)
        {
            var category = Get().ToList();
            if(subCategoryParameters.RootCategoryId.HasValue || subCategoryParameters.RootCategoryId > 0)
            {
                category = category.Where(p => p.RootCategoryId == subCategoryParameters.RootCategoryId).ToList();
            }
            if(subCategoryParameters.IsRootCategory != null)
            {
                if((bool)subCategoryParameters.IsRootCategory)
                {
                    category = category.Where(p => p.RootCategoryId == null).ToList();
                }
            }
            return category;
        }

        public Category GetCategoryByID(int id)
        {
            var category = Get().Where(r => r.CategoryId == id).FirstOrDefault();
            return category;
        }
        
        public async Task<SuccessResponse> CreateCategoryAsync(CreateCategoryViewModel cate)
        {
            var dupliSubCate = CheckDuplicateCategoryType(cate.SubCategory);
            if(dupliSubCate)
            {
                throw new ErrorResponse("Danh mục phụ này đã tồn tại", (int)HttpStatusCode.Conflict);
            }
            var cateTmp = _mapper.Map<Category>(cate);
            cateTmp.RootCategoryId = cate.RootCategoryID;
            cateTmp.Type = cate.SubCategory;
            await CreateAsyn(cateTmp);
            return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
        }

        public SuccessResponse UpdateCategory(UpdateCategoryViewModel cate)
        {
            //var check = _rootCategoryService.GetRootCategoryByID(cate.RootCategory);
            //if (cate.RootCategory.HasValue && cate.RootCategory > 0)
            //{
            //    if (check == null)
            //    {
            //        throw new ErrorResponse("RootCategory isn't available", (int)HttpStatusCode.NotFound);
            //    }
            //}
            var cateTmp = Get().Where(r => r.CategoryId == cate.CategoryId).FirstOrDefault();
            cateTmp.Type = cate.SubCategory;
            if (cate.RootCategory.HasValue && cate.RootCategory > 0)
            {
                cateTmp.RootCategoryId = cate.RootCategory;
            }
            Update(cateTmp);
            return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
        }

        public SuccessResponse DeleteCategory(int id)
        {
            var cate = Get().Where(r => r.CategoryId == id).FirstOrDefault();
            if (cate != null)
            {
                Delete(cate);
                return new SuccessResponse((int)HttpStatusCode.OK, "Xóa thành công");
            }
            throw new ErrorResponse("Danh mục phụ không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public bool CheckAvailableCategory(int id)
        {
            var cate = Get().Where(r => r.CategoryId == id).FirstOrDefault();
            if (cate != null)
            {
                return true;
            }
            return false;
        }
        public bool CheckAvaiCategoryWithRoot(int id)
        {
            var check = Get().Where(r => r.RootCategoryId == id).FirstOrDefault();
            if(check == null)
            {
                return true;
            }
            return false;
        }
        public bool CheckDuplicateCategoryType(string cateType)
        {
            var check = Get().Where(p => p.Type.ToLower().Equals(cateType.ToLower())).FirstOrDefault();
            if(check != null)
            {
                return true;
            }
            return false;
        }
    }
}
