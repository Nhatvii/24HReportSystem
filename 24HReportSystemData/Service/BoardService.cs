using _24HReportSystemData.Models;
using _24HReportSystemData.Repositories;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel.Board;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Service
{
    public partial interface IBoardService : IBaseService<Board>
    {
        List<Board> GetAllBoard();
        Board GetBoardByID(string id);
        SuccessResponse CreateBoard(CreateBoardViewModel model);
        SuccessResponse UpdateBoard(UpdateBoardViewModel model);
        SuccessResponse DeleteBoard(string id);
        Board GetLastedBoard();
    }
    public partial class BoardService : BaseService<Board>, IBoardService
    {
        public BoardService(DbContext context, IBoardRepository repository) : base(context, repository)
        {
            _dbContext = context;
        }
        public List<Board> GetAllBoard()
        {
            var board = Get().Include(p => p.Tasks).Include(b => b.Manager).OrderByDescending(p => p.CreateTime).ToList();
            return board;
        }

        public Board GetBoardByID(string id)
        {
            var board = Get().Where(p => p.BoardId.Equals(id)).Include(p => p.Tasks).FirstOrDefault();
            return board;
        }

        public Board GetLastedBoard()
        {
            var board = Get().OrderByDescending(p => p.CreateTime).FirstOrDefault();
            return board;
        }
        public SuccessResponse CreateBoard(CreateBoardViewModel model)
        {
            var checkDupl = Get().Where(p => p.BoardName.Equals(model.BoardName)).FirstOrDefault();
            if(checkDupl != null)
            {
                throw new ErrorResponse("Tên bảng đã tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            if(model.BoardName != null)
            {
                var boardTmp = new Board()
                {
                    BoardId = Guid.NewGuid().ToString(),
                    BoardName = model.BoardName,
                    ManagerId = model.Manager_Id,
                    IsDelete = false,
                    CreateTime = DateTime.Now
                };
                Create(boardTmp);
                return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
            }
            throw new ErrorResponse("Bảng không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse UpdateBoard(UpdateBoardViewModel model)
        {
            var board = GetBoardByID(model.BoardId);
            if (board != null)
            {
                board.BoardName = model.BoardName;
                Update(board);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Bảng không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse DeleteBoard(string id)
        {
            var board = GetBoardByID(id);
            if (board != null)
            {
                board.IsDelete = true;
                Update(board);
                return new SuccessResponse((int)HttpStatusCode.OK, "Xóa thành công");
            }
            throw new ErrorResponse("Bảng không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
    }
}
