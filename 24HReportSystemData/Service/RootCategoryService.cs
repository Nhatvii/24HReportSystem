using _24HReportSystemData.Models;
using _24HReportSystemData.Response;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface IRootCategoryService : IBaseService<RootCategory>
    {
        List<RootCategory> GetAllRootCategory();
        RootCategory GetRootCategoryByID(int? id);
        Task<SuccessResponse> CreateRootCategoryAsync(string rootType);
        SuccessResponse UpdateRootCategory(int id, string rootType);
        SuccessResponse DeleteRootCategory(int id);
    }
    public partial class RootCategoryService : BaseService<RootCategory>, IRootCategoryService
    {
        public RootCategoryService(DbContext context, IRootCategoryRepository repository) : base(context, repository)
        {
            _dbContext = context;
        }
        public List<RootCategory> GetAllRootCategory()
        {
            var rootCate = Get().Where(p => p.RootCategoryId != 1).ToList();
            return rootCate;
        }

        public RootCategory GetRootCategoryByID(int? id)
        {
            var category = Get().Where(r => r.RootCategoryId == id).FirstOrDefault();
            return category;
        }

        public bool CheckDuplicateRootCate(string rootType)
        {
            var rootCate = Get().Where(r => r.Type.Equals(rootType.ToLower())).FirstOrDefault();
            if(rootCate != null)
            {
                return true;
            }
            return false;
        }
        public async Task<SuccessResponse> CreateRootCategoryAsync(string rootType)
        {
            var checkDuplicate = CheckDuplicateRootCate(rootType);
            if(checkDuplicate)
            {
                throw new ErrorResponse("Danh mục gốc đã bị trùng!!!", (int)HttpStatusCode.Conflict);
            }
            var rootCate = new RootCategory()
            {
                Type = rootType,
            };
            await CreateAsyn(rootCate);
            return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
        }

        public SuccessResponse UpdateRootCategory(int id, string rootType)
        {
            var checkDuplicate = CheckDuplicateRootCate(rootType);
            if (checkDuplicate)
            {
                throw new ErrorResponse("Danh mục gốc đã bị trùng!!!", (int)HttpStatusCode.Conflict);
            }
            var rootCate = GetRootCategoryByID(id);
            if (rootCate != null)
            {
                rootCate.Type = rootType;
                Update(rootCate);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Danh mục gốc đã bị trùng!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse DeleteRootCategory(int id)
        {
            var rootCate = GetRootCategoryByID(id);
            if (rootCate != null)
            {
                Delete(rootCate);
                return new SuccessResponse((int)HttpStatusCode.OK, "Xóa thành công");
            }
            throw new ErrorResponse("Danh mục gốc đã bị trùng!!!", (int)HttpStatusCode.NotFound);
        }

    }
}
